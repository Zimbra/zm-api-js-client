/** see: github:iamrommel/offline-demo/web */
export class SyncOfflineMutation {
	public apolloClient: any;
	public storage: any;
	private offlineData: Array<any>;
	private storeKey: string;

	constructor({
		apolloClient,
		storage,
		storeKey = '@offlineQueueKey'
	}: any = {}) {
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

	addOfflineData = (queue: Array<any> = []) => {
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
		this.getOfflineData().then(stored => {
			this.offlineData = JSON.parse(stored) || [];
		});

	sync = () => {
		//if there is no offline data  then just exit
		if (!this.hasOfflineData()) return;

		//return as promise, but in the end clear the storage
		const uncommittedOfflineMutation: Array<any> = [];

		Promise.all(
			this.offlineData.map(item => {
				try {
					return this.apolloClient.mutate(item);
				} catch (e) {
					//set the errored mutation to the stash
					uncommittedOfflineMutation.push(item);
				}
			})
		)
			.catch(e => console.warn('SyncOfflineMutation::sync ERR:', e))
			.then(this.clearOfflineData) //wait before it was cleared
			.then(() => {
				//then add again the uncommited storage
				this.addOfflineData(uncommittedOfflineMutation);
			});
	};
}
