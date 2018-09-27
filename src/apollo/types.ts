import { FetchResult, NextLink, Operation } from 'apollo-link';
import { BatchLink } from 'apollo-link-batch';
import { GraphQLSchema } from 'graphql/type';
import { Observer } from 'zen-observable-ts';

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
	forward: NextLink;
	observer: Observer<FetchResult>;
	operation: Operation;
};

export type OfflineOperationEntry = {
	variables: any;
	[key: string]: any;
};
