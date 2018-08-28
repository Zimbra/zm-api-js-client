import { makeExecutableSchema } from 'graphql-tools';
import mapValues from 'lodash/mapValues';

import {
	CalendarItemInput,
	CreateMountpointInput,
	FilterInput,
	FolderView,
	InviteReplyInput,
	NameIdInput,
	PreferencesInput,
	SendMessageInput,
	ShareNotificationInput,
	SignatureInput,
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
	AutoCompleteOptions,
	ChangePasswordOptions,
	CreateFolderOptions,
	CreateSearchFolderOptions,
	FreeBusyOptions,
	GetContactFrequencyOptions,
	GetContactOptions,
	GetConversationOptions,
	GetFolderOptions,
	GetMailboxMetadataOptions,
	GetMessageOptions,
	GetSMimePublicCertsOptions,
	LoginOptions,
	RelatedContactsOptions,
	SearchOptions,
	SetRecoveryAccountOptions,
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
				autoComplete: (_, variables) =>
					client.autoComplete(variables as AutoCompleteOptions),
				freeBusy: (_, variables) =>
					client.freeBusy(variables as FreeBusyOptions),
				getContact: (_, variables) =>
					client.getContact(variables as GetContactOptions),
				getContactFrequency: (_, variables: any) =>
					client.getContactFrequency(variables as GetContactFrequencyOptions),
				getConversation: (_, variables) =>
					client.getConversation(variables as GetConversationOptions),
				getFilterRules: client.getFilterRules,
				getFolder: (_: any, variables) =>
					client.getFolder(variables as GetFolderOptions),
				getMailboxMetadata: (_: any, variables) =>
					client.getMailboxMetadata(variables as GetMailboxMetadataOptions),
				getMessage: (_, variables) =>
					client.getMessage(variables as GetMessageOptions),
				getSearchFolder: client.getSearchFolder,
				getSMimePublicCerts: (_, variables) =>
					client.getSMimePublicCerts(variables as GetSMimePublicCertsOptions),
				preferences: client.preferences,
				noop: client.noop,
				relatedContacts: (_, variables) =>
					client.relatedContacts(variables as RelatedContactsOptions),
				search: (_, variables) => client.search(variables as SearchOptions),
				searchConversation: (_, variables) =>
					client.searchConversation(variables as SearchConversationOptions),
				shareInfos: (_, variables) =>
					client.shareInfos(variables as ShareInfosOptions),
				taskFolders: client.taskFolders
			},
			//resolveType is necessary to differentiate for any Union or Interfaces
			MailItem: {
				__resolveType(obj) {
					return obj.conversationId ? 'MessageInfo' : 'Conversation';
				}
			},
			Folder: {
				appointments: (root, { start, end, offset = 0, limit = 1000 }) =>
					client
						.jsonRequest({
							name: 'Search',
							body: {
								types: FolderView.appointment,
								calExpandInstStart: start,
								calExpandInstEnd: end,
								query: `inid:"${root.id}"`,
								offset,
								limit
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
				login: (_, variables) => client.login(variables as LoginOptions),
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
				createAppointment: (_, { accountName, appointment }) =>
					client.createAppointment(
						accountName,
						appointment as CalendarItemInput
					),
				createAppointmentException: (_, { accountName, appointment }) =>
					client.createAppointmentException(
						accountName,
						appointment as CalendarItemInput
					),
				modifyAppointment: (_, { accountName, appointment }) =>
					client.modifyAppointment(
						accountName,
						appointment as CalendarItemInput
					),
				createMountpoint: (_, variables) =>
					client.createMountpoint(variables as CreateMountpointInput),
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
				modifyFilterRules: (_, { filters }) =>
					client.modifyFilterRules(filters as Array<FilterInput>),
				createSignature: (_, variables) =>
					client.createSignature(variables as SignatureInput),
				modifySignature: (_, variables) =>
					client.modifySignature(variables as SignatureInput),
				deleteSignature: (_, variables) =>
					client.deleteSignature(variables as NameIdInput),
				saveDraft: (_, variables) =>
					client.saveDraft(variables as SendMessageInput),
				sendMessage: (_, variables) =>
					client.sendMessage(variables as SendMessageInput),
				createTask: (_, { task }) =>
					client.createTask(task as CalendarItemInput),
				modifyTask: (_, { task }) =>
					client.modifyTask(task as CalendarItemInput),
				sendInviteReply: (_, { inviteReply }) =>
					client.sendInviteReply(inviteReply as InviteReplyInput),
				setMailboxMetadata: (_: any, variables: any) =>
					client.jsonRequest({
						name: 'SetMailboxMetadata',
						body: {
							meta: {
								section: variables.section,
								_attrs: mapValues(variables.attrs, coerceBooleanToString)
							}
						}
					}),
				setRecoveryAccount: (_, variables) =>
					client.setRecoveryAccount(variables as SetRecoveryAccountOptions)
			}
		}
	});

	return {
		client,
		schema: executableSchema
	};
}

export { schema };
