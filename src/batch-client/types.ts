import {
	AccountType,
	Cursor,
	ExternalAccountModifyAttrsInput,
	FolderView,
	SearchType,
	SortBy
} from '../schema/generated-schema-types';

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

export enum NeedIsMemberType {
	all = 'all',
	directOnly = 'directOnly',
	none = 'none'
}
export interface AutoCompleteGALOptions {
	limit?: number;
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

export interface ZimbraClientOptions {
	jwtToken?: string;
	notificationHandler?: NotificationHandler;
	soapPathname?: string;
	zimbraOrigin?: string;
}

export interface FreeBusyOptions {
	end: number;
	names: Array<string>;
	start: number;
}

export interface GetContactOptions {
	derefGroupMember: boolean;
	id: string;
	ids: Array<string>;
	memberOf: boolean;
}

export interface GetContactFrequencyOptions {
	by: string;
	email: string;
	offsetInMinutes: string;
	spec: Array<ContactFrequencySpec>;
}

export interface ContactFrequencySpec {
	interval: string;
	range: string;
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
	header?: Array<MailItemHeader>;
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

// Time/rule for transitioning from daylight time to standard time.
// Either specify week/weekday combo, or monthday.
export interface TimezoneStandard {
	hour: number;
	minute: number;
	month: number;
	monthday?: number;
	second: number;
	week?: number;
	weekday?: number;
}

export interface Timezone {
	daylight?: TimezoneStandard;
	dayname?: string;
	dayoffset: number;
	id: string;
	name?: string;
	offset: number;
	standard?: TimezoneStandard;
}

export enum TaskStatus {
	COMP = 'COMP',
	DEFERRED = 'DEFERRED',
	INPR = 'INPR',
	NEED = 'NEED',
	WAITING = 'WAITING'
}

export enum SearchConversationResultMode {
	ids = 'IDS',
	normal = 'NORMAL'
}

export enum SearchConversationWantContent {
	both = 'both',
	full = 'full',
	original = 'original'
}

export interface SearchConversationOptions {
	allowableTaskStatus?: [TaskStatus];
	calExpandInstEnd?: number;
	calExpandInstStart?: number;
	conversationId: string;
	cursor?: Cursor;
	fetch?: string;
	field?: string;
	fullConversation?: boolean;
	header?: [MailItemHeader];
	html?: boolean;
	includeTagDeleted?: boolean;
	includeTagMuted?: boolean;
	inDumpster?: boolean;
	limit?: number;
	locale?: string;
	max?: number;
	needExp?: boolean;
	nest?: boolean;
	neuter?: boolean;
	offset?: number;
	prefetch?: boolean;
	query?: string;
	quick?: boolean;
	read?: boolean;
	recip?: number;
	resultMode?: SearchConversationResultMode;
	sortBy?: SortBy;
	timezone?: Timezone;
	types?: [SearchType];
	wantContent?: SearchConversationWantContent;
}

export interface RelatedContactsOptions {
	email: string;
}

export interface SearchOptions {
	calExpandInstEnd?: Number;
	calExpandInstStart?: Number;
	cursor?: Cursor;
	fetch?: string;
	fullConversation?: boolean;
	limit?: number;
	needExp?: boolean;
	needIsMember?: NeedIsMemberType;
	needIsOwner?: boolean;
	offset?: number;
	query?: string;
	recip?: number;
	sortBy?: SortBy;
	type?: GalSearchType;
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

export interface ModifyProfileImageOptions {
	uid: string;
}
export interface LoginOptions {
	password: string;
	persistAuthTokenCookie?: boolean;
	recoveryCode?: string;
	tokenType?: string;
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

export interface GetSMimePublicCertsOptions {
	contactAddr: string;
	store: string;
}

export enum SetRecoveryAccountOpType {
	send = 'sendCode',
	validate = 'validateCode',
	resend = 'resendCode',
	reset = 'reset'
}

export enum SetRecoveryAccountChannelType {
	email = 'email'
}

export interface SetRecoveryAccountOptions {
	channel: SetRecoveryAccountChannelType;
	op: SetRecoveryAccountOpType;
	recoveryAccount?: string;
	recoveryAccountVerificationCode?: string;
}

export enum RecoverAccountOpType {
	get = 'getRecoveryAccount',
	send = 'sendRecoveryCode'
}

export interface RecoverAccountOptions {
	channel: SetRecoveryAccountChannelType;
	email: string;
	op: RecoverAccountOpType;
}

export interface ResetPasswordOptions {
	password: string;
}

export interface ExternalAccountModifyInput {
	attrs: ExternalAccountModifyAttrsInput;
	id: string;
	type?: AccountType;
}

export interface ExternalAccountDeleteInput {
	id: string;
}
