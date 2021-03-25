import { FetchResult, NextLink, Operation } from '@apollo/client';
import { Observer } from 'zen-observable-ts';

export interface OfflineQueueLinkOptions {
	isOpen?: boolean;
	storage: StorageProvider;
	storeKey?: string;
}

export type OperationEntry = {
	forward: NextLink;
	observer: Observer<FetchResult>;
	operation: Operation;
	offlineQuery?: string;
	cancelQuery?: string;
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
