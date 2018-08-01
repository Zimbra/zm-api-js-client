import {
	ApolloReducerConfig,
	defaultDataIdFromObject,
	InMemoryCache
} from 'apollo-cache-inmemory';
import { get } from 'lodash';

const dataIdFromPath = (result: any, path: string) => {
	if (result.__typename) {
		const id = get(result, path);
		return id ? `${result.__typename}:${id}` : defaultDataIdFromObject(result);
	}
};

const dataIdFromObject = (object: any): string | null | undefined => {
	switch (object.__typename) {
		case 'MailboxMetadata':
			// Identify metadata groups by their section identifier such as
			// `zwc:implicit`.
			return dataIdFromPath(object, 'meta.0.section');
		case 'Folder':
			if (object.id === '1') {
				// Do not cache the root folder based on the ID because of
				// different views (message, contacts) can be fetched.
				return `${object.__typename}:${object.id}:${new Date().valueOf()}`;
			}
			return defaultDataIdFromObject(object);
		case 'SMimePublicCertsResponse':
			// Certificates response doesn't return any specific identifier. So, using email address itself as cache key.
			return dataIdFromPath(object, 'certs.0.email');
		default:
			return defaultDataIdFromObject(object);
	}
};

/**
 * Provide a light wrapper over Apollo's inmemory cache with
 * special optimizations for identifying Zimbra object types via
 * `dataIdFromObject`.
 */
export class ZimbraInMemoryCache extends InMemoryCache {
	constructor(config: ApolloReducerConfig = {}) {
		super({
			dataIdFromObject,
			...config
		});
	}
}
