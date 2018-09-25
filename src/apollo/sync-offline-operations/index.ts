import {
	OfflineOperationEntry,
	StorageProvider
} from '../offline-queue-link/types';

import { SyncOfflineOperationsOptions } from './types';

export class SyncOfflineOperations {
	public apolloClient: any;
	public storage: StorageProvider;
	private offlineData: Array<OfflineOperationEntry>;
	private storeKey: string;

	constructor({
		apolloClient,
		storage,
		storeKey = '@offlineQueueKey'
	}: SyncOfflineOperationsOptions) {
		if (!apolloClient)
			throw new Error(
				'Apollo Client instance is required when syncing data, please assign value to it'
			);
		if (!storage)
			throw new Error(
				'Storage can be window.localStorage or AsyncStorage but was not set'
			);

		this.apolloClient = apolloClient;
		this.storage = storage;
		this.storeKey = storeKey;
		this.offlineData = [];
	}

	addOfflineData = (queue: Array<OfflineOperationEntry> = []) => {
		//add only if there is a value
		if (queue && queue.length > 0)
			this.storage.setItem(this.storeKey, JSON.stringify(queue));
	};

	clearOfflineData = () => {
		this.offlineData = [];
		return Promise.resolve(this.storage.removeItem(this.storeKey));
	};

	getOfflineData = () => Promise.resolve(this.storage.getItem(this.storeKey));

	hasOfflineData = () => {
		return !!(this.offlineData && this.offlineData.length > 0);
	};

	init = () =>
		this.getOfflineData().then(
			stored => (this.offlineData = JSON.parse(stored) || [])
		);

	sync = () => {
		//if there is no offline data  then just exit
		if (!this.hasOfflineData()) return;

		const uncommitted: Array<OfflineOperationEntry> = [];

		return Promise.all(
			this.offlineData.map(item =>
				this.apolloClient['mutation' in item ? 'mutate' : 'query'](item).catch(
					() => {
						//set the errored item back to the stash
						uncommitted.push(item);
					}
				)
			)
		)
			.catch(e => console.warn('SyncOfflineOperations::sync ERR:', e))
			.then(this.clearOfflineData) //wait before it was cleared
			.then(() => {
				//then add again the uncommited storage
				this.addOfflineData(uncommitted);
			});
	};
}
