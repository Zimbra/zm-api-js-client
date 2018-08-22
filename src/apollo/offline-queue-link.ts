/** see: github:iamrommel/offline-demo/web */
import { ApolloLink, NextLink, Observable, Operation } from 'apollo-link';
import get from 'lodash/get';
import {
	OfflineOperationEntry,
	OfflineQueueLinkOptions,
	OperationEntry,
	StorageProvider
} from './types';

function hasSensitiveVariables(operation: Operation) {
	return !!get(operation, 'variables.password');
}

/**
 * Queue operations and refire them at later time, see apollo-link-queue.
 * This link also maintains a persisted copy of the queue to be consumed by a
 * third party.
 */
export class OfflineQueueLink extends ApolloLink {
	public isOpen: boolean;
	public storage: StorageProvider;

	// Maintain two queues: one for non-serializable operations, and another
	// with serializable operations
	private offlineQueue: Array<OfflineOperationEntry>;
	private onlineQueue: Array<OperationEntry>;
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
		this.offlineQueue = [];
		this.onlineQueue = [];
		this.isOpen = isOpen;
	}

	close = () => {
		this.isOpen = false;
	};

	dequeue = (entry: OperationEntry) => {
		const index = this.onlineQueue.indexOf(entry);
		if (index !== -1) {
			this.onlineQueue = [
				...this.onlineQueue.slice(0, index),
				...this.onlineQueue.slice(index + 1)
			];
		}
	};

	enqueue = (entry: OperationEntry) => {
		const { operation } = entry;
		const { query, variables }: { query: any; variables: any } =
			operation || {};
		let isMutation =
			query &&
			query.definitions &&
			query.definitions.filter((e: any) => e.operation === 'mutation').length >
				0;

		// Add the actual operation to the onlineQueue
		this.onlineQueue.push(entry);

		// Add a serialized copy of the operation to the offlineQueue
		this.offlineQueue.push({
			[isMutation ? 'mutation' : 'query']: query,
			variables
		});

		this.persist();
	};

	open = ({ apolloClient }: { apolloClient?: any } = {}) => {
		if (!apolloClient) return;

		this.isOpen = true;

		this.retry();
	};

	persist = () => {
		this.storage.setItem(this.storeKey, JSON.stringify(this.offlineQueue));
	};

	request(operation: Operation, forward: NextLink) {
		const isForwarding =
			this.isOpen ||
			operation.getContext().skipQueue ||
			hasSensitiveVariables(operation);

		if (isForwarding) {
			return forward(operation);
		}

		return new Observable(observer => {
			const entry = { operation, forward, observer };
			this.enqueue(entry);
			return () => this.dequeue(entry);
		});
	}

	/** retry queries made while offline like apollo-link-queue */
	retry = () => {
		this.onlineQueue.forEach(({ operation, forward, observer }) => {
			// TODO: Remove items from offlineQueue one at a time as they resolve
			forward(operation).subscribe(observer);
		});

		this.onlineQueue = this.offlineQueue = [];

		// Right now this assumes that all operations from the onlineQueue are successful.
		this.persist();
	};
}
