import DataLoader from 'dataloader';
import { get, isError, mapValues } from 'lodash';

import { denormalize, normalize } from '../normalize';
import {
	ActionOptions as ActionOptionsEntity,
	CalendarItemCreateModifyRequest,
	Conversation,
	CreateSignatureRequest,
	Filter,
	Folder,
	FreeBusy,
	MessageInfo,
	SearchResponse,
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
	FilterInput,
	FolderView,
	PreferencesInput,
	ShareNotificationInput,
	SignatureInput
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
	ChangePasswordOptions,
	CreateFolderOptions,
	CreateSearchFolderOptions,
	FolderOptions,
	FoldersOptions,
	FreeBusyOptions,
	GetContactFrequencyOptions,
	GetContactOptions,
	GetConversationOptions,
	GetFolderOptions,
	GetMailboxMetadataOptions,
	GetMessageOptions,
	NotificationHandler,
	RelatedContactsOptions,
	SearchOptions,
	ShareInfosOptions,
	ZimbraClientOptions
} from './types';

const DEBUG = false;

function normalizeMessage(
	message: { [key: string]: any },
	zimbraOrigin?: string
) {
	return normalizeEmailAddresses(
		normalizeMimeParts(normalize(MessageInfo)(message), zimbraOrigin)
	);
}

function getErrorFromPasswordResetResponse(html: string) {
	// Parse the error in the HTML response in the ZLoginErrorPanel element.
	const doc = new DOMParser().parseFromString(html, 'text/html');
	const err = doc && doc.getElementById('ZLoginErrorPanel');
	if (err && err.textContent) {
		return err.textContent.trim();
	}
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
		}).then(res => ({
			...res,
			attrs: mapValuesDeep(res.attrs._attrs, coerceStringToBoolean),
			prefs: mapValuesDeep(res.prefs._attrs, coerceStringToBoolean)
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
			}
		});
	};

	public cancelTask = ({ inviteId }: any) =>
		this.jsonRequest({
			name: 'CancelTask',
			body: {
				comp: '0',
				id: inviteId
			}
		});

	public changePassword = ({
		loginConfirmNewPassword,
		loginNewPassword,
		password,
		username
	}: ChangePasswordOptions) =>
		fetch(`${this.origin}/`, {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `loginOp=login&username=${encodeURIComponent(
				username
			)}&password=${encodeURIComponent(
				password
			)}&loginNewPassword=${encodeURIComponent(
				loginNewPassword
			)}&loginConfirmNewPassword=${encodeURIComponent(
				loginConfirmNewPassword
			)}&client=preferred`
		})
			.then((r: any) => {
				if (r && r.ok) {
					return r.text();
				}

				return Promise.reject(`${r.status} Bad Response`);
			})
			.then((html: string) => {
				const error = getErrorFromPasswordResetResponse(html);
				return error ? Promise.reject(error) : Promise.resolve(html);
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
		});
	};

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
		});
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

	public deleteSignature = (options: SignatureInput) =>
		this.jsonRequest({
			name: 'DeleteSignature',
			namespace: Namespace.Account,
			body: options
		});

	public folder = ({ id, uuid, view }: FolderOptions) =>
		this.jsonRequest({
			name: 'GetFolder',
			body: {
				view,
				tr: true,
				folder: id || uuid ? { id, uuid } : undefined
			}
		}).then(res => normalize(Folder)(res.folder[0].folder));

	public folderAction = (options: ActionOptions) =>
		this.action(ActionType.folder, options);

	public folders = ({ ids }: FoldersOptions) =>
		Promise.all(
			ids.map((id: String) =>
				this.jsonRequest({
					name: 'GetFolder',
					body: {
						view: FolderView.appointment,
						tr: true,
						folder: id
					}
				}).then(normalize(Folder))
			)
		);

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
		});

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

	public getFolder = (_options: GetFolderOptions) => {
		const { traverseMountpoints, ...options } = _options;

		return this.jsonRequest({
			name: 'GetFolder',
			body: {
				...options,
				tr: traverseMountpoints
			}
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
		headers,
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
					header: headers && headers.map((n: any) => ({ n })),
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

	public itemAction = (options: ActionOptions) =>
		this.action(ActionType.item, options);

	public jsonRequest = (options: JsonRequestOptions) => {
		const { accountName } = options;

		// If account name is present that means we will not be able to batch requests
		return accountName
			? this.dataLoader.load(options)
			: this.batchDataLoader.load(options);
	};

	public logout = () => {
		return new Promise(resolve => {
			// iFrame to the page that actually clears cookies.
			const iframe = document.createElement('iframe');
			iframe.setAttribute('style', 'display: none');
			iframe.src = this.resolve('/?loginOp=logout');

			iframe.onload = iframe.onerror = () => {
				const { parentNode } = iframe;
				if (parentNode) {
					parentNode.removeChild(iframe);
				}

				resolve();
			};

			document.body.appendChild(iframe);
		});
	};

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

	public noop = () => this.jsonRequest({ name: 'NoOp' });

	public preferences = () =>
		this.jsonRequest({
			name: 'GetPrefs',
			namespace: Namespace.Account
		}).then(res => mapValuesDeep(res._attrs, coerceStringToBoolean));

	public relatedContacts = ({ email }: RelatedContactsOptions) =>
		this.jsonRequest({
			name: 'GetRelatedContacts',
			body: {
				targetContact: {
					cn: email
				}
			}
		});

	public resolve = (path: string) => `${this.origin}${path}`;

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

	public sendShareNotification = (body: ShareNotificationInput) =>
		this.jsonRequest({
			name: 'SendShareNotification',
			body: {
				...denormalize(ShareNotification)(body)
			}
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

	public taskFolders = () =>
		this.jsonRequest({
			name: 'GetFolder',
			body: {
				view: FolderView.task,
				tr: true
			}
		}).then(res => normalize(Folder)(res.folder[0].folder));

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
