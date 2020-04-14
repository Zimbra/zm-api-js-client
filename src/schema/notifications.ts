import gql from 'graphql-tag';
import assign from 'lodash/assign';
import get from 'lodash/get';
import omitBy from 'lodash/omitBy';
import uniqBy from 'lodash/uniqBy';
import { ZimbraInMemoryCache } from '../apollo/zimbra-in-memory-cache';
import { Notification } from '../batch-client/types';
import { normalize } from '../normalize';
import { ZimbraNotificationsOptions } from './types';

import {
	CalendarItemHitInfo,
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
const normalizeCalendarItem = normalize(CalendarItemHitInfo);
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

const AppointmentsQuery = gql`
	query AppointmentsQuery(
		$calExpandInstStart: Float!
		$calExpandInstEnd: Float!
		$query: String!
	) {
		getAppointments(
			calExpandInstStart: $calExpandInstStart
			calExpandInstEnd: $calExpandInstEnd
			limit: 1000
			offset: 0
			types: appointment
			query: $query
		) {
			appointments {
				id
				inviteId
				folderId
				participationStatus
				date
				name
				freeBusy
				freeBusyActual
				duration
				alarm
				alarmData {
					nextAlarm
					alarmInstStart
				}
				allDay
				class
				isRecurring
				otherAttendees
				organizer {
					address
					name
					sentBy
				}
				location
				instances {
					start
					utcRecurrenceId
				}
			}
		}
	}
`;

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

function utcFromDateString(dateString: String) {
	const transformedDate = new Date(
		`${dateString.replace(/(.{4})(.{2})(.{2})(.*)/g, '$1-$2-$3')}`
	);
	return new Date(
		transformedDate.getTime() + transformedDate.getTimezoneOffset() * 60000
	).valueOf();
}

function getEventInstances(
	startTimeStamp: any,
	endDateTimestamp: any,
	intervalCount: any,
	frequency: any
) {
	const EVENT_INSTANCE_RANGE: any = {
		DAI: 35,
		WEE: 5,
		MON: 2
	};

	const result = [];
	let currTimeStamp: any = new Date(startTimeStamp);
	for (let i = 0; i < EVENT_INSTANCE_RANGE[frequency]; i++) {
		// @TODO: What should be the count?
		if (currTimeStamp.valueOf() > endDateTimestamp.valueOf()) {
			break;
		}
		currTimeStamp = new Date(currTimeStamp);
		result.push({
			start: currTimeStamp.valueOf(),
			// In Notification, utcRecurrenceId contains local instead of UTC timezone value.
			utcRecurrenceId: currTimeStamp.toISOString().replace(/[-:.]/g, ''),
			__typename: 'Instance'
		});
		switch (frequency) {
			case 'DAI':
				currTimeStamp.setDate(currTimeStamp.getDate() + intervalCount);
				break;
			case 'WEE':
				currTimeStamp.setDate(currTimeStamp.getDate() + intervalCount * 7);
				break;
			case 'MON':
				currTimeStamp.setMonth(currTimeStamp.getMonth() + intervalCount);
				break;
		}
	}
	return result;
}

function generateAppointmentInstaces(
	isRecurring: Boolean,
	startEvent: any,
	rule: any
) {
	if (!isRecurring || get(rule, 'frequency').indexOf('YEA') >= 0) {
		return [
			{
				start: startEvent,
				// In Notification, utcRecurrenceId contains local instead of UTC timezone value.
				utcRecurrenceId: new Date(startEvent)
					.toISOString()
					.replace(/[-:.]/g, ''),
				__typename: 'Instance'
			}
		];
	}
	const intervalCount = get(rule, 'interval.0.intervalCount');
	const reccUntilDate = get(rule, 'until.0.date');
	let endDateTimestamp;

	// If end date is set, create events upto that date,
	// else create max 35 instances which is maximum visible days in any view
	if (reccUntilDate) {
		const endDate = reccUntilDate.split('T');
		// Convert '20202101T221100Z' to '2020-21-01 22:11:00' to create Date instance
		endDateTimestamp = new Date(
			`${endDate[0].replace(
				/(.{4})(.{2})(.{2})/g,
				'$1-$2-$3'
			)} ${endDate[1].replace(/(.{2})(.{2})(.{2})(.*)/g, '$1:$2:$3')}`
		);
	} else {
		endDateTimestamp = new Date();
		endDateTimestamp = endDateTimestamp.setDate(
			endDateTimestamp.getDate() + 35
		);
	}

	return getEventInstances(
		startEvent,
		endDateTimestamp,
		intervalCount,
		rule.frequency
	);
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
	private getApolloClient: Function;

	constructor(options: ZimbraNotificationsOptions) {
		this.cache = options.cache;
		this.getApolloClient = options.getApolloClient;
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
		this.batchProcessItems(items, this.processAppointmentNotifications);
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

	private processAppointmentNotifications = (items: any) => {
		items.forEach((i: any) => {
			const item = normalizeCalendarItem(i);
			if (item.invitations && item.invitations.length) {
				const nextAlarm = get(item, 'nextAlarm', null);
				const invitation = get(item, 'invitations.0');
				const { date, folderId } = item;

				const invitationComponent = get(invitation, 'components.0');
				const {
					name,
					allDay = false, // presents only if it's true
					location,
					// inviteId,
					status: participationStatus,
					freeBusy,
					freeBusyActual,
					class: classname,
					rsvp: otherAttendees,
					recurrence, // presents only if it's recurring event
					organizer: { name: organizerName, address }
				} = invitationComponent;

				const isRecurring = !!recurrence;
				// Get utc info from invitation.
				let eventStartUtc: number;
				let eventEndUtc: number;
				let duration: number;

				// In case of allDay event, transform `20200401` to `2020-04-01`
				// and convert it to utc
				let key = allDay ? 'date' : 'utc';
				const startDate = get(invitationComponent, `start.0.${key}`);
				const endDate = get(invitationComponent, `end.0.${key}`);
				eventStartUtc = allDay ? utcFromDateString(startDate) : startDate;
				eventEndUtc = allDay ? utcFromDateString(endDate) : endDate;
				duration = eventStartUtc - eventEndUtc;

				const rule = get(recurrence, '0.add.0.rule.0');
				const instances: any = generateAppointmentInstaces(
					isRecurring,
					eventStartUtc,
					rule
				);

				const dataToWrite: any = { instances };

				assign(dataToWrite, {
					name,
					folderId,
					allDay,
					isRecurring,
					duration,
					date,
					location,
					participationStatus,
					freeBusy,
					freeBusyActual,
					class: classname,
					otherAttendees,
					organizer: {
						name: organizerName,
						address,
						sentBy: null,
						__typename: 'CalOrganizer'
					},
					alarm: !!nextAlarm,
					alarmData: [
						{
							alarmInstStart: eventStartUtc,
							nextAlarm,
							__typename: 'Alarm'
						}
					]
				});

				const instancesList = get(dataToWrite, 'instances', []);

				let cachedEventDetails: any = this.cache.readFragment({
					id: `CalendarItemHitInfo:${item.id}${
						instancesList.length ? ':' + instancesList.length : ''
					}`,
					fragment: gql`
						fragment ${generateFragmentName('appointments')} on CalendarItemHitInfo {
								id
								alarm
								inviteId
						}
				`
				});
				// If existing event is being updated
				if (cachedEventDetails) {
					const updatedAppointmentData = assign(
						{},
						cachedEventDetails,
						dataToWrite
					);

					this.cache.writeFragment({
						id: `CalendarItemHitInfo:${item.id}${
							instancesList.length ? ':' + instancesList.length : ''
						}`,
						fragment: gql`
								fragment ${generateFragmentName('appointments')} on CalendarItemHitInfo {
									${attributeKeys(updatedAppointmentData)}
									instances {
										${attributeKeys(updatedAppointmentData.instances[0])}
									}
									alarmData {
										${attributeKeys(updatedAppointmentData.alarmData[0])}
									}
								}
							`,
						data: {
							__typename: 'CalendarItemHitInfo',
							...updatedAppointmentData,
							...(!nextAlarm && { alarmData: null })
						}
					});
				} else {
					assign(dataToWrite, {
						id: get(item, 'id'),
						inviteId: `${get(item, 'id')}-${get(invitation, 'id')}`
					});

					// Find cached queries based on folder id and update results
					const query = `(inid:\\\\"${item.folderId}\\\\").*(\"types\":\"appointment\")`;
					const queryRegex = new RegExp(query);
					const appointmentListKey: any = findDataId(
						this.cache,
						'$ROOT_QUERY.getAppointments',
						dataId => queryRegex.test(dataId),
						false
					);
					appointmentListKey.length &&
						appointmentListKey.forEach((apptKey: any) =>
							this.writeAppointmentsToCache(apptKey, dataToWrite)
						);
				}
			}
		});
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

	private writeAppointmentsToCache = (
		appointmentListKey: any,
		dataToWrite: any
	) => {
		const variables = getVariablesFromDataId(appointmentListKey);
		const appointmentList: any = this.cache.readQuery({
			query: AppointmentsQuery,
			variables
		});

		const newAppointmentsList: any = addNewItemToList(
			appointmentList.getAppointments.appointments,
			{ ...dataToWrite, __typename: 'CalendarItemHitInfo' },
			'id'
		);

		this.cache.writeQuery({
			query: AppointmentsQuery,
			variables,
			data: {
				getAppointments: {
					appointments: newAppointmentsList,
					__typename: 'SearchResponse'
				}
			}
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
