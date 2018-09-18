/** see: github:iamrommel/offline-demo/web */
import { ApolloLink, NextLink, Observable, Operation } from 'apollo-link';
import castArray from 'lodash/castArray';
import get from 'lodash/get';
import {
	OfflineOperationEntry,
	OfflineQueueLinkOptions,
	OperationEntry,
	StorageProvider
} from '../types';

export class DedupedByQueueError extends Error {
	constructor() {
		super('Operation got deduplicated by apollo-link-queue.');
		Object.defineProperty(this, 'name', { value: 'DedupedByQueueError' });
	}
}

function hasSensitiveVariables(operation: Operation) {
	return !!get(operation, 'variables.password');
}

function isMutationOperation({ query }: Operation) {
	return (
		query &&
		query.definitions &&
		query.definitions.filter((e: any) => e.operation === 'mutation').length > 0
	);
}

function deriveOfflineQueue(
	operationQueue: Array<OperationEntry>
): Array<OfflineOperationEntry> {
	return operationQueue.map(
		({ operation: { query, variables } }: OperationEntry) => ({
			[isMutationOperation(<Operation>{ query }) ? 'mutation' : 'query']: query,
			variables
		})
	);
}

/**
 * Queue operations and refire them at later time, see apollo-link-queue.
 * This link also maintains a persisted copy of the queue to be consumed by a
 * third party. Further, the link maintains a map of keyed queries to be used
 * to deduplicate or cancel queries queued while the link is closed.
 */
export class OfflineQueueLink extends ApolloLink {
	public isOpen: boolean;
	public storage: StorageProvider;

	private namedQueues: any;
	private operationQueue: Array<OperationEntry>;
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
		if (this.namedQueues[offlineQueueName]) {
			this.dequeue(this.namedQueues[offlineQueueName]);
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

	open = ({ apolloClient }: { apolloClient?: any } = {}) => {
		if (!apolloClient) return;

		this.isOpen = true;

		return this.retry();
	};

	persist = () => {
		// TODO: Make safe for async
		this.storage.setItem(
			this.storeKey,
			JSON.stringify(deriveOfflineQueue(this.operationQueue))
		);
	};

	purge = () => {
		this.storage.removeItem(this.storeKey);
	};

	request(operation: Operation, forward: NextLink) {
		const {
			skipQueue,
			cancelQueues,
			offlineQueueName
		} = operation.getContext();

		const isForwarding =
			this.isOpen || skipQueue || hasSensitiveVariables(operation);

		if (isForwarding) {
			return forward(operation);
		}

		return new Observable(observer => {
			const entry = { operation, forward, observer };

			if (offlineQueueName) {
				const prevEntry = this.namedQueues[offlineQueueName];
				if (prevEntry) {
					// TODO(pl12133): Ideally this is `observer.complete(query.optimisticResponse)`
					//   but I'm not sure how to get at the optimisticResponse
					prevEntry.observer.error(new DedupedByQueueError());
				}

				this.cancelNamedQueue(offlineQueueName);

				if (!~castArray(cancelQueues).indexOf(offlineQueueName)) {
					this.namedQueues[offlineQueueName] = entry;
				}
			}

			if (cancelQueues) {
				castArray(cancelQueues).forEach(this.cancelNamedQueue);
			}

			this.enqueue(entry);
			return () => this.dequeue(entry);
		});
	}

	// Retry queries made while offline like apollo-link-queue.
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
					...observer,
					error: (err: any) => {
						this.dequeue(entry);
						if (observer.error) {
							console.error(
								'[OfflineQueueLink] Could not sync operation to server:',
								operation
							);
							observer.error(err);

							done();
						}
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
