import DataLoader from 'dataloader';
import castArray from 'lodash/castArray';
import get from 'lodash/get';
import isError from 'lodash/isError';
import mapValues from 'lodash/mapValues';
import { denormalize, normalize } from '../normalize';
import {
	AccountRights,
	ActionOptions as ActionOptionsEntity,
	AddMsgInfo,
	AutoComplete as AutoCompleteEntity,
	AutoCompleteGALResponse,
	AutoCompleteResponse as AutoCompleteResponseEntity,
	CalendarItemCreateModifyRequest,
	CalendarItemDeleteRequest,
	CalendarItemHitInfo,
	ClientInfoResponse,
	Contact,
	Conversation,
	CounterAppointmentInfo,
	CreateAppSpecificPasswordResponse,
	CreateMountpointRequest,
	CreateSignatureRequest,
	DiscoverRightsResponse,
	DLActionEntity,
	DlGroupMember,
	DocumentActionData,
	Filter,
	Folder,
	ForwardAppointmentInfo,
	ForwardAppointmentInviteInfo,
	FreeBusy,
	FreeBusyInstance,
	GetAppointmentResponse,
	GetDocumentShareURLEntity,
	GetDocumentShareURLResponseEntity,
	GetFolderRequest as GetFolderRequestEntity,
	GetRightsRequest,
	HabGroup,
	InviteReply,
	ListDocumentRevisions,
	MessageInfo,
	SaveDocument,
	SaveDocuments,
	SearchCalendarResourcesResponse,
	SearchResponse,
	SendMessageInfo,
	ShareNotification,
	SmimeCertInfoResponse,
	Tag,
	ZimletConfigEntity
} from '../normalize/entities';
import {
	batchJsonRequest,
	DEFAULT_HOSTNAME,
	DEFAULT_SOAP_PATHNAME,
	jsonRequest,
	setCustomFetch
} from '../request';
import { JsonRequestOptions, Namespace, RequestBody, RequestOptions } from '../request/types';
import {
	AddMsgInput,
	CalendarItemInput,
	CounterAppointmentInput,
	CreateContactInput,
	CreateIdentityInput,
	CreateMountpointInput,
	CreateTagInput,
	DeleteAppointmentInput,
	DeleteIdentityInput,
	DistributionListActionInput,
	EnableTwoFactorAuthInput,
	ExternalAccountAddInput,
	ExternalAccountImportInput,
	ExternalAccountTestInput,
	FilterInput,
	FolderActionChangeColorInput,
	FolderActionCheckCalendarInput,
	FolderView,
	ForwardAppointmentInput,
	ForwardAppointmentInviteInput,
	GetRightsInput,
	GrantRightsInput,
	InviteReplyInput,
	ModifyContactInput,
	ModifyIdentityInput,
	PreferencesInput,
	RevokeRightsInput,
	SaveSMimeCertInputUpload,
	SearchFolderInput,
	SendMessageInput,
	SendTwoFactorAuthCodeInput,
	ShareNotificationInput,
	SignatureInput,
	WhiteBlackListInput,
	ZimletPreferenceInput
} from '../schema/generated-schema-types';
import {
	coerceBooleanToInt,
	coerceBooleanToString,
	coerceStringToBoolean
} from '../utils/coerce-boolean';
import { mapValuesDeep } from '../utils/map-values-deep';
import {
	normalizeCustomMetaDataAttrs,
	normalizeHeaderAttrs,
	setCustomMetaDataBody
} from '../utils/normalize-attrs-custommetadata';
import { normalizeEmailAddresses } from '../utils/normalize-email-addresses';
import {
	getAttachmentUrl,
	getContactProfileImageUrl,
	getProfileImageUrl,
	normalizeMimeParts
} from '../utils/normalize-mime-parts';
import { createContactBody, normalizeOtherAttr } from '../utils/normalize-otherAttribute-contact';
import { USER_FOLDER_IDS } from './constants';
import {
	ActionOptions,
	ActionType,
	ApplyFilterRulesOptions,
	AppointmentOptions,
	AutoCompleteGALOptions,
	AutoCompleteOptions,
	ChangePasswordOptions,
	CreateFolderOptions,
	CreateSearchFolderOptions,
	DiscoverRightOptions,
	ExternalAccountDeleteInput,
	ExternalAccountModifyInput,
	FreeBusyOptions,
	GetContactFrequencyOptions,
	GetContactOptions,
	GetConversationOptions,
	GetCustomMetadataOptions,
	GetDocumentShareURLOptions,
	GetFolderOptions,
	GetMailboxMetadataOptions,
	GetMessageOptions,
	GetSMimePublicCertsOptions,
	LoginOptions,
	ModifyProfileImageOptions,
	NoOpOptions,
	RecoverAccountOptions,
	RelatedContactsOptions,
	ResetPasswordOptions,
	SaveDocumentInput,
	SearchCalendarResourcesOptions,
	SearchOptions,
	SessionHandler,
	SetRecoveryAccountOptions,
	ShareInfoOptions,
	WorkingHoursOptions,
	ZimbraClientOptions
} from './types';

import { CASTING_PREFS } from './constants';
import { Notifier } from './notifier';

const DEBUG = false;

function normalizeMessage(
	message: { [key: string]: any },
	{ origin, jwtToken, isDesktop }: { isDesktop?: string; jwtToken?: string; origin?: string }
) {
	if (message?.meta) {
		message.meta = message.meta.map((entry: any) => {
			if (!entry._attrs) {
				entry._attrs = {};
			}
			entry = normalizeCustomMetaDataAttrs(entry);
			return entry;
		});
	}
	if (message?._attrs) {
		message._attrs = normalizeHeaderAttrs(message._attrs);
	}

	let normalizedMessage = normalize(MessageInfo)(message);
	normalizedMessage = normalizedMessage && mapValuesDeep(normalizedMessage, coerceStringToBoolean);

	return normalizeEmailAddresses(
		normalizeMimeParts(normalizedMessage, { origin, jwtToken, isDesktop })
	);
}

const hasUnreadDescendent = (folder: any): any => {
	const unreadDescendent = get(folder, 'unreadDescendent');

	if (
		folder[
			folder.id === USER_FOLDER_IDS.DRAFTS || folder.name === 'Outbox'
				? 'nonFolderItemCount'
				: 'unread'
		] > 0 ||
		unreadDescendent
	) {
		return true;
	}

	const folderArray = get(folder, 'folders') || [];
	for (let i = 0, len = folderArray.length; i < len; i++) {
		return hasUnreadDescendent(folderArray[i]);
	}

	return false;
};

const updateGroupName = (habGroup: any) => ({
	...habGroup,
	name: get(habGroup, 'attributes.displayName')
});

const updateGroupNameRecur = (habGroups: any) =>
	habGroups.map((habGroup: any) => {
		habGroup = updateGroupName(normalize(HabGroup)(habGroup));
		habGroup.habGroup && (habGroup.habGroups = [...updateGroupNameRecur(habGroup.habGroup)]);
		return habGroup;
	});

const setUnreadDescendentFlag = (folder: any) => {
	const folderArray = get(folder, 'folders') || [];
	const view = get(folder, 'view');

	// setting this flag only in message view has we dont want to show unread count in
	// other views
	if (!view || view === FolderView.Message) {
		folder = {
			...folder,
			unreadDescendent: hasUnreadDescendent(folder)
		};

		if (folderArray) {
			folder = {
				...folder,
				folders: folderArray.map(setUnreadDescendentFlag)
			};
		}
	}
	return folder;
};

/**
 * This function is required because the API returns Subfolder data for shared folder
 * with Actual folder path (not mounted folder path). This could lead to 404 "NO SUCH FOLDER EXISTS ERROR".
 */
function updateAbsoluteFolderPath(originalName: any, parentFolderAbsPath: string, folders: any) {
	return folders.map((folder: any) => {
		// When the entire mailbox is shared with another user, in that case, the originalName would
		// have the value as "USER_ROOT", for that instance we need to append the value to the absFolderPath
		// of the current folder and all children
		if (originalName === 'USER_ROOT') {
			folder.absFolderPath = `${parentFolderAbsPath}${folder.absFolderPath}`;
		} else {
			folder.absFolderPath = `${parentFolderAbsPath}/${folder.name}`;
		}

		if (folder.folders) {
			folder.folders = updateAbsoluteFolderPath(folder.oname, folder.absFolderPath, folder.folders);
		}
		return folder;
	});
}
/**
 * Return an empty string in case it's empty array or null value, else return an Array.
 *
 * Server accepts '' and [] considering following scenarios.
 * 1. 'Single email / folder id' for single item. - Legacy follow this.
 * 2. Array [email, ...] for 1 or more items.
 * 3. '' to set value to empty. (Refer following cases)
 *
 * > [] - No changes to reflect on server.
 * > '' - Set value to empty for given field.
 *
 * So, while submitting data to server, we consider 1st and 2nd case as 1st case only (due to
 * graphQL's single data type limitation). and 3rd case as it is.
 *
 * While retrieving data from Server, it returns,
 * 1. String for single item
 * 2. Array for multiple items
 * 3. '' for empty value
 * So, We convert such item values to array.
 *
 * @param value An Array or empty String
 * @returns Non-empty Array or empty String
 */
function convertStringAndArrayValues(value: any) {
	const result = [].concat(value).filter(Boolean);
	return result.length ? result : '';
}

export class ZimbraBatchClient {
	public localStoreClient: any;
	public notifier: Notifier;
	public origin: string;
	public sessionId: any;
	public soapPathname: string;
	private authToken?: string;
	private batchDataLoader: DataLoader<RequestOptions, RequestBody>;
	private csrfToken?: string;
	private customFetch: any;
	private dataLoader: DataLoader<RequestOptions, RequestBody>;
	private jwtToken?: string;
	private sessionHandler?: SessionHandler;
	private userAgent?: {};

	constructor(options: ZimbraClientOptions = {}) {
		this.sessionHandler = options.sessionHandler;
		this.userAgent = options.userAgent;
		this.jwtToken = options.jwtToken;
		this.csrfToken = options.csrfToken;
		this.authToken = options.authToken;
		this.origin = options.zimbraOrigin !== undefined ? options.zimbraOrigin : DEFAULT_HOSTNAME;
		this.soapPathname = options.soapPathname || DEFAULT_SOAP_PATHNAME;
		this.localStoreClient = options.localStoreClient;
		this.customFetch = options.customFetch;

		this.notifier = new Notifier();

		// Used for sending batch requests
		this.batchDataLoader = new DataLoader(this.batchDataHandler, {
			cache: false
		});

		// Used for sending individual requests
		this.dataLoader = new DataLoader(this.dataHandler, {
			batch: false,
			cache: false
		});

		if (this.customFetch) {
			setCustomFetch(this.customFetch);
		}
	}

	public accountInfo = () =>
		this.jsonRequest({
			name: 'GetInfo',
			namespace: Namespace.Account,
			body: {
				sections: 'mbox,attrs,zimlets,props'
			}
		}).then(res => {
			const {
				zimbraMailAlias,
				zimbraTwoFactorAuthMethodAllowed,
				zimbraTwoFactorAuthMethodEnabled
			} = res?.attrs?._attrs || {};
			return {
				...res,
				attrs: {
					...mapValuesDeep(res?.attrs?._attrs, coerceStringToBoolean),
					zimbraMailAlias: [].concat(zimbraMailAlias || []),
					zimbraTwoFactorAuthMethodAllowed: [].concat(zimbraTwoFactorAuthMethodAllowed || []),
					zimbraTwoFactorAuthMethodEnabled: [].concat(zimbraTwoFactorAuthMethodEnabled || [])
				},
				...(res?.license?.attr && {
					license: {
						status: res.license.status,
						attr: mapValuesDeep(res.license.attr, coerceStringToBoolean)
					}
				}),
				zimlets: {
					zimlet: res?.zimlets?.zimlet?.map(({ zimlet, zimletContext, zimletConfig }: any) => ({
						zimlet,
						zimletContext,
						...(zimletConfig && {
							zimletConfig: normalize(ZimletConfigEntity)(zimletConfig)
						})
					}))
				}
			};
		});

	public accountOnlyRemoteWipeSync = (deviceId: String) =>
		this.jsonRequest({
			name: 'AccountOnlyRemoteWipe',
			namespace: Namespace.Sync,
			body: {
				device: {
					id: deviceId
				}
			}
		});

	public action = (type: ActionType, options: ActionOptions) => {
		const { ids, id, ...rest } = options;

		return this.jsonRequest({
			name: type,
			body: {
				action: {
					id: id || [ids].join(','),
					...denormalize(ActionOptionsEntity)(rest)
				}
			},
			singleRequest: true
		}).then(Boolean);
	};

	public addExternalAccount = ({ accountType, ...accountInfo }: ExternalAccountAddInput) =>
		this.jsonRequest({
			name: 'CreateDataSource',
			body: {
				[<string>accountType]: mapValuesDeep(accountInfo, coerceBooleanToString)
			},
			singleRequest: true
		}).then(res => get(res, `${accountType}.0.id`));

	public addMessage = (message: AddMsgInput) => {
		const { folderId, content, meta } = message;
		let flags, tags, tagNames, date;

		try {
			({ flags, tags, tagNames, date } = meta && JSON.parse(meta));
		} catch (err) {}

		return this.jsonRequest({
			name: 'AddMsg',
			body: denormalize(AddMsgInfo)({
				message: {
					folderId,
					content: {
						_content: content
					},
					flags,
					tags,
					tagNames,
					date
				}
			}),
			singleRequest: true
		}).then(normalize(MessageInfo));
	};

	public allowDeviceSync = (deviceId: String) =>
		this.jsonRequest({
			name: 'AllowDevice',
			namespace: Namespace.Sync,
			body: {
				device: {
					id: deviceId
				}
			}
		});

	public applyFilterRules = ({ ids, filterRules }: ApplyFilterRulesOptions) =>
		this.jsonRequest({
			name: 'ApplyFilterRules',
			body: {
				filterRules: {
					filterRule: filterRules
				},
				m: {
					ids
				}
			}
		}).then(res => {
			const ids = get(res, 'm[0].ids');
			return ids ? ids.split(',') : [];
		});

	// For offline Drafts
	public attach = (files: any, message: any) => this.localStoreClient.attach({ files, message });

	public autoComplete = (options: AutoCompleteOptions) =>
		this.jsonRequest({
			name: 'AutoComplete',
			body: denormalize(AutoCompleteEntity)(options)
		}).then(normalize(AutoCompleteResponseEntity));

	public autoCompleteGAL = (options: AutoCompleteGALOptions) =>
		this.jsonRequest({
			name: 'AutoCompleteGal',
			namespace: Namespace.Account,
			body: options
		}).then(res => normalize(AutoCompleteGALResponse)(res));

	public blockDeviceSync = (deviceId: String) =>
		this.jsonRequest({
			name: 'BlockDevice',
			namespace: Namespace.Sync,
			body: {
				device: {
					id: deviceId
				}
			}
		});

	public cancelPendingAccountOnlyRemoteWipeSync = (deviceId: String) =>
		this.jsonRequest({
			name: 'CancelPendingAccountOnlyRemoteWipe',
			namespace: Namespace.Sync,
			body: {
				device: {
					id: deviceId
				}
			}
		});

	public cancelPendingRemoteWipeSync = (deviceId: String) =>
		this.jsonRequest({
			name: 'CancelPendingRemoteWipe',
			namespace: Namespace.Sync,
			body: {
				device: {
					id: deviceId
				}
			}
		});

	public cancelTask = ({ inviteId }: any) =>
		this.jsonRequest({
			name: 'CancelTask',
			body: {
				comp: '0',
				id: inviteId
			},
			singleRequest: true
		}).then(Boolean);

	public changeFolderColor = ({ id, color }: FolderActionChangeColorInput) =>
		this.action(ActionType.folder, {
			id,
			op: 'color',
			color
		});

	public changePassword = ({
		loginNewPassword,
		password,
		username,
		dryRun = false
	}: ChangePasswordOptions) =>
		this.jsonRequest({
			name: 'ChangePassword',
			namespace: Namespace.Account,
			body: {
				account: {
					by: 'name',
					_content: username
				},
				oldPassword: password,
				password: loginNewPassword,
				dryRun
			},
			singleRequest: true
		});

	public checkCalendar = ({ id, value }: FolderActionCheckCalendarInput) =>
		this.action(ActionType.folder, {
			id,
			op: value ? 'check' : '!check'
		});

	public clientInfo = ({ by, domain }: any) =>
		this.jsonRequest({
			name: 'ClientInfo',
			body: {
				domain: [
					{
						by: by,
						_content: domain
					}
				]
			},
			singleRequest: true,
			namespace: Namespace.Account
		}).then(res => normalize(ClientInfoResponse)(mapValuesDeep(res, coerceStringToBoolean)));

	public contactAction = (options: ActionOptions) => this.action(ActionType.contact, options);

	public conversationAction = (options: ActionOptions) =>
		this.action(ActionType.conversation, options);

	public counterAppointment = (body: CounterAppointmentInput) =>
		this.jsonRequest({
			name: 'CounterAppointment',
			body: denormalize(CounterAppointmentInfo)(body),
			singleRequest: true
		}).then(Boolean);

	public createAppointment = (accountName: string, appointment: CalendarItemInput) =>
		this.jsonRequest({
			name: 'CreateAppointment',
			body: {
				...denormalize(CalendarItemCreateModifyRequest)(appointment)
			},
			accountName,
			singleRequest: true
		}).then(Boolean);

	public createAppointmentException = (accountName: string, appointment: CalendarItemInput) =>
		this.jsonRequest({
			name: 'CreateAppointmentException',
			body: {
				...denormalize(CalendarItemCreateModifyRequest)(appointment)
			},
			accountName,
			singleRequest: true
		}).then(Boolean);

	public createAppSpecificPassword = (appName: string) =>
		this.jsonRequest({
			name: 'CreateAppSpecificPassword',
			namespace: Namespace.Account,
			body: {
				appName: {
					_content: appName
				}
			},
			singleRequest: true
		}).then(res => normalize(CreateAppSpecificPasswordResponse)(res));

	public createContact = (data: CreateContactInput) =>
		this.jsonRequest({
			name: 'CreateContact',
			body: createContactBody(data, this.localStoreClient !== undefined),
			singleRequest: true
		}).then(res => normalize(Contact)(normalizeOtherAttr(res.cn)[0]));

	public createFolder = (_options: CreateFolderOptions) => {
		const { flags, fetchIfExists, parentFolderId, ...options } = _options;
		return this.jsonRequest({
			name: 'CreateFolder',
			body: {
				folder: {
					...options,
					f: flags,
					fie: fetchIfExists,
					l: parentFolderId
				}
			},
			singleRequest: true
		}).then(res => normalize(Folder)(res.folder[0]));
	};

	public createIdentity = ({ attrs, ...rest }: CreateIdentityInput) =>
		this.jsonRequest({
			name: 'CreateIdentity',
			namespace: Namespace.Account,
			body: {
				identity: {
					...rest,
					_attrs: {
						...mapValues(attrs, coerceBooleanToString),
						zimbraPrefWhenSentToAddresses: convertStringAndArrayValues(
							get(attrs, 'zimbraPrefWhenSentToAddresses')
						),
						zimbraPrefWhenInFolderIds: convertStringAndArrayValues(
							get(attrs, 'zimbraPrefWhenInFolderIds')
						)
					}
				}
			},
			singleRequest: true
		}).then(res => {
			const mappedResult: any = mapValuesDeep(res, coerceStringToBoolean);
			const {
				_attrs: { zimbraPrefWhenSentToAddresses, zimbraPrefWhenInFolderIds, ...restAttr },
				...restIdentityProps
			} = get(mappedResult, 'identity.0');

			return {
				...mappedResult,
				identity: [
					{
						...restIdentityProps,
						_attrs: {
							...restAttr,
							...(zimbraPrefWhenSentToAddresses && {
								zimbraPrefWhenSentToAddresses: []
									.concat(zimbraPrefWhenSentToAddresses)
									.filter(Boolean)
							}),
							...(zimbraPrefWhenInFolderIds && {
								zimbraPrefWhenInFolderIds: [].concat(zimbraPrefWhenInFolderIds).filter(Boolean)
							})
						}
					}
				]
			};
		});

	public createMountpoint = (_options: CreateMountpointInput) =>
		this.jsonRequest({
			name: 'CreateMountpoint',
			body: denormalize(CreateMountpointRequest)(_options),
			singleRequest: true
		}).then(Boolean);

	public createSearchFolder = (_options: CreateSearchFolderOptions) => {
		const { parentFolderId, ...options } = _options;
		return this.jsonRequest({
			name: 'CreateSearchFolder',
			body: {
				search: {
					...options,
					l: parentFolderId
				}
			},
			singleRequest: true
		}).then(res => normalize(Folder)(res.search[0]));
	};

	public createSignature = (options: SignatureInput) =>
		this.jsonRequest({
			name: 'CreateSignature',
			namespace: Namespace.Account,
			body: denormalize(CreateSignatureRequest)(options)
		});

	public createTag = (tag: CreateTagInput) =>
		this.jsonRequest({
			name: 'CreateTag',
			body: {
				tag: {
					...tag
				}
			},
			singleRequest: true
		}).then(({ tag = [] }) => normalize(Tag)(tag[0]));

	public createTask = (task: CalendarItemInput) =>
		this.jsonRequest({
			name: 'CreateTask',
			body: {
				...denormalize(CalendarItemCreateModifyRequest)(task)
			},
			singleRequest: true
		}).then(Boolean);

	public declineCounterAppointment = (body: CounterAppointmentInput) =>
		this.jsonRequest({
			name: 'DeclineCounterAppointment',
			body: denormalize(CounterAppointmentInfo)(body),
			singleRequest: true
		}).then(Boolean);

	public deleteAppointment = (appointment: DeleteAppointmentInput) =>
		this.jsonRequest({
			name: 'CancelAppointment',
			body: denormalize(CalendarItemDeleteRequest)(appointment),
			singleRequest: true
		}).then(Boolean);

	public deleteExternalAccount = ({ id }: ExternalAccountDeleteInput) =>
		this.jsonRequest({
			name: 'DeleteDataSource',
			body: {
				dsrc: { id }
			},
			singleRequest: true
		}).then(Boolean);

	public deleteIdentity = (identity: DeleteIdentityInput) =>
		this.jsonRequest({
			name: 'DeleteIdentity',
			namespace: Namespace.Account,
			body: {
				identity
			},
			singleRequest: true
		}).then(Boolean);

	public deleteSignature = (options: SignatureInput) =>
		this.jsonRequest({
			name: 'DeleteSignature',
			namespace: Namespace.Account,
			body: options,
			singleRequest: true
		}).then(Boolean);

	public disableTwoFactorAuth = (method: string) =>
		this.jsonRequest({
			name: 'DisableTwoFactorAuth',
			namespace: Namespace.Account,
			body: {
				method: {
					_content: method
				}
			},
			singleRequest: true
		}).then(Boolean);

	public discoverRights = ({ right }: DiscoverRightOptions) =>
		this.jsonRequest({
			name: 'DiscoverRights',
			namespace: Namespace.Account,
			body: {
				right
			}
		}).then(res => normalize(DiscoverRightsResponse)(res));

	public dismissCalendarItem = (appointment: any, task: any) =>
		this.jsonRequest({
			name: 'DismissCalendarItemAlarm',
			body: {
				appt: appointment,
				task
			},
			singleRequest: true
		}).then(Boolean);

	public distributionListAction = ({ action, dl }: DistributionListActionInput) =>
		this.jsonRequest({
			name: 'DistributionListAction',
			body: {
				action: denormalize(DLActionEntity)(action),
				dl
			},
			namespace: Namespace.Account
		}).then(Boolean);

	public documentAction = (options: ActionOptions) =>
		this.documentActionResponse(ActionType.document, options);

	public documentActionResponse = (type: ActionType, options: ActionOptions) => {
		const { id, ...rest } = options;

		return this.jsonRequest({
			name: type,
			body: {
				action: {
					id: [id].join(','),
					...denormalize(ActionOptionsEntity)(rest)
				}
			},
			singleRequest: true
		}).then(normalize(DocumentActionData));
	};

	public downloadAttachment = ({ id, part }: any) =>
		this.download({
			url: `/service/home/~/?auth=co&id=${id}&part=${part}`
		}).then(({ content }: any) => ({
			id: `${id}_${part}`,
			content
		}));

	public downloadDocument = ({ id, url }: any) =>
		this.download({ url }).then(({ content }: any) => ({
			id: id,
			content
		}));

	public downloadMessage = ({ id, isSecure }: any) =>
		this.download({ isSecure, url: `/service/home/~/?auth=co&id=${id}` }).then(
			({ content }: any) => ({
				id,
				content,
				isSecure
			})
		);

	public enableTwoFactorAuth = ({
		name,
		email,
		method,
		password,
		authToken,
		twoFactorCode,
		csrfTokenSecured,
		ignoreSameSite
	}: EnableTwoFactorAuthInput) =>
		this.jsonRequest({
			name: 'EnableTwoFactorAuth',
			body: {
				name: {
					_content: name
				},
				...(email && {
					email: {
						_content: email
					}
				}),
				...(method && {
					method: {
						_content: method
					}
				}),
				...(password && {
					password: {
						_content: password
					}
				}),
				...(authToken && {
					authToken: {
						_content: authToken
					}
				}),
				...(twoFactorCode && {
					twoFactorCode: {
						_content: twoFactorCode
					}
				}),
				...(ignoreSameSite && { ignoreSameSite }),
				csrfTokenSecured
			},
			namespace: Namespace.Account,
			singleRequest: true
		});

	public endSessionBeaconRequest = (options: JsonRequestOptions) => {
		const body = {
			Body: {
				EndSessionRequest: {
					_jsns: Namespace.Account
				}
			},
			Header: {
				context: {
					_jsns: Namespace.All,
					csrfToken: this.csrfToken,
					account: {
						by: 'name',
						_content: options.accountName
					},
					session: {
						id: this.sessionId,
						_content: this.sessionId
					},
					userAgent: this.userAgent
				}
			}
		};

		try {
			const blob = new Blob([JSON.stringify(body)]);
			if (navigator) {
				// In zimbra desktop client navigator is null
				navigator.sendBeacon(`${this.origin}/service/soap`, blob);
			}
		} catch (e) {
			throw new Error('Error on endSessionBeaconRequest request' + e);
		}
	};

	public folderAction = (options: ActionOptions) => this.action(ActionType.folder, options);

	public forwardAppointment = (body: ForwardAppointmentInput) =>
		this.jsonRequest({
			name: 'ForwardAppointment',
			body: denormalize(ForwardAppointmentInfo)(body),
			singleRequest: true
		}).then(Boolean);

	public forwardAppointmentInvite = (body: ForwardAppointmentInviteInput) =>
		this.jsonRequest({
			name: 'ForwardAppointmentInvite',
			body: denormalize(ForwardAppointmentInviteInfo)(body),
			singleRequest: true
		}).then(Boolean);

	public freeBusy = ({ start, end, names }: FreeBusyOptions) =>
		this.jsonRequest({
			name: 'GetFreeBusy',
			body: {
				s: start,
				e: end,
				name: names.join(',')
			}
		}).then(res => normalize(FreeBusy)(res.usr));

	public generateScratchCodes = (username: String) =>
		this.jsonRequest({
			name: 'GenerateScratchCodes',
			namespace: Namespace.Account,
			body: {
				account: {
					by: 'name',
					_content: username
				}
			},
			singleRequest: true
		});

	public getAccountDistributionLists = (attrs: String, ownerOf: number) =>
		this.jsonRequest({
			name: 'GetAccountDistributionLists',
			body: {
				attrs,
				ownerOf
			},
			namespace: Namespace.Account
		}).then(res => ({ dls: res?.dl || [] }));

	public getAppointment = (options: AppointmentOptions) =>
		this.jsonRequest({
			name: 'GetAppointment',
			body: options
		}).then(res => normalize(GetAppointmentResponse)(res));

	public getAppSpecificPasswords = () =>
		this.jsonRequest({
			name: 'GetAppSpecificPasswords',
			namespace: Namespace.Account
		});

	public getAttachmentUrl = (attachment: any) =>
		getAttachmentUrl(attachment, {
			origin: this.origin,
			jwtToken: this.jwtToken
		});

	public getAvailableLocales = () =>
		this.jsonRequest({
			name: 'GetAvailableLocales',
			namespace: Namespace.Account
		}).then(res => res.locale);

	public getContact = ({ id, ids, ...rest }: GetContactOptions) =>
		this.jsonRequest({
			name: 'GetContacts',
			body: {
				cn: {
					id: id || (ids || []).join(',')
				},
				...rest
			}
		}).then(res => normalize(Contact)(normalizeOtherAttr(res.cn)));

	public getContactFrequency = (options: GetContactFrequencyOptions) =>
		this.jsonRequest({
			name: 'GetContactFrequency',
			body: options
		}).then(res => {
			res.data = res.data.map((item: any) => {
				item.by = item.spec[0].range;
				return item;
			});
			return res;
		});

	public getContactProfileImageUrl = (attachment: any) =>
		getContactProfileImageUrl(attachment, {
			origin: this.origin,
			jwtToken: this.jwtToken
		});

	public getConversation = (options: GetConversationOptions) =>
		this.jsonRequest({
			name: 'GetConv',
			body: {
				c: mapValues(options, coerceBooleanToInt)
			}
		}).then(res => {
			const conversation = this.normalizeConversation(res.c[0]);
			const c = normalize(Conversation)(conversation);
			c.messages = c.messages.map(this.normalizeMessage);
			return c;
		});

	public getCustomMetadata = ({ id, section }: GetCustomMetadataOptions) =>
		this.jsonRequest({
			name: 'GetCustomMetadata',
			body: {
				id,
				meta: {
					section
				}
			}
		}).then((res: any) => {
			//ensure _attrs is not undefined in each section to aid graphql reading/writing
			if (res.meta) {
				res.meta = res.meta.map((entry: any) => {
					if (!entry._attrs) {
						entry._attrs = {};
					}
					entry = normalizeCustomMetaDataAttrs(entry);
					return entry;
				});
			}
			return mapValuesDeep(res, coerceStringToBoolean);
		});

	public getDataSources = () =>
		this.jsonRequest({
			name: 'GetDataSources'
		}).then(res => mapValuesDeep(res, coerceStringToBoolean));

	public getDeviceStatus = () =>
		this.jsonRequest({
			name: 'GetDeviceStatus',
			namespace: Namespace.Sync
		}).then(res => get(res, 'device') || []);

	public getDistributionList = (dl: String, needOwners: Boolean, needRights: String, by: String) =>
		this.jsonRequest({
			name: 'GetDistributionList',
			body: {
				dl: {
					by,
					_content: dl
				},
				needOwners,
				needRights
			},
			namespace: Namespace.Account
		});

	public getDistributionListMembers = (limit: String, offset: String, dl: String) =>
		this.jsonRequest({
			name: 'GetDistributionListMembers',
			body: {
				dl: {
					_content: dl
				},
				limit,
				offset
			},
			namespace: Namespace.Account
		}).then(res => {
			if (res?.dlm) {
				return res;
			} else {
				const result = {
					dlGroupMember:
						res?.groupMembers?.length && res.groupMembers[0]?.groupMember
							? normalize(DlGroupMember)(res.groupMembers[0].groupMember)
							: []
				};
				return result;
			}
		});

	public getDocumentShareURL = (options: GetDocumentShareURLOptions) =>
		this.jsonRequest({
			name: 'GetDocumentShareURL',
			body: denormalize(GetDocumentShareURLEntity)(options),
			singleRequest: true
		}).then(res => normalize(GetDocumentShareURLResponseEntity)(res));

	public getFilterRules = () =>
		this.jsonRequest({
			name: 'GetFilterRules'
		}).then(res => normalize(Filter)(get(res, 'filterRules.0.filterRule') || []));

	public getFolder = (options: GetFolderOptions) => {
		return this.jsonRequest({
			name: 'GetFolder',
			body: denormalize(GetFolderRequestEntity)(options)
		}).then(res => {
			const foldersResponse = normalize(Folder)(res);
			const folders = get(foldersResponse, 'folders.0', {});

			if (folders.folders) {
				folders.folders = folders.folders.map(setUnreadDescendentFlag);

				folders.folders = folders.folders.map((currentFolder: any) => {
					if (currentFolder.linkedFolders) {
						currentFolder.linkedFolders = currentFolder.linkedFolders.map((linkFolder: any) => {
							const { absFolderPath, oname, folders } = linkFolder;

							if (oname && folders) {
								linkFolder.folders = updateAbsoluteFolderPath(oname, absFolderPath, folders);
							}
							return linkFolder;
						});
					}
					return currentFolder;
				});
			}
			if (folders.linkedFolders) {
				folders.linkedFolders = folders.linkedFolders.map(setUnreadDescendentFlag);
			}

			if (folders.linkedFolders) {
				folders.linkedFolders = folders.linkedFolders.map((folder: any) => {
					if (
						!folder.view ||
						folder.view === FolderView.Message ||
						folder.view === FolderView.Contact ||
						folder.view === FolderView.Document
					) {
						const { absFolderPath, oname, folders, ownerZimbraId, sharedItemId, linkedFolders } =
							folder;

						/** changed the id to zimbraId:sharedItemId, which is required while moving contact to shared folder and
						 *  server also returns this id in notfications. The original id is stored in userId.
						 */

						if (folder.view === FolderView.Contact) {
							(folder.userId = folder.id), (folder.id = `${ownerZimbraId}:${sharedItemId}`);
						}
						if (oname && folders) {
							folder.folders = updateAbsoluteFolderPath(oname, absFolderPath, folders);
						}
						if (linkedFolders) {
							folder.linkedFolders = updateAbsoluteFolderPath(oname, absFolderPath, linkedFolders);
						}
					}

					return folder;
				});
			}

			return foldersResponse;
		});
	};

	public getHAB = (habRootGroupId: string) =>
		this.jsonRequest({
			name: 'GetHAB',
			body: {
				habRootGroupId
			},
			namespace: Namespace.Account
		}).then(res => {
			const habGroups = get(res, 'ou.0');
			return {
				...habGroups,
				habGroups: [...updateGroupNameRecur(habGroups.habGroup)]
			};
		});

	public getIdentities = () =>
		this.jsonRequest({
			name: 'GetIdentities',
			namespace: Namespace.Account
		}).then(({ identity, ...restResult }: any) => {
			const updatedIdentity: any = identity.map(
				({
					_attrs: { zimbraPrefWhenInFolderIds, zimbraPrefWhenSentToAddresses, ...restAttrs },
					...restIdentity
				}: any) => ({
					...restIdentity,
					_attrs: {
						...restAttrs,
						// Doesn't required to be converted using `convertStringAndArrayValues` as
						// graphQL expects it to be an array
						zimbraPrefWhenInFolderIds: [].concat(zimbraPrefWhenInFolderIds).filter(Boolean),
						zimbraPrefWhenSentToAddresses: [].concat(zimbraPrefWhenSentToAddresses).filter(Boolean)
					}
				})
			);

			return mapValuesDeep(
				{
					...restResult,
					identity: updatedIdentity
				},
				coerceStringToBoolean
			);
		});

	public getImportStatus = () =>
		this.jsonRequest({
			name: 'GetImportStatus'
		});

	public getMailboxMetadata = ({ section }: GetMailboxMetadataOptions) =>
		this.jsonRequest({
			name: 'GetMailboxMetadata',
			body: {
				meta: {
					section
				}
			}
		}).then((res: any) => {
			//ensure _attrs is not undefined in each section to aid graphql reading/writing
			res.meta = res.meta.map((entry: any) => {
				if (!entry._attrs) entry._attrs = {};
				return entry;
			});
			return mapValuesDeep(res, coerceStringToBoolean);
		});

	public getMessage = ({ id, html, raw, header, read, max, ridZ, part }: GetMessageOptions) =>
		this.jsonRequest({
			name: 'GetMsg',
			body: {
				m: {
					id,
					html: html !== false && raw !== true ? 1 : 0,
					header,
					read: read === true ? 1 : undefined,
					// expand available expansions
					needExp: 1,
					neuter: 0,
					// max body length (look for mp.truncated=1)
					...(max && { max: max }),
					raw: raw ? 1 : 0,
					...(ridZ && { ridZ: ridZ }),
					...(part && { part: part })
				}
			}
		}).then(res => (res && res.m ? this.normalizeMessage(res.m[0]) : null));

	/**
	 * Invokes GetMsgMetadataRequest and fetches the metadata of the messages with specified ids
	 * This api should be used when backend returns all the data necessary to download the
	 * metadata of the messages that are dragged and dropped to local folders by user.
	 * @param {GetMessageOptions} {ids: Array<String>} the ids of the messages to be downloaded
	 *
	 * @memberof ZimbraBatchClient
	 */
	public getMessagesMetadata = ({ ids }: GetMessageOptions) =>
		this.jsonRequest({
			name: 'GetMsgMetadata',
			body: {
				m: {
					ids: ids.join(',')
				}
			}
		}).then(res => res.m.map(this.normalizeMessage));

	public getPreferences = () =>
		this.jsonRequest({
			name: 'GetPrefs',
			namespace: Namespace.Account
		}).then(res => {
			let prefs: any = mapValuesDeep(res._attrs, coerceStringToBoolean);

			for (const pref in prefs) {
				if (CASTING_PREFS.indexOf(pref) !== -1) {
					prefs[pref] = typeof prefs[pref] === 'string' ? castArray(prefs[pref]) : prefs[pref];
				}
			}
			return prefs;
		});

	public getProfileImageUrl = (profileImageId: any) =>
		getProfileImageUrl(profileImageId, {
			origin: this.origin,
			jwtToken: this.jwtToken
		});

	public getRights = (options: GetRightsInput) =>
		this.jsonRequest({
			name: 'GetRights',
			namespace: Namespace.Account,
			body: denormalize(GetRightsRequest)(options)
		}).then(normalize(AccountRights));

	public getScratchCodes = (username: String) =>
		this.jsonRequest({
			name: 'GetScratchCodes',
			namespace: Namespace.Account,
			body: {
				account: {
					by: 'name',
					_content: username
				}
			}
		});

	public getSearchFolder = () =>
		this.jsonRequest({
			name: 'GetSearchFolder'
		}).then((res: any) => (res.search ? { folders: normalize(Folder)(res.search) } : {}));

	public getSignatures = () =>
		this.jsonRequest({
			name: 'GetSignatures',
			namespace: Namespace.Account
		}).then(res => mapValuesDeep(res, coerceStringToBoolean));

	public getSMimeCertInfo = () =>
		this.jsonRequest({
			name: 'GetSmimeCertificateInfo',
			namespace: Namespace.Account
		}).then(certificate => normalize(SmimeCertInfoResponse)(certificate || {}));

	public getSMimePublicCerts = (options: GetSMimePublicCertsOptions) =>
		this.jsonRequest({
			name: 'GetSMIMEPublicCerts',
			body: {
				store: {
					_content: options.store
				},
				email: {
					_content: options.contactAddr
				}
			},
			namespace: Namespace.Account
		});

	public getTag = () =>
		this.jsonRequest({
			name: 'GetTag',
			namespace: Namespace.Mail
		}).then(({ tag = [] }) => tag.map(normalize(Tag)));

	public getTasks = (options: SearchOptions) =>
		this.jsonRequest({
			name: 'Search',
			body: {
				...options
			}
		}).then(res => {
			if (res.cn) {
				res.cn = normalizeOtherAttr(res.cn);
			}

			const normalized = normalize(SearchResponse)(res);

			return {
				...normalized,
				tasks: normalized.task ? normalized.task.map(normalize(CalendarItemHitInfo)) : []
			};
		});

	public getTrustedDevices = () =>
		this.jsonRequest({
			name: 'GetTrustedDevices',
			namespace: Namespace.Account
		});

	public getWhiteBlackList = () =>
		this.jsonRequest({
			name: 'GetWhiteBlackList',
			namespace: Namespace.Account
		});

	public getWorkingHours = ({ start, end, names }: WorkingHoursOptions) =>
		this.jsonRequest({
			name: 'GetWorkingHours',
			body: {
				name: names.join(','),
				...denormalize(FreeBusyInstance)({ start, end })
			}
		}).then(res => normalize(FreeBusy)(res.usr));

	public grantRights = (body: GrantRightsInput) =>
		this.jsonRequest({
			name: 'GrantRights',
			namespace: Namespace.Account,
			body: denormalize(AccountRights)(body)
		}).then(normalize(AccountRights));

	public importExternalAccount = ({ accountType, id }: ExternalAccountImportInput) =>
		this.jsonRequest({
			name: 'ImportData',
			body: {
				[<string>accountType]: {
					id
				}
			}
		}).then(Boolean);

	public itemAction = (options: ActionOptions) => this.action(ActionType.item, options);

	public jsonRequest = (options: JsonRequestOptions) =>
		// If account name is present that means we will not be able to batch requests
		this[options.singleRequest ? 'dataLoader' : 'batchDataLoader'].load(options);

	public listDocumentRevisions = ({ id, version, count }: any) =>
		this.jsonRequest({
			name: 'ListDocumentRevisions',
			namespace: Namespace.Mail,
			body: {
				doc: {
					id,
					ver: version,
					count
				}
			}
		}).then(response => {
			const data = normalize(ListDocumentRevisions)(response);
			const versionIds = data.documents.map((doc: any) => doc.version);
			const maxVersion = Math.max(...versionIds);
			const latestDocumentVersion = data.documents.find((doc: any) => doc.version === maxVersion);
			const versionDocuments = data.documents.map((versionDoc: any) => ({
				...versionDoc,
				name: latestDocumentVersion.name
			}));

			return {
				...latestDocumentVersion,
				docs: versionDocuments
			};
		});

	public login = ({
		username,
		password,
		recoveryCode,
		tokenType,
		persistAuthTokenCookie,
		twoFactorCode,
		deviceTrusted,
		csrfTokenSecured,
		ignoreSameSite
	}: LoginOptions) =>
		this.jsonRequest({
			name: 'Auth',
			singleRequest: true,
			body: {
				tokenType,
				csrfTokenSecured,
				persistAuthTokenCookie,
				account: {
					by: 'name',
					_content: username
				},
				...(ignoreSameSite && { ignoreSameSite }),
				...(password && { password }),
				...(recoveryCode && {
					recoveryCode: {
						verifyAccount: true,
						_content: recoveryCode
					}
				}),
				...(twoFactorCode && { twoFactorCode }),
				...(deviceTrusted && { deviceTrusted })
			},
			namespace: Namespace.Account
		}).then(res => {
			const zimbraTwoFactorAuthMethodAllowed = (
				res?.zimbraTwoFactorAuthMethodAllowed?.method || []
			).map((m: any) => m._content);
			const zimbraTwoFactorAuthMethodEnabled = (
				res?.zimbraTwoFactorAuthMethodEnabled?.method || []
			).map((m: any) => m._content);
			return {
				...mapValuesDeep(res, coerceStringToBoolean),
				...(zimbraTwoFactorAuthMethodAllowed && { zimbraTwoFactorAuthMethodAllowed }),
				...(zimbraTwoFactorAuthMethodEnabled && { zimbraTwoFactorAuthMethodEnabled })
			};
		});

	public logout = () =>
		this.jsonRequest({
			name: 'EndSession',
			body: {
				logoff: true
			},
			namespace: Namespace.Account
		}).then(Boolean);

	public messageAction = (options: ActionOptions) => this.action(ActionType.message, options);

	public modifyAppointment = (accountName: string, appointment: CalendarItemInput) =>
		this.jsonRequest({
			name: 'ModifyAppointment',
			body: {
				...denormalize(CalendarItemCreateModifyRequest)(appointment)
			},
			accountName,
			singleRequest: true
		}).then(res => normalize(CalendarItemCreateModifyRequest)(res));

	public modifyContact = (data: ModifyContactInput) =>
		this.jsonRequest({
			name: 'ModifyContact',
			body: createContactBody(data, this.localStoreClient !== undefined),
			singleRequest: true
		}).then(res => normalize(Contact)(normalizeOtherAttr(res.cn)[0]));

	public modifyExternalAccount = ({ id, type: accountType, attrs }: ExternalAccountModifyInput) =>
		this.jsonRequest({
			name: 'ModifyDataSource',
			body: {
				[<string>accountType]: {
					id,
					...mapValuesDeep(attrs, coerceBooleanToString)
				}
			},
			singleRequest: true
		}).then(Boolean);

	public modifyFilterRules = (filters: Array<FilterInput>) =>
		this.jsonRequest({
			name: 'ModifyFilterRules',
			body: {
				filterRules: [
					{
						filterRule: denormalize(Filter)(filters)
					}
				]
			},
			singleRequest: true
		}).then(Boolean);

	public modifyIdentity = ({ attrs, ...rest }: ModifyIdentityInput) =>
		this.jsonRequest({
			name: 'ModifyIdentity',
			namespace: Namespace.Account,
			body: {
				identity: {
					...rest,
					_attrs: {
						...mapValues(attrs, coerceBooleanToString),
						zimbraPrefWhenSentToAddresses: convertStringAndArrayValues(
							get(attrs, 'zimbraPrefWhenSentToAddresses')
						),
						zimbraPrefWhenInFolderIds: convertStringAndArrayValues(
							get(attrs, 'zimbraPrefWhenInFolderIds')
						)
					}
				}
			},
			singleRequest: true
		});

	public modifyPrefs = (prefs: PreferencesInput) => {
		let attrs: any = mapValuesDeep(prefs, coerceBooleanToString);

		for (const pref in attrs) {
			if (CASTING_PREFS.indexOf(pref) !== -1) {
				attrs[pref] = attrs[pref] instanceof Array && attrs[pref].length === 0 ? '' : attrs[pref];
			}
		}

		return this.jsonRequest({
			name: 'ModifyPrefs',
			namespace: Namespace.Account,
			body: {
				_attrs: attrs
			},
			singleRequest: true
		}).then(Boolean);
	};

	public modifyProfileImage = ({ content, contentType }: ModifyProfileImageOptions) => {
		return this.jsonRequest({
			name: 'ModifyProfileImage',
			body: {
				_content: content
			},
			singleRequest: true,
			headers: {
				'Content-Type': contentType && contentType
			}
		});
	};

	public modifyProps = (props: any) =>
		this.jsonRequest({
			name: 'ModifyProperties',
			namespace: Namespace.Account,
			body: {
				prop: mapValuesDeep(props, coerceBooleanToString)
			},
			singleRequest: true
		}).then(Boolean);

	public modifySearchFolder = (options: SearchFolderInput) =>
		this.jsonRequest({
			name: 'ModifySearchFolder',
			body: options,
			singleRequest: true
		}).then(Boolean);

	public modifySignature = (options: SignatureInput) =>
		this.jsonRequest({
			name: 'ModifySignature',
			namespace: Namespace.Account,
			body: denormalize(CreateSignatureRequest)(options),
			singleRequest: true
		}).then(Boolean);

	public modifyTask = (task: CalendarItemInput) =>
		this.jsonRequest({
			name: 'ModifyTask',
			body: {
				...denormalize(CalendarItemCreateModifyRequest)(task)
			},
			singleRequest: true
		}).then(Boolean);

	public modifyWhiteBlackList = (whiteBlackList: WhiteBlackListInput) =>
		this.jsonRequest({
			name: 'ModifyWhiteBlackList',
			namespace: Namespace.Account,
			body: {
				...whiteBlackList
			},
			singleRequest: true
		}).then(Boolean);

	public modifyZimletPrefs = (zimlet: Array<ZimletPreferenceInput>) =>
		this.jsonRequest({
			name: 'ModifyZimletPrefs',
			namespace: Namespace.Account,
			body: {
				zimlet
			},
			singleRequest: true
		});

	public noop = ({ wait, limitToOneBlocked }: NoOpOptions, fetchOptions: any) =>
		this.jsonRequest({
			name: 'NoOp',
			body: {
				wait,
				limitToOneBlocked
			},
			singleRequest: true,
			fetchOptions
		}).then(resp => resp);

	public purgeRevision = ({ id, ver, includeOlderRevisions }: any) =>
		this.jsonRequest({
			name: 'PurgeRevision',
			namespace: Namespace.Mail,
			body: {
				revision: {
					id,
					ver,
					includeOlderRevisions
				}
			},
			singleRequest: true
		}).then(Boolean);

	public quarantineDeviceSync = (deviceId: String) =>
		this.jsonRequest({
			name: 'QuarantineDevice',
			namespace: Namespace.Sync,
			body: {
				device: {
					id: deviceId
				}
			}
		});

	public recoverAccount = ({ channel, email, op }: RecoverAccountOptions) =>
		this.jsonRequest({
			name: 'RecoverAccount',
			body: {
				channel,
				email,
				op
			}
		});

	public relatedContacts = ({ email }: RelatedContactsOptions) =>
		this.jsonRequest({
			name: 'GetRelatedContacts',
			body: {
				targetContact: {
					cn: email
				}
			}
		}).then(resp => resp.relatedContacts.relatedContact);

	public remoteWipeSync = (deviceId: String) =>
		this.jsonRequest({
			name: 'RemoteWipe',
			namespace: Namespace.Sync,
			body: {
				device: {
					id: deviceId
				}
			}
		});

	public removeDeviceSync = (deviceId: String) =>
		this.jsonRequest({
			name: 'RemoveDevice',
			namespace: Namespace.Sync,
			body: {
				device: {
					id: deviceId
				}
			}
		});

	public resetPassword = ({
		password,
		dryRun,
		getPasswordRules,
		cancelResetPassword
	}: ResetPasswordOptions) =>
		this.jsonRequest({
			name: 'ResetPassword',
			namespace: Namespace.Account,
			body: {
				password,
				dryRun,
				getPasswordRules,
				cancelResetPassword
			},
			singleRequest: true
		}).then(res => mapValuesDeep(res, coerceStringToBoolean));

	public resolve = (path: string) => `${this.origin}${path}`;

	public revokeAppSpecificPassword = (appName: string) =>
		this.jsonRequest({
			name: 'RevokeAppSpecificPassword',
			namespace: Namespace.Account,
			body: {
				appName
			},
			singleRequest: true
		}).then(Boolean);

	public revokeOtherTrustedDevices = () =>
		this.jsonRequest({
			name: 'RevokeOtherTrustedDevices',
			namespace: Namespace.Account,
			singleRequest: true
		}).then(Boolean);

	public revokeRights = (body: RevokeRightsInput) =>
		this.jsonRequest({
			name: 'RevokeRights',
			namespace: Namespace.Account,
			body: denormalize(AccountRights)(body),
			singleRequest: true
		}).then(normalize(AccountRights));

	public revokeTrustedDevice = () =>
		this.jsonRequest({
			name: 'RevokeTrustedDevice',
			namespace: Namespace.Account,
			singleRequest: true
		}).then(Boolean);

	public saveDocument = (document: SaveDocumentInput) =>
		this.jsonRequest({
			name: 'SaveDocument',
			body: denormalize(SaveDocuments)(document),
			singleRequest: true
		}).then(({ doc }) => ({
			document: doc.map((d: any) => normalize(SaveDocument)(d))
		}));

	public saveDraft = (message: SendMessageInput, accountName: string) =>
		this.jsonRequest({
			name: 'SaveDraft',
			body: denormalize(SendMessageInfo)({ message }),
			singleRequest: true,
			accountName
		}).then(({ m: messages }) => ({
			message: messages && messages.map(this.normalizeMessage)
		}));

	public saveSMimeCert = (upload: SaveSMimeCertInputUpload, password: string) =>
		this.jsonRequest({
			name: 'SaveSmimeCertificate',
			body: {
				upload,
				password
			},
			namespace: Namespace.Account
		}).then(certificate => normalize(SmimeCertInfoResponse)(certificate || {}));

	public search = (options: SearchOptions) =>
		this.jsonRequest({
			name: 'Search',
			body: {
				...options
			}
		}).then(res => {
			if (res.cn) {
				res.cn = normalizeOtherAttr(res.cn);
			}
			const normalized = normalize(SearchResponse)(res);
			if (normalized.conversations) {
				normalized.conversations = normalized.conversations.map(this.normalizeConversation);
			}
			if (normalized.messages) {
				normalized.messages = normalized.messages.map(this.normalizeMessage);
			}
			return normalized;
		});

	public searchCalendarResources = (options: SearchCalendarResourcesOptions) =>
		this.jsonRequest({
			name: 'SearchCalendarResources',
			body: options,
			namespace: Namespace.Account
		}).then(normalize(SearchCalendarResourcesResponse));

	public searchGal = (options: SearchOptions) =>
		this.jsonRequest({
			name: 'SearchGal',
			body: options,
			namespace: Namespace.Account
		}).then(res => {
			if (res.cn) {
				res.cn = normalizeOtherAttr(res.cn);
			}
			return normalize(SearchResponse)(res);
		});

	public sendDeliveryReport = (messageId: string) =>
		this.jsonRequest({
			name: 'SendDeliveryReport',
			body: {
				mid: messageId
			},
			singleRequest: true
		}).then(Boolean);

	public sendInviteReply = (requestOptions: InviteReplyInput) =>
		this.jsonRequest({
			name: 'SendInviteReply',
			body: {
				...denormalize(InviteReply)(requestOptions)
			},
			singleRequest: true
		}).then(res => normalize(CalendarItemHitInfo)(res));

	public sendMessage = (
		message: SendMessageInput,
		accountName: string,
		sign: Boolean,
		encrypt: Boolean
	) =>
		this.jsonRequest({
			name: !(sign || encrypt) ? 'SendMsg' : 'SendSecureMsg',
			body: {
				...denormalize(SendMessageInfo)({ message }),
				...(sign && { sign: true }),
				...(encrypt && { encrypt: true })
			},
			singleRequest: true,
			accountName: accountName
		}).then(normalize(SendMessageInfo));

	public sendShareNotification = (body: ShareNotificationInput) =>
		this.jsonRequest({
			name: 'SendShareNotification',
			body: {
				...denormalize(ShareNotification)(body)
			},
			singleRequest: true
		}).then(Boolean);

	public sendTwoFactorAuthCode = ({ action, authToken }: SendTwoFactorAuthCodeInput) => {
		return this.jsonRequest({
			name: 'SendTwoFactorAuthCode',
			namespace: Namespace.Account,
			body: {
				action: {
					_content: action
				},
				authToken: {
					_content: authToken
				}
			},
			singleRequest: true
		});
	};

	public setCsrfToken = (csrfToken: string) => {
		this.csrfToken = csrfToken;
	};

	public setCustomMetadata = (variables: any) =>
		this.jsonRequest({
			name: 'SetCustomMetadata',
			body: setCustomMetaDataBody(variables.customMetaData)
		}).then(Boolean);

	public setJwtToken = (jwtToken: string) => {
		this.jwtToken = jwtToken;
	};

	public setRecoveryAccount = (options: SetRecoveryAccountOptions) =>
		this.jsonRequest({
			name: 'SetRecoveryAccount',
			body: options,
			singleRequest: true
		}).then(Boolean);

	public setUserAgent = (userAgent: Object) => {
		this.userAgent = userAgent;
	};

	public shareInfo = (options: ShareInfoOptions) =>
		this.jsonRequest({
			name: 'GetShareInfo',
			body: {
				...options,
				_jsns: 'urn:zimbraAccount'
			}
		}).then(res => res.share);

	public snoozeCalendarItem = (appointment: any, task: any) =>
		this.jsonRequest({
			name: 'SnoozeCalendarItemAlarm',
			body: {
				appt: appointment,
				task
			},
			singleRequest: true
		}).then(Boolean);

	public subscribeDistributionList = (op: String, by: String, dl: String) =>
		this.jsonRequest({
			name: 'SubscribeDistributionList',
			body: {
				dl: {
					by,
					_content: dl
				},
				op
			},
			namespace: Namespace.Account
		}).then(res => res.status || '');

	public taskFolders = () =>
		this.jsonRequest({
			name: 'GetFolder',
			body: {
				view: FolderView.Task,
				tr: true
			}
		}).then(res => normalize(Folder)(res.folder[0].folder));

	public testExternalAccount = ({ accountType, ...accountInfo }: ExternalAccountTestInput) =>
		this.jsonRequest({
			name: 'TestDataSource',
			body: {
				[<string>accountType]: mapValuesDeep(accountInfo, coerceBooleanToString)
			},
			singleRequest: true
		}).then(res => mapValuesDeep(get(res, `${accountType}.0`), coerceStringToBoolean));

	public uploadMessage = (message: string): any => {
		const contentDisposition = 'attachment';
		const filename = 'message.eml';
		const contentType = 'message/rfc822';

		return (this.customFetch || fetch)(`${this.origin}/service/upload?fmt=raw`, {
			method: 'POST',
			body: message,
			headers: {
				'Content-Disposition': `${contentDisposition}; filename="${filename}"`,
				'Content-Type': contentType,
				...(this.authToken && {
					Cookie: `ZM_AUTH_TOKEN=${this.authToken}`
				}),
				...(this.csrfToken && {
					'X-Zimbra-Csrf-Token': this.csrfToken
				})
			},
			credentials: 'include'
		}).then((response: any) => {
			if (response.ok) {
				return response.text().then((result: any) => {
					if (!result) {
						return null;
					}

					// To parser server response like => 200,'null','d93a252a-603e-4675-9e39-95cebe5a9332:b39a4b7c-9232-4228-9269-aa375bc1df67'
					const [, status = '', err = undefined, aid = ''] =
						result.match(/^([^,]+),([^,]+),'(.*)'/) || [];

					if (err && err !== `'null'`) {
						return null;
					}

					if (+status === 200) {
						return aid;
					}
				});
			}
		});
	};

	private batchDataHandler = (requests: ReadonlyArray<RequestOptions>) =>
		batchJsonRequest({
			requests,
			...this.getAdditionalRequestOptions()
		}).then(response => {
			const sessionId = get(response, 'header.context.session.id');
			const notifications = get(response, 'header.context.notify.0');
			const refresh = get(response, 'header.context.refresh');

			this.checkAndUpdateSessionId(sessionId);

			if (this.notifier) {
				if (notifications) {
					this.notifier.handleNotifications(notifications);
				}

				if (refresh) {
					this.notifier.handleRefresh(refresh);
				}
			}

			return response.requests.map((r, i) => {
				if (DEBUG) {
					console.log(`[Batch Client Request] ${requests[i].name}`, requests[i].body, r);
				}
				return isError(r) ? r : r.body;
			});
		});

	private checkAndUpdateSessionId = (sessionId: any) => {
		// Need to save session id in apollo cache for user session management zimlet to stop duplication of sessions data.
		if (sessionId && this.sessionId !== sessionId) {
			this.sessionHandler && this.sessionHandler.writeSessionId(sessionId);
			this.sessionId = sessionId;
		}
	};

	private dataHandler = (requests: ReadonlyArray<JsonRequestOptions>) =>
		jsonRequest({
			...requests[0],
			// check if login request then don't add csrfToken
			...this.getAdditionalRequestOptions(requests[0].name !== 'Auth')
		}).then(response => {
			const sessionId = get(response, 'header.context.session.id');
			const notifications = get(response, 'header.context.notify.0');
			const refresh = get(response, 'header.context.refresh');

			this.checkAndUpdateSessionId(sessionId);

			if (this.notifier) {
				if (notifications) {
					this.notifier.handleNotifications(notifications);
				}

				if (refresh) {
					this.notifier.handleRefresh(refresh);
				}
			}

			return isError(response) ? [response] : [response.body];
		});

	private download = ({ isSecure, url }: any) =>
		fetch(`${this.origin}${url}`, {
			headers: {
				...(isSecure && { 'X-Zimbra-Encoding': 'x-base64' }),
				...(this.csrfToken && {
					'X-Zimbra-Csrf-Token': this.csrfToken
				})
			},
			credentials: 'include'
		}).then(response => {
			if (response.ok) {
				return response.text().then(content => {
					if (!content) {
						return undefined;
					}

					return {
						content
					};
				});
			}
		});

	/**
	 * These options are included on every request.
	 */
	private getAdditionalRequestOptions = (addCsrfToken: Boolean = true) => ({
		jwtToken: this.jwtToken,
		...(addCsrfToken && {
			csrfToken: this.csrfToken
		}),
		...(this.authToken && {
			authToken: this.authToken
		}),
		sessionId: this.sessionId || (this.sessionHandler && this.sessionHandler.readSessionId()),
		origin: this.origin,
		userAgent: this.userAgent,
		...(typeof this.notifier.getSequenceNumber() !== 'undefined' && {
			sessionSeq: this.notifier.getSequenceNumber()
		})
	});

	private normalizeConversation = (conversation: { [key: string]: any }) => {
		if (conversation?.meta) {
			conversation.meta = conversation.meta.map((entry: any) => {
				if (!entry._attrs) {
					entry._attrs = {};
				}
				entry = normalizeCustomMetaDataAttrs(entry);
				return entry;
			});
		}

		return conversation;
	};

	private normalizeMessage = (message: any) =>
		normalizeMessage(message, {
			origin: this.origin,
			jwtToken: this.jwtToken,
			isDesktop: this.localStoreClient
		});
}
