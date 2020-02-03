import {
	defaultDataIdFromObject,
	InMemoryCache,
	InMemoryCacheConfig
} from '@apollo/client';
import get from 'lodash/get';

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
				// Cache the root folder based on both ID and UUID from server
				return `${object.__typename}:${object.id}:${object.uuid}`;
			}
			return defaultDataIdFromObject(object);
		case 'AutoCompleteMatch':
			// AutoCompleteMatch is not guarenteed to have an `id`
			return `${defaultDataIdFromObject(object)}:${object.email}`;
		case 'ContactListMember':
			// Contacts list members don't have ids
			return `${object.type}:${object.value}`;
		default:
			return defaultDataIdFromObject(object);
	}
};

function createPossibleTypes(possibleTypesFactory = Object) {
	return possibleTypesFactory({
		MailItem: ['Conversation', 'MessageInfo', 'MsgWithGroupInfo']
	});
}

/**
 * Provide a light wrapper over Apollo's inmemory cache with
 * special optimizations for identifying Zimbra object types via
 * `dataIdFromObject`.
 */
export class ZimbraInMemoryCache extends InMemoryCache {
	constructor(config: InMemoryCacheConfig = {}) {
		if (!config.possibleTypes || typeof config.possibleTypes === 'function') {
			config.possibleTypes = createPossibleTypes(config.possibleTypes);
		}
		super({
			dataIdFromObject,
			...config
		});
	}
}
