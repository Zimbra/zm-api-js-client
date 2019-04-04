import { makeExecutableSchema } from 'graphql-tools';
import mapValues from 'lodash/mapValues';

import {
	AddMsgInput,
	CalendarItemInput,
	CreateContactInput,
	CreateMountpointInput,
	DeleteAppointmentInput,
	ExternalAccountAddInput,
	ExternalAccountImportInput,
	ExternalAccountTestInput,
	FilterInput,
	FolderActionChangeColorInput,
	FolderActionCheckCalendarInput,
	FolderView,
	GetRightsInput,
	GrantRightsInput,
	InviteReplyInput,
	ModifyContactInput,
	ModifyIdentityInput,
	NameIdInput,
	PreferencesInput,
	RevokeRightsInput,
	SearchFolderInput,
	SendMessageInput,
	ShareNotificationInput,
	SignatureInput,
	SortBy,
	WhiteBlackListInput,
	ZimletPreferenceInput
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
	AutoCompleteGALOptions,
	AutoCompleteOptions,
	ChangePasswordOptions,
	CreateFolderOptions,
	CreateSearchFolderOptions,
	ExternalAccountDeleteInput,
	ExternalAccountModifyInput,
	FreeBusyOptions,
	GetContactFrequencyOptions,
	GetContactOptions,
	GetConversationOptions,
	GetFolderOptions,
	GetMailboxMetadataOptions,
	GetMessageOptions,
	GetSMimePublicCertsOptions,
	LoginOptions,
	ModifyProfileImageOptions,
	RecoverAccountOptions,
	RelatedContactsOptions,
	ResetPasswordOptions,
	SearchOptions,
	SetRecoveryAccountOptions,
	ShareInfoOptions,
	WorkingHoursOptions
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
				autoCompleteGAL: (_, variables) =>
					client.autoCompleteGAL(variables as AutoCompleteGALOptions),
				discoverRights: client.discoverRights,
				downloadMessage: (_, variables) => client.downloadMessage(variables),
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
				getAppointments: (_: any, variables) =>
					client.search(variables as SearchOptions),
				getMailboxMetadata: (_: any, variables) =>
					client.getMailboxMetadata(variables as GetMailboxMetadataOptions),
				getMessage: (_, variables) =>
					client.getMessage(variables as GetMessageOptions),
				getRights: (_, variables) =>
					client.getRights(variables as GetRightsInput),
				getSearchFolder: client.getSearchFolder,
				getSMimePublicCerts: (_, variables) =>
					client.getSMimePublicCerts(variables as GetSMimePublicCertsOptions),
				getWorkingHours: (_, variables) =>
					client.getWorkingHours(variables as WorkingHoursOptions),
				preferences: client.preferences,
				noop: client.noop,
				recoverAccount: (_, variables) =>
					client.recoverAccount(variables as RecoverAccountOptions),
				relatedContacts: (_, variables) =>
					client.relatedContacts(variables as RelatedContactsOptions),
				search: (_, variables) => client.search(variables as SearchOptions),
				searchGal: (_, variables) =>
					client.searchGal(variables as SearchOptions),
				shareInfo: (_, variables) =>
					client.shareInfo(variables as ShareInfoOptions),
				taskFolders: client.taskFolders,
				getWhiteBlackList: client.getWhiteBlackList
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
								types: FolderView.Appointment,
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
				tasks: (root, { offset, sortBy = SortBy.DateDesc, limit = 1000 }) =>
					client
						.jsonRequest({
							name: 'Search',
							body: {
								offset,
								limit,
								sortBy,
								types: FolderView.Task,
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
				addMessage: (_, variables) =>
					client.addMessage(variables as AddMsgInput),
				cancelTask: (_, variables) => client.cancelTask(variables),
				itemAction: (_, variables) =>
					client.itemAction(variables as ActionOptions),
				login: (_, variables) => client.login(variables as LoginOptions),
				logout: client.logout,
				messageAction: (_, variables) =>
					client.messageAction(variables as ActionOptions),
				changePassword: (_, variables) =>
					client.changePassword(variables as ChangePasswordOptions),
				modifyProfileImage: (_, variables) =>
					client.modifyProfileImage(variables as ModifyProfileImageOptions),
				contactAction: (_, variables) =>
					client.contactAction(variables as ActionOptions),
				conversationAction: (_, variables) =>
					client.conversationAction(variables as ActionOptions),
				createFolder: (_, variables) =>
					client.createFolder(variables as CreateFolderOptions),
				createSearchFolder: (_, variables) =>
					client.createSearchFolder(variables as CreateSearchFolderOptions),
				createContact: (_, { contact }) =>
					client.createContact(contact as CreateContactInput),
				createContactList: (_, { contact }) =>
					client.createContact(contact as CreateContactInput),
				modifyContact: (_, { contact }) =>
					client.modifyContact(contact as ModifyContactInput),
				modifyContactList: (_, { contact }) =>
					client.modifyContact(contact as ModifyContactInput),
				createAppointment: (_, { accountName, appointment }) =>
					client.createAppointment(
						accountName,
						appointment as CalendarItemInput
					),
				snoozeCalendarItem: (_, { appointment, task }) =>
					client.snoozeCalendarItem(appointment, task),
				dismissCalendarItem: (_, { appointment, task }) =>
					client.dismissCalendarItem(appointment, task),
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
				deleteAppointment: (_, { appointment }) =>
					client.deleteAppointment(appointment as DeleteAppointmentInput),
				checkCalendar: (_, variables) =>
					client.checkCalendar(variables as FolderActionCheckCalendarInput),
				createCalendar: (_, { name, color, url }) =>
					client.createFolder({
						name,
						color,
						url,
						view: 'appointment',
						flags: '#'
					} as CreateFolderOptions),
				createSharedCalendar: (_, { link }) =>
					client.createMountpoint({
						link: {
							...link,
							parentFolderId: 1,
							view: 'appointment',
							flags: '#'
						}
					} as CreateMountpointInput),

				changeFolderColor: (_, variables) =>
					client.changeFolderColor(variables as FolderActionChangeColorInput),
				folderAction: (_, { action }) => client.folderAction(action),
				grantRights: (_, variables) =>
					client.grantRights(variables.input as GrantRightsInput),
				sendShareNotification: (_, { shareNotification }) =>
					client.sendShareNotification(
						shareNotification as ShareNotificationInput
					),
				testExternalAccount: (_, { externalAccount }) =>
					client.testExternalAccount(
						externalAccount as ExternalAccountTestInput
					),
				addExternalAccount: (_, { externalAccount }) =>
					client.addExternalAccount(externalAccount as ExternalAccountAddInput),
				modifyExternalAccount: (_, variables) =>
					client.modifyExternalAccount(variables as ExternalAccountModifyInput),
				deleteExternalAccount: (_, variables) =>
					client.deleteExternalAccount(variables as ExternalAccountDeleteInput),
				importExternalAccount: (_, { externalAccount }) =>
					client.importExternalAccount(
						externalAccount as ExternalAccountImportInput
					),
				prefEnableOutOfOfficeAlertOnLogin: (_, { value }) =>
					client
						.modifyPrefs({
							zimbraPrefOutOfOfficeStatusAlertOnLogin: value
						})
						.then(Boolean),

				prefEnableOutOfOfficeReply: (_, { value }) =>
					client
						.modifyPrefs({
							zimbraPrefOutOfOfficeReplyEnabled: value
						})
						.then(Boolean),

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
				modifyIdentity: (_, variables) =>
					client.modifyIdentity(variables as ModifyIdentityInput).then(Boolean),

				modifyPrefs: (_, { prefs }) =>
					client.modifyPrefs(prefs as PreferencesInput),
				modifyZimletPrefs: (_, { zimlets }) =>
					client.modifyZimletPrefs(zimlets as Array<ZimletPreferenceInput>),
				modifyFilterRules: (_, { filters }) =>
					client.modifyFilterRules(filters as Array<FilterInput>),
				createSignature: (_, variables) =>
					client.createSignature(variables as SignatureInput),
				modifySignature: (_, variables) =>
					client.modifySignature(variables as SignatureInput),
				modifySearchFolder: (_, variables) =>
					client.modifySearchFolder(variables as SearchFolderInput),
				deleteSignature: (_, variables) =>
					client.deleteSignature(variables as NameIdInput),
				saveDraft: (_, variables) =>
					client.saveDraft(variables as SendMessageInput),
				sendMessage: (_, variables) =>
					client.sendMessage(variables as SendMessageInput),
				sendDeliveryReport: (_, { messageId }) =>
					client.sendDeliveryReport(messageId),
				uploadMessage: (_, { value }) => client.uploadMessage(value),
				createTask: (_, { task }) =>
					client.createTask(task as CalendarItemInput),
				modifyTask: (_, { task }) =>
					client.modifyTask(task as CalendarItemInput),
				sendInviteReply: (_, { inviteReply }) =>
					client.sendInviteReply(inviteReply as InviteReplyInput),
				recoverAccount: (_, variables) =>
					client.recoverAccount(variables as RecoverAccountOptions),
				resetPassword: (_, variables) =>
					client.resetPassword(variables as ResetPasswordOptions),
				revokeRights: (_, variables) =>
					client.revokeRights(variables.input as RevokeRightsInput),
				setMailboxMetadata: (_: any, variables: any) =>
					client
						.jsonRequest({
							name: 'SetMailboxMetadata',
							body: {
								meta: {
									section: variables.section,
									_attrs: mapValues(variables.attrs, coerceBooleanToString)
								}
							}
						})
						.then(Boolean),
				setRecoveryAccount: (_, variables) =>
					client.setRecoveryAccount(variables as SetRecoveryAccountOptions),
				modifyWhiteBlackList: (_, { whiteBlackList }) =>
					client.modifyWhiteBlackList(whiteBlackList as WhiteBlackListInput)
			}
		}
	});

	return {
		client,
		schema: executableSchema
	};
}

export { schema };
