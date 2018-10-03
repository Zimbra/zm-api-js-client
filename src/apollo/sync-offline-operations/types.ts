import { StorageProvider } from '../offline-queue-link/types';

export interface SyncOfflineOperationsOptions {
	apolloClient: any;
	storage: StorageProvider;
	storeKey?: string;
}
