import gql from 'graphql-tag';
import get from 'lodash/get';
import omitBy from 'lodash/omitBy';
import uniqBy from 'lodash/uniqBy';
import events from 'mitt';
import { ZimbraInMemoryCache } from '../apollo/zimbra-in-memory-cache';
import { Notification } from '../batch-client/types';
import { normalize } from '../normalize';
import { ZimbraNotificationsOptions } from './types';

import {
	Contact,
	Conversation,
	Folder as FolderEntity,
	Mailbox,
	MessageInfo,
	Tag
} from '../normalize/entities';

const normalizeConversation = normalize(Conversation);
const normalizeFolder = normalize(FolderEntity);
const normalizeMessage = normalize(MessageInfo);
const normalizeContact = normalize(Contact);
const normalizeTag = normalize(Tag);
const normalizeMailbox = normalize(Mailbox);
const writeNewMailQuery = gql`
	query getNewMail {
		getNewMail @client {
			id
			subject
			flags
			folderId
		}
	}
`;

const EVENT_EMMITER = {
	appt: 'notify-appointments'
};

function itemsForKey(notification: any, key: string) {
	const modifiedItems = get(notification, `modified.${key}`, []);
	const createdItems = get(notification, `created.${key}`, []);
	return [...modifiedItems, ...createdItems];
}

function findDataId(
	client: ZimbraInMemoryCache,
	partialDataId: string = '$ROOT_QUERY',
	predicate: (d: string) => any,
	returnFirstResult: Boolean = true
) {
	const data =
		client && get(client, 'cache.data.data', get(client, 'data.data'));
	if (!data) {
		return;
	}
	const results = Object.keys(data).filter((dataId: string) => {
		return dataId.indexOf(partialDataId) !== -1 && predicate(dataId);
	});

	return returnFirstResult ? results[0] : results;
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
	public notifier: any;
	private cache: ZimbraInMemoryCache;
	private getApolloClient: Function;

	constructor(options: ZimbraNotificationsOptions) {
		this.cache = options.cache;
		this.getApolloClient = options.getApolloClient;

		this.notifier = new (events as any)();
	}

	public notificationHandler = (notification: Notification) => {
		console.log('[Cache] Handling Notification', notification);
		this.handleMailboxNotifications(notification);
		this.handleFolderNotifications(notification);
		this.handleConversationNotifications(notification);
		this.handleMessageNotifications(notification);
		this.handleContactNotifications(notification);
		this.handleTagsNotifications(notification);
		this.handleAppointmentNotifications(notification);
	};

	/**
	 * Processes the specified notification items with the processor function passed in batches with timeout, by queueing them in the
	 * JavaScript event loop. To prevent the freezing in UI.
	 *
	 * @private
	 * @param {Array<any>} items array of notification items that need to be batched
	 * @param {Function} processorFn function which processes the items
	 * @returns
	 * @memberof ZimbraNotifications
	 */
	private batchProcessItems(items: Array<any>, processorFn: Function) {
		if (!items || (items && items.length === 0)) {
			return;
		}

		const BATCH_SIZE = 50;
		const LENGTH = items.length;
		const TIMEOUT = 100;
		const ITERATIONS = Math.ceil(LENGTH / BATCH_SIZE);

		let i: number;
		for (i = 0; i < ITERATIONS; i++) {
			const start = i * BATCH_SIZE;
			const end = Math.min(start + BATCH_SIZE, LENGTH);

			const batch = items.slice(start, end);

			// When the timed out function executes, the variables accessed inside the function have to be available through closure
			// Otherwise, the latest values of the variables would be used, which can have been updated by the loop iterations that executed
			// after the timeout was set and before it was executed.
			setTimeout(
				((i, ITERATIONS, batch) => () => {
					processorFn(batch);
					// broadcast updates in the last iteration
					if (i === ITERATIONS - 1) {
						this.broadcastCacheUpdates();
					}
				})(i, ITERATIONS, batch),
				TIMEOUT
			);
		}
	}

	private broadcastCacheUpdates = () => {
		this.getApolloClient().queryManager.broadcastQueries();
	};

	// Find the actual folder of the shared folder
	private findSharedItemId = (item: any) => {
		const cachedData = get(this.cache, 'data.data');
		const allFolders = Object.keys(cachedData).filter(f =>
			f.includes('Folder:')
		);
		const idSplit = item.split(':');
		for (const folderId in allFolders) {
			const folder: any = cachedData[allFolders[folderId]];
			//Find the folder where ownerZimbraId:sharedItemId equals to id
			if (
				folder.ownerZimbraId === idSplit[0] &&
				folder.sharedItemId === idSplit[1]
			) {
				return folder.id;
			}
		}
	};

	private handleAppointmentNotifications = (notification: Notification) => {
		const items = itemsForKey(notification, 'appt');
		this.notifier.emit(EVENT_EMMITER['appt'], items);
	};

	private handleContactNotifications = (notification: Notification) => {
		const items = itemsForKey(notification, 'cn');
		this.batchProcessItems(items, this.processContactNotifications);
	};

	private handleConversationNotifications = (notification: Notification) => {
		const items = itemsForKey(notification, 'c');
		this.batchProcessItems(items, this.processConversationNotifications);
	};

	private handleFolderNotifications = (notification: Notification) => {
		const modifiedItems =
			get(notification, 'modified.folder') ||
			get(notification, 'modified.link');
		this.batchProcessItems(modifiedItems, this.processFolderNotifications);
	};

	private handleMailboxNotifications = (notification: Notification) => {
		this.batchProcessItems(
			get(notification, 'modified.mbx'),
			this.processMailboxNotifications
		);
	};

	private handleMessageNotifications = (notification: Notification) => {
		const items = itemsForKey(notification, 'm');
		this.batchProcessItems(items, this.processMessageNotifications);
	};

	private handleTagsNotifications = (notification: Notification) => {
		const modifiedItems = get(notification, 'modified.tag');
		this.batchProcessItems(modifiedItems, this.processTagsNotifications);
	};

	private processContactNotifications = (items: any) => {
		let searchResponse: any = {};
		const typeGroup = '#type:group';
		const notTypeGroup = `NOT ${typeGroup}`;
		items.forEach((i: any) => {
			const item = normalizeContact(i);
			const defaultFolderName = 'Contacts';
			let folder: any;

			try {
				folder = this.cache.readFragment({
					id: `Folder:${item.folderId}`,
					fragment: gql`
						fragment ${generateFragmentName('folderName', item.folderId)} on Folder {
							name
						}
					`
				});
			} catch (exception) {
				console.error(exception);
				return;
			}

			const folderName = (folder && folder.name) || defaultFolderName;
			const query =
				folderName === 'Trash'
					? `in:\\\\"${folderName}\\\\"`
					: item.attributes && item.attributes.type === 'group'
					? typeGroup
					: `in:\\\\"${folderName}\\\\" ${notTypeGroup}`;

			const queryRegex = new RegExp(query);

			const id: any = findDataId(this.cache, '$ROOT_QUERY.search', dataId => {
				// check if query does not contain NOT #type:group but contains #type:group
				if (
					query.indexOf(notTypeGroup) === -1 &&
					query.indexOf(typeGroup) !== -1
				) {
					// if yes, then dataId should also not contain NOT #type:group and contain #type:group
					return dataId.indexOf(notTypeGroup) === -1 && queryRegex.test(dataId);
				}
				return queryRegex.test(dataId);
			});

			const { sortBy }: any = getVariablesFromDataId(id) || {};

			if (!searchResponse[query] && id) {
				/**
				 * readFragment without try...catch breaks the operation on exception.
				 * Read contacts from search results fragment and
				 * handle any exceptions occurred while reading message.
				 * */
				try {
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
				} catch (exception) {
					console.error(exception);
					return;
				}
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
		Object.keys(searchResponse).forEach(query => {
			const queryRegex = new RegExp(query);

			const id: any = findDataId(this.cache, '$ROOT_QUERY.search', dataId => {
				// check if query does not contain NOT #type:group but contains #type:group
				if (
					query.indexOf(notTypeGroup) === -1 &&
					query.indexOf(typeGroup) !== -1
				) {
					// if yes, then dataId should also not contain NOT #type:group and contain #type:group
					return dataId.indexOf(notTypeGroup) === -1 && queryRegex.test(dataId);
				}
				return queryRegex.test(dataId);
			});

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
						contacts: searchResponse[query].contacts
					}
				});
			}
		});
	};

	private processConversationNotifications = (items: any) => {
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
	};

	private processFolderNotifications = (items: any) => {
		items.forEach((i: any) => {
			const item = normalizeFolder(i);
			const itemId = item.id.includes(':')
				? this.findSharedItemId(item.id)
				: item.id;
			this.cache.writeFragment({
				id: `Folder:${itemId}`,
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
	};

	private processMailboxNotifications = (items: any) => {
		const mbxItems = normalizeMailbox(
			items.reduce((acc: any, i: any) => {
				/**
				 * Below step is required to flatten array of data into flattened object.
				 * E.g items would be [{ s: 23342 }, { t: "afdsfs" }] which will be flattened to { s: 23342, t: "afdsfs" }
				 */
				acc = {
					...acc,
					...i
				};

				return acc;
			}, {})
		);

		if (Object.keys(mbxItems).length) {
			const accInfoRegExp = /^AccountInfo/;
			const id: any = findDataId(this.cache, 'AccountInfo', dataId =>
				accInfoRegExp.test(dataId)
			);

			if (id) {
				this.cache.writeFragment({
					id,
					fragment: gql`
							fragment ${generateFragmentName('mailboxNotification')} on AccountInfo {
								${attributeKeys(mbxItems)}
							}
						`,
					data: {
						__typename: 'AccountInfo',
						...mbxItems
					}
				});
			}
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
	private processMessageNotifications = (items: any) => {
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
		items.length && this.writeToCacheForNewMail(items);
	};

	private processTagsNotifications = (items: any) => {
		items.forEach((i: any) => {
			const item = normalizeTag(i);
			this.cache.writeFragment({
				id: `Tag:${item.id}`,
				fragment: gql`
						fragment ${generateFragmentName('tagsNotification', item.id)} on Tag {
							${attributeKeys(item)}
						}
					`,
				data: {
					__typename: 'Tag',
					...item
				}
			});
		});
	};

	private writeToCacheForNewMail = (items: any) => {
		let itemsToWrite: any = [];
		try {
			const data: any = this.cache.readQuery({ query: writeNewMailQuery });
			itemsToWrite = data.getNewMail;
		} catch (exception) {
			itemsToWrite = [];
		}

		items.forEach((i: any) => {
			const item = normalizeMessage(i);
			const flags = item.flag || item.flags;
			flags &&
				flags.indexOf('u') > -1 &&
				itemsToWrite.push({
					id: item.id,
					subject: item.subject,
					flags: item.flags || item.flag,
					folderId: item.folderId,
					__typename: 'NewMail'
				});
		});
		this.cache.writeQuery({
			query: writeNewMailQuery,
			data: {
				getNewMail: itemsToWrite
			}
		});
	};
}
