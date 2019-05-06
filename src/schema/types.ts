import { ZimbraInMemoryCache } from '../apollo/zimbra-in-memory-cache';
import { ZimbraClientOptions } from '../batch-client/types';

export interface ZimbraNotificationsOptions {
	cache: ZimbraInMemoryCache;
}

export interface ZimbraSessionOptions {
	cache: ZimbraInMemoryCache;
}

export interface ZimbraSchemaOptions
	extends ZimbraClientOptions,
		ZimbraNotificationsOptions {}
