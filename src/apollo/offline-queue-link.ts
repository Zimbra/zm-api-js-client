/** see: github:iamrommel/offline-demo/web */
import { ApolloLink, Observable } from 'apollo-link';
import { SyncOfflineMutation } from './sync-offline-mutation';

/**
 * A link to queue Mutations and save them to some backing storage.
 * Also queues Queries and refires them when opened; see apollo-link-queue.
 */
export class OfflineQueueLink extends ApolloLink {
	public isOpen: boolean;
	public storage: any;
	private mutationQueue: Array<any>;
	private queryQueue: Array<any>;
	private storeKey: string;

	constructor({
		storage,
		storeKey = '@offlineQueueKey',
		isOpen = true
	}: any = {}) {
		super();

		if (!storage)
			throw new Error(
				'Storage can be window.localStorage or AsyncStorage but was not set'
			);
		this.storage = storage;
		this.storeKey = storeKey;
		this.mutationQueue = [];
		this.queryQueue = [];
		this.isOpen = isOpen;
	}

	clearMutationQueue = () => {
		this.mutationQueue = [];
	};

	close = () => {
		this.isOpen = false;
	};

	enqueue = (entry: any) => {
		const item = { ...entry };
		const { operation } = item;
		const { query, variables }: { query: any; variables: any } =
			operation || {};
		let definitions = [];

		if (query && query.definitions)
			definitions = query.definitions.filter(
				(e: any) => e.operation === 'mutation'
			);

		//store only if there are values for query.definitions
		if (definitions.length > 0) {
			// query.definitions = definitions; // TODO: This line takes away needed Fragments
			this.mutationQueue.push({ mutation: query, variables });

			//update the value of local storage
			this.storage.setItem(this.storeKey, JSON.stringify(this.mutationQueue));
		} else {
			// Queue queries in a non-persistent queue
			this.queryQueue.push(item);
		}
	};

	open = ({ apolloClient }: { apolloClient?: any } = {}) => {
		if (!apolloClient) return;

		this.isOpen = true;

		this.retry();

		this.resync({ apolloClient });
	};

	request(operation: any, forward: any) {
		if (this.isOpen) {
			return forward(operation);
		}

		if (operation.getContext().skipQueue) {
			return forward(operation);
		}

		return new Observable(observer => {
			const entry = { operation, forward, observer };
			this.enqueue(entry);
			return () => ({ isOffline: true });
		});
	}

	/** sync offline mutations back to the server */
	resync = ({
		apolloClient,
		syncOfflineMutation
	}: {
		apolloClient: any;
		syncOfflineMutation?: any;
	}) => {
		syncOfflineMutation =
			syncOfflineMutation ||
			new SyncOfflineMutation({
				apolloClient,
				storage: this.storage,
				storeKey: this.storeKey
			});

		syncOfflineMutation
			.init()
			.then(syncOfflineMutation.sync)
			.then(this.clearMutationQueue);
	};

	/** retry queries made while offline like apollo-link-queue */
	retry = () => {
		this.queryQueue.forEach(({ operation, forward, observer }) => {
			forward(operation).subscribe(observer);
		});

		this.queryQueue = [];
	};
}
