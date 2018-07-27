import {
	Cursor,
	FolderView,
	SearchType,
	SortBy
} from '../schema/generated-schema-types';

import { JsonRequestOptions } from '../request/types';

export enum GalSearchType {
	all = 'all',
	account = 'account',
	resource = 'resource',
	group = 'group'
}

export interface AutoCompleteOptions {
	folders?: string;
	includeGal?: boolean;
	name: string;
	needExp?: boolean;
	type?: GalSearchType;
}

export interface Notification {
	created?: any;
	deleted?: any;
	modified?: any;
	seq?: number;
}

export type NotificationHandler = (notificaton: Notification) => void;

export interface OfflineCRUD {
	create: (tagName: string, attributes: any) => OfflineCRUD;
	delete: (tagName: string, attributes: any) => OfflineCRUD;
	modify: (tagName: string, attributes: any) => OfflineCRUD;
}

export interface OfflineJSONRequestQueue {
	consume: () => Array<JsonRequestOptions>;
	push: (options: JsonRequestOptions) => void;
}

export interface ZimbraClientOptions {
	notificationHandler?: NotificationHandler;
	soapPathname?: string;
	zimbraOrigin?: string;
}

export interface FolderOptions {
	id?: string;
	uuid?: string;
	view: FolderView;
}

export interface FoldersOptions {
	ids: Array<string>;
}

export interface FreeBusyOptions {
	end: number;
	names: Array<string>;
	start: number;
}

export interface GetContactOptions {
	id: string;
}

export interface GetContactFrequencyOptions {
	by: string;
	email: string;
}

export interface GetFolderOptions {
	depth?: number;
	folder?: {
		l?: string;
		path?: string;
		uuid?: string;
	};
	needGranteeName?: boolean;
	traverseMountpoints?: boolean;
	view?: FolderView;
	visible?: boolean;
}

export interface GetMailboxMetadataOptions {
	section: string;
}

export interface MailItemHeader {
	n: string; // Attribute name
}

export interface GetMailItemOptions {
	headers?: Array<MailItemHeader>;
	html?: boolean;
	id: string;
	max?: number;
	needExp?: boolean;
}

export interface GetMessageOptions extends GetMailItemOptions {
	neuter?: boolean;
	part?: string;
	raw?: boolean;
	read?: boolean;
	ridZ?: string;
}

export interface GetConversationOptions extends GetMailItemOptions {
	fetch?: string;
}

export interface RelatedContactsOptions {
	email: string;
}

export interface SearchOptions {
	cursor?: Cursor;
	fetch?: string;
	fullConversation?: boolean;
	limit?: number;
	needExp?: boolean;
	offset?: number;
	query?: string;
	recip?: number;
	sortBy?: SortBy;
	types?: SearchType;
}

export interface ShareInfosOptions {
	addresses: Array<string>;
}

export interface ChangePasswordOptions {
	loginNewPassword: string;
	password: string;
	username: string;
}

export interface LoginOptions {
	password: string;
	username: string;
}

export interface ActionOptions {
	color?: number;
	constraints?: string;
	flags?: string;
	folderId?: string;
	id?: string;
	ids?: Array<string>;
	name?: string;
	op: string;
	rgb?: string;
	tagNames?: string;
}

export enum ActionType {
	contact = 'ContactAction',
	conversation = 'ConvAction',
	distributionList = 'DistributionList',
	folder = 'FolderAction',
	item = 'ItemAction',
	message = 'MsgAction',
	tag = 'TagAction'
}

export enum ActionResultType {
	ConvAction = 'Conversation',
	MsgAction = 'MessageInfo'
}

export interface CreateFolderOptions {
	color?: number;
	fetchIfExists?: boolean;
	flags?: string;
	name: string;
	parentFolderId?: string;
	url?: string;
	view?: string;
}

export interface CreateSearchFolderOptions {
	name: string;
	parentFolderId?: string;
	query: string;
	view?: string;
}
