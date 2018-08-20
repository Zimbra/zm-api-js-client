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

export type Operation = {
	extensions: any;
	operationName: string;
	query: any;
	variables: any;
	getContext(): any;
	setContext(context: any): any;
};

export type OperationEntry = {
	forward: any;
	observer: any;
	operation: Operation;
};

export type OfflineOperationEntry = {
	variables: any;
	[key: string]: any;
};
