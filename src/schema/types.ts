import { ZimbraInMemoryCache } from '../../apollo';
import { ZimbraClientOptions } from '../batch-client/types';

export interface ZimbraNotificationsOptions {
	cache: ZimbraInMemoryCache;
}

export interface ZimbraSchemaOptions
	extends ZimbraClientOptions,
		ZimbraNotificationsOptions {}
