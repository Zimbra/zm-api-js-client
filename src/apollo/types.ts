import { BatchLink } from 'apollo-link-batch';
import { GraphQLSchema } from 'graphql/type';

export interface LocalBatchLinkOptions extends BatchLink.Options {
	context?: any;
	schema: GraphQLSchema;
}

export interface StorageProvider {
	getItem(key: string): any;
	removeItem(key: string): any;
	setItem(key: string, value: string): any;
}

export interface OfflineQueueLinkOptions {
	isOpen?: boolean;
	storage: StorageProvider;
	storeKey?: string;
}

export interface SyncOfflineOperationsOptions {
	apolloClient: any;
	storage: StorageProvider;
	storeKey?: string;
}

export type OperationEntry = {
	forward: any;
	observer: any;
	operation: any;
};

export type OfflineOperationEntry = {
	variables: any;
	[key: string]: any;
};
