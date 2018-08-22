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

function deriveOfflineQueue(
	operationQueue: Array<OperationEntry>
): Array<OfflineOperationEntry> {
	return operationQueue.map(({ operation }: OperationEntry) => {
		const { query, variables }: Operation = operation || {};
		let isMutation =
			query &&
			query.definitions &&
			query.definitions.filter((e: any) => e.operation === 'mutation').length >
				0;

		return {
			[isMutation ? 'mutation' : 'query']: query,
			variables
		};
	});
}

/**
 * Queue operations and refire them at later time, see apollo-link-queue.
 * This link also maintains a persisted copy of the queue to be consumed by a
 * third party.
 */
export class OfflineQueueLink extends ApolloLink {
	public isOpen: boolean;
	public storage: StorageProvider;

	// Maintain a queue for all operations.
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
		this.operationQueue = [];
		this.isOpen = isOpen;
	}

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

		this.retry();
	};

	persist = () => {
		this.storage.setItem(
			this.storeKey,
			JSON.stringify(deriveOfflineQueue(this.operationQueue))
		);
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
		this.operationQueue.forEach(({ operation, forward, observer }) => {
			// TODO: Remove items from queue one at a time as they resolve
			forward(operation).subscribe(observer);
		});

		// Right now this assumes that all operations from the operationQueue are successful.
		this.operationQueue = [];
		this.persist();
	};
}
