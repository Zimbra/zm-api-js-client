import {
	AccountType,
	Cursor,
	ExternalAccountModifyAttrsInput,
	FolderView,
	Grantee,
	Owner,
	SearchType,
	SortBy,
	Timezone,
	UploadDocument
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

export type UserAgent = {
	name: string;
	version: string;
};

export type writeSessionId = (sessionId: string) => void;

export type readSessionId = () => string;

export type SessionHandler = {
	readSessionId: readSessionId;
	writeSessionId: writeSessionId;
};

export interface ZimbraClientOptions {
	authToken?: string;
	csrfToken?: string;
	customFetch?: any;
	jwtToken?: string;
	localStoreClient?: any;
	notificationHandler?: NotificationHandler;
	sessionHandler?: SessionHandler;
	soapPathname?: string;
	userAgent?: UserAgent;
	zimbraOrigin?: string;
}

export interface FreeBusyOptions {
	end: number;
	excludeUid: string;
	names: Array<string>;
	start: number;
}

export interface WorkingHoursOptions {
	end: number;
	names: Array<string>;
	start: number;
}

export interface ClientInfoInput {
	by: string;
	domain: string;
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
	local?: boolean;
	needGranteeName?: boolean;
	traverseMountpoints?: boolean;
	view?: FolderView;
	visible?: boolean;
}

export interface GetDocumentShareURLItemOptions {
	folderId?: string;
	id?: string;
	name?: string;
	path?: string;
}

export interface GetDocumentShareURLOptions {
	item: GetDocumentShareURLItemOptions;
}

export interface GetCustomMetadataOptions {
	id: string;
	section: string;
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
	ids: [String];
	isLocal?: boolean;
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

export interface AppointmentOptions {
	id?: string;
}

export interface SaveDocumentInput {
	ct: string;
	descEnabled: Boolean;
	id: string;
	l: string;
	name: string;
	upload: UploadDocument;
	ver: Number;
}

export interface SearchOptions {
	calExpandInstEnd?: Number;
	calExpandInstStart?: Number;
	cursor?: Cursor;
	fetch?: string;
	fullConversation?: boolean;
	inDumpster?: boolean;
	limit?: number;
	name?: string;
	needExp?: boolean;
	needIsMember?: NeedIsMemberType;
	needIsOwner?: boolean;
	offset?: number;
	query?: string;
	recip?: number;
	sortBy?: SortBy;
	type?: GalSearchType;
	types?: SearchType;
	tz?: Timezone;
}

export interface SearchCalendarResourcesCondition {
	attr?: String;
	op?: String;
	value?: String;
}
export interface SearchCalendarResourcesOptions {
	attrs?: string;
	limit?: number;
	needExp?: boolean;
	offset?: number;
	searchFilter?: {
		conds?: {
			cond?: Array<SearchCalendarResourcesCondition>;
		};
	};
}

export interface ShareInfoOptions {
	grantee?: Grantee;
	includeSelf?: Boolean;
	internal?: Boolean;
	owner?: Owner;
}

export interface ChangePasswordOptions {
	authToken: string;
	csrfToken: string;
	dryRun: boolean;
	loginNewPassword: string;
	password: string;
	username: string;
}

export interface ModifyProfileImageOptions {
	content: string;
	contentType: string;
}

export interface LoginOptions {
	csrfTokenSecured: boolean;
	deviceTrusted?: boolean;
	password: string;
	persistAuthTokenCookie?: boolean;
	recoveryCode?: string;
	tokenType?: string;
	twoFactorCode?: string;
	username: string;
}

export interface ActionOptions {
	color?: number;
	constraints?: string;
	flags?: string;
	folderId?: string;
	id?: string;
	ids?: Array<string>;
	isBatchOperation?: boolean;
	isLocal?: boolean;
	name?: string;
	op: string;
	recursive?: Boolean;
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
	tag = 'TagAction',
	document = 'DocumentAction'
}

export enum ActionResultType {
	ConvAction = 'Conversation',
	MsgAction = 'MessageInfo'
}

export interface CreateFolderOptions {
	color?: number;
	fetchIfExists?: boolean;
	flags?: string;
	isLocalFolder?: boolean;
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
	cancelResetPassword: boolean;
	dryRun: boolean;
	getPasswordRules: boolean;
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

export interface FilterRule {
	name: string;
}

export interface ApplyFilterRulesOptions {
	filterRules: Array<FilterRule>;
	ids: string;
}

export interface NoOpOptions {
	limitToOneBlocked: number;
	wait: number;
}

export interface DiscoverRightInput {
	_content: string;
}
export interface DiscoverRightOptions {
	right: Array<DiscoverRightInput>;
}
