import { Operation } from '@apollo/client/core';

export interface OfflineQueueLinkOptions {
	isOpen?: boolean;
	storage: StorageProvider;
	storeKey?: string;
}

export type OperationEntry = {
	cancelQuery?: string;
	forward: any;
	observer: any;
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
