export interface ContactFrequencySpec {
	range: string;

	interval: string;
}

export interface MailItemHeaderInput {
	n: string;
}
/** Include one of these fields to query for a folder */
export interface GetFolderFolderInput {
	uuid?: string | null;

	parentFolderId?: string | null;

	path?: string | null;
}

export interface Grantee {
	id?: string | null;

	type?: string | null;

	name?: string | null;
}

export interface Owner {
	by?: string | null;

	_content?: string | null;
}

export interface Cursor {
	id?: string | null;

	sortVal?: string | null;

	endSortVal?: string | null;

	includeOffset?: boolean | null;
}

export interface ExternalAccountTestInput {
	accountType?: AccountType | null;

	connectionType?: ConnectionType | null;

	emailAddress?: string | null;

	host: string;

	leaveOnServer?: boolean | null;

	port: string;

	username: string;

	password: string;
}

export interface ExternalAccountAddInput {
	accountType?: AccountType | null;

	connectionType?: ConnectionType | null;

	emailAddress?: string | null;

	host: string;

	isEnabled?: boolean | null;

	l: string;

	leaveOnServer?: boolean | null;

	name: string;

	password: string;

	port: string;

	username: string;
}

export interface CalendarItemInput {
	id?: string | null;

	modifiedSequence?: number | null;

	revision?: number | null;

	componentNum?: number | null;

	message: CalendarItemMessageInput;
}

export interface CalendarItemMessageInput {
	folderId?: string | null;

	subject?: string | null;

	invitations?: CalendarItemInviteInput | null;

	mimeParts?: (MimePartInput | null)[] | null;

	emailAddresses?: (MailItemEmailAddressInput | null)[] | null;

	attachments?: (AttachmentInput | null)[] | null;

	replyType?: InviteReplyType | null;
}

export interface CalendarItemInviteInput {
	components: (CalendarItemInviteComponentInput | null)[];
}

export interface CalendarItemInviteComponentInput {
	name: string;

	location?: string | null;

	start?: CalendarItemDateTimeInput | null;

	end?: CalendarItemDateTimeInput | null;

	exceptId?: CalendarOptionalItemDateTimeInput | null;

	freeBusy?: FreeBusyStatus | null;

	allDay?: boolean | null;

	organizer?: CalendarItemOrganizerInput | null;

	recurrence?: CalendarItemRecurrenceInput | null;

	attendees?: (CalendarItemAttendeesInput | null)[] | null;

	alarms?: (CalendarItemAlarmInput | null)[] | null;

	class: CalendarItemClass;

	priority?: string | null;

	percentComplete?: string | null;

	status?: InviteCompletionStatus | null;

	noBlob?: boolean | null;

	description?: (CalendarItemInviteComponentDescriptionInput | null)[] | null;
}

export interface CalendarItemDateTimeInput {
	timezone?: string | null;

	date: string;
}

export interface CalendarOptionalItemDateTimeInput {
	timezone?: string | null;

	date?: string | null;
}

export interface CalendarItemOrganizerInput {
	address?: string | null;

	name?: string | null;

	sentBy?: string | null;
}

export interface CalendarItemRecurrenceInput {
	add?: CalendarItemRecurrenceAddInput | null;
}

export interface CalendarItemRecurrenceAddInput {
	rule?: CalendarItemRecurrenceRuleInput | null;
}

export interface CalendarItemRecurrenceRuleInput {
	interval?: CalendarItemRecurrenceIntervalInput | null;

	frequency?: CalendarItemRecurrenceFrequency | null;
}

export interface CalendarItemRecurrenceIntervalInput {
	intervalCount: number;

	zimbraPrefAutoAddAppointmentsToCalendar?: boolean | null;
}

export interface CalendarItemAttendeesInput {
	role?: ParticipationRole | null;

	participationStatus?: ParticipationStatus | null;

	rsvp?: boolean | null;

	address: string;

	name?: string | null;

	calendarUserType?: string | null;
}

export interface CalendarItemAlarmInput {
	action: AlarmAction;

	trigger: CalendarItemAlarmTriggerInput;

	attendees?: CalendarItemAlarmAttendeesInput | null;
}

export interface CalendarItemAlarmTriggerInput {
	relative?: CalendarItemAlarmTriggerRelativeInput | null;

	absolute?: CalendarItemAlarmTriggerAbsoluteInput | null;
}

export interface CalendarItemAlarmTriggerRelativeInput {
	weeks?: number | null;

	days?: number | null;

	hours?: number | null;

	minutes?: number | null;

	seconds?: number | null;

	relatedTo?: AlarmRelatedTo | null;

	negative?: boolean | null;
}

export interface CalendarItemAlarmTriggerAbsoluteInput {
	date: string;
}

export interface CalendarItemAlarmAttendeesInput {
	email: string;
}

export interface CalendarItemInviteComponentDescriptionInput {
	_content?: string | null;
}

export interface MimePartInput {
	body?: boolean | null;

	filename?: string | null;

	part?: string | null;

	content?: string | null;

	contentId?: string | null;

	contentType?: string | null;

	contentDisposition?: string | null;

	size?: number | null;

	mimeParts?: (MimePartInput | null)[] | null;

	url?: string | null;

	messageId?: string | null;

	attachments?: (AttachmentInput | null)[] | null;
}

export interface AttachmentInput {
	attachmentId?: string | null;

	existingAttachments?: (ExistingAttachmentInput | null)[] | null;
}

export interface ExistingAttachmentInput {
	messageId?: string | null;

	part?: string | null;
}

export interface MailItemEmailAddressInput {
	address: string;

	name?: string | null;

	type: AddressType;
}

export interface CreateContactInput {
	folderId?: string | null;

	tagNames?: string | null;

	attributes: ContactAttrsInput;
}

export interface ContactAttrsInput {
	firstName?: string | null;

	middleName?: string | null;

	lastName?: string | null;

	fullName?: string | null;

	email?: string | null;

	email2?: string | null;

	workEmail?: string | null;

	workEmail2?: string | null;

	homeEmail?: string | null;

	homeEmail2?: string | null;

	phone?: string | null;

	phone2?: string | null;

	mobile?: string | null;

	mobile2?: string | null;

	homePhone?: string | null;

	homePhone2?: string | null;

	workPhone?: string | null;

	workPhone2?: string | null;

	pager?: string | null;

	pager2?: string | null;

	fax?: string | null;

	fax2?: string | null;

	im?: string | null;

	im2?: string | null;

	im3?: string | null;

	im4?: string | null;

	nickname?: string | null;

	homeStreet?: string | null;

	homeCity?: string | null;

	homeState?: string | null;

	homePostal?: string | null;

	homeCountry?: string | null;

	workStreet?: string | null;

	workCity?: string | null;

	workState?: string | null;

	workPostal?: string | null;

	workCountry?: string | null;

	jobTitle?: string | null;

	company?: string | null;

	birthday?: string | null;

	anniversary?: string | null;

	website?: string | null;

	notes?: string | null;

	image?: string | null;

	userCertificate?: string | null;
	/** Used for contact lists */
	fileAs?: string | null;

	type?: string | null;
}

export interface ModifyContactInput {
	id: string;

	folderId?: string | null;

	tagNames?: string | null;

	attributes: ContactAttrsInput;

	memberOps?: (ContactListOps | null)[] | null;
}

export interface ContactListOps {
	op: string;

	type: string;

	value: string;
}

export interface NewMountpointSpec {
	name: string;

	owner?: string | null;

	view?: SearchType | null;

	flags?: string | null;

	ownerZimbraId?: string | null;

	sharedItemId?: string | null;

	color?: number | null;

	reminder?: boolean | null;

	parentFolderId?: string | null;
}

export interface SignatureInput {
	id?: string | null;

	name?: string | null;

	content?: SignatureContentInput | null;

	contentId?: string | null;
}

export interface SignatureContentInput {
	type?: string | null;

	_content?: string | null;
}

export interface DeleteAppointmentInput {
	instanceDate?: InstanceDate | null;

	inviteId: string;

	componentNum: string;

	start?: number | null;

	message?: CalendarItemMessageInput | null;
}

export interface InstanceDate {
	date?: string | null;
}

export interface NameIdInput {
	id?: string | null;

	name?: string | null;
}

export interface FolderActionInput {
	id: string;

	op: string;

	grant?: (GrantInput | null)[] | null;

	name?: string | null;

	folderId?: string | null;

	zimbraId?: string | null;
}

export interface GrantInput {
	address?: string | null;

	granteeType: GranteeType;

	key?: string | null;

	password?: string | null;

	permissions: string;

	zimbraId?: string | null;
}

export interface ExternalAccountImportInput {
	accountType?: AccountType | null;

	id: string;
}

export interface ExternalAccountModifyAttrsInput {
	id?: string | null;

	accountType?: AccountType | null;

	defaultSignature?: string | null;

	description?: string | null;

	emailAddress?: string | null;

	fromDisplay?: string | null;

	name?: string | null;

	replyToAddress?: string | null;

	replyToDisplay?: string | null;

	replyToEnabled?: boolean | null;

	storeAndForward?: string | null;

	useAddressForForwardReply?: boolean | null;

	username?: string | null;

	host?: string | null;

	signatureValue?: string | null;

	importOnly?: boolean | null;

	forwardReplySignature?: string | null;

	connectionType?: ConnectionType | null;

	isEnabled?: boolean | null;

	port?: string | null;

	smtpPort?: string | null;
}

export interface IdentityAttrsInput {
	zimbraPrefIdentityId?: string | null;

	zimbraPrefDefaultSignatureId?: string | null;

	zimbraPrefForwardReplySignatureId?: string | null;

	zimbraPrefForwardReplyFormat?: string | null;

	zimbraPrefFromAddress?: string | null;

	zimbraPrefFromAddressType?: string | null;

	zimbraPrefFromDisplay?: string | null;

	zimbraPrefIdentityName?: string | null;

	zimbraPrefMailSignatureStyle?: string | null;

	zimbraPrefReplyToAddress?: string | null;

	zimbraPrefReplyToDisplay?: string | null;

	zimbraPrefReplyToEnabled?: boolean | null;

	zimbraPrefSaveToSent?: boolean | null;

	zimbraPrefSentMailFolder?: string | null;
}

export interface PreferencesInput {
	zimbraPrefAutoAddAppointmentsToCalendar?: boolean | null;

	zimbraPrefCalendarAutoAddInvites?: boolean | null;

	zimbraPrefDefaultCalendarId?: number | null;

	zimbraPrefCalendarFirstDayOfWeek?: number | null;

	zimbraPrefCalendarInitialView?: PrefCalendarInitialView | null;

	zimbraPrefCalendarReminderEmail?: string | null;

	zimbraPrefCalendarWorkingHours?: string | null;

	zimbraPrefDisplayExternalImages?: boolean | null;

	zimbraPrefGroupMailBy?: string | null;

	zimbraPrefMailPollingInterval?: string | null;

	zimbraPrefMailSelectAfterDelete?: PrefMailSelectAfterDelete | null;

	zimbraPrefMailTrustedSenderList?: (string | null)[] | null;

	zimbraPrefMarkMsgRead?: number | null;

	zimbraPrefOutOfOfficeFromDate?: string | null;

	zimbraPrefOutOfOfficeReply?: string | null;

	zimbraPrefOutOfOfficeReplyEnabled?: boolean | null;

	zimbraPrefOutOfOfficeStatusAlertOnLogin?: boolean | null;

	zimbraPrefOutOfOfficeUntilDate?: string | null;

	zimbraPrefReadingPaneEnabled?: boolean | null;

	zimbraPrefReadingPaneLocation?: ReadingPaneLocation | null;

	zimbraPrefShowFragments?: boolean | null;

	zimbraPrefWebClientOfflineBrowserKey?: string | null;

	zimbraPrefTimeZoneId?: string | null;
}

export interface ZimletPreferenceInput {
	name: string;

	presence: string;
}

export interface FilterInput {
	name: string;

	active: boolean;

	actions?: (FilterActionInput | null)[] | null;

	conditions?: (FilterConditionInput | null)[] | null;
}

export interface FilterActionInput {
	keep?: (BasicActionInput | null)[] | null;

	discard?: (BasicActionInput | null)[] | null;

	fileInto?: (FileIntoActionInput | null)[] | null;

	flag?: (FlagActionInput | null)[] | null;

	tag?: (TagActionInput | null)[] | null;

	redirect?: (RedirectActionInput | null)[] | null;

	reply?: (ReplyActionInput | null)[] | null;

	notify?: (NotifyActionInput | null)[] | null;

	stop?: (BasicActionInput | null)[] | null;
}

export interface BasicActionInput {
	index?: number | null;
}

export interface FileIntoActionInput {
	folderPath?: string | null;

	copy?: boolean | null;

	index?: number | null;
}

export interface FlagActionInput {
	flagName?: string | null;

	index?: number | null;
}

export interface TagActionInput {
	tagName: string;

	index?: number | null;
}

export interface RedirectActionInput {
	address?: string | null;

	copy?: boolean | null;

	index?: number | null;
}

export interface ReplyActionInput {
	index?: number | null;

	content?: (string | null)[] | null;
}

export interface NotifyActionInput {
	address?: string | null;

	subject?: string | null;

	maxBodySize?: number | null;

	origHeaders?: string | null;

	index?: number | null;

	content?: (string | null)[] | null;
}

export interface FilterConditionInput {
	allOrAny: FilterMatchCondition;

	addressBook?: (HeaderCheckConditionInput | null)[] | null;

	address?: (AddressConditionInput | null)[] | null;

	attachment?: (BasicConditionInput | null)[] | null;

	body?: (BodyConditionInput | null)[] | null;

	bulk?: (BasicConditionInput | null)[] | null;

	contactRanking?: (HeaderCheckConditionInput | null)[] | null;

	conversation?: (ConversationConditionInput | null)[] | null;

	date?: (DateConditionInput | null)[] | null;

	facebook?: (BasicConditionInput | null)[] | null;

	flag?: (FlagConditionInput | null)[] | null;

	headerExists?: (HeaderCheckConditionInput | null)[] | null;

	header?: (HeaderConditionInput | null)[] | null;

	importance?: (ImportanceConditionInput | null)[] | null;

	invite?: (InviteConditionInput | null)[] | null;

	linkedin?: (BasicConditionInput | null)[] | null;

	list?: (BasicConditionInput | null)[] | null;

	me?: (HeaderCheckConditionInput | null)[] | null;

	mimeHeader?: (MimeHeaderConditionInput | null)[] | null;

	size?: (SizeConditionInput | null)[] | null;

	twitter?: (BasicConditionInput | null)[] | null;

	communityRequests?: (BasicConditionInput | null)[] | null;

	communityContent?: (BasicConditionInput | null)[] | null;

	communityConnections?: (BasicConditionInput | null)[] | null;
}

export interface HeaderCheckConditionInput {
	header: string;

	index?: number | null;

	negative?: boolean | null;
}

export interface AddressConditionInput {
	header: string;

	part: string;

	stringComparison: string;

	caseSensitive?: boolean | null;

	value: string;

	valueComparison?: string | null;

	countComparison?: string | null;

	index?: number | null;

	negative?: boolean | null;
}

export interface BasicConditionInput {
	index?: number | null;

	negative?: boolean | null;
}

export interface BodyConditionInput {
	caseSensitive?: boolean | null;

	value?: string | null;

	index?: number | null;

	negative?: boolean | null;
}

export interface ConversationConditionInput {
	where?: string | null;

	index?: number | null;

	negative?: boolean | null;
}

export interface DateConditionInput {
	dateComparison?: string | null;

	date?: number | null;

	index?: number | null;

	negative?: boolean | null;
}

export interface FlagConditionInput {
	flagName: string;

	index?: number | null;

	negative?: boolean | null;
}

export interface HeaderConditionInput {
	header?: string | null;

	stringComparison?: string | null;

	valueComparison?: string | null;

	countComparison?: string | null;

	value?: string | null;

	caseSensitive?: boolean | null;

	index?: number | null;

	negative?: boolean | null;
}

export interface ImportanceConditionInput {
	importance: Importance;

	index?: number | null;

	negative?: boolean | null;
}

export interface InviteConditionInput {
	methods?: (string | null)[] | null;

	index?: number | null;

	negative?: boolean | null;
}

export interface MimeHeaderConditionInput {
	header?: string | null;

	stringComparison?: string | null;

	value?: string | null;

	caseSensitive?: boolean | null;

	index?: number | null;

	negative?: boolean | null;
}

export interface SizeConditionInput {
	numberComparison?: string | null;

	size?: string | null;

	index?: number | null;

	negative?: boolean | null;
}

export interface SearchFolderInput {
	id: string;

	query: string;

	types: FolderView;
}

export interface WhiteBlackListInput {
	whiteList?: WhiteBlackListArrInput | null;

	blackList?: WhiteBlackListArrInput | null;
}

export interface WhiteBlackListArrInput {
	addr?: (WhiteBlackAddressOpts | null)[] | null;
}

export interface WhiteBlackAddressOpts {
	_content: string;

	op?: string | null;
}

export interface SendMessageInput {
	id?: string | null;

	origId?: string | null;

	attach?: (AttachmentInput | null)[] | null;

	attachmentId?: string | null;

	replyType?: string | null;

	inReplyTo?: string | null;

	flags?: string | null;

	autoSendTime?: number | null;

	draftId?: string | null;

	entityId?: string | null;

	subject?: string | null;

	mimeParts?: (MimePartInput | null)[] | null;

	emailAddresses?: (MailItemEmailAddressInput | null)[] | null;

	attachments?: (AttachmentInput | null)[] | null;
}

export interface InviteReplyInput {
	componentNum: number;

	id: string;

	verb: InviteReplyVerb;

	updateOrganizer?: boolean | null;

	message?: CalendarItemMessageInput | null;

	exceptId?: InstanceDate | null;
}

export interface ShareNotificationInput {
	item: ShareNotificationItemInput;

	address: ShareNotificaitonEmailAddressInput;

	notes?: string | null;
}

export interface ShareNotificationItemInput {
	id: string;
}

export interface ShareNotificaitonEmailAddressInput {
	address: string;

	type?: AddressType | null;

	personalName?: string | null;
}

export interface MailboxMetadataSectionAttrsInput {
	zimbraPrefCustomFolderTreeOpen?: boolean | null;

	zimbraPrefFoldersExpanded?: string | null;

	zimbraPrefFolderTreeSash?: number | null;

	zimbraPrefGenerateLinkPreviews?: boolean | null;

	zimbraPrefGroupByList?: string | null;

	zimbraPrefMessageListDensity?: string | null;

	zimbraPrefMultitasking?: string | null;

	zimbraPrefReadingPaneSashHorizontal?: number | null;

	zimbraPrefReadingPaneSashVertical?: number | null;

	zimbraPrefSmartFolderTreeOpen?: boolean | null;

	zimbraPrefUndoSendEnabled?: boolean | null;

	zimbraPrefUndoSendTimeout?: number | null;

	archivedFolder?: string | null;

	zimbraPrefSMIMEDefaultSetting?: string | null;

	zimbraPrefSMIMELastOperation?: string | null;

	zimbraPrefContactSourceFolderID?: string | null;
}

export interface SnoozeInput {
	id: string;

	until: number;
}

export interface DismissInput {
	id: string;

	dismissedAt: number;
}

export interface CreateMountpointInput {
	link?: NewMountpointSpec | null;
}

export interface EmailAddressInput {
	email: string;

	name: string;

	shortName: string;
}

export interface ExternalAccount {
	id: string;

	name: string;

	accountType?: AccountType | null;

	isEnabled?: number | null;

	host: string;

	port: string;

	connectionType?: ConnectionType | null;

	username: string;

	password: string;
}
/** Special case of FolderAction for `changeFolderColor` resolver */
export interface FolderActionChangeColorInput {
	id: string;

	color: number;
}
/** Special case of FolderAction for `checkCalendar` resolver */
export interface FolderActionCheckCalendarInput {
	id: string;

	value?: boolean | null;
}

export interface FolderQueryInput {
	uuid?: string | null;

	id?: string | null;

	view?: FolderView | null;
}

export interface ModifyIdentityInput {
	id: string;

	attrs?: IdentityAttrsInput | null;
}

export enum PrefCalendarInitialView {
	Day = 'day',
	List = 'list',
	Month = 'month',
	Week = 'week',
	WorkWeek = 'workWeek',
	Year = 'year'
}

export enum PrefMailSelectAfterDelete {
	Next = 'next',
	Previous = 'previous',
	Adaptive = 'adaptive'
}

export enum ReadingPaneLocation {
	Off = 'off',
	Right = 'right',
	Bottom = 'bottom'
}

export enum PasswordRecoveryAddressStatus {
	Verified = 'verified',
	Pending = 'pending'
}

export enum LicenseStatus {
	Ok = 'OK',
	NotInstalled = 'NOT_INSTALLED',
	NotActivated = 'NOT_ACTIVATED',
	InFuture = 'IN_FUTURE',
	Expired = 'EXPIRED',
	Invalid = 'INVALID',
	LicenseGracePeriod = 'LICENSE_GRACE_PERIOD',
	ActivationGracePeriod = 'ACTIVATION_GRACE_PERIOD'
}

export enum ZimletPresence {
	Mandatory = 'mandatory',
	Enabled = 'enabled',
	Disabled = 'disabled'
}

export enum GalSearchType {
	All = 'all',
	Account = 'account',
	Resource = 'resource',
	Group = 'group'
}

export enum AutoCompleteMatchType {
	Gal = 'gal',
	Contact = 'contact',
	RankingTable = 'rankingTable'
}

export enum SearchType {
	Conversation = 'conversation',
	Message = 'message',
	Contact = 'contact',
	Appointment = 'appointment',
	Task = 'task',
	Wiki = 'wiki',
	Document = 'document'
}

export enum InviteType {
	Appt = 'appt',
	Task = 'task'
}

export enum AlarmAction {
	Display = 'DISPLAY',
	Audio = 'AUDIO',
	Email = 'EMAIL',
	Procedure = 'PROCEDURE',
	XYahooCalendarActionIm = 'X_YAHOO_CALENDAR_ACTION_IM',
	XYahooCalendarActionMobile = 'X_YAHOO_CALENDAR_ACTION_MOBILE',
	None = 'NONE'
}

export enum AlarmRelatedTo {
	Start = 'START',
	End = 'END'
}

export enum CalendarItemRecurrenceFrequency {
	Sec = 'SEC',
	Min = 'MIN',
	Hou = 'HOU',
	Dai = 'DAI',
	Wee = 'WEE',
	Mon = 'MON',
	Yea = 'YEA'
}

export enum Weekday {
	Su = 'SU',
	Mo = 'MO',
	Tu = 'TU',
	We = 'WE',
	Th = 'TH',
	Fr = 'FR',
	Sa = 'SA'
}

export enum ParticipationRole {
	Req = 'REQ',
	Opt = 'OPT',
	Non = 'NON'
}

export enum ParticipationStatus {
	Ne = 'NE',
	Ac = 'AC',
	Te = 'TE',
	De = 'DE',
	Dg = 'DG',
	Co = 'CO',
	In = 'IN',
	Wa = 'WA',
	Df = 'DF'
}

export enum CalendarItemClass {
	Pri = 'PRI',
	Pub = 'PUB',
	Con = 'CON'
}

export enum FreeBusyStatus {
	F = 'F',
	B = 'B',
	T = 'T',
	O = 'O'
}

export enum InviteCompletionStatus {
	Need = 'NEED',
	Tent = 'TENT',
	Conf = 'CONF',
	Canc = 'CANC',
	Comp = 'COMP',
	Inpr = 'INPR',
	Waiting = 'WAITING',
	Deferred = 'DEFERRED'
}

export enum FilterMatchCondition {
	Allof = 'allof',
	Anyof = 'anyof'
}

export enum Importance {
	High = 'high',
	Normal = 'normal',
	Low = 'low'
}

export enum FolderView {
	Search = 'search',
	Folder = 'folder',
	Tag = 'tag',
	Conversation = 'conversation',
	Message = 'message',
	Contact = 'contact',
	Document = 'document',
	Appointment = 'appointment',
	Virtual = 'virtual',
	Remote = 'remote',
	Wiki = 'wiki',
	Task = 'task',
	Chat = 'chat',
	Note = 'note',
	Comment = 'comment'
}
/** https://github.com/Zimbra/zm-mailbox/blob/develop/store/docs/acl.md */
export enum GranteeType {
	Usr = 'usr',
	Grp = 'grp',
	Egp = 'egp',
	Dom = 'dom',
	All = 'all',
	Pub = 'pub',
	Guest = 'guest',
	Key = 'key',
	Cos = 'cos'
}

export enum RecoverAccountOp {
	GetRecoveryAccount = 'getRecoveryAccount',
	SendRecoveryCode = 'sendRecoveryCode'
}

export enum SetRecoveryAccountChannel {
	Email = 'email'
}

export enum SortBy {
	None = 'none',
	DateAsc = 'dateAsc',
	DateDesc = 'dateDesc',
	SubjAsc = 'subjAsc',
	SubjDesc = 'subjDesc',
	NameAsc = 'nameAsc',
	NameDesc = 'nameDesc',
	RcptAsc = 'rcptAsc',
	RcptDesc = 'rcptDesc',
	AttachAsc = 'attachAsc',
	AttachDesc = 'attachDesc',
	FlagAsc = 'flagAsc',
	FlagDesc = 'flagDesc',
	PriorityAsc = 'priorityAsc',
	PriorityDesc = 'priorityDesc',
	ReadAsc = 'readAsc',
	ReadDesc = 'readDesc',
	SizeAsc = 'sizeAsc',
	SizeDesc = 'sizeDesc'
}

export enum NeedIsMemberType {
	All = 'all',
	DirectOnly = 'directOnly',
	None = 'none'
}

export enum ActionTypeName {
	ContactAction = 'ContactAction',
	ConvAction = 'ConvAction',
	DistributionList = 'DistributionList',
	FolderAction = 'FolderAction',
	ItemAction = 'ItemAction',
	MsgAction = 'MsgAction',
	TagAction = 'TagAction'
}

export enum AccountType {
	Imap = 'imap',
	Pop3 = 'pop3'
}

export enum ConnectionType {
	Cleartext = 'cleartext',
	Ssl = 'ssl',
	Tls = 'tls',
	TlsIsAvailable = 'tls_is_available'
}

export enum AddressType {
	F = 'f',
	T = 't',
	C = 'c',
	B = 'b',
	R = 'r',
	S = 's',
	N = 'n',
	Rf = 'rf'
}

export enum InviteReplyType {
	R = 'r',
	W = 'w'
}

export enum InviteReplyVerb {
	Accept = 'ACCEPT',
	Decline = 'DECLINE',
	Tentative = 'TENTATIVE'
}

export enum SetRecoveryAccountOp {
	SendCode = 'sendCode',
	ValidateCode = 'validateCode',
	ResendCode = 'resendCode',
	Reset = 'reset'
}
