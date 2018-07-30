/** see: /home/plenahan/github/iamrommel/offline-demo/web */
import { ApolloLink, Observable } from 'apollo-link';
import { SyncOfflineMutation } from './sync-offline-mutation';

export class QueueMutationLink extends ApolloLink {
	public isOpen: boolean;
	public storage: any;
	private queue: Array<any>;
	private storeKey: string;

	constructor({ storage }: any = {}) {
		super();

		if (!storage)
			throw new Error(
				'Storage can be window.localStorage or AsyncStorage but was not set'
			);
		this.storage = storage;
		this.storeKey = '@offlineQueueKey';
		this.queue = [];
		this.isOpen = true;
	}

	clearQueue = () => {
		this.queue = [];
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
			query.definitions = definitions;
			this.queue.push({ mutation: query, variables });

			//update the value of local storage
			this.storage.setItem(this.storeKey, JSON.stringify(this.queue));
		}
	};

	open = ({ apolloClient }: { apolloClient?: any } = {}) => {
		if (!apolloClient) return;

		this.isOpen = true;

		this.resync({ apolloClient });
	};

	request(operation: any, forward: any) {
		if (this.isOpen) {
			return forward(operation);
		} else {
			//if it is close enqueue first before forwarding
			this.enqueue({ operation });
			//return {offline: true}
			//return forward(operation)
			return new Observable(() => {
				return () => ({ isOffline: true });
			});
		}
	}

	resync = ({
		apolloClient,
		syncOfflineMutation
	}: {
		apolloClient: any;
		syncOfflineMutation?: any;
	}) => {
		syncOfflineMutation =
			syncOfflineMutation ||
			new SyncOfflineMutation({ apolloClient, storage: this.storage });

		syncOfflineMutation
			.init()
			.then(syncOfflineMutation.sync)
			.then(this.clearQueue);
	};
}
