import { FetchResult, Operation } from '@apollo/client';

type NextLink = (operation: Operation) => import('@apollo/client').Observable<FetchResult>;
type Observer<T> = {
	complete?: () => void;
	error?: (error: any) => void;
	next?: (value: T) => void;
};

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
