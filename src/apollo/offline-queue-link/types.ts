import { FetchResult, NextLink, Operation } from '@apollo/client';
import { Observer } from '@apollo/client';

export interface OfflineQueueLinkOptions {
	isOpen?: boolean;
	storage: StorageProvider;
	storeKey?: string;
}

export type OperationEntry = {
	cancelQuery?: string;
	forward: NextLink;
	observer: Observer<FetchResult>;
	offlineQuery?: string;
	operation: Operation;
};

export type OfflineOperationEntry = {
	variables: any;
	[key: string]: any;
};

export interface StorageProvider {
	getItem(key: string): any;
	removeItem(key: string): any;
	setItem(key: string, value: string): any;
}
