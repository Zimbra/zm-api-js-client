import { makeExecutableSchema } from 'graphql-tools';
import mapValues from 'lodash/mapValues';

import {
	AddMsgInput,
	CalendarItemInput,
	ClientInfoInput,
	CreateContactInput,
	CreateIdentityInput,
	CreateMountpointInput,
	CreateTagInput,
	DeleteAppointmentInput,
	EnableTwoFactorAuthInput,
	ExternalAccountAddInput,
	ExternalAccountImportInput,
	ExternalAccountTestInput,
	FilterInput,
	FolderActionChangeColorInput,
	FolderActionCheckCalendarInput,
	ForwardAppointmentInput,
	ForwardAppointmentInviteInput,
	GetRightsInput,
	GrantRightsInput,
	InviteReplyInput,
	ModifyContactInput,
	ModifyIdentityInput,
	NameIdInput,
	PreferencesInput,
	PropertiesInput,
	RevokeRightsInput,
	SearchFolderInput,
	SendMessageInput,
	ShareNotificationInput,
	SignatureInput,
	WhiteBlackListInput,
	ZimletPreferenceInput
} from './generated-schema-types';
import { ZimbraSchemaOptions } from './types';

import { ZimbraBatchClient } from '../batch-client';
import { coerceBooleanToString } from '../utils/coerce-boolean';
import { ZimbraNotifications } from './notifications';

import { GraphQLSchema } from 'graphql';
import {
	ActionOptions,
	ActionType,
	ApplyFilterRulesOptions,
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
import { SessionHandler } from './session-handler';

export function createZimbraSchema(
	options: ZimbraSchemaOptions
): { client: ZimbraBatchClient; schema: GraphQLSchema } {
	const { cache, getApolloClient, ...clientOptions } = options;
	const notifications = cache
		? new ZimbraNotifications({ cache, getApolloClient })
		: undefined;
	const sessionHandler = cache ? new SessionHandler({ cache }) : undefined;
	const client = new ZimbraBatchClient({
		...clientOptions,
		notifications: notifications,
		sessionHandler
	});

	const localStoreClient = options.localStoreClient;

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
				downloadAttachment: (_, variables) =>
					client.downloadAttachment(variables),
				downloadMessage: (_, variables, context = {}) => {
					const { local } = context;

					if (local) {
						return localStoreClient.downloadMessage(variables);
					}

					return client.downloadMessage(variables);
				},
				freeBusy: (_, variables) =>
					client.freeBusy(variables as FreeBusyOptions),
				getContact: (_, variables) =>
					client.getContact(variables as GetContactOptions),
				clientInfo: (_, variables) =>
					client.clientInfo(variables as ClientInfoInput),
				getContactFrequency: (_, variables: any) =>
					client.getContactFrequency(variables as GetContactFrequencyOptions),
				getConversation: (_, variables) =>
					client.getConversation(variables as GetConversationOptions),
				getFilterRules: client.getFilterRules,
				getFolder: (_: any, variables, context = {}) => {
					const { local } = context;

					if (local) {
						return localStoreClient.getFolder(variables as GetFolderOptions);
					}

					return client.getFolder(variables as GetFolderOptions);
				},
				getAppointments: (_: any, variables) =>
					client.search(variables as SearchOptions),
				getTasks: (_: any, variables) =>
					client.getTasks(variables as SearchOptions),
				getAvailableLocales: (_: any) => client.getAvailableLocales(),
				getMailboxMetadata: (_: any, variables) =>
					client.getMailboxMetadata(variables as GetMailboxMetadataOptions),
				getMessage: (_, variables, context = {}) => {
					const { local } = context;

					if (local) {
						return localStoreClient.getMessage(variables as GetMessageOptions);
					}
					return client.getMessage(variables as GetMessageOptions);
				},
				getMessagesMetadata: (_, variables, context = {}) => {
					const { local } = context;

					if (local) {
						return localStoreClient.getMessagesMetadata(
							variables as GetMessageOptions
						);
					}
					return client.getMessagesMetadata(variables as GetMessageOptions);
				},
				getRights: (_, variables) =>
					client.getRights(variables as GetRightsInput),
				getScratchCodes: client.getScratchCodes,
				getSearchFolder: client.getSearchFolder,
				getSMimePublicCerts: (_, variables) =>
					client.getSMimePublicCerts(variables as GetSMimePublicCertsOptions),
				getTrustedDevices: client.getTrustedDevices,
				getWorkingHours: (_, variables) =>
					client.getWorkingHours(variables as WorkingHoursOptions),
				getPreferences: client.getPreferences,
				getDataSources: client.getDataSources,
				getIdentities: client.getIdentities,
				getSignatures: client.getSignatures,
				noop: client.noop,
				recoverAccount: (_, variables) =>
					client.recoverAccount(variables as RecoverAccountOptions),
				relatedContacts: (_, variables) =>
					client.relatedContacts(variables as RelatedContactsOptions),
				search: (_, variables, context = {}) => {
					const { local } = context;

					if (local) {
						return localStoreClient.search(variables as SearchOptions);
					}

					return client.search(variables as SearchOptions);
				},
				searchGal: (_, variables) =>
					client.searchGal(variables as SearchOptions),
				shareInfo: (_, variables) =>
					client.shareInfo(variables as ShareInfoOptions),
				taskFolders: client.taskFolders,
				getWhiteBlackList: client.getWhiteBlackList,
				getAppSpecificPasswords: client.getAppSpecificPasswords,
				getTag: client.getTag
			},
			//resolveType is necessary to differentiate for any Union or Interfaces
			MailItem: {
				__resolveType(obj: any) {
					return obj.conversationId ? 'MessageInfo' : 'Conversation';
				}
			},
			Mutation: {
				action: (_, { type, ...rest }, context = {}) => {
					const { local } = context;
					return local
						? localStoreClient.action(type, rest as ActionOptions)
						: client.action(type, rest as ActionOptions);
				},
				addMessage: (_, variables, context = {}) => {
					const { local } = context;

					if (local) {
						return localStoreClient.addMessage(variables as AddMsgInput);
					}

					return client.addMessage(variables as AddMsgInput);
				},
				applyFilterRules: (_, variables) =>
					client.applyFilterRules(variables as ApplyFilterRulesOptions),
				cancelTask: (_, variables) => client.cancelTask(variables),
				itemAction: (_, variables) =>
					client.itemAction(variables as ActionOptions),
				login: (_, variables) => client.login(variables as LoginOptions),
				logout: client.logout,
				disableTwoFactorAuth: client.disableTwoFactorAuth,
				enableTwoFactorAuth: (_, { options }) =>
					client.enableTwoFactorAuth(options as EnableTwoFactorAuthInput),
				messageAction: (_, variables) =>
					client.messageAction(variables as ActionOptions),
				changePassword: (_, variables) =>
					client.changePassword(variables as ChangePasswordOptions),
				modifyProfileImage: (_, variables) =>
					client.modifyProfileImage(variables as ModifyProfileImageOptions),
				contactAction: (_, variables) =>
					client.contactAction(variables as ActionOptions),
				createAppSpecificPassword: (_, { appName }) =>
					client.createAppSpecificPassword(appName),
				conversationAction: (_, variables) =>
					client.conversationAction(variables as ActionOptions),
				createFolder: (_, variables, context) => {
					const { local } = context;

					if (local) {
						return localStoreClient.createFolder(
							variables as CreateFolderOptions
						);
					}
					return client.createFolder(variables as CreateFolderOptions);
				},
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
				forwardAppointment: (_, { appointmentInvite }) =>
					client.forwardAppointment(
						appointmentInvite as ForwardAppointmentInput
					),
				forwardAppointmentInvite: (_, { appointmentInvite }) =>
					client.forwardAppointmentInvite(
						appointmentInvite as ForwardAppointmentInviteInput
					),
				generateScratchCodes: client.generateScratchCodes,
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
				createIdentity: (_, variables) =>
					client.createIdentity(variables as CreateIdentityInput),
				modifyIdentity: (_, variables) =>
					client.modifyIdentity(variables as ModifyIdentityInput).then(Boolean),

				modifyPrefs: (_, { prefs }) =>
					client.modifyPrefs(prefs as PreferencesInput),
				modifyProps: (_, { props }) =>
					client.modifyProps(props as Array<PropertiesInput>),
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
				revokeAppSpecificPassword: (_, { appName }) =>
					client.revokeAppSpecificPassword(appName),
				revokeOtherTrustedDevices: client.revokeOtherTrustedDevices,
				revokeRights: (_, variables) =>
					client.revokeRights(variables.input as RevokeRightsInput),
				revokeTrustedDevice: client.revokeTrustedDevice,
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
					client.modifyWhiteBlackList(whiteBlackList as WhiteBlackListInput),
				createTag: (_, { tag }) => client.createTag(tag as CreateTagInput),
				tagAction: (_, { action }) => client.action(ActionType.tag, action)
			}
		}
	});

	return {
		client,
		schema: executableSchema
	};
}

export { schema };
