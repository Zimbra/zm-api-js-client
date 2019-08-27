export { createZimbraSchema, schema } from './src/schema/schema';
export { ZimbraBatchClient } from './src/batch-client';
export { LocalBatchLink } from './src/apollo/local-batch-link';
export { ZimbraErrorLink } from './src/apollo/zimbra-error-link';
export {
	ZimbraInMemoryCache,
	CacheType
} from './src/apollo/zimbra-in-memory-cache';
export { OfflineQueueLink } from './src/apollo/offline-queue-link';
export { SyncOfflineOperations } from './src/apollo/sync-offline-operations';
export { batchJsonRequest, jsonRequest } from './src/request';
import * as types from './types';
export { types };
export { normalize } from './src/normalize';
import {
	Contact,
	Conversation,
	Folder,
	MessageInfo
} from './src/normalize/entities';
let entity = {
	Contact,
	Conversation,
	Folder,
	MessageInfo
};
export { entity };
