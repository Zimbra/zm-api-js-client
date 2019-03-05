import gql from 'graphql-tag';
import get from 'lodash/get';
import omitBy from 'lodash/omitBy';
import uniqBy from 'lodash/uniqBy';
import { ZimbraInMemoryCache } from '../apollo/zimbra-in-memory-cache';
import { Notification } from '../batch-client/types';
import { normalize } from '../normalize';
import { ZimbraNotificationsOptions } from './types';

import {
	Contact,
	Conversation,
	Folder as FolderEntity,
	MessageInfo
} from '../normalize/entities';

const normalizeConversation = normalize(Conversation);
const normalizeFolder = normalize(FolderEntity);
const normalizeMessage = normalize(MessageInfo);
const normalizeContact = normalize(Contact);

function itemsForKey(notification: any, key: string) {
	const modifiedItems = get(notification, `modified.${key}`, []);
	const createdItems = get(notification, `created.${key}`, []);
	return [...modifiedItems, ...createdItems];
}

function findDataId(
	client: ZimbraInMemoryCache,
	partialDataId: string = '$ROOT_QUERY',
	predicate: (d: string) => any
) {
	const data =
		client && get(client, 'cache.data.data', get(client, 'data.data'));
	if (!data) {
		return;
	}
	return Object.keys(data).filter(
		(dataId: string) =>
			dataId.indexOf(partialDataId) !== -1 && predicate(dataId)
	)[0];
}

function addNewItemToList(itemList: any, item: any, sortBy: any) {
	if (sortBy === 'nameAsc' && item.fileAsStr && itemList.length > 0) {
		const index = itemList.findIndex(
			(cnt: any) =>
				item.fileAsStr.localeCompare(cnt.fileAsStr, undefined, {
					sensitivity: 'base'
				}) === -1
		);
		if (index !== -1) {
			itemList.splice(index, 0, item);
		} else {
			itemList.push(item);
		}
	} else {
		itemList = [item].concat(itemList);
	}
	return itemList;
}

function getVariablesFromDataId(dataId: any) {
	try {
		return JSON.parse(dataId.replace(/^[^(]+\((.*)\)$/, '$1'));
	} catch (e) {}
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
	// Dashes and colons are illegal GraphQL syntax - remove them from
	// from the identifier
	return `${name}${id.replace(/-|:/g, '')}${new Date().valueOf()}`;
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
		this.handleContactNotifications(notification);
	};

	private handleContactNotifications = (notification: Notification) => {
		const items = itemsForKey(notification, 'cn');
		if (items) {
			let searchResponse: any = {};
			items.forEach((i: any) => {
				const item = normalizeContact(i);
				const defaultFolderName = 'Contacts';
				const folder: any = this.cache.readFragment({
					id: `Folder:${item.folderId}`,
					fragment: gql`
					fragment folderName${item.folderId} on Folder {
						name
					}
					`
				});
				const folderName = (folder && folder.name) || defaultFolderName;
				const group =
					folderName === 'Trash'
						? ''
						: item.attributes && item.attributes.type === 'group'
							? ' #type:group'
							: ' NOT #type:group';
				const query = `in:\\\\"${folderName}\\\\"${group}`;
				const r = new RegExp(query);
				const id = findDataId(this.cache, '$ROOT_QUERY.search', dataId =>
					r.test(dataId)
				);
				const { sortBy }: any = getVariablesFromDataId(id) || {};
				if (!searchResponse[query] && id) {
					searchResponse[query] = this.cache.readFragment({
						id: id,
						fragment: gql`
							fragment ${generateFragmentName('searchResults')} on SearchResponse {
								contacts {
									id
									fileAsStr
								}
							}
						`
					});
				}
				searchResponse[query] =
					searchResponse[query] && searchResponse[query].contacts
						? searchResponse[query]
						: { contacts: [] };
				this.cache.writeFragment({
					id: `Contact:${item.id}`,
					fragment: gql`
						fragment ${generateFragmentName('contactNotification', item.id)} on Contact {
							${attributeKeys(item)}
						}
					`,
					data: {
						__typename: 'Contact',
						...item
					}
				});
				searchResponse[query].contacts = addNewItemToList(
					searchResponse[query].contacts,
					item,
					sortBy
				);
				searchResponse[query].contacts = uniqBy(
					searchResponse[query].contacts,
					'id'
				).map((contact: any) => ({
					generated: false,
					id: `Contact:${contact.id}`,
					type: 'id',
					typename: 'Contact'
				}));
			});
			Object.keys(searchResponse).forEach(q => {
				const r = new RegExp(q);
				const id = findDataId(this.cache, '$ROOT_QUERY.search', dataId =>
					r.test(dataId)
				);
				if (id) {
					this.cache.writeFragment({
						id: id,
						fragment: gql`
						fragment ${generateFragmentName('searchResults')} on SearchResponse {
							contacts
						}
						`,
						data: {
							__typename: 'SearchResponse',
							contacts: searchResponse[q].contacts
						}
					});
				}
			});
		}
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
