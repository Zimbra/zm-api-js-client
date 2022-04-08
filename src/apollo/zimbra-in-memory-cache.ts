import { defaultDataIdFromObject, InMemoryCache, InMemoryCacheConfig } from '@apollo/client';
import get from 'lodash/get';

const dataIdFromPath = (result: any, path: string) => {
	if (result.__typename) {
		const id = get(result, path);
		return id ? `${result.__typename}:${id}` : defaultDataIdFromObject(result);
	}
};

const mergeSearches = (existing: any = {}, incoming: any = {}, types: any) => {
	const obj: any = { ...incoming };

	types.forEach((type: string) => {
		obj[type] = [...(existing[type] || []), ...(incoming[type] || [])];
	});

	return obj;
};

const dataIdFromObject = (object: any) => {
	switch (object.__typename) {
		case 'CalendarItemHitInfo':
			if (object.instances) {
				return `${defaultDataIdFromObject(object)}:${object.instances.length}`;
			}
			return `${defaultDataIdFromObject(object)}`;
		case 'MailboxMetadata':
			// Identify metadata groups by their section identifier such as
			// `zwc:implicit`.
			return dataIdFromPath(object, 'meta.0.section');
		case 'Folder':
			if (object.local && object.local !== null) {
				return `${defaultDataIdFromObject(object)}:local`;
			} else if (object.id === '1') {
				// Cache the root folder based on both ID and UUID from server
				return `${object.__typename}:${object.id}:${object.uuid}`;
			} else if (object.id?.includes(':')) {
				// Generating unique ID for Caching the mounting folders based on ID and absFolderPath
				return `${object.id}:${object.absFolderPath}`;
			}
			return defaultDataIdFromObject(object);
		case 'AutoCompleteMatch':
			// AutoCompleteMatch is not guarenteed to have an `id`
			return `${defaultDataIdFromObject(object)}:${object.email}`;
		case 'ContactListMember':
			// Contacts list members don't have ids
			return `${object.type}:${object.value}`;
		case 'MessageInfo':
			if (object.part && object.part !== null) {
				return `${defaultDataIdFromObject(object)}:${object.part}`;
			}
			return defaultDataIdFromObject(object);
		case 'SMimeMessage':
			return `${defaultDataIdFromObject(object)}:${object.isSecure}`;
		default:
			return defaultDataIdFromObject(object);
	}
};

function createPossibleTypes(possibleTypesFactory = Object) {
	return possibleTypesFactory({
		MailItem: ['Conversation', 'MessageInfo', 'MsgWithGroupInfo']
	});
}

const typePolicies = {
	Query: {
		fields: {
			accountInfo: {
				merge: true
			},
			getPreferences: {
				merge: true
			},
			search: {
				keyArgs: ['types', 'query', 'sortBy'],
				merge: (existing: any, incoming: any) =>
					mergeSearches(existing, incoming, ['contacts', 'messages', 'conversations'])
			}
		}
	},
	Contact: {
		fields: {
			attributes: {
				merge: true
			}
		}
	},
	Conversation: {
		fields: {
			messages: {
				// @TODO ideally we should write proper merge function here,
				// but as our app is already handling at caller level
				// we are just overwriting cache data here
				merge: false
			},
			emailAddresses: {
				// @TODO ideally we should write proper merge function here,
				// but as our app is already handling at caller level
				// we are just overwriting cache data here
				merge: false
			}
		}
	},
	MessageInfo: {
		fields: {
			emailAddresses: {
				// @TODO ideally we should write proper merge function here,
				// but as our app is already handling at caller level
				// we are just overwriting cache data here
				merge: false
			}
		}
	}
};

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
			typePolicies,
			...config
		});
	}
}
