import { ApolloLink, NextLink, Observable, Operation } from 'apollo-link';
import castArray from 'lodash/castArray';
import { DedupedByQueueError } from './errors';
import {
	OfflineQueueLinkOptions,
	OperationEntry,
	StorageProvider
} from './types';
import { deriveOfflineQueue, hasSensitiveVariables } from './util';

/**
 * Queue operations and refire them at later time, see apollo-link-queue.
 * This link also maintains a persisted copy of the queue to be consumed by a
 * third party. Further, the link maintains a map of keyed queries to be used
 * to deduplicate or cancel operations queued while the link is closed.
 */
export class OfflineQueueLink extends ApolloLink {
	public isOpen: boolean;

	// Backing storage: localStorage or AsyncStore works out of the box.
	public storage: StorageProvider;

	// Queues are named in order to be deduplicated or cancelled, such that an
	// operation can cancel other operations in the queue. Useful for mutating an
	// entity that only exists in the offline queue.
	private namedQueues: { [key: string]: OperationEntry | undefined };

	// All operations are queued when the link is closed. The queue is persisted
	// to storage on any change.
	private operationQueue: Array<OperationEntry>;

	// The key used to store the persisted operations in storage.
	private storeKey: string;

	constructor({
		storage,
		storeKey = '@offlineQueueKey',
		isOpen = true
	}: OfflineQueueLinkOptions) {
		super();

		if (!storage)
			throw new Error(
				'Storage can be window.localStorage or AsyncStorage but was not set'
			);
		this.storage = storage;
		this.storeKey = storeKey;
		this.namedQueues = {};
		this.operationQueue = [];
		this.isOpen = isOpen;
	}

	cancelNamedQueue = (offlineQueueName: string) => {
		const entry: OperationEntry | undefined = this.namedQueues[
			offlineQueueName
		];
		if (entry) {
			this.dequeue(entry);
			if (entry.observer && entry.observer.error) {
				entry.observer.error(new DedupedByQueueError());
			}

			this.namedQueues[offlineQueueName] = undefined;
		}
	};

	close = () => {
		this.isOpen = false;
	};

	dequeue = (entry: OperationEntry) => {
		const index = this.operationQueue.indexOf(entry);
		if (index !== -1) {
			this.operationQueue = [
				...this.operationQueue.slice(0, index),
				...this.operationQueue.slice(index + 1)
			];
		}

		this.persist();
	};

	enqueue = (entry: OperationEntry) => {
		this.operationQueue.push(entry);
		this.persist();
	};

	getSize = () =>
		Promise.resolve(this.storage.getItem(this.storeKey)).then(
			d => (d || '').length
		);

	open = ({ apolloClient }: { apolloClient?: any } = {}) => {
		if (!apolloClient) return;

		this.isOpen = true;

		return this.retry();
	};

	persist = () =>
		Promise.resolve(
			this.storage.setItem(
				this.storeKey,
				JSON.stringify(deriveOfflineQueue(this.operationQueue))
			)
		);

	purge = () => Promise.resolve(this.storage.removeItem(this.storeKey));

	request(operation: Operation, forward: NextLink) {
		const {
			skipQueue,
			cancelQueues,
			offlineQueueName
		} = operation.getContext();

		const isForwarding =
			this.isOpen || skipQueue || hasSensitiveVariables(operation);

		if (isForwarding) {
			// This link does nothing if the link is open, the operation skips the
			// queue, or the operation has sensitive information.
			return forward(operation);
		}

		return new Observable(observer => {
			const entry = { operation, forward, observer };

			if (offlineQueueName) {
				// Deduplication: Any queue with the same name is errored out when a newer
				// operation with the same name is queued.
				this.cancelNamedQueue(offlineQueueName);

				// If the provided offlineQueueName is not self-cancelled, set this entry as
				// the head of the given named queue.
				if (!~castArray(cancelQueues).indexOf(offlineQueueName)) {
					this.namedQueues[offlineQueueName] = entry;
				}
			}

			// An operation can cancel multiple other operations.
			if (cancelQueues) {
				castArray(cancelQueues).forEach(this.cancelNamedQueue);
			}

			this.enqueue(entry);
			return () => this.dequeue(entry);
		});
	}

	// Retry operations made while offline like apollo-link-queue.
	// Returns a Promise that resolves after all operations are processed
	// regardless of success.
	retry = () =>
		new Promise(resolve => {
			let outstandingReqs = this.operationQueue.length;
			if (!outstandingReqs) {
				return resolve();
			}

			const done = () => {
				if (--outstandingReqs === 0) {
					resolve();
				}
			};

			this.operationQueue.forEach(entry => {
				const { operation, forward, observer } = entry;

				// Wrap the observer to call dequeue on error/complete
				forward(operation).subscribe({
					next: (value: any) => {
						if (observer.next) {
							observer.next(value);
						}
					},
					error: (err: any) => {
						this.dequeue(entry);
						if (observer.error) {
							observer.error(err);
						}

						done();
					},
					complete: () => {
						this.dequeue(entry);
						if (observer.complete) {
							observer.complete();
						}

						done();
					}
				});
			});
		});
}
