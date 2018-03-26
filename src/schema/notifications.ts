import gql from 'graphql-tag';
import get from 'lodash-es/get';
import omitBy from 'lodash-es/omitBy';

import { ZimbraInMemoryCache } from '../apollo/zimbra-in-memory-cache';
import { Notification } from '../batch-client/types';
import { normalize } from '../normalize';
import { ZimbraNotificationsOptions } from './types';

import {
	Conversation,
	Folder as FolderEntity,
	MessageInfo
} from '../normalize/entities';

const normalizeConversation = normalize(Conversation);
const normalizeFolder = normalize(FolderEntity);
const normalizeMessage = normalize(MessageInfo);

function itemsForKey(notification: any, key: string) {
	const modifiedItems = get(notification, `modified.${key}`, []);
	const createdItems = get(notification, `created.${key}`, []);
	return [...modifiedItems, ...createdItems];
}

/**
 * Extract the attributes (non-nested object types) from a notification
 * data object to dynamically constructing a fragment.
 */
function attributeKeys(data: any) {
	return Object.keys(omitBy(data, v => typeof v === 'object'));
}

// Fragment names are required to be unique
function generateFragmentName(name: string, id: string = '') {
	// Dashes are illegal GraphQL syntax - remove them from
	// from the identifier
	return `${name}${id.replace(/-/g, '')}${new Date().valueOf()}`;
}

export class ZimbraNotifications {
	private cache: ZimbraInMemoryCache;

	constructor(options: ZimbraNotificationsOptions) {
		this.cache = options.cache;
	}

	public notificationHandler = (notification: Notification) => {
		console.log('[Cache] Handling Notification', notification);
		this.handleFolderNotifications(notification);
		this.handleConversationNotifications(notification);
		this.handleMessageNotifications(notification);
	};

	private handleConversationNotifications = (notification: Notification) => {
		const items = itemsForKey(notification, 'c');
		if (items) {
			items.forEach((i: any) => {
				const item = normalizeConversation(i);
				this.cache.writeFragment({
					id: `Conversation:${item.id}`,
					fragment: gql`
						fragment ${generateFragmentName(
							'conversationNotification',
							item.id
						)} on Conversation {
							${attributeKeys(item)}
						}
					`,
					data: {
						__typename: 'Conversation',
						...item
					}
				});
			});
		}
	};

	private handleFolderNotifications = (notification: Notification) => {
		const modifiedItems = get(notification, 'modified.folder');
		if (modifiedItems) {
			modifiedItems.forEach((i: any) => {
				const item = normalizeFolder(i);
				this.cache.writeFragment({
					id: `Folder:${item.id}`,
					fragment: gql`
						fragment ${generateFragmentName('folderNotification', item.id)} on Folder {
							${attributeKeys(item)}
						}
					`,
					data: {
						__typename: 'Folder',
						...item
					}
				});
			});
		}
	};

	// TODO: The `created` key in the session header will indicate when
	// new messages/conversations arrive. The notification handlers
	// should be able to implement a mechanism for notifying the app
	// about these new messages, either with a subscription-like model
	// (https://github.com/apollographql/graphql-subscriptions)
	// or via direct cache updates. With a subscription, for example,
	// the mail screen would listen for changes and refetch the list.
	// Alternatively, an event emitter could be used so that components
	// can appropriately update themselves is another option
	// that is less tied to GraphQL specifically.
	private handleMessageNotifications = (notification: Notification) => {
		const items = itemsForKey(notification, 'm');
		if (items) {
			items.forEach((i: any) => {
				const item = normalizeMessage(i);
				this.cache.writeFragment({
					id: `MessageInfo:${item.id}`,
					fragment: gql`
						fragment ${generateFragmentName(
							'messageNotification',
							item.id
						)} on MessageInfo {
							${attributeKeys(item)}
						}
					`,
					data: {
						__typename: 'MessageInfo',
						...item
					}
				});
			});
		}
	};
}
