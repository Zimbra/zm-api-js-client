import DataLoader from 'dataloader';
import castArray from 'lodash/castArray';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import isError from 'lodash/isError';
import mapValues from 'lodash/mapValues';

import { denormalize, normalize } from '../normalize';
import {
	ActionOptions as ActionOptionsEntity,
	AutoComplete as AutoCompleteEntity,
	AutoCompleteResponse as AutoCompleteResponseEntity,
	CalendarItemCreateModifyRequest,
	CalendarItemHitInfo,
	Contact,
	ContactInputRequest,
	Conversation,
	CreateMountpointRequest,
	CreateSignatureRequest,
	Filter,
	Folder,
	FreeBusy,
	GetFolderRequest as GetFolderRequestEntity,
	InviteReply,
	MessageInfo,
	SearchResponse,
	SendMessageInfo,
	ShareNotification
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
	CalendarItemInput,
	CreateContactInput,
	CreateMountpointInput,
	ExternalAccountAddInput,
	ExternalAccountImportInput,
	ExternalAccountTestInput,
	FilterInput,
	FolderView,
	InviteReplyInput,
	ModifyContactInput,
	PreferencesInput,
	SearchFolderInput,
	SendMessageInput,
	ShareNotificationInput,
	SignatureInput,
	WhiteBlackListInput
} from '../schema/generated-schema-types';
import {
	coerceBooleanToInt,
	coerceBooleanToString,
	coerceStringToBoolean
} from '../utils/coerce-boolean';
import { mapValuesDeep } from '../utils/map-values-deep';
import { normalizeEmailAddresses } from '../utils/normalize-email-addresses';
import { normalizeMimeParts } from '../utils/normalize-mime-parts';
import {
	ActionOptions,
	ActionType,
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
	NotificationHandler,
	RecoverAccountOptions,
	RelatedContactsOptions,
	ResetPasswordOptions,
	SearchOptions,
	SetRecoveryAccountOptions,
	ShareInfosOptions,
	ZimbraClientOptions
} from './types';

const DEBUG = false;

function normalizeMessage(
	message: { [key: string]: any },
	zimbraOrigin?: string
) {
	const normalizedMessage = normalize(MessageInfo)(message);
	normalizedMessage.attributes =
		normalizedMessage.attributes &&
		mapValuesDeep(normalizedMessage.attributes, coerceStringToBoolean);

	return normalizeEmailAddresses(
		normalizeMimeParts(normalizedMessage, zimbraOrigin)
	);
}

export class ZimbraBatchClient {
	public origin: string;
	public sessionId: string = '1';
	public soapPathname: string;
	private batchDataLoader: DataLoader<RequestOptions, RequestBody>;
	private dataLoader: DataLoader<RequestOptions, RequestBody>;
	private notificationHandler?: NotificationHandler;

	constructor(options: ZimbraClientOptions = {}) {
		this.origin = options.zimbraOrigin || DEFAULT_HOSTNAME;
		this.soapPathname = options.soapPathname || DEFAULT_SOAP_PATHNAME;
		this.notificationHandler = options.notificationHandler;

		// Used for sending batch requests
		this.batchDataLoader = new DataLoader(this.batchDataHandler);

		// Used for sending individual requests
		this.dataLoader = new DataLoader(this.dataHandler, { batch: false });
	}

	public accountInfo = () =>
		this.jsonRequest({
			name: 'GetInfo',
			namespace: Namespace.Account
		}).then(res => {
			let prefs: any = mapValuesDeep(res.prefs._attrs, coerceStringToBoolean);
			prefs.zimbraPrefMailTrustedSenderList =
				typeof prefs.zimbraPrefMailTrustedSenderList === 'string'
					? castArray(prefs.zimbraPrefMailTrustedSenderList)
					: prefs.zimbraPrefMailTrustedSenderList;

			return {
				...res,
				attrs: mapValuesDeep(res.attrs._attrs, coerceStringToBoolean),
				prefs,
				...(get(res, 'license.attr') && {
					license: {
						status: res.license.status,
						attr: mapValuesDeep(res.license.attr, coerceStringToBoolean)
					}
				})
			};
		});

	public action = (type: ActionType, options: ActionOptions) => {
		const { ids, id, ...rest } = options;

		return this.jsonRequest({
			name: type,
			body: {
				action: {
					id: id || (ids || []).join(','),
					...denormalize(ActionOptionsEntity)(rest)
				}
			}
		});
	};

	public addExternalAccount = ({
		accountType,
		...accountInfo
	}: ExternalAccountAddInput) =>
		this.jsonRequest({
			name: 'CreateDataSource',
			body: {
				[<string>accountType]: mapValuesDeep(accountInfo, coerceBooleanToString)
			}
		}).then(res => get(res, `${accountType}.0.id`));

	public autoComplete = (options: AutoCompleteOptions) =>
		this.jsonRequest({
			name: 'AutoComplete',
			body: denormalize(AutoCompleteEntity)(options)
		}).then(normalize(AutoCompleteResponseEntity));

	public cancelTask = ({ inviteId }: any) =>
		this.jsonRequest({
			name: 'CancelTask',
			body: {
				comp: '0',
				id: inviteId
			}
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
			}
		});

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
			accountName: accountName
		});

	public createAppointmentException = (
		accountName: string,
		appointment: CalendarItemInput
	) =>
		this.jsonRequest({
			name: 'CreateAppointmentException',
			body: {
				...denormalize(CalendarItemCreateModifyRequest)(appointment)
			},
			accountName: accountName
		});

	public createContact = (data: CreateContactInput) => {
		const { attributes, ...rest } = data;
		const contactAttrs = <Object[]>[];

		forEach(attributes, (val, key) =>
			contactAttrs.push({
				name: key,
				content: val
			})
		);

		return this.jsonRequest({
			name: 'CreateContact',
			body: {
				cn: {
					...denormalize(ContactInputRequest)({
						...rest,
						attributes: contactAttrs
					})
				}
			}
		}).then(res => normalize(Contact)(res.cn[0]));
	};

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
			}
		}).then(res => normalize(Folder)(res.folder[0]));
	};

	public createMountpoint = (_options: CreateMountpointInput) =>
		this.jsonRequest({
			name: 'CreateMountpoint',
			body: denormalize(CreateMountpointRequest)(_options)
		});

	public createSearchFolder = (_options: CreateSearchFolderOptions) => {
		const { parentFolderId, ...options } = _options;
		return this.jsonRequest({
			name: 'CreateSearchFolder',
			body: {
				search: {
					...options,
					l: parentFolderId
				}
			}
		}).then(res => normalize(Folder)(res.search[0]));
	};

	public createSignature = (options: SignatureInput) =>
		this.jsonRequest({
			name: 'CreateSignature',
			namespace: Namespace.Account,
			body: denormalize(CreateSignatureRequest)(options)
		});

	public createTask = (task: CalendarItemInput) =>
		this.jsonRequest({
			name: 'CreateTask',
			body: {
				...denormalize(CalendarItemCreateModifyRequest)(task)
			}
		});

	public deleteExternalAccount = ({ id }: ExternalAccountDeleteInput) =>
		this.jsonRequest({
			name: 'DeleteDataSource',
			body: {
				dsrc: { id }
			}
		});

	public deleteSignature = (options: SignatureInput) =>
		this.jsonRequest({
			name: 'DeleteSignature',
			namespace: Namespace.Account,
			body: options
		});

	public dismissCalendarItem = (appointment: any, task: any) =>
		this.jsonRequest({
			name: 'DismissCalendarItemAlarm',
			body: {
				appt: appointment,
				task
			}
		}).then(Boolean);

	public downloadMessage = ({ id }: any) => {
		return fetch(`${this.origin}/service/home/~/?auth=co&id=${id}`, {
			headers: {
				'X-Zimbra-Encoding': 'x-base64'
			},
			credentials: 'include'
		}).then(response => {
			if (response.ok) {
				return response.text().then(content => {
					if (!content) {
						return undefined;
					}
					return {
						id,
						content
					};
				});
			}
		});
	};

	public folderAction = (options: ActionOptions) =>
		this.action(ActionType.folder, options);

	public freeBusy = ({ start, end, names }: FreeBusyOptions) =>
		this.jsonRequest({
			name: 'GetFreeBusy',
			body: {
				s: start,
				e: end,
				name: names.join(',')
			}
		}).then(res => normalize(FreeBusy)(res.usr));

	public getContact = ({ id }: GetContactOptions) =>
		this.jsonRequest({
			name: 'GetContacts',
			body: {
				cn: { id }
			}
		}).then(res => normalize(Contact)(res.cn[0]));

	public getContactFrequency = (options: GetContactFrequencyOptions) =>
		this.jsonRequest({
			name: 'GetContactFrequency',
			body: options
		});

	public getConversation = (options: GetConversationOptions) =>
		this.jsonRequest({
			name: 'GetConv',
			body: {
				c: mapValues(options, coerceBooleanToInt)
			}
		}).then(res => {
			const c = normalize(Conversation)(res.c[0]);
			c.messages = c.messages.map((m: any) => normalizeMessage(m, this.origin));
			return c;
		});

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
		}).then(normalize(Folder));
	};

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
		}).then(
			res => (res && res.m ? normalizeMessage(res.m[0], this.origin) : null)
		);

	public getSearchFolder = () =>
		this.jsonRequest({
			name: 'GetSearchFolder'
		}).then(
			res => (res.search ? { folders: normalize(Folder)(res.search) } : {})
		);

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

	public getWhiteBlackList = () =>
		this.jsonRequest({
			name: 'GetWhiteBlackList',
			namespace: Namespace.Account
		});

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
		});

	public itemAction = (options: ActionOptions) =>
		this.action(ActionType.item, options);

	public jsonRequest = (options: JsonRequestOptions) => {
		const { accountName } = options;

		// If account name is present that means we will not be able to batch requests
		return accountName
			? this.dataLoader.load(options)
			: this.batchDataLoader.load(options);
	};

	public login = ({
		username,
		password,
		recoveryCode,
		tokenType,
		persistAuthTokenCookie = true
	}: LoginOptions) =>
		this.jsonRequest({
			name: 'Auth',
			body: {
				tokenType,
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
				})
			},
			namespace: Namespace.Account
		});

	public logout = () =>
		this.jsonRequest({
			name: 'EndSession',
			body: {
				logoff: true
			},
			namespace: Namespace.Account
		});

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
			accountName: accountName
		}).then(res => normalize(CalendarItemCreateModifyRequest)(res));

	public modifyContact = (data: ModifyContactInput) => {
		const { attributes, ...rest } = data;
		const modifiedAttrs = <Object[]>[];

		forEach(attributes, (val, key) =>
			modifiedAttrs.push({
				name: key,
				content: val
			})
		);

		return this.jsonRequest({
			name: 'ModifyContact',
			body: {
				cn: {
					...denormalize(ContactInputRequest)({
						...rest,
						attributes: modifiedAttrs
					})
				}
			}
		}).then(res => normalize(Contact)(res.cn[0]));
	};

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
			}
		});

	public modifyFilterRules = (filters: Array<FilterInput>) =>
		this.jsonRequest({
			name: 'ModifyFilterRules',
			body: {
				filterRules: [
					{
						filterRule: denormalize(Filter)(filters)
					}
				]
			}
		});

	public modifyPrefs = (prefs: PreferencesInput) =>
		this.jsonRequest({
			name: 'ModifyPrefs',
			namespace: Namespace.Account,
			body: {
				_attrs: mapValuesDeep(prefs, coerceBooleanToString)
			}
		});

	public modifySearchFolder = (options: SearchFolderInput) =>
		this.jsonRequest({
			name: 'ModifySearchFolder',
			body: options
		});

	public modifySignature = (options: SignatureInput) =>
		this.jsonRequest({
			name: 'ModifySignature',
			namespace: Namespace.Account,
			body: denormalize(CreateSignatureRequest)(options)
		});

	public modifyTask = (task: CalendarItemInput) =>
		this.jsonRequest({
			name: 'ModifyTask',
			body: {
				...denormalize(CalendarItemCreateModifyRequest)(task)
			}
		});

	public modifyWhiteBlackList = (whiteBlackList: WhiteBlackListInput) =>
		this.jsonRequest({
			name: 'ModifyWhiteBlackList',
			namespace: Namespace.Account,
			body: {
				...whiteBlackList
			}
		});

	public noop = () => this.jsonRequest({ name: 'NoOp' });

	public preferences = () =>
		this.jsonRequest({
			name: 'GetPrefs',
			namespace: Namespace.Account
		}).then(res => mapValuesDeep(res._attrs, coerceStringToBoolean));

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
		});

	public resetPassword = ({ password }: ResetPasswordOptions) =>
		this.jsonRequest({
			name: 'ResetPassword',
			namespace: Namespace.Account,
			body: {
				password
			}
		});

	public resolve = (path: string) => `${this.origin}${path}`;

	public saveDraft = (options: SendMessageInput) =>
		this.jsonRequest({
			name: 'SaveDraft',
			body: denormalize(SendMessageInfo)(options)
		}).then(({ m: messages }) => ({
			message:
				messages && messages.map((m: any) => normalizeMessage(m, this.origin))
		}));

	public search = (options: SearchOptions) =>
		this.jsonRequest({
			name: 'Search',
			body: {
				...options,
				fullConversation: options.fullConversation ? 1 : 0
			}
		}).then(res => {
			const normalized = normalize(SearchResponse)(res);
			if (normalized.messages) {
				normalized.messages = normalized.messages.map((m: any) =>
					normalizeMessage(m, this.origin)
				);
			}
			return normalized;
		});

	public sendInviteReply = (requestOptions: InviteReplyInput) =>
		this.jsonRequest({
			name: 'SendInviteReply',
			body: {
				...denormalize(InviteReply)(requestOptions)
			}
		}).then(res => normalize(CalendarItemHitInfo)(res));

	public sendMessage = (body: SendMessageInput) =>
		this.jsonRequest({
			name: 'SendMsg',
			body: denormalize(SendMessageInfo)(body)
		}).then(normalize(SendMessageInfo));

	public sendShareNotification = (body: ShareNotificationInput) =>
		this.jsonRequest({
			name: 'SendShareNotification',
			body: {
				...denormalize(ShareNotification)(body)
			}
		});

	public setRecoveryAccount = (options: SetRecoveryAccountOptions) =>
		this.jsonRequest({
			name: 'SetRecoveryAccount',
			body: options
		});

	public shareInfos = ({ addresses }: ShareInfosOptions) =>
		Promise.all(
			addresses.map((address: string) =>
				this.jsonRequest({
					name: 'GetShareInfo',
					body: {
						includeSelf: 0,
						owner: {
							by: 'name',
							_content: address
						},
						_jsns: 'urn:zimbraAccount'
					}
				})
			)
		);

	public snoozeCalendarItem = (appointment: any, task: any) =>
		this.jsonRequest({
			name: 'SnoozeCalendarItemAlarm',
			body: {
				appt: appointment,
				task
			}
		}).then(Boolean);

	public taskFolders = () =>
		this.jsonRequest({
			name: 'GetFolder',
			body: {
				view: FolderView.task,
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
			}
		}).then(res =>
			mapValuesDeep(get(res, `${accountType}.0`), coerceStringToBoolean)
		);

	public uploadMessage = (message: string) => {
		const contentDisposition = 'attachment';
		const filename = 'message.eml';
		const contentType = 'message/rfc822';

		return fetch(`${this.origin}/service/upload?fmt=raw`, {
			method: 'POST',
			body: message,
			headers: {
				'Content-Disposition': `${contentDisposition}; filename="${filename}"`,
				'Content-Type': contentType
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
			sessionId: this.sessionId,
			origin: this.origin
		}).then(response => {
			const sessionId = get(response, 'header.context.session.id');
			const notifications = get(response, 'header.context.notify.0');

			if (sessionId) {
				this.sessionId = sessionId;
			}

			if (notifications && this.notificationHandler) {
				this.notificationHandler(notifications);
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

	private dataHandler = (requests: Array<JsonRequestOptions>) =>
		jsonRequest({
			...requests[0],
			sessionId: this.sessionId,
			origin: this.origin
		}).then(response => {
			const sessionId = get(response, 'header.context.session.id');
			const notifications = get(response, 'header.context.notify.0');

			if (sessionId) {
				this.sessionId = sessionId;
			}

			if (notifications && this.notificationHandler) {
				this.notificationHandler(notifications);
			}

			return isError(response) ? [response] : [response.body];
		});
}
