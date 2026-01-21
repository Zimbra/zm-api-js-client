export { createZimbraSchema, schema } from './src/schema/schema';
export { ZimbraBatchClient } from './src/batch-client';
export { LocalBatchLink } from './src/apollo/local-batch-link';
export { ZimbraErrorLink } from './src/apollo/zimbra-error-link';
export { ZimbraInMemoryCache } from './src/apollo/zimbra-in-memory-cache';
//export { OfflineQueueLink } from './src/apollo/offline-queue-link';
//export { SyncOfflineOperations } from './src/apollo/sync-offline-operations';
export { batchJsonRequest, jsonRequest } from './src/request';
import * as types from './types';
export { types };

import {
	Contact,
	Conversation,
	Document,
	Folder as FolderEntity,
	Mailbox,
	MessageInfo,
	Tag
} from './src/normalize/entities';

const entities = {
	Contact,
	Conversation,
	Document,
	FolderEntity,
	Mailbox,
	MessageInfo,
	Tag
};

export { entities };
export { normalize } from './src/normalize';
