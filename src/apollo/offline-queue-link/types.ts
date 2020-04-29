import { FetchResult, NextLink, Operation } from '@apollo/client/core';
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
