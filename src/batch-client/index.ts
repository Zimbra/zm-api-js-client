import DataLoader from 'dataloader';
import get from 'lodash-es/get';
import isError from 'lodash-es/isError';
import mapValues from 'lodash-es/mapValues';

import { denormalize, normalize } from '../normalize';
import {
	CalendarItemCreateModifyRequest,
	Conversation,
	Folder,
	FreeBusy,
	GetFolderResponse,
	MessageInfo,
	SearchResponse
} from '../normalize/entities';
import {
	batchJsonRequest,
	DEFAULT_HOSTNAME,
	DEFAULT_SOAP_PATHNAME
} from '../request';
import { Namespace, RequestBody, RequestOptions } from '../request/types';
import {
	CalendarItemInput,
	FolderView
} from '../schema/generated-schema-types';
import {
	coerceBooleanToInt,
	coerceStringToBoolean
} from '../utils/coerce-boolean';
import { mapValuesDeep } from '../utils/map-values-deep';
import { normalizeEmailAddresses } from '../utils/normalize-email-addresses';
import { normalizeMimeParts } from '../utils/normalize-mime-parts';
import {
	ActionOptions,
	ActionType,
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

export class ZimbraBatchClient {
	public origin: string;
	public sessionId: string = '1';
	public soapPathname: string;
	private dataLoader: DataLoader<RequestOptions, RequestBody>;
	private notificationHandler?: NotificationHandler;

	constructor(options: ZimbraClientOptions = {}) {
		this.origin = options.zimbraOrigin || DEFAULT_HOSTNAME;
		this.soapPathname = options.soapPathname || DEFAULT_SOAP_PATHNAME;
		this.notificationHandler = options.notificationHandler;
		this.dataLoader = new DataLoader(this.batchHandler);
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
		const { ids, ...rest } = options;

		return this.jsonRequest({
			name: type,
			body: {
				action: {
					...rest,
					id: rest.id || (ids || []).join(','),
					l: options.folderId,
					tcon: options.constraints,
					tn: options.tagNames,
					f: options.flags
				}
			}
		});
	};

	public calendars = () =>
		this.jsonRequest({
			name: 'GetFolder',
			body: {
				view: FolderView.appointment,
				tr: true
			}
		}).then(res => normalize(Folder)(res.folder[0].folder));

	public cancelTask = ({ inviteId }: any) =>
		this.jsonRequest({
			name: 'CancelTask',
			body: {
				comp: '0',
				id: inviteId
			}
		});

	public conversationAction = (options: ActionOptions) =>
		this.action(ActionType.conversation, options);

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

	public createTask = (task: CalendarItemInput) =>
		this.jsonRequest({
			name: 'CreateTask',
			body: {
				...denormalize(CalendarItemCreateModifyRequest)(task)
			}
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

	public getFolder = (_options: GetFolderOptions) => {
		const { traverseMountpoints, ...options } = _options;

		return this.jsonRequest({
			name: 'GetFolder',
			body: {
				...options,
				tr: traverseMountpoints
			}
		}).then(normalize(GetFolderResponse));
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
		max
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
					raw: raw ? 1 : 0
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

	public jsonRequest = (options: RequestOptions): Promise<RequestBody> =>
		this.dataLoader.load(options);

	public messageAction = (options: ActionOptions) =>
		this.action(ActionType.message, options);

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
		}).then(res => res._attrs);

	public relatedContacts = ({ email }: RelatedContactsOptions) =>
		this.jsonRequest({
			name: 'GetRelatedContacts',
			body: {
				targetContact: {
					cn: email
				}
			}
		});

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

	private batchHandler = (requests: Array<RequestOptions>) =>
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
}
