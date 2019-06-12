export type Maybe<T> = T | null;

export interface ContactFrequencySpec {
	range: string;

	interval: string;
}

export interface MailItemHeaderInput {
	n: string;
}
/** Include one of these fields to query for a folder */
export interface GetFolderFolderInput {
	uuid?: Maybe<string>;

	parentFolderId?: Maybe<string>;

	path?: Maybe<string>;
}

export interface GetRightsInput {
	access?: Maybe<(Maybe<Right>)[]>;
}

export interface Right {
	right: string;
}

export interface Grantee {
	id?: Maybe<string>;

	type?: Maybe<string>;

	name?: Maybe<string>;
}

export interface Owner {
	by?: Maybe<string>;

	_content?: Maybe<string>;
}

export interface Cursor {
	id?: Maybe<string>;

	sortVal?: Maybe<string>;

	endSortVal?: Maybe<string>;

	includeOffset?: Maybe<boolean>;
}

export interface ExternalAccountTestInput {
	accountType?: Maybe<AccountType>;

	connectionType?: Maybe<ConnectionType>;

	emailAddress?: Maybe<string>;

	host: string;

	leaveOnServer?: Maybe<boolean>;

	port: string;

	username: string;

	password: string;
}

export interface ExternalAccountAddInput {
	accountType?: Maybe<AccountType>;

	connectionType?: Maybe<ConnectionType>;

	emailAddress?: Maybe<string>;

	host: string;

	isEnabled?: Maybe<boolean>;

	l: string;

	leaveOnServer?: Maybe<boolean>;

	name: string;

	password: string;

	port: string;

	username: string;
}

export interface AddMsgInput {
	folderId: string;

	content?: Maybe<StringContentInput>;
}

export interface StringContentInput {
	_content?: Maybe<string>;
}

export interface CalendarItemInput {
	id?: Maybe<string>;

	modifiedSequence?: Maybe<number>;

	revision?: Maybe<number>;

	componentNum?: Maybe<number>;

	message: CalendarItemMessageInput;
}

export interface CalendarItemMessageInput {
	folderId?: Maybe<string>;

	subject?: Maybe<string>;

	invitations?: Maybe<CalendarItemInviteInput>;

	mimeParts?: Maybe<(Maybe<MimePartInput>)[]>;

	emailAddresses?: Maybe<(Maybe<MailItemEmailAddressInput>)[]>;

	attachments?: Maybe<(Maybe<AttachmentInput>)[]>;

	replyType?: Maybe<InviteReplyType>;
}

export interface CalendarItemInviteInput {
	components: (Maybe<CalendarItemInviteComponentInput>)[];
}

export interface CalendarItemInviteComponentInput {
	name: string;

	location?: Maybe<string>;

	start?: Maybe<CalendarItemDateTimeInput>;

	end?: Maybe<CalendarItemDateTimeInput>;

	exceptId?: Maybe<CalendarOptionalItemDateTimeInput>;

	freeBusy?: Maybe<FreeBusyStatus>;

	allDay?: Maybe<boolean>;

	organizer?: Maybe<CalendarItemOrganizerInput>;

	recurrence?: Maybe<CalendarItemRecurrenceInput>;

	attendees?: Maybe<(Maybe<CalendarItemAttendeesInput>)[]>;

	alarms?: Maybe<(Maybe<CalendarItemAlarmInput>)[]>;

	class: CalendarItemClass;

	priority?: Maybe<string>;

	percentComplete?: Maybe<string>;

	status?: Maybe<InviteCompletionStatus>;

	noBlob?: Maybe<boolean>;

	description?: Maybe<(Maybe<CalendarItemInviteComponentDescriptionInput>)[]>;

	draft?: Maybe<boolean>;
}

export interface CalendarItemDateTimeInput {
	timezone?: Maybe<string>;

	date: string;
}

export interface CalendarOptionalItemDateTimeInput {
	timezone?: Maybe<string>;

	date?: Maybe<string>;
}

export interface CalendarItemOrganizerInput {
	address?: Maybe<string>;

	name?: Maybe<string>;

	sentBy?: Maybe<string>;
}

export interface CalendarItemRecurrenceInput {
	add?: Maybe<CalendarItemRecurrenceAddInput>;
}

export interface CalendarItemRecurrenceAddInput {
	rule?: Maybe<CalendarItemRecurrenceRuleInput>;
}

export interface CalendarItemRecurrenceRuleInput {
	interval?: Maybe<CalendarItemRecurrenceIntervalInput>;

	frequency?: Maybe<CalendarItemRecurrenceFrequency>;

	count?: Maybe<CalendarItemRecurrenceEndCountInput>;

	until?: Maybe<CalendarItemRecurrenceEndDateInput>;

	byday?: Maybe<CalendarItemRecurrenceByDayInput>;

	bymonthday?: Maybe<CalendarItemRecurrenceByMonthDayInput>;

	bymonth?: Maybe<CalendarItemRecurrenceByMonthInput>;

	bysetpos?: Maybe<CalendarItemRecurrenceBySetPosInput>;
}

export interface CalendarItemRecurrenceIntervalInput {
	intervalCount: number;

	zimbraPrefAutoAddAppointmentsToCalendar?: Maybe<boolean>;
}

export interface CalendarItemRecurrenceEndCountInput {
	number: number;
}

export interface CalendarItemRecurrenceEndDateInput {
	date: string;
}

export interface CalendarItemRecurrenceByDayInput {
	wkday?: Maybe<(Maybe<WkDayInput>)[]>;
}

export interface WkDayInput {
	day: Weekday;

	ordwk?: Maybe<number>;
}

export interface CalendarItemRecurrenceByMonthDayInput {
	dayList: string;
}

export interface CalendarItemRecurrenceByMonthInput {
	monthList: number;
}

export interface CalendarItemRecurrenceBySetPosInput {
	poslist: number;
}

export interface CalendarItemAttendeesInput {
	role?: Maybe<ParticipationRole>;

	participationStatus?: Maybe<ParticipationStatus>;

	rsvp?: Maybe<boolean>;

	address: string;

	name?: Maybe<string>;

	calendarUserType?: Maybe<string>;
}

export interface CalendarItemAlarmInput {
	action: AlarmAction;

	trigger: CalendarItemAlarmTriggerInput;

	attendees?: Maybe<CalendarItemAlarmAttendeesInput>;
}

export interface CalendarItemAlarmTriggerInput {
	relative?: Maybe<CalendarItemAlarmTriggerRelativeInput>;

	absolute?: Maybe<CalendarItemAlarmTriggerAbsoluteInput>;
}

export interface CalendarItemAlarmTriggerRelativeInput {
	weeks?: Maybe<number>;

	days?: Maybe<number>;

	hours?: Maybe<number>;

	minutes?: Maybe<number>;

	seconds?: Maybe<number>;

	relatedTo?: Maybe<AlarmRelatedTo>;

	negative?: Maybe<boolean>;
}

export interface CalendarItemAlarmTriggerAbsoluteInput {
	date: string;
}

export interface CalendarItemAlarmAttendeesInput {
	email: string;
}

export interface CalendarItemInviteComponentDescriptionInput {
	_content?: Maybe<string>;
}

export interface MimePartInput {
	body?: Maybe<boolean>;

	filename?: Maybe<string>;

	part?: Maybe<string>;

	content?: Maybe<string>;

	contentId?: Maybe<string>;

	contentType?: Maybe<string>;

	contentDisposition?: Maybe<string>;

	size?: Maybe<number>;

	mimeParts?: Maybe<(Maybe<MimePartInput>)[]>;

	url?: Maybe<string>;

	messageId?: Maybe<string>;

	attachments?: Maybe<(Maybe<AttachmentInput>)[]>;
}

export interface AttachmentInput {
	attachmentId?: Maybe<string>;

	existingAttachments?: Maybe<(Maybe<ExistingAttachmentInput>)[]>;
}

export interface ExistingAttachmentInput {
	messageId?: Maybe<string>;

	part?: Maybe<string>;
}

export interface MailItemEmailAddressInput {
	address: string;

	name?: Maybe<string>;

	type: AddressType;
}

export interface CreateContactInput {
	folderId?: Maybe<string>;

	tagNames?: Maybe<string>;

	attributes: ContactAttrsInput;
}

export interface ContactAttrsInput {
	firstName?: Maybe<string>;

	middleName?: Maybe<string>;

	lastName?: Maybe<string>;

	fullName?: Maybe<string>;

	maidenName?: Maybe<string>;

	namePrefix?: Maybe<string>;

	nameSuffix?: Maybe<string>;

	email?: Maybe<string>;

	email2?: Maybe<string>;

	workEmail?: Maybe<string>;

	workEmail2?: Maybe<string>;

	homeEmail?: Maybe<string>;

	homeEmail2?: Maybe<string>;

	phone?: Maybe<string>;

	phone2?: Maybe<string>;

	companyPhone?: Maybe<string>;

	companyPhone2?: Maybe<string>;

	otherPhone?: Maybe<string>;

	otherPhone2?: Maybe<string>;

	mobilePhone?: Maybe<string>;

	mobilePhone2?: Maybe<string>;

	homePhone?: Maybe<string>;

	homePhone2?: Maybe<string>;

	workPhone?: Maybe<string>;

	workPhone2?: Maybe<string>;

	pager?: Maybe<string>;

	pager2?: Maybe<string>;

	homeFax2?: Maybe<string>;

	workFax?: Maybe<string>;

	workFax2?: Maybe<string>;

	imAddress?: Maybe<string>;

	imAddress1?: Maybe<string>;

	imAddress2?: Maybe<string>;

	imAddress3?: Maybe<string>;

	imAddress4?: Maybe<string>;

	imAddress5?: Maybe<string>;

	nickname?: Maybe<string>;

	homeStreet?: Maybe<string>;

	homeCity?: Maybe<string>;

	homeFax?: Maybe<string>;

	homeState?: Maybe<string>;

	homePostalCode?: Maybe<string>;

	homeCountry?: Maybe<string>;

	homeURL?: Maybe<string>;

	workStreet?: Maybe<string>;

	workCity?: Maybe<string>;

	workState?: Maybe<string>;

	workPostalCode?: Maybe<string>;

	workCountry?: Maybe<string>;

	workURL?: Maybe<string>;

	jobTitle?: Maybe<string>;

	company?: Maybe<string>;

	department?: Maybe<string>;

	birthday?: Maybe<string>;

	anniversary?: Maybe<string>;

	website?: Maybe<string>;

	notes?: Maybe<string>;

	image?: Maybe<string>;

	userCertificate?: Maybe<string>;

	assistantPhone?: Maybe<string>;

	callbackPhone?: Maybe<string>;

	carPhone?: Maybe<string>;

	otherCity?: Maybe<string>;

	otherCountry?: Maybe<string>;

	otherFax?: Maybe<string>;

	otherPostalCode?: Maybe<string>;

	otherState?: Maybe<string>;

	otherStreet?: Maybe<string>;

	otherURL?: Maybe<string>;
	/** Used for contact lists */
	fileAs?: Maybe<string>;

	type?: Maybe<string>;
}

export interface ModifyContactInput {
	id: string;

	folderId?: Maybe<string>;

	tagNames?: Maybe<string>;

	attributes: ContactAttrsInput;

	memberOps?: Maybe<(Maybe<ContactListOps>)[]>;
}

export interface ContactListOps {
	op: string;

	type: string;

	value: string;
}

export interface NewMountpointSpec {
	name: string;

	owner?: Maybe<string>;

	view?: Maybe<SearchType>;

	flags?: Maybe<string>;

	ownerZimbraId?: Maybe<string>;

	sharedItemId?: Maybe<string>;

	color?: Maybe<number>;

	reminder?: Maybe<boolean>;

	parentFolderId?: Maybe<string>;
}

export interface SignatureInput {
	id?: Maybe<string>;

	name?: Maybe<string>;

	content?: Maybe<SignatureContentInput>;

	contentId?: Maybe<string>;
}

export interface SignatureContentInput {
	type?: Maybe<string>;

	_content?: Maybe<string>;
}

export interface DeleteAppointmentInput {
	instanceDate?: Maybe<InstanceDate>;

	inviteId: string;

	componentNum: string;

	start?: Maybe<number>;

	message?: Maybe<CalendarItemMessageInput>;
}

export interface InstanceDate {
	date?: Maybe<string>;
}

export interface NameIdInput {
	id?: Maybe<string>;

	name?: Maybe<string>;
}

export interface GrantRightsInput {
	access?: Maybe<(Maybe<AccountAceInfoInput>)[]>;
}
/** Used by GrantRightsRequest */
export interface AccountAceInfoInput {
	zimbraId?: Maybe<string>;

	granteeType: GranteeType;

	right: string;

	address?: Maybe<string>;

	key?: Maybe<string>;

	password?: Maybe<string>;

	deny?: Maybe<boolean>;

	checkGrantee?: Maybe<boolean>;
}

export interface FolderActionInput {
	id: string;

	op: string;

	grant?: Maybe<(Maybe<GrantInput>)[]>;

	name?: Maybe<string>;

	folderId?: Maybe<string>;

	zimbraId?: Maybe<string>;
}

export interface GrantInput {
	address?: Maybe<string>;

	granteeType: GranteeType;

	key?: Maybe<string>;

	password?: Maybe<string>;

	permissions: string;

	zimbraId?: Maybe<string>;
}

export interface ForwardAppointmentInviteInput {
	id: string;

	message: ForwardMessageInput;
}

export interface ForwardMessageInput {
	subject?: Maybe<string>;

	mimeParts?: Maybe<(Maybe<MimePartInput>)[]>;

	emailAddresses?: Maybe<(Maybe<MailItemEmailAddressInput>)[]>;
}

export interface ExternalAccountImportInput {
	accountType?: Maybe<AccountType>;

	id: string;
}

export interface EnableTwoFactorAuthInput {
	name: string;

	password?: Maybe<string>;

	twoFactorCode?: Maybe<string>;

	authToken?: Maybe<string>;
}

export interface ExternalAccountModifyAttrsInput {
	id?: Maybe<string>;

	accountType?: Maybe<AccountType>;

	defaultSignature?: Maybe<string>;

	description?: Maybe<string>;

	emailAddress?: Maybe<string>;

	fromDisplay?: Maybe<string>;

	name?: Maybe<string>;

	replyToAddress?: Maybe<string>;

	replyToDisplay?: Maybe<string>;

	replyToEnabled?: Maybe<boolean>;

	storeAndForward?: Maybe<string>;

	useAddressForForwardReply?: Maybe<boolean>;

	username?: Maybe<string>;

	host?: Maybe<string>;

	signatureValue?: Maybe<string>;

	importOnly?: Maybe<boolean>;

	forwardReplySignature?: Maybe<string>;

	connectionType?: Maybe<ConnectionType>;

	isEnabled?: Maybe<boolean>;

	port?: Maybe<string>;

	smtpPort?: Maybe<string>;
}

export interface IdentityAttrsInput {
	zimbraPrefIdentityId?: Maybe<string>;

	zimbraPrefDefaultSignatureId?: Maybe<string>;

	zimbraPrefForwardReplySignatureId?: Maybe<string>;

	zimbraPrefForwardReplyFormat?: Maybe<string>;

	zimbraPrefFromAddress?: Maybe<string>;

	zimbraPrefFromAddressType?: Maybe<string>;

	zimbraPrefFromDisplay?: Maybe<string>;

	zimbraPrefIdentityName?: Maybe<string>;

	zimbraPrefMailSignatureStyle?: Maybe<string>;

	zimbraPrefReplyToAddress?: Maybe<string>;

	zimbraPrefReplyToDisplay?: Maybe<string>;

	zimbraPrefReplyToEnabled?: Maybe<boolean>;

	zimbraPrefSaveToSent?: Maybe<boolean>;

	zimbraPrefSentMailFolder?: Maybe<string>;
}

export interface PreferencesInput {
	zimbraPrefAutoAddAppointmentsToCalendar?: Maybe<boolean>;

	zimbraPrefCalendarAutoAddInvites?: Maybe<boolean>;

	zimbraPrefDefaultCalendarId?: Maybe<string>;

	zimbraPrefCalendarFirstDayOfWeek?: Maybe<number>;

	zimbraPrefCalendarInitialView?: Maybe<PrefCalendarInitialView>;

	zimbraPrefCalendarReminderEmail?: Maybe<string>;

	zimbraPrefCalendarWorkingHours?: Maybe<string>;

	zimbraPrefDelegatedSendSaveTarget?: Maybe<PrefDelegatedSendSaveTarget>;

	zimbraPrefDisplayExternalImages?: Maybe<boolean>;

	zimbraPrefGroupMailBy?: Maybe<string>;

	zimbraPrefMailPollingInterval?: Maybe<string>;

	zimbraPrefMailRequestReadReceipts?: Maybe<boolean>;

	zimbraPrefMailSelectAfterDelete?: Maybe<PrefMailSelectAfterDelete>;

	zimbraPrefMailSendReadReceipts?: Maybe<PrefMailSendReadReceipts>;

	zimbraPrefMailTrustedSenderList?: Maybe<(Maybe<string>)[]>;

	zimbraPrefMarkMsgRead?: Maybe<number>;

	zimbraPrefOutOfOfficeFromDate?: Maybe<string>;

	zimbraPrefOutOfOfficeExternalReply?: Maybe<string>;

	zimbraPrefOutOfOfficeExternalReplyEnabled?: Maybe<boolean>;

	zimbraPrefOutOfOfficeReply?: Maybe<string>;

	zimbraPrefOutOfOfficeReplyEnabled?: Maybe<boolean>;

	zimbraPrefOutOfOfficeStatusAlertOnLogin?: Maybe<boolean>;

	zimbraPrefOutOfOfficeSuppressExternalReply?: Maybe<boolean>;

	zimbraPrefOutOfOfficeUntilDate?: Maybe<string>;

	zimbraPrefReadingPaneEnabled?: Maybe<boolean>;

	zimbraPrefReadingPaneLocation?: Maybe<ReadingPaneLocation>;

	zimbraPrefShowFragments?: Maybe<boolean>;

	zimbraPrefWebClientOfflineBrowserKey?: Maybe<string>;

	zimbraPrefTimeZoneId?: Maybe<string>;

	zimbraPrefLocale?: Maybe<string>;

	zimbraPrefAppleIcalDelegationEnabled?: Maybe<boolean>;

	zimbraPrefMailForwardingAddress?: Maybe<string>;

	zimbraPrefMailLocalDeliveryDisabled?: Maybe<boolean>;
}

export interface ZimletPreferenceInput {
	name: string;

	presence: string;
}

export interface FilterInput {
	name: string;

	active: boolean;

	actions?: Maybe<(Maybe<FilterActionInput>)[]>;

	conditions?: Maybe<(Maybe<FilterConditionInput>)[]>;
}

export interface FilterActionInput {
	keep?: Maybe<(Maybe<BasicActionInput>)[]>;

	discard?: Maybe<(Maybe<BasicActionInput>)[]>;

	fileInto?: Maybe<(Maybe<FileIntoActionInput>)[]>;

	flag?: Maybe<(Maybe<FlagActionInput>)[]>;

	tag?: Maybe<(Maybe<TagActionInput>)[]>;

	redirect?: Maybe<(Maybe<RedirectActionInput>)[]>;

	reply?: Maybe<(Maybe<ReplyActionInput>)[]>;

	notify?: Maybe<(Maybe<NotifyActionInput>)[]>;

	stop?: Maybe<(Maybe<BasicActionInput>)[]>;
}

export interface BasicActionInput {
	index?: Maybe<number>;
}

export interface FileIntoActionInput {
	folderPath?: Maybe<string>;

	copy?: Maybe<boolean>;

	index?: Maybe<number>;
}

export interface FlagActionInput {
	flagName?: Maybe<string>;

	index?: Maybe<number>;
}

export interface TagActionInput {
	tagName: string;

	index?: Maybe<number>;
}

export interface RedirectActionInput {
	address?: Maybe<string>;

	copy?: Maybe<boolean>;

	index?: Maybe<number>;
}

export interface ReplyActionInput {
	index?: Maybe<number>;

	content?: Maybe<(Maybe<string>)[]>;
}

export interface NotifyActionInput {
	address?: Maybe<string>;

	subject?: Maybe<string>;

	maxBodySize?: Maybe<number>;

	origHeaders?: Maybe<string>;

	index?: Maybe<number>;

	content?: Maybe<(Maybe<string>)[]>;
}

export interface FilterConditionInput {
	allOrAny: FilterMatchCondition;

	addressBook?: Maybe<(Maybe<HeaderCheckConditionInput>)[]>;

	address?: Maybe<(Maybe<AddressConditionInput>)[]>;

	attachment?: Maybe<(Maybe<BasicConditionInput>)[]>;

	body?: Maybe<(Maybe<BodyConditionInput>)[]>;

	bulk?: Maybe<(Maybe<BasicConditionInput>)[]>;

	contactRanking?: Maybe<(Maybe<HeaderCheckConditionInput>)[]>;

	conversation?: Maybe<(Maybe<ConversationConditionInput>)[]>;

	date?: Maybe<(Maybe<DateConditionInput>)[]>;

	facebook?: Maybe<(Maybe<BasicConditionInput>)[]>;

	flag?: Maybe<(Maybe<FlagConditionInput>)[]>;

	headerExists?: Maybe<(Maybe<HeaderCheckConditionInput>)[]>;

	header?: Maybe<(Maybe<HeaderConditionInput>)[]>;

	importance?: Maybe<(Maybe<ImportanceConditionInput>)[]>;

	invite?: Maybe<(Maybe<InviteConditionInput>)[]>;

	linkedin?: Maybe<(Maybe<BasicConditionInput>)[]>;

	list?: Maybe<(Maybe<BasicConditionInput>)[]>;

	me?: Maybe<(Maybe<HeaderCheckConditionInput>)[]>;

	mimeHeader?: Maybe<(Maybe<MimeHeaderConditionInput>)[]>;

	size?: Maybe<(Maybe<SizeConditionInput>)[]>;

	twitter?: Maybe<(Maybe<BasicConditionInput>)[]>;

	communityRequests?: Maybe<(Maybe<BasicConditionInput>)[]>;

	communityContent?: Maybe<(Maybe<BasicConditionInput>)[]>;

	communityConnections?: Maybe<(Maybe<BasicConditionInput>)[]>;
}

export interface HeaderCheckConditionInput {
	header: string;

	index?: Maybe<number>;

	negative?: Maybe<boolean>;
}

export interface AddressConditionInput {
	header: string;

	part: string;

	stringComparison: string;

	caseSensitive?: Maybe<boolean>;

	value: string;

	valueComparison?: Maybe<string>;

	countComparison?: Maybe<string>;

	index?: Maybe<number>;

	negative?: Maybe<boolean>;
}

export interface BasicConditionInput {
	index?: Maybe<number>;

	negative?: Maybe<boolean>;
}

export interface BodyConditionInput {
	caseSensitive?: Maybe<boolean>;

	value?: Maybe<string>;

	index?: Maybe<number>;

	negative?: Maybe<boolean>;
}

export interface ConversationConditionInput {
	where?: Maybe<string>;

	index?: Maybe<number>;

	negative?: Maybe<boolean>;
}

export interface DateConditionInput {
	dateComparison?: Maybe<string>;

	date?: Maybe<number>;

	index?: Maybe<number>;

	negative?: Maybe<boolean>;
}

export interface FlagConditionInput {
	flagName: string;

	index?: Maybe<number>;

	negative?: Maybe<boolean>;
}

export interface HeaderConditionInput {
	header?: Maybe<string>;

	stringComparison?: Maybe<string>;

	valueComparison?: Maybe<string>;

	countComparison?: Maybe<string>;

	value?: Maybe<string>;

	caseSensitive?: Maybe<boolean>;

	index?: Maybe<number>;

	negative?: Maybe<boolean>;
}

export interface ImportanceConditionInput {
	importance: Importance;

	index?: Maybe<number>;

	negative?: Maybe<boolean>;
}

export interface InviteConditionInput {
	methods?: Maybe<(Maybe<string>)[]>;

	index?: Maybe<number>;

	negative?: Maybe<boolean>;
}

export interface MimeHeaderConditionInput {
	header?: Maybe<string>;

	stringComparison?: Maybe<string>;

	value?: Maybe<string>;

	caseSensitive?: Maybe<boolean>;

	index?: Maybe<number>;

	negative?: Maybe<boolean>;
}

export interface SizeConditionInput {
	numberComparison?: Maybe<string>;

	size?: Maybe<string>;

	index?: Maybe<number>;

	negative?: Maybe<boolean>;
}

export interface SearchFolderInput {
	id: string;

	query: string;

	types: FolderView;
}

export interface WhiteBlackListInput {
	whiteList?: Maybe<WhiteBlackListArrInput>;

	blackList?: Maybe<WhiteBlackListArrInput>;
}

export interface WhiteBlackListArrInput {
	addr?: Maybe<(Maybe<WhiteBlackAddressOpts>)[]>;
}

export interface WhiteBlackAddressOpts {
	_content: string;

	op?: Maybe<string>;
}

export interface RevokeRightsInput {
	access?: Maybe<(Maybe<AccountAceInfoInput>)[]>;
}

export interface SendMessageInput {
	id?: Maybe<string>;

	origId?: Maybe<string>;

	folderId?: Maybe<string>;

	attach?: Maybe<(Maybe<AttachmentInput>)[]>;

	attachmentId?: Maybe<string>;

	replyType?: Maybe<string>;

	inReplyTo?: Maybe<string>;

	flags?: Maybe<string>;

	autoSendTime?: Maybe<number>;

	draftId?: Maybe<string>;

	entityId?: Maybe<string>;

	subject?: Maybe<string>;

	mimeParts?: Maybe<(Maybe<MimePartInput>)[]>;

	emailAddresses?: Maybe<(Maybe<MailItemEmailAddressInput>)[]>;

	attachments?: Maybe<(Maybe<AttachmentInput>)[]>;
}

export interface InviteReplyInput {
	componentNum: number;

	id: string;

	verb: InviteReplyVerb;

	updateOrganizer?: Maybe<boolean>;

	message?: Maybe<CalendarItemMessageInput>;

	exceptId?: Maybe<InstanceDate>;
}

export interface ShareNotificationInput {
	item: ShareNotificationItemInput;

	address: ShareNotificaitonEmailAddressInput;

	notes?: Maybe<string>;
}

export interface ShareNotificationItemInput {
	id: string;
}

export interface ShareNotificaitonEmailAddressInput {
	address: string;

	type?: Maybe<AddressType>;

	personalName?: Maybe<string>;
}

export interface MailboxMetadataSectionAttrsInput {
	zimbraPrefCustomFolderTreeOpen?: Maybe<boolean>;

	zimbraPrefFoldersExpanded?: Maybe<string>;

	zimbraPrefFolderTreeSash?: Maybe<number>;

	zimbraPrefGenerateLinkPreviews?: Maybe<boolean>;

	zimbraPrefGroupByList?: Maybe<string>;

	zimbraPrefMessageListDensity?: Maybe<string>;

	zimbraPrefMultitasking?: Maybe<string>;

	zimbraPrefReadingPaneSashHorizontal?: Maybe<number>;

	zimbraPrefReadingPaneSashVertical?: Maybe<number>;

	zimbraPrefSmartFolderTreeOpen?: Maybe<boolean>;

	zimbraPrefUndoSendEnabled?: Maybe<boolean>;

	zimbraPrefUndoSendTimeout?: Maybe<number>;

	archivedFolder?: Maybe<string>;

	zimbraPrefSMIMEDefaultSetting?: Maybe<string>;

	zimbraPrefSMIMELastOperation?: Maybe<string>;

	zimbraPrefContactSourceFolderID?: Maybe<string>;
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
	link?: Maybe<NewMountpointSpec>;
}

export interface EmailAddressInput {
	email: string;

	name: string;

	shortName: string;
}

export interface ExternalAccount {
	id: string;

	name: string;

	accountType?: Maybe<AccountType>;

	isEnabled?: Maybe<number>;

	host: string;

	port: string;

	connectionType?: Maybe<ConnectionType>;

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

	value?: Maybe<boolean>;
}

export interface FolderQueryInput {
	uuid?: Maybe<string>;

	id?: Maybe<string>;

	view?: Maybe<FolderView>;
}

export interface ModifyIdentityInput {
	id: string;

	attrs?: Maybe<IdentityAttrsInput>;
}

export enum ResetPasswordStatus {
	Enabled = 'enabled',
	Disabled = 'disabled',
	Suspended = 'suspended'
}

export enum PrefCalendarInitialView {
	Day = 'day',
	List = 'list',
	Month = 'month',
	Week = 'week',
	WorkWeek = 'workWeek',
	Year = 'year'
}

export enum PrefDelegatedSendSaveTarget {
	Owner = 'owner',
	Sender = 'sender',
	Both = 'both',
	None = 'none'
}

export enum PrefMailSelectAfterDelete {
	Next = 'next',
	Previous = 'previous',
	Adaptive = 'adaptive'
}

export enum PrefMailSendReadReceipts {
	Prompt = 'prompt',
	Always = 'always',
	Never = 'never'
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
