import { makeExecutableSchema } from 'graphql-tools';
import { mapValues } from 'lodash';

import {
	CalendarItemInput,
	FolderView,
	PreferencesInput,
	ShareNotificationInput,
	SortBy
} from './generated-schema-types';
import { ZimbraSchemaOptions } from './types';

import { ZimbraBatchClient } from '../batch-client';
import { normalize } from '../normalize';
import { CalendarItemHitInfo } from '../normalize/entities';
import { coerceBooleanToString } from '../utils/coerce-boolean';
import { ZimbraNotifications } from './notifications';

import { GraphQLSchema } from 'graphql';
import {
	ActionOptions,
	ChangePasswordOptions,
	CreateFolderOptions,
	CreateSearchFolderOptions,
	FolderOptions,
	FreeBusyOptions,
	GetContactFrequencyOptions,
	GetContactOptions,
	GetConversationOptions,
	GetFolderOptions,
	GetMailboxMetadataOptions,
	GetMessageOptions,
	RelatedContactsOptions,
	SearchOptions,
	ShareInfosOptions
} from '../batch-client/types';
import schema from './schema.graphql';

export function createZimbraSchema(
	options: ZimbraSchemaOptions
): { client: ZimbraBatchClient; schema: GraphQLSchema } {
	const { cache, ...clientOptions } = options;
	const notifications = cache ? new ZimbraNotifications({ cache }) : undefined;
	const client = new ZimbraBatchClient({
		...clientOptions,
		notificationHandler: notifications && notifications.notificationHandler
	});

	const executableSchema = makeExecutableSchema({
		typeDefs: schema,
		resolvers: {
			Query: {
				accountInfo: client.accountInfo,
				folder: (_, variables) => client.folder(variables as FolderOptions),
				freeBusy: (_, variables) =>
					client.freeBusy(variables as FreeBusyOptions),
				getContact: (_, variables) =>
					client.getContact(variables as GetContactOptions),
				getContactFrequency: (_, variables: any) =>
					client.getContactFrequency(variables as GetContactFrequencyOptions),
				getConversation: (_, variables) =>
					client.getConversation(variables as GetConversationOptions),
				getFolder: (_: any, variables) =>
					client.getFolder(variables as GetFolderOptions),
				getMailboxMetadata: (_: any, variables) =>
					client.getMailboxMetadata(variables as GetMailboxMetadataOptions),
				getMessage: (_, variables) =>
					client.getMessage(variables as GetMessageOptions),
				getSearchFolder: client.getSearchFolder,
				preferences: client.preferences,
				noop: client.noop,
				relatedContacts: (_, variables) =>
					client.relatedContacts(variables as RelatedContactsOptions),
				search: (_, variables) => client.search(variables as SearchOptions),
				shareInfos: (_, variables) =>
					client.shareInfos(variables as ShareInfosOptions),
				taskFolders: client.taskFolders
			},
			Folder: {
				appointments: (root, { start, end }) =>
					client
						.jsonRequest({
							name: 'Search',
							body: {
								types: FolderView.appointment,
								calExpandInstStart: start,
								calExpandInstEnd: end,
								query: `inid:"${root.id}"`,
								offset: 0,
								limit: 50
							}
						})
						.then(({ appt = [], ...rest }) => ({
							...rest,
							appointments: appt.map(normalize(CalendarItemHitInfo))
						})),
				tasks: (root, { offset, sortBy = SortBy.dateDesc, limit = 1000 }) =>
					client
						.jsonRequest({
							name: 'Search',
							body: {
								offset,
								limit,
								sortBy,
								types: FolderView.task,
								query: `inid:"${root.id}"`
							}
						})
						.then(({ task = [], ...rest }) => ({
							...rest,
							tasks: task.map(normalize(CalendarItemHitInfo))
						}))
			},
			Mutation: {
				action: (_, variables) => {
					const { type, ...rest } = variables;
					return client.action(type, rest as ActionOptions);
				},
				cancelTask: (_, variables) => client.cancelTask(variables),
				itemAction: (_, variables) =>
					client.itemAction(variables as ActionOptions),
				logout: client.logout,
				messageAction: (_, variables) =>
					client.messageAction(variables as ActionOptions),
				changePassword: (_, variables) =>
					client.changePassword(variables as ChangePasswordOptions),
				conversationAction: (_, variables) =>
					client.conversationAction(variables as ActionOptions),
				createFolder: (_, variables) =>
					client.createFolder(variables as CreateFolderOptions),
				createSearchFolder: (_, variables) =>
					client.createSearchFolder(variables as CreateSearchFolderOptions),
				createAppointment: (_, { appointment }) =>
					client.createAppointment(appointment as CalendarItemInput),
				deleteAppointment: (_, { inviteId }, { zimbra }) =>
					zimbra.appointments.delete({ inviteId }),
				checkCalendar: (_, { calendarId, value }, { zimbra }) =>
					zimbra.calendars.check({ calendarId, value }),
				prefCalendarInitialView: (_, { value }) =>
					client
						.modifyPrefs({
							zimbraPrefCalendarInitialView: value
						})
						.then(() => value),
				prefCalendarWorkingHours: (_, { value }) =>
					client
						.modifyPrefs({
							zimbraPrefCalendarWorkingHours: value
						})
						.then(() => value),
				prefAutoAddAppointmentToCalendar: (_, { value }) =>
					client
						.modifyPrefs({
							zimbraPrefCalendarAutoAddInvites: value
						})
						.then(() => value),
				createCalendar: (_, { name, color, url }, { zimbra }) =>
					zimbra.folders.create({
						name,
						color,
						url,
						view: 'appointment',
						flags: '#'
					}),
				createSharedCalendar: (_, { sharedCalendar }, { zimbra }) =>
					zimbra.share.mountCalendar({
						...sharedCalendar,
						flags: '#'
					}),
				changeCalendarColor: (_, { id, color }, { zimbra }) =>
					zimbra.folders.changeColor({
						id,
						color
					}),
				prefCalendarFirstDayOfWeek: (_, { value }) =>
					client
						.modifyPrefs({
							zimbraPrefCalendarFirstDayOfWeek: value
						})
						.then(() => value),
				folderAction: (_, { action }) => client.folderAction(action),
				sendShareNotification: (_, { shareNotification }) =>
					client.sendShareNotification(
						shareNotification as ShareNotificationInput
					),
				addExternalAccount: (_, { externalAccount }, { zimbra }) =>
					zimbra.account
						.addExternal({
							externalAccount
						})
						.then((id?: string) => {
							if (id !== undefined) return id;
						}),
				modifyExternalAccount: (_, { id, type, attrs }, { zimbra }) =>
					zimbra.account.modifyExternal(id, type, attrs),
				deleteExternalAccount: (_, { id }, { zimbra }) =>
					zimbra.account.deleteExternal({ id }),
				prefEnableOutOfOfficeAlertOnLogin: (_, { value }) =>
					client
						.modifyPrefs({
							zimbraPrefOutOfOfficeStatusAlertOnLogin: value
						})
						.then(() => value),

				prefEnableOutOfOfficeReply: (_, { value }) =>
					client
						.modifyPrefs({
							zimbraPrefOutOfOfficeReplyEnabled: value
						})
						.then(() => value),

				prefOutOfOfficeFromDate: (_, { value }) =>
					client
						.modifyPrefs({
							zimbraPrefOutOfOfficeFromDate: value
						})
						.then(() => value),

				prefOutOfOfficeUntilDate: (_, { value }) =>
					client
						.modifyPrefs({ zimbraPrefOutOfOfficeUntilDate: value })
						.then(() => value),

				prefOutOfOfficeReply: (_, { value }) =>
					client
						.modifyPrefs({
							zimbraPrefOutOfOfficeReply: value
						})
						.then(() => value),
				modifyIdentity: (_, { id, attrs }, { zimbra }) =>
					zimbra.account.modifyIdentity(id, attrs),
				modifyPrefs: (_, { prefs }) =>
					client.modifyPrefs(prefs as PreferencesInput),
				// addSignature: (_, { name, contentType, value }) =>
				// 	api.loadAddSignature({ name, contentType, value }),
				// modifySignature: (_, { id, contentType, value }) =>
				// 	api.loadModifySignature({ id, contentType, value }),
				// deleteSignature: (_, { id }) => api.loadDeleteSignature({ id }),
				sendMsg: (_, { to, subject, text }, { zimbra }) =>
					zimbra.messages.send({ to, subject, text }),
				createTask: (_, { task }) =>
					client.createTask(task as CalendarItemInput),
				modifyTask: (_, { task }) =>
					client.modifyTask(task as CalendarItemInput),
				setMailboxMetadata: (_: any, variables: any) =>
					client.jsonRequest({
						name: 'SetMailboxMetadata',
						body: {
							meta: {
								section: variables.section,
								_attrs: mapValues(variables.attrs, coerceBooleanToString)
							}
						}
					})
			}
		}
	});

	return {
		client,
		schema: executableSchema
	};
}

export { schema };
