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
	CreateAppSpecificPasswordResponse,
	CreateMountpointRequest,
	CreateSignatureRequest,
	DiscoverRightsResponse,
	Filter,
	Folder,
	ForwardAppointmentInfo,
	ForwardAppointmentInviteInfo,
	FreeBusy,
	FreeBusyInstance,
	GetFolderRequest as GetFolderRequestEntity,
	GetRightsRequest,
	InviteReply,
	MessageInfo,
	SearchResponse,
	SendMessageInfo,
	ShareNotification,
	Tag
} from '../normalize/entities';
import {
	batchJsonRequest,
	DEFAULT_HOSTNAME,
	DEFAULT_SOAP_PATHNAME,
	jsonRequest
} from '../request';
import {
	JsonRequestOptions,
	Namespace,
	RequestBody,
	RequestOptions
} from '../request/types';
import {
	AddMsgInput,
	CalendarItemInput,
	ClientInfoInput,
	CreateContactInput,
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
	SearchFolderInput,
	SendMessageInput,
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
import { normalizeEmailAddresses } from '../utils/normalize-email-addresses';
import {
	getAttachmentUrl,
	getContactProfileImageUrl,
	getProfileImageUrl,
	normalizeMimeParts
} from '../utils/normalize-mime-parts';
import {
	createContactBody,
	normalizeOtherAttr
} from '../utils/normalize-otherAttribute-contact';
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
	NotificationHandler,
	RecoverAccountOptions,
	RelatedContactsOptions,
	ResetPasswordOptions,
	SearchOptions,
	SessionHandler,
	SetRecoveryAccountOptions,
	ShareInfoOptions,
	WorkingHoursOptions,
	ZimbraClientOptions
} from './types';

const DEBUG = false;

function normalizeMessage(
	message: { [key: string]: any },
	{ origin, jwtToken }: { jwtToken?: string; origin?: string }
) {
	const normalizedMessage = normalize(MessageInfo)(message);
	normalizedMessage.attributes =
		normalizedMessage.attributes &&
		mapValuesDeep(normalizedMessage.attributes, coerceStringToBoolean);

	return normalizeEmailAddresses(
		normalizeMimeParts(normalizedMessage, { origin, jwtToken })
	);
}

/**
 * This function is required because the API returns Subfolder data for shared folder
 * with Actual folder path (not mounted folder path). This could lead to 404 "NO SUCH FOLDER EXISTS ERROR".
 */
function updateAbsoluteFolderPath(
	originalName: any,
	parentFolderAbsPath: string,
	folders: any
) {
	return folders.map((folder: any) => {
		// When the entire mailbox is shared with another user, in that case, the originalName would
		// have the value as "USER_ROOT", for that instance we need to append the value to the absFolderPath
		// of the current folder and all children
		if (originalName === 'USER_ROOT') {
			folder.absFolderPath = `${parentFolderAbsPath}${folder.absFolderPath}`;
		} else {
			folder.absFolderPath = folder.absFolderPath.replace(
				`/${originalName}`,
				parentFolderAbsPath
			);
		}

		if (folder.folders) {
			folder.folders = updateAbsoluteFolderPath(
				originalName,
				parentFolderAbsPath,
				folder.folders
			);
		}

		return folder;
	});
}

export class ZimbraBatchClient {
	public origin: string;
	public sessionId: any;
	public soapPathname: string;
	private batchDataLoader: DataLoader<RequestOptions, RequestBody>;
	private csrfToken?: string;
	private dataLoader: DataLoader<RequestOptions, RequestBody>;
	private jwtToken?: string;
	private notificationHandler?: NotificationHandler;
	private sessionHandler?: SessionHandler;
	private userAgent?: {};

	constructor(options: ZimbraClientOptions = {}) {
		this.sessionHandler = options.sessionHandler;
		this.userAgent = options.userAgent;
		this.jwtToken = options.jwtToken;
		this.csrfToken = options.csrfToken;
		this.origin =
			options.zimbraOrigin !== undefined
				? options.zimbraOrigin
				: DEFAULT_HOSTNAME;
		this.soapPathname = options.soapPathname || DEFAULT_SOAP_PATHNAME;
		this.notificationHandler = options.notificationHandler;

		// Used for sending batch requests
		this.batchDataLoader = new DataLoader(this.batchDataHandler, {
			cache: false
		});

		// Used for sending individual requests
		this.dataLoader = new DataLoader(this.dataHandler, {
			batch: false,
			cache: false
		});
	}

	public accountInfo = () =>
		this.jsonRequest({
			name: 'GetInfo',
			namespace: Namespace.Account,
			body: {
				sections: 'mbox,attrs,zimlets,props'
			}
		}).then(res => ({
			...res,
			attrs: {
				...mapValuesDeep(res.attrs._attrs, coerceStringToBoolean),
				zimbraMailAlias: [].concat(get(res, 'attrs._attrs.zimbraMailAlias'))
			},
			...(get(res, 'license.attr') && {
				license: {
					status: res.license.status,
					attr: mapValuesDeep(res.license.attr, coerceStringToBoolean)
				}
			})
		}));

	public action = (type: ActionType, options: ActionOptions) => {
		const { ids, id, ...rest } = options;

		return this.jsonRequest({
			name: type,
			body: {
				action: {
					id: id || (ids || []).join(','),
					...denormalize(ActionOptionsEntity)(rest)
				}
			},
			singleRequest: true
		}).then(Boolean);
	};

	public addExternalAccount = ({
		accountType,
		...accountInfo
	}: ExternalAccountAddInput) =>
		this.jsonRequest({
			name: 'CreateDataSource',
			body: {
				[<string>accountType]: mapValuesDeep(accountInfo, coerceBooleanToString)
			},
			singleRequest: true
		}).then(res => get(res, `${accountType}.0.id`));

	public addMessage = (options: AddMsgInput) => {
		const { folderId, content, meta } = get(options, 'message');
		let flags, tags, tagNames, date;

		try {
			({ flags, tags, tagNames, date } = JSON.parse(meta));
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
		username
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
				password: loginNewPassword
			},
			singleRequest: true
		});

	public checkCalendar = ({ id, value }: FolderActionCheckCalendarInput) =>
		this.action(ActionType.folder, {
			id,
			op: value ? 'check' : '!check'
		});

	public clientInfo = ({ domain }: ClientInfoInput) =>
		this.jsonRequest({
			name: 'ClientInfo',
			body: {
				domain: [
					{
						by: 'name',
						_content: domain
					}
				]
			},
			singleRequest: true,
			namespace: Namespace.Account
		}).then(res => normalize(ClientInfoResponse)(res));

	public contactAction = (options: ActionOptions) =>
		this.action(ActionType.contact, options);

	public conversationAction = (options: ActionOptions) =>
		this.action(ActionType.conversation, options);

	public createAppointment = (
		accountName: string,
		appointment: CalendarItemInput
	) =>
		this.jsonRequest({
			name: 'CreateAppointment',
			body: {
				...denormalize(CalendarItemCreateModifyRequest)(appointment)
			},
			accountName,
			singleRequest: true
		}).then(Boolean);

	public createAppointmentException = (
		accountName: string,
		appointment: CalendarItemInput
	) =>
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
			body: createContactBody(data),
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
			body: denormalize(CreateSignatureRequest)(options),
			singleRequest: true
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

	public deleteSignature = (options: SignatureInput) =>
		this.jsonRequest({
			name: 'DeleteSignature',
			namespace: Namespace.Account,
			body: options,
			singleRequest: true
		}).then(Boolean);

	public disableTwoFactorAuth = () =>
		this.jsonRequest({
			name: 'DisableTwoFactorAuth',
			namespace: Namespace.Account,
			singleRequest: true
		}).then(Boolean);

	public discoverRights = () =>
		this.jsonRequest({
			name: 'DiscoverRights',
			namespace: Namespace.Account,
			body: {
				right: [
					{
						_content: 'sendAs'
					},
					{
						_content: 'sendOnBehalfOf'
					}
				]
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

	public downloadAttachment = ({ id, part }: any) =>
		this.download({ id, part }).then(({ id, part, content }: any) => ({
			id: `${id}_${part}`,
			content
		}));

	public downloadMessage = ({ id, isSecure }: any) =>
		this.download({ id, isSecure }).then(({ id, content }: any) => ({
			id,
			content
		}));

	public enableTwoFactorAuth = ({
		name,
		password,
		authToken,
		twoFactorCode,
		csrfTokenSecured
	}: EnableTwoFactorAuthInput) =>
		this.jsonRequest({
			name: 'EnableTwoFactorAuth',
			body: {
				name: {
					_content: name
				},
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
				csrfTokenSecured
			},
			namespace: Namespace.Account,
			singleRequest: true
		});

	public folderAction = (options: ActionOptions) =>
		this.action(ActionType.folder, options);

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
		}).then(res => res.cn.map((contact: any) => normalize(Contact)(contact)));

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
			const c = normalize(Conversation)(res.c[0]);
			c.messages = c.messages.map(this.normalizeMessage);
			return c;
		});

	public getDataSources = () =>
		this.jsonRequest({
			name: 'GetDataSources'
		}).then(res => mapValuesDeep(res, coerceStringToBoolean));

	public getFilterRules = () =>
		this.jsonRequest({
			name: 'GetFilterRules'
		}).then(res =>
			normalize(Filter)(get(res, 'filterRules.0.filterRule') || [])
		);

	public getFolder = (options: GetFolderOptions) => {
		return this.jsonRequest({
			name: 'GetFolder',
			body: denormalize(GetFolderRequestEntity)(options)
		}).then(res => {
			const foldersResponse = normalize(Folder)(res);
			const folders = get(foldersResponse, 'folders.0', {});

			if (folders.linkedFolders) {
				folders.linkedFolders = folders.linkedFolders.map((folder: any) => {
					if (
						!folder.view ||
						folder.view === FolderView.Message ||
						folder.view === FolderView.Contact
					) {
						const {
							absFolderPath,
							oname,
							folders,
							ownerZimbraId,
							sharedItemId
						} = folder;

						/** changed the id to zimbraId:sharedItemId, which is required while moving contact to shared folder and
						 *  server also returns this id in notfications. The original id is stored in userId.
						 */

						if (folder.view === FolderView.Contact) {
							(folder.userId = folder.id),
								(folder.id = `${ownerZimbraId}:${sharedItemId}`);
						}
						if (oname && folders) {
							folder.folders = updateAbsoluteFolderPath(
								oname,
								absFolderPath,
								folders
							);
						}
					}

					return folder;
				});
			}

			return foldersResponse;
		});
	};

	public getIdentities = () =>
		this.jsonRequest({
			name: 'GetIdentities',
			namespace: Namespace.Account
		}).then(res => mapValuesDeep(res, coerceStringToBoolean));

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

	public getMessage = ({
		id,
		html,
		raw,
		header,
		read,
		max,
		ridZ
	}: GetMessageOptions) =>
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
					max: max || 250000,
					raw: raw ? 1 : 0,
					...(ridZ && { ridZ: ridZ })
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
			prefs.zimbraPrefMailTrustedSenderList =
				typeof prefs.zimbraPrefMailTrustedSenderList === 'string'
					? castArray(prefs.zimbraPrefMailTrustedSenderList)
					: prefs.zimbraPrefMailTrustedSenderList;
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
		}).then((res: any) =>
			res.search ? { folders: normalize(Folder)(res.search) } : {}
		);

	public getSignatures = () =>
		this.jsonRequest({
			name: 'GetSignatures',
			namespace: Namespace.Account
		}).then(res => mapValuesDeep(res, coerceStringToBoolean));

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
				tasks: normalized.task
					? normalized.task.map(normalize(CalendarItemHitInfo))
					: []
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

	public importExternalAccount = ({
		accountType,
		id
	}: ExternalAccountImportInput) =>
		this.jsonRequest({
			name: 'ImportData',
			body: {
				[<string>accountType]: {
					id
				}
			}
		}).then(Boolean);

	public itemAction = (options: ActionOptions) =>
		this.action(ActionType.item, options);

	public jsonRequest = (options: JsonRequestOptions) =>
		// If account name is present that means we will not be able to batch requests
		this[options.singleRequest ? 'dataLoader' : 'batchDataLoader'].load(
			options
		);

	public login = ({
		username,
		password,
		recoveryCode,
		tokenType,
		persistAuthTokenCookie = true,
		twoFactorCode,
		deviceTrusted,
		csrfTokenSecured
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
		}).then(res => mapValuesDeep(res, coerceStringToBoolean));

	public logout = () =>
		this.jsonRequest({
			name: 'EndSession',
			body: {
				logoff: true
			},
			namespace: Namespace.Account
		}).then(Boolean);

	public messageAction = (options: ActionOptions) =>
		this.action(ActionType.message, options);

	public modifyAppointment = (
		accountName: string,
		appointment: CalendarItemInput
	) =>
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
			body: createContactBody(data),
			singleRequest: true
		}).then(res => normalize(Contact)(normalizeOtherAttr(res.cn)[0]));

	public modifyExternalAccount = ({
		id,
		type: accountType,
		attrs
	}: ExternalAccountModifyInput) =>
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

	public modifyIdentity = ({ id, attrs }: ModifyIdentityInput) =>
		this.jsonRequest({
			name: 'ModifyIdentity',
			namespace: Namespace.Account,
			body: {
				identity: {
					id,
					_attrs: mapValues(attrs, coerceBooleanToString)
				}
			},
			singleRequest: true
		});

	public modifyPrefs = (prefs: PreferencesInput) =>
		this.jsonRequest({
			name: 'ModifyPrefs',
			namespace: Namespace.Account,
			body: {
				_attrs: mapValuesDeep(prefs, coerceBooleanToString)
			},
			singleRequest: true
		}).then(Boolean);

	public modifyProfileImage = ({
		content,
		contentType
	}: ModifyProfileImageOptions) => {
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

	public noop = () => this.jsonRequest({ name: 'NoOp' }).then(Boolean);

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

	public resetPassword = ({ password }: ResetPasswordOptions) =>
		this.jsonRequest({
			name: 'ResetPassword',
			namespace: Namespace.Account,
			body: {
				password
			},
			singleRequest: true
		}).then(() => true);

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

	public saveDraft = (options: SendMessageInput) =>
		this.jsonRequest({
			name: 'SaveDraft',
			body: denormalize(SendMessageInfo)(options),
			singleRequest: true
		}).then(({ m: messages }) => ({
			message: messages && messages.map(this.normalizeMessage)
		}));

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
			if (normalized.messages) {
				normalized.messages = normalized.messages.map(this.normalizeMessage);
			}
			return normalized;
		});

	public searchGal = (options: SearchOptions) =>
		this.jsonRequest({
			name: 'SearchGal',
			body: options,
			namespace: Namespace.Account
		}).then(normalize(SearchResponse));

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

	public sendMessage = (body: SendMessageInput) =>
		this.jsonRequest({
			name: 'SendMsg',
			body: denormalize(SendMessageInfo)(body),
			singleRequest: true
		}).then(normalize(SendMessageInfo));

	public sendShareNotification = (body: ShareNotificationInput) =>
		this.jsonRequest({
			name: 'SendShareNotification',
			body: {
				...denormalize(ShareNotification)(body)
			},
			singleRequest: true
		}).then(Boolean);

	public setCsrfToken = (csrfToken: string) => {
		this.csrfToken = csrfToken;
	};

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

	public taskFolders = () =>
		this.jsonRequest({
			name: 'GetFolder',
			body: {
				view: FolderView.Task,
				tr: true
			}
		}).then(res => normalize(Folder)(res.folder[0].folder));

	public testExternalAccount = ({
		accountType,
		...accountInfo
	}: ExternalAccountTestInput) =>
		this.jsonRequest({
			name: 'TestDataSource',
			body: {
				[<string>accountType]: mapValuesDeep(accountInfo, coerceBooleanToString)
			},
			singleRequest: true
		}).then(res =>
			mapValuesDeep(get(res, `${accountType}.0`), coerceStringToBoolean)
		);

	public uploadMessage = (message: string): any => {
		const contentDisposition = 'attachment';
		const filename = 'message.eml';
		const contentType = 'message/rfc822';

		return fetch(`${this.origin}/service/upload?fmt=raw`, {
			method: 'POST',
			body: message,
			headers: {
				'Content-Disposition': `${contentDisposition}; filename="${filename}"`,
				'Content-Type': contentType,
				...(this.csrfToken && {
					'X-Zimbra-Csrf-Token': this.csrfToken
				})
			},
			credentials: 'include'
		}).then(response => {
			if (response.ok) {
				return response.text().then(result => {
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

	private batchDataHandler = (requests: Array<RequestOptions>) =>
		batchJsonRequest({
			requests,
			...this.getAdditionalRequestOptions()
		}).then(response => {
			const sessionId = get(response, 'header.context.session.id');
			const notifications = get(response, 'header.context.notify.0');

			this.checkAndUpdateSessionId(sessionId);

			if (notifications && this.notificationHandler) {
				// as notification handling happens in synchronous way, if the notifications count is really higher (for bulk operations)
				// the UI would freeze because of the JavaScript execution time. Hence, delayed the notification handling to give some time
				// for the render to happen in the JavaScript event loop
				setTimeout(() => {
					this.notificationHandler && this.notificationHandler(notifications);
				}, 100);
			}

			return response.requests.map((r, i) => {
				if (DEBUG) {
					console.log(
						`[Batch Client Request] ${requests[i].name}`,
						requests[i].body,
						r
					);
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

	private dataHandler = (requests: Array<JsonRequestOptions>) =>
		jsonRequest({
			...requests[0],
			// check if login request then don't add csrfToken
			...this.getAdditionalRequestOptions(requests[0].name !== 'Auth')
		}).then(response => {
			const sessionId = get(response, 'header.context.session.id');
			const notifications = get(response, 'header.context.notify.0');

			this.checkAndUpdateSessionId(sessionId);

			if (notifications && this.notificationHandler) {
				this.notificationHandler(notifications);
			}

			return isError(response) ? [response] : [response.body];
		});

	private download = ({ id, part, isSecure }: any) =>
		fetch(
			`${this.origin}/service/home/~/?auth=co&id=${id}${
				part ? `&part=${part}` : ''
			}`,
			{
				headers: {
					...(isSecure && { 'X-Zimbra-Encoding': 'x-base64' }),
					...(this.csrfToken && {
						'X-Zimbra-Csrf-Token': this.csrfToken
					})
				},
				credentials: 'include'
			}
		).then(response => {
			if (response.ok) {
				return response.text().then(content => {
					if (!content) {
						return undefined;
					}

					return {
						id,
						part,
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
		sessionId:
			this.sessionId ||
			(this.sessionHandler && this.sessionHandler.readSessionId()),
		origin: this.origin,
		userAgent: this.userAgent
	});

	private normalizeMessage = (message: any) =>
		normalizeMessage(message, {
			origin: this.origin,
			jwtToken: this.jwtToken
		});
}
