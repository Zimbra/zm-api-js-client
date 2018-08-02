/* tslint:disable */

export interface MailItem {
	id?: string | null;
	size?: number | null;
	date?: number | null;
	folderId?: string | null;
	subject?: string | null;
	emailAddresses?: EmailAddress[] | null;
	excerpt?: string | null;
	conversationId?: string | null;
	flags?: string | null;
	tags?: string | null;
	tagNames?: string | null;
	revision?: number | null;
	changeDate?: number | null;
	modifiedSequence?: number | null;
	invitations?: InviteInfo[] | null;
	sortField?: string | null;
	share?: ShareNotification[] | null;
	replyType?: string | null;
}
/* Zimbra GraphQL Queries- [[SOAP API Reference]](https://files.zimbra.com/docs/soap_api/8.7.11/api-reference/index.html)- [[SOAP Documentation]](https://github.com/Zimbra/zm-mailbox/blob/develop/store/docs/soap.txt)- [[SOAP XML-to-JSON Documentation]](https://wiki.zimbra.com/wiki/Json_format_to_represent_soap) */
export interface Query {
	accountInfo?: AccountInfo | null;
	folder?: Folder | null;
	freeBusy?: FreeBusy[] | null;
	getContact?: Contact | null;
	getContactFrequency?: ContactFrequencyResponse | null;
	getConversation?: Conversation | null;
	getFilterRules?: Filter[] | null;
	getFolder?: Folder | null;
	getMailboxMetadata?: MailboxMetadata | null;
	getMessage?: MessageInfo | null;
	getSearchFolder?: Folder | null;
	getTask?: boolean | null;
	noop?: boolean | null;
	preferences?: Preferences | null;
	relatedContacts?: RelatedContacts | null;
	shareInfos?: ShareInfo[] | null;
	setRecoveryAccount?: boolean | null;
	recoverAccount?: RecoverAccount | null;
	search?: SearchResponse | null /* Perform a search for a variety types using a flexible query interface.[[SOAP Search API Documentation]](https://files.zimbra.com/docs/soap_api/8.7.11/api-reference/zimbraMail/Search.html)[[Query Tips]](https://wiki.zimbra.com/wiki/Zimbra_Web_Client_Search_Tips) */;
	taskFolders?: Folder[] | null;
}

export interface AccountInfo {
	id: string;
	name?: string | null;
	publicURL?: string | null;
	rest?: string | null;
	soapURL?: string | null;
	version?: string | null;
	identities?: Identities | null;
	dataSources: DataSources;
	signatures?: Signatures | null;
	attrs?: AccountInfoAttrs | null;
	prefs?: Preferences | null;
	license?: License | null;
}

export interface Identities {
	identity?: Identity[] | null;
}

export interface Identity {
	id: string;
	name?: string | null;
	_attrs?: IdentityAttrs | null;
	defaultSignature?: string | null;
}

export interface IdentityAttrs {
	zimbraPrefIdentityId: string;
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

export interface DataSources {
	imap?: DataSource[] | null;
	pop3?: DataSource[] | null;
	cal?: DataSource[] | null;
}

export interface DataSource {
	id: string;
	connectionType?: string | null;
	defaultSignature?: string | null;
	emailAddress?: string | null;
	l?: string | null;
	forwardReplySignature?: string | null;
	fromDisplay?: string | null;
	host?: string | null;
	importOnly?: boolean | null;
	isEnabled?: boolean | null;
	name?: string | null;
	pollingInterval?: number | null;
	port?: string | null;
	replyToAddress?: string | null;
	replyToDisplay?: string | null;
	smtpPort?: string | null;
	useAddressForForwardReply?: boolean | null;
	username?: string | null;
	failingSince?: string | null;
	lastError?: string[] | null;
}

export interface Signatures {
	signature?: Signature[] | null;
}

export interface Signature {
	id?: string | null;
	name?: string | null;
	content?: SignatureContent[] | null;
}

export interface SignatureContent {
	type?: string | null;
	_content?: string | null;
}

export interface AccountInfoAttrs {
	displayName?: string | null;
	zimbraFeatureMailEnabled?: boolean | null;
	zimbraFeatureCalendarEnabled?: boolean | null;
	zimbraFeatureRelatedContactsEnabled?: boolean | null;
	zimbraFeatureChangePasswordEnabled?: boolean | null;
	zimbraFeatureResetPasswordEnabled?: boolean | null;
}

export interface Preferences {
	zimbraPrefAutoAddAppointmentsToCalendar?: boolean | null;
	zimbraPrefCalendarAutoAddInvites?: boolean | null;
	zimbraPrefCalendarFirstDayOfWeek?: string | null;
	zimbraPrefCalendarInitialView?: PrefCalendarInitialView | null;
	zimbraPrefCalendarReminderEmail?: string | null;
	zimbraPrefCalendarWorkingHours?: string | null;
	zimbraPrefDefaultCalendarId?: number | null;
	zimbraPrefDeleteInviteOnReply?: boolean | null;
	zimbraPrefDisplayExternalImages?: boolean | null;
	zimbraPrefGroupMailBy?: string | null;
	zimbraPrefMailPollingInterval?: string | null;
	zimbraPrefMailSelectAfterDelete?: PrefMailSelectAfterDelete | null;
	zimbraPrefMailTrustedSenderList?: string[] | null;
	zimbraPrefMarkMsgRead?: number | null;
	zimbraPrefOutOfOfficeFromDate?: string | null;
	zimbraPrefOutOfOfficeReply?: string | null;
	zimbraPrefOutOfOfficeReplyEnabled?: boolean | null;
	zimbraPrefOutOfOfficeStatusAlertOnLogin?: boolean | null;
	zimbraPrefOutOfOfficeUntilDate?: string | null;
	zimbraPrefReadingPaneEnabled?: boolean | null;
	zimbraPrefReadingPaneLocation?: ReadingPaneLocation | null;
	zimbraPrefPasswordRecoveryAddress?: string | null;
	zimbraPrefPasswordRecoveryAddressStatus?: PasswordRecoveryAddressStatus | null;
	zimbraPrefShowFragments?: boolean | null;
}

export interface License {
	status: LicenseStatus;
	attr?: LicenseAttrs[] | null;
}

export interface LicenseAttrs {
	name: string;
	_content: boolean;
}

export interface Folder {
	absFolderPath?: string | null;
	acl?: ACL | null;
	appointments?: SearchResponse | null;
	tasks?: SearchResponse | null;
	color?: number | null;
	flags?: string | null;
	id?: string | null;
	uuid?: string | null;
	name?: string | null;
	nonFolderItemCount?: number | null;
	nonFolderItemCountTotal?: number | null;
	linkedFolders?: Folder[] | null;
	folders?: Folder[] | null;
	search?: Folder[] | null;
	owner?: string | null;
	revision?: number | null;
	view?: FolderView | null;
	parentFolderId?: string | null;
	unread?: number | null;
	query?: string | null;
	permissions?: string | null;
	ownerZimbraId?: string | null;
	sharedItemId?: string | null;
}

export interface ACL {
	grant?: ACLGrant[] | null;
}

export interface ACLGrant {
	address?: string | null;
	permissions?: string | null;
	granteeType?: GranteeType | null;
	zimbraId?: string | null;
	password?: string | null;
	key?: string | null;
}

export interface SearchResponse {
	contacts?: Contact[] | null;
	messages?: MessageInfo[] | null;
	conversations?: Conversation[] | null;
	tasks?: CalendarItemHitInfo[] | null;
	appointments?: CalendarItemHitInfo[] | null;
	more?: boolean | null;
	offset?: number | null;
	sortBy?: string | null;
}

export interface Contact {
	id: string;
	date?: number | null;
	folderId?: string | null;
	revision?: number | null;
	sortField?: string | null;
	attributes?: ContactAttributes | null;
}

export interface ContactAttributes {
	anniversary?: string | null;
	birthday?: string | null;
	company?: string | null;
	email?: string | null;
	email2?: string | null;
	fax?: string | null;
	firstName?: string | null;
	fullName?: string | null;
	homeCity?: string | null;
	homeEmail?: string | null;
	homePhone?: string | null;
	homePostal?: string | null;
	homeState?: string | null;
	homeStreet?: string | null;
	im?: string | null;
	im2?: string | null;
	im3?: string | null;
	im4?: string | null;
	jobTitle?: string | null;
	lastName?: string | null;
	middleName?: string | null;
	mobile?: string | null;
	nickname?: string | null;
	pager?: string | null;
	phone?: string | null;
	website?: string | null;
	workCity?: string | null;
	workEmail?: string | null;
	workPhone?: string | null;
	workPostal?: string | null;
	workState?: string | null;
	workStreet?: string | null;
}

export interface MessageInfo extends MailItem {
	id?: string | null;
	size?: number | null;
	date?: number | null;
	folderId?: string | null;
	subject?: string | null;
	emailAddresses?: EmailAddress[] | null;
	excerpt?: string | null;
	conversationId?: string | null;
	flags?: string | null;
	tags?: string | null;
	tagNames?: string | null;
	revision?: number | null;
	changeDate?: number | null;
	modifiedSequence?: number | null;
	invitations?: InviteInfo[] | null;
	sortField?: string | null;
	mimeParts?: MimePart[] | null;
	to?: EmailAddress[] | null;
	from?: EmailAddress[] | null;
	cc?: EmailAddress[] | null;
	bcc?: EmailAddress[] | null;
	sender?: EmailAddress[] | null;
	html?: string | null;
	text?: string | null;
	attachments?: MimePart[] | null;
	inlineAttachments?: MimePart[] | null;
	share?: ShareNotification[] | null;
	replyType?: string | null;
}

export interface EmailAddress {
	address?: string | null;
	name?: string | null;
	type?: string | null;
	displayName?: string | null;
}

export interface InviteInfo {
	type: InviteType;
	components?: InviteComponent[] | null;
}

export interface InviteComponent {
	alarms?: CalendarItemAlarm[] | null /* duration: DurationInfo # dur - TODO */;
	recurrence?: RecurrenceInfo[] | null;
	allDay?: boolean | null;
	attendees?: CalendarItemAttendee[] | null;
	calendarItemId?: string | null;
	ciFolder?: string | null;
	class?: CalendarItemClass | null;
	completedDateTime?: string | null;
	componentNum?: number | null;
	date?: number | null;
	description?: StringContent[] | null;
	draft?: boolean | null;
	end?: DtTimeInfo[] | null;
	excerpt?: string | null;
	freeBusy?: FreeBusyStatus | null;
	freeBusyActual?: FreeBusyStatus | null;
	htmlDescription?: StringContent[] | null;
	isException?: boolean | null;
	isOrganizer?: boolean | null;
	location?: string | null;
	name?: string | null;
	noBlob?: boolean | null;
	organizer?: CalOrganizer | null;
	percentComplete?: string | null;
	priority?: string | null;
	utcRecurrenceId?: string | null;
	rsvp?: boolean | null;
	sequence?: number | null;
	start?: DtTimeInfo[] | null;
	status?: InviteCompletionStatus | null;
	uid?: string | null;
	x_uid?: string | null;
	aid?: string | null;
}

export interface CalendarItemAlarm {
	action: AlarmAction;
	trigger?: CalendarItemAlarmTrigger[] | null;
}

export interface CalendarItemAlarmTrigger {
	relative?: CalendarItemAlarmTriggerRelative[] | null;
}

export interface CalendarItemAlarmTriggerRelative {
	weeks?: number | null;
	days?: number | null;
	hours?: number | null;
	minutes?: number | null;
	seconds?: number | null;
	relatedTo: AlarmRelatedTo;
	negative: boolean;
}

export interface RecurrenceInfo {
	add?: AddRecurrenceInfo[] | null;
	exclude?: ExcludeRecurrenceInfo[] | null;
	except?: ExceptionRuleInfo[] | null;
	cancel?: CancelRuleInfo[] | null;
	rule?: SimpleRepeatingRule[] | null /* dates: [SingleDates] # TODO */;
}

export interface AddRecurrenceInfo {
	add?: AddRecurrenceInfo[] | null;
	exclude?: ExcludeRecurrenceInfo[] | null;
	except?: ExceptionRuleInfo[] | null;
	cancel?: CancelRuleInfo[] | null;
	rule?: SimpleRepeatingRule[] | null /* dates: SingleDates # TODO */;
}

export interface ExcludeRecurrenceInfo {
	exclude?: ExcludeRecurrenceInfo[] | null;
	except?: ExceptionRuleInfo[] | null;
}

export interface ExceptionRuleInfo {
	rangeType?: number | null;
	recurId?: string | null;
	tz?: string | null;
	ridZ?: string | null;
	add?: AddRecurrenceInfo[] | null;
	exclude?: ExcludeRecurrenceInfo[] | null;
}

export interface CancelRuleInfo {
	rangeType?: number | null;
	recurId?: string | null;
	tz?: string | null;
	ridZ?: string | null;
}

export interface SimpleRepeatingRule {
	frequency?: CalendarItemRecurrenceFrequency | null;
	interval?: IntervalRule[] | null;
	byday?: ByDayRule[] | null;
}

export interface IntervalRule {
	intervalCount?: number | null;
}

export interface ByDayRule {
	wkday?: WkDay[] | null;
}

export interface WkDay {
	day?: Weekday | null;
	ordwk?: number | null;
}

export interface CalendarItemAttendee {
	role?: ParticipationRole | null;
	participationStatus?: ParticipationStatus | null;
	rsvp?: boolean | null;
	address?: string | null;
	name?: string | null;
}

export interface StringContent {
	_content?: string | null;
}

export interface DtTimeInfo {
	date?: string | null;
	timezone?: string | null;
}

export interface CalOrganizer {
	address?: string | null;
	name?: string | null;
	url?: string | null;
	sentBy?: string | null;
}

export interface ShareNotification {
	truncated?: boolean | null;
	content?: string | null;
}

export interface MimePart {
	body?: boolean | null;
	filename?: string | null;
	part?: string | null;
	content?: string | null;
	contentId?: string | null;
	contentType?: string | null;
	contentDisposition?: string | null;
	size?: number | null;
	mimeParts?: MimePart[] | null;
	url?: string | null;
	messageId?: string | null;
}

export interface Conversation extends MailItem {
	id?: string | null;
	size?: number | null;
	date?: number | null;
	folderId?: string | null;
	subject?: string | null;
	excerpt?: string | null;
	emailAddresses?: EmailAddress[] | null;
	conversationId?: string | null;
	flags?: string | null;
	tags?: string | null;
	tagNames?: string | null;
	revision?: number | null;
	changeDate?: number | null;
	modifiedSequence?: number | null;
	invitations?: InviteInfo[] | null;
	sortField?: string | null;
	messages?: MessageInfo[] | null;
	numMessages?: number | null;
	unread?: number | null;
	share?: ShareNotification[] | null;
	replyType?: string | null;
}

export interface CalendarItemHitInfo {
	alarm?: boolean | null;
	allDay?: boolean | null;
	changeDate?: number | null;
	class: CalendarItemClass;
	componentNum?: number | null;
	date?: number | null;
	duration?: number | null;
	excerpt?: string | null;
	flags?: string | null;
	folderId: string;
	freeBusy?: FreeBusyStatus | null;
	freeBusyActual?: FreeBusyStatus | null;
	id: string;
	instances?: Instance[] | null;
	invitations?: Invitation[] | null;
	inviteId: string;
	isOrganizer?: boolean | null;
	isRecurring?: boolean | null;
	location?: string | null;
	modifiedSequence?: number | null;
	name?: string | null;
	organizer?: CalOrganizer | null;
	participationStatus?: ParticipationStatus | null;
	percentComplete?: string | null;
	priority?: number | null;
	revision?: number | null;
	utcRecurrenceId?: string | null;
	size?: number | null;
	sortField?: string | null;
	status?: InviteCompletionStatus | null;
	tagNames?: string | null;
	tags?: string | null;
	uid?: string | null;
	x_uid?: string | null;
	aid?: string | null;
}

export interface Instance {
	start?: number | null;
	dueDate?: number | null;
	tzoDue?: number | null;
	utcRecurrenceId?: string | null;
	isException?: boolean | null;
	alarm?: boolean | null;
	allDay?: boolean | null;
	changeDate?: number | null;
	class?: CalendarItemClass | null;
	componentNum?: number | null;
	date?: number | null;
	duration?: number | null;
	excerpt?: string | null;
	flags?: string | null;
	freeBusy?: FreeBusyStatus | null;
	freeBusyActual?: FreeBusyStatus | null;
	inviteId?: string | null;
	location?: string | null;
	modifiedSequence?: number | null;
	name?: string | null;
	organizer?: CalOrganizer | null;
	participationStatus?: ParticipationStatus | null;
	revision?: number | null;
	status?: InviteCompletionStatus | null;
}

export interface Invitation {
	type: string;
	sequenceNumber: number;
	id: number;
	componentNum: number;
	recurrenceId?: string | null;
	tz?: CalTZInfo | null;
	components: InviteComponent[];
	mimeParts?: MimePart | null;
}

export interface CalTZInfo {
	id?: string | null;
	timezoneStdOffset?: number | null;
	timezoneDaylightOffset?: number | null;
	stdname?: string | null;
	dayname?: string | null;
	standard?: TzOnsetInfo | null;
	daylight?: TzOnsetInfo | null;
}

export interface TzOnsetInfo {
	week?: number | null;
	wkday?: number | null;
	mon?: number | null;
	mday?: number | null;
	hour?: number | null;
	min?: number | null;
	sec?: number | null;
}

export interface FreeBusy {
	id: string;
	tentative?: FreeBusyInstance[] | null;
	busy?: FreeBusyInstance[] | null;
	unavailable?: FreeBusyInstance[] | null;
	nodata?: FreeBusyInstance[] | null;
	free?: FreeBusyInstance[] | null;
}

export interface FreeBusyInstance {
	start?: number | null;
	end?: number | null;
}

export interface ContactFrequencyResponse {
	data?: ContactFrequencyData[] | null;
}

export interface ContactFrequencyData {
	by?: string | null;
	dataPoint?: ContactFrequencyDataPoints[] | null;
}

export interface ContactFrequencyDataPoints {
	label?: number | null;
	value?: number | null;
}

export interface Filter {
	name: string;
	active: boolean;
	actions?: FilterAction[] | null;
	conditions?: FilterCondition[] | null;
}

export interface FilterAction {
	keep?: BasicAction[] | null;
	discard?: BasicAction[] | null;
	fileInto?: FileIntoAction[] | null;
	flag?: FlagAction[] | null;
	tag?: TagAction[] | null;
	redirect?: RedirectAction[] | null;
	reply?: ReplyAction[] | null;
	notify?: NotifyAction[] | null;
	stop?: BasicAction[] | null;
}

export interface BasicAction {
	index?: number | null;
}

export interface FileIntoAction {
	folderPath?: string | null;
	copy?: boolean | null;
	index?: number | null;
}

export interface FlagAction {
	flagName?: string | null;
	index?: number | null;
}

export interface TagAction {
	tagName: string;
	index?: number | null;
}

export interface RedirectAction {
	address?: string | null;
	copy?: boolean | null;
	index?: number | null;
}

export interface ReplyAction {
	index?: number | null;
	content?: string[] | null;
}

export interface NotifyAction {
	address?: string | null;
	subject?: string | null;
	maxBodySize?: number | null;
	origHeaders?: string | null;
	index?: number | null;
	content?: string[] | null;
}

export interface FilterCondition {
	allOrAny: FilterMatchCondition;
	addressBook?: HeaderCheckCondition[] | null;
	address?: AddressCondition[] | null;
	attachment?: BasicCondition[] | null;
	body?: BodyCondition[] | null;
	bulk?: BasicCondition[] | null;
	contactRanking?: HeaderCheckCondition[] | null;
	conversation?: ConversationCondition[] | null;
	date?: DateCondition[] | null;
	facebook?: BasicCondition[] | null;
	flag?: FlagCondition[] | null;
	headerExists?: HeaderCheckCondition[] | null;
	header?: HeaderCondition[] | null;
	importance?: ImportanceCondition[] | null;
	invite?: InviteCondition[] | null;
	linkedin?: BasicCondition[] | null;
	list?: BasicCondition[] | null;
	me?: HeaderCheckCondition[] | null;
	mimeHeader?: MimeHeaderCondition[] | null;
	size?: SizeCondition[] | null;
	twitter?: BasicCondition[] | null;
	communityRequests?: BasicCondition[] | null;
	communityContent?: BasicCondition[] | null;
	communityConnections?: BasicCondition[] | null;
}

export interface HeaderCheckCondition {
	header: string;
	index?: number | null;
	negative?: boolean | null;
}

export interface AddressCondition {
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

export interface BasicCondition {
	index?: number | null;
	negative?: boolean | null;
}

export interface BodyCondition {
	caseSensitive?: boolean | null;
	value?: string | null;
	index?: number | null;
	negative?: boolean | null;
}

export interface ConversationCondition {
	where?: string | null;
	index?: number | null;
	negative?: boolean | null;
}

export interface DateCondition {
	dateComparison?: string | null;
	date?: number | null;
	index?: number | null;
	negative?: boolean | null;
}

export interface FlagCondition {
	flagName: string;
	index?: number | null;
	negative?: boolean | null;
}

export interface HeaderCondition {
	header?: string | null;
	stringComparison?: string | null;
	valueComparison?: string | null;
	countComparison?: string | null;
	value?: string | null;
	caseSensitive?: boolean | null;
	index?: number | null;
	negative?: boolean | null;
}

export interface ImportanceCondition {
	importance: Importance;
	index?: number | null;
	negative?: boolean | null;
}

export interface InviteCondition {
	methods?: string[] | null;
	index?: number | null;
	negative?: boolean | null;
}

export interface MimeHeaderCondition {
	header?: string | null;
	stringComparison?: string | null;
	value?: string | null;
	caseSensitive?: boolean | null;
	index?: number | null;
	negative?: boolean | null;
}

export interface SizeCondition {
	numberComparison?: string | null;
	size?: string | null;
	index?: number | null;
	negative?: boolean | null;
}

export interface MailboxMetadata {
	meta?: MailboxMetadataMeta[] | null;
}

export interface MailboxMetadataMeta {
	section: string;
	_attrs: MailboxMetadataAttrs;
}

export interface MailboxMetadataAttrs {
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
}

export interface RelatedContacts {
	relatedContacts?: RelatedContact[] | null;
}

export interface RelatedContact {
	email?: string | null;
	scope?: number | null;
	p?: string | null;
}

export interface ShareInfo {
	folderId: string;
	folderPath?: string | null;
	folderUuid?: string | null;
	granteeDisplayName?: string | null;
	granteeId?: string | null;
	granteeType?: string | null;
	ownerEmail?: string | null;
	ownerId?: string | null;
	ownerName?: string | null;
	rights?: string | null;
	view?: FolderView | null;
}

export interface RecoverAccount {
	recoveryAccount?: string | null;
	recoveryAttemptsLeft?: string | null;
}

export interface Mutation {
	action?: boolean | null;
	addExternalAccount?: string | null;
	cancelTask?: boolean | null;
	changeCalendarColor?: boolean | null;
	changePassword?: string | null;
	checkCalendar?: boolean | null;
	conversationAction?: boolean | null;
	createAppointment?: boolean | null;
	createAppointmentException?: boolean | null;
	createCalendar?: boolean | null;
	createFolder?: Folder | null;
	createMountpoint?: boolean | null;
	createSharedCalendar?: boolean | null;
	createSearchFolder?: Folder | null;
	createSignature?: SignatureResponse | null;
	createTask?: boolean | null;
	deleteAppointment?: boolean | null;
	deleteExternalAccount?: string | null;
	deleteSignature?: string | null;
	folderAction?: boolean | null;
	itemAction?: boolean | null;
	logout?: boolean | null;
	login?: boolean | null;
	messageAction?: boolean | null;
	modifyExternalAccount?: string | null;
	modifyAppointment?: boolean | null;
	modifyIdentity?: string | null;
	modifyPrefs?: boolean | null;
	modifyFilterRules?: boolean | null;
	modifySignature?: string | null;
	modifyTask?: boolean | null;
	moveTask?: string | null;
	prefAutoAddAppointmentToCalendar?: boolean | null;
	prefCalendarInitialView?: PrefCalendarInitialView | null;
	prefEnableOutOfOfficeAlertOnLogin?: boolean | null;
	prefEnableOutOfOfficeReply?: boolean | null;
	prefOutOfOfficeFromDate?: string | null;
	prefOutOfOfficeReply?: string | null;
	prefOutOfOfficeUntilDate?: string | null;
	sendMessage?: boolean | null;
	sendInviteReply?: InviteReplyResponse | null;
	sendShareNotification?: boolean | null;
	setMailboxMetadata?: boolean | null;
}

export interface SignatureResponse {
	signature?: NameId[] | null;
}

export interface NameId {
	id?: string | null;
	name?: string | null;
}

export interface InviteReplyResponse {
	inviteId?: string | null;
	calendarItemId?: string | null;
}

export interface CalendarItemAlarmAttendees {
	email: string;
}

export interface MailItemHeaderInput {
	n: string;
}
/* Include one of these fields to query for a folder */
export interface GetFolderFolderInput {
	uuid?: string | null;
	l?: string | null;
	path?: string | null;
}

export interface Cursor {
	id?: string | null;
	sortVal?: string | null;
	endSortVal?: string | null;
	includeOffset?: boolean | null;
}

export interface ExternalAccountAddInput {
	accountType?: AccountType | null;
	connectionType?: ConnectionType | null;
	emailAddress?: string | null;
	host: string;
	isEnabled?: boolean | null;
	l: number;
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
	mimeParts?: MimePartInput[] | null;
	emailAddresses?: MailItemEmailAddressInput[] | null;
	attachments?: AttachmentInput[] | null;
	replyType?: InviteReplyType | null;
}

export interface CalendarItemInviteInput {
	components: CalendarItemInviteComponentInput[];
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
	attendees?: CalendarItemAttendeesInput[] | null;
	alarms?: CalendarItemAlarmInput[] | null;
	class: CalendarItemClass;
	priority?: number | null;
	percentComplete?: string | null;
	status?: InviteCompletionStatus | null;
	noBlob?: boolean | null;
	description?: CalendarItemInviteComponentDescriptionInput[] | null;
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
	mimeParts?: MimePartInput[] | null;
	url?: string | null;
	messageId?: string | null;
	attachments?: AttachmentInput[] | null;
}

export interface AttachmentInput {
	attachmentIds?: string | null;
	existingAttachments?: ExistingAttachmentInput[] | null;
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

export interface NewMountpointSpec {
	name: string;
	owner: string;
	view?: SearchType | null;
	flags?: string | null;
	rid?: string | null;
	color?: number | null;
	zid?: string | null;
	reminder?: boolean | null;
	parentFolderId?: string | null;
}

export interface SharedCalendarInput {
	ownerId: string;
	ownerCalendarId: string;
	name: string;
	color: string;
	reminder: boolean;
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

export interface NameIdInput {
	id?: string | null;
	name?: string | null;
}

export interface FolderActionInput {
	id: string;
	op: string;
	grant?: GrantInput[] | null;
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
	zimbraPrefCalendarFirstDayOfWeek?: string | null;
	zimbraPrefCalendarInitialView?: PrefCalendarInitialView | null;
	zimbraPrefCalendarReminderEmail?: string | null;
	zimbraPrefCalendarWorkingHours?: string | null;
	zimbraPrefDisplayExternalImages?: boolean | null;
	zimbraPrefGroupMailBy?: string | null;
	zimbraPrefMailSelectAfterDelete?: PrefMailSelectAfterDelete | null;
	zimbraPrefMailTrustedSenderList?: string[] | null;
	zimbraPrefMarkMsgRead?: number | null;
	zimbraPrefOutOfOfficeFromDate?: string | null;
	zimbraPrefOutOfOfficeReply?: string | null;
	zimbraPrefOutOfOfficeReplyEnabled?: boolean | null;
	zimbraPrefOutOfOfficeStatusAlertOnLogin?: boolean | null;
	zimbraPrefOutOfOfficeUntilDate?: string | null;
	zimbraPrefReadingPaneEnabled?: boolean | null;
	zimbraPrefReadingPaneLocation?: ReadingPaneLocation | null;
	zimbraPrefShowFragments?: boolean | null;
}

export interface FilterInput {
	name: string;
	active: boolean;
	actions?: FilterActionInput[] | null;
	conditions?: FilterConditionInput[] | null;
}

export interface FilterActionInput {
	keep?: BasicActionInput[] | null;
	discard?: BasicActionInput[] | null;
	fileInto?: FileIntoActionInput[] | null;
	flag?: FlagActionInput[] | null;
	tag?: TagActionInput[] | null;
	redirect?: RedirectActionInput[] | null;
	reply?: ReplyActionInput[] | null;
	notify?: NotifyActionInput[] | null;
	stop?: BasicActionInput[] | null;
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
	content?: string[] | null;
}

export interface NotifyActionInput {
	address?: string | null;
	subject?: string | null;
	maxBodySize?: number | null;
	origHeaders?: string | null;
	index?: number | null;
	content?: string[] | null;
}

export interface FilterConditionInput {
	allOrAny: FilterMatchCondition;
	addressBook?: HeaderCheckConditionInput[] | null;
	address?: AddressConditionInput[] | null;
	attachment?: BasicConditionInput[] | null;
	body?: BodyConditionInput[] | null;
	bulk?: BasicConditionInput[] | null;
	contactRanking?: HeaderCheckConditionInput[] | null;
	conversation?: ConversationConditionInput[] | null;
	date?: DateConditionInput[] | null;
	facebook?: BasicConditionInput[] | null;
	flag?: FlagConditionInput[] | null;
	headerExists?: HeaderCheckConditionInput[] | null;
	header?: HeaderConditionInput[] | null;
	importance?: ImportanceConditionInput[] | null;
	invite?: InviteConditionInput[] | null;
	linkedin?: BasicConditionInput[] | null;
	list?: BasicConditionInput[] | null;
	me?: HeaderCheckConditionInput[] | null;
	mimeHeader?: MimeHeaderConditionInput[] | null;
	size?: SizeConditionInput[] | null;
	twitter?: BasicConditionInput[] | null;
	communityRequests?: BasicConditionInput[] | null;
	communityContent?: BasicConditionInput[] | null;
	communityConnections?: BasicConditionInput[] | null;
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
	methods?: string[] | null;
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

export interface SendMessageInput {
	id?: string | null;
	origId?: string | null;
	replyType?: string | null;
	inReplyTo?: string | null;
	flags?: string | null;
	autoSendTime?: number | null;
	draftId?: string | null;
	entityId?: string | null;
	subject?: string | null;
	mimeParts?: MimePartInput[] | null;
	emailAddresses?: MailItemEmailAddressInput[] | null;
	attachments?: AttachmentInput[] | null;
}

export interface InviteReplyInput {
	componentNum: number;
	id: string;
	verb: InviteReplyVerb;
	updateOrganizer?: boolean | null;
	message?: CalendarItemMessageInput | null;
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

export interface EmailAddressInput {
	email: string;
	name: string;
	shortName: string;
}

export interface CreateMountpointInput {
	link?: NewMountpointSpec | null;
}

export interface FolderQueryInput {
	uuid?: string | null;
	id?: string | null;
	view?: FolderView | null;
}
export interface FolderQueryArgs {
	id: string;
}
export interface FreeBusyQueryArgs {
	names?: string[] | null;
	start?: number | null;
	end?: number | null;
}
export interface GetContactQueryArgs {
	id: string;
}
export interface GetContactFrequencyQueryArgs {
	email: string;
	by: string;
	offsetInMinutes?: number | null;
}
export interface GetConversationQueryArgs {
	id: string;
	headers?: MailItemHeaderInput[] | null;
	html?: boolean | null;
	max?: number | null;
	needExp?: boolean | null;
	fetch?: string | null;
}
export interface GetFolderQueryArgs {
	visible?: boolean | null;
	needGranteeName?: boolean | null;
	view?: FolderView | null;
	depth?: number | null;
	traverseMountpoints?: boolean | null;
	folder?: GetFolderFolderInput | null;
}
export interface GetMailboxMetadataQueryArgs {
	section?: string | null;
}
export interface GetMessageQueryArgs {
	id: string;
	headers?: MailItemHeaderInput[] | null;
	html?: boolean | null;
	max?: number | null;
	needExp?: boolean | null;
	neuter?: boolean | null;
	part?: string | null;
	raw?: boolean | null;
	read?: boolean | null;
	ridZ?: string | null;
}
export interface GetTaskQueryArgs {
	inviteId: string;
}
export interface RelatedContactsQueryArgs {
	email: string;
}
export interface ShareInfosQueryArgs {
	addresses?: string[] | null;
}
export interface SetRecoveryAccountQueryArgs {
	channel: SetRecoveryAccountChannel;
	op: SetRecoveryAccountOp;
	recoveryAccount?: string | null;
	recoveryAccountVerificationCode?: string | null;
}
export interface RecoverAccountQueryArgs {
	op: RecoverAccountOp;
	email: string;
	channel: SetRecoveryAccountChannel;
}
export interface SearchQueryArgs {
	contact?: string | null;
	cursor?: Cursor | null;
	fetch?: string | null;
	fullConversation?: boolean | null;
	limit?: number | null;
	needExp?: boolean | null;
	offset?: number | null;
	query?: string | null;
	recip?: number | null;
	sortBy?: SortBy | null;
	types?: SearchType | null;
}
export interface AppointmentsFolderArgs {
	start?: number | null;
	end?: number | null;
	offset?: number | null;
	limit?: number | null;
}
export interface TasksFolderArgs {
	folderId?: string | null;
	offset?: number | null;
	limit?: number | null;
	sortBy?: string | null;
}
export interface ActionMutationArgs {
	type: ActionTypeName;
	id?: string | null;
	ids?: string[] | null;
	op: string;
	color?: number | null;
	constraints?: string | null;
	flags?: string | null;
	folderId?: string | null;
	rgb?: string | null;
	tagNames?: string | null;
	name?: string | null;
}
export interface AddExternalAccountMutationArgs {
	externalAccount: ExternalAccountAddInput;
}
export interface CancelTaskMutationArgs {
	inviteId: string;
}
export interface ChangeCalendarColorMutationArgs {
	id: string;
	color: number;
}
export interface ChangePasswordMutationArgs {
	loginNewPassword: string;
	password: string;
	username: string;
}
export interface CheckCalendarMutationArgs {
	calendarId: string;
	value: boolean;
}
export interface ConversationActionMutationArgs {
	ids: string[];
	op: string;
}
export interface CreateAppointmentMutationArgs {
	accountName?: string | null;
	appointment: CalendarItemInput;
}
export interface CreateAppointmentExceptionMutationArgs {
	accountName?: string | null;
	appointment: CalendarItemInput;
}
export interface CreateCalendarMutationArgs {
	name: string;
	color: number;
	url?: string | null;
}
export interface CreateFolderMutationArgs {
	color?: number | null;
	fetchIfExists?: boolean | null;
	flags?: string | null;
	name: string;
	parentFolderId?: string | null;
	url?: string | null;
	view?: FolderView | null;
}
export interface CreateMountpointMutationArgs {
	link: NewMountpointSpec;
}
export interface CreateSharedCalendarMutationArgs {
	sharedCalendar: SharedCalendarInput;
}
export interface CreateSearchFolderMutationArgs {
	name: string;
	parentFolderId?: string | null;
	query: string;
	types?: FolderView | null;
}
export interface CreateSignatureMutationArgs {
	signature: SignatureInput;
}
export interface CreateTaskMutationArgs {
	task: CalendarItemInput;
}
export interface DeleteAppointmentMutationArgs {
	inviteId: string;
}
export interface DeleteExternalAccountMutationArgs {
	id: string;
}
export interface DeleteSignatureMutationArgs {
	signature: NameIdInput;
}
export interface FolderActionMutationArgs {
	action: FolderActionInput;
}
export interface ItemActionMutationArgs {
	id?: string | null;
	ids?: string[] | null;
	folderId?: string | null;
	op: string;
}
export interface LoginMutationArgs {
	username: string;
	password: string;
}
export interface MessageActionMutationArgs {
	ids: string[];
	op: string;
}
export interface ModifyExternalAccountMutationArgs {
	id: string;
	type?: AccountType | null;
	attrs: ExternalAccountModifyAttrsInput;
}
export interface ModifyAppointmentMutationArgs {
	accountName?: string | null;
	appointment: CalendarItemInput;
}
export interface ModifyIdentityMutationArgs {
	id: string;
	attrs: IdentityAttrsInput;
}
export interface ModifyPrefsMutationArgs {
	prefs: PreferencesInput;
}
export interface ModifyFilterRulesMutationArgs {
	filters?: FilterInput[] | null;
}
export interface ModifySignatureMutationArgs {
	signature: SignatureInput;
}
export interface ModifyTaskMutationArgs {
	task: CalendarItemInput;
}
export interface MoveTaskMutationArgs {
	inviteId: string;
	destFolderId: string;
}
export interface PrefAutoAddAppointmentToCalendarMutationArgs {
	value: boolean;
}
export interface PrefCalendarInitialViewMutationArgs {
	value: PrefCalendarInitialView;
}
export interface PrefEnableOutOfOfficeAlertOnLoginMutationArgs {
	value: boolean;
}
export interface PrefEnableOutOfOfficeReplyMutationArgs {
	value: boolean;
}
export interface PrefOutOfOfficeFromDateMutationArgs {
	value: string;
}
export interface PrefOutOfOfficeReplyMutationArgs {
	value: string;
}
export interface PrefOutOfOfficeUntilDateMutationArgs {
	value: string;
}
export interface SendMessageMutationArgs {
	message: SendMessageInput;
}
export interface SendInviteReplyMutationArgs {
	inviteReply: InviteReplyInput;
}
export interface SendShareNotificationMutationArgs {
	shareNotification: ShareNotificationInput;
}
export interface SetMailboxMetadataMutationArgs {
	section?: string | null;
	attrs: MailboxMetadataSectionAttrsInput;
}

export enum PrefCalendarInitialView {
	day = 'day',
	list = 'list',
	month = 'month',
	week = 'week',
	workWeek = 'workWeek',
	year = 'year'
}

export enum PrefMailSelectAfterDelete {
	next = 'next',
	previous = 'previous',
	adaptive = 'adaptive'
}

export enum ReadingPaneLocation {
	off = 'off',
	right = 'right',
	bottom = 'bottom'
}

export enum PasswordRecoveryAddressStatus {
	verified = 'verified',
	pending = 'pending'
}

export enum LicenseStatus {
	OK = 'OK',
	NOT_INSTALLED = 'NOT_INSTALLED',
	NOT_ACTIVATED = 'NOT_ACTIVATED',
	IN_FUTURE = 'IN_FUTURE',
	EXPIRED = 'EXPIRED',
	INVALID = 'INVALID',
	LICENSE_GRACE_PERIOD = 'LICENSE_GRACE_PERIOD',
	ACTIVATION_GRACE_PERIOD = 'ACTIVATION_GRACE_PERIOD'
}

/* https://github.com/Zimbra/zm-mailbox/blob/develop/store/docs/acl.md */
export enum GranteeType {
	usr = 'usr',
	grp = 'grp',
	egp = 'egp',
	dom = 'dom',
	all = 'all',
	pub = 'pub',
	guest = 'guest',
	key = 'key',
	cos = 'cos'
}

export enum InviteType {
	appt = 'appt',
	task = 'task'
}

export enum AlarmAction {
	DISPLAY = 'DISPLAY',
	AUDIO = 'AUDIO',
	EMAIL = 'EMAIL',
	PROCEDURE = 'PROCEDURE',
	X_YAHOO_CALENDAR_ACTION_IM = 'X_YAHOO_CALENDAR_ACTION_IM',
	X_YAHOO_CALENDAR_ACTION_MOBILE = 'X_YAHOO_CALENDAR_ACTION_MOBILE'
}

export enum AlarmRelatedTo {
	START = 'START',
	END = 'END'
}

export enum CalendarItemRecurrenceFrequency {
	SEC = 'SEC',
	MIN = 'MIN',
	HOU = 'HOU',
	DAI = 'DAI',
	WEE = 'WEE',
	MON = 'MON',
	YEA = 'YEA'
}

export enum Weekday {
	SU = 'SU',
	MO = 'MO',
	TU = 'TU',
	WE = 'WE',
	TH = 'TH',
	FR = 'FR',
	SA = 'SA'
}

export enum ParticipationRole {
	REQ = 'REQ',
	OPT = 'OPT',
	NON = 'NON'
}

export enum ParticipationStatus {
	NE = 'NE',
	AC = 'AC',
	TE = 'TE',
	DE = 'DE',
	DG = 'DG',
	CO = 'CO',
	IN = 'IN',
	WA = 'WA',
	DF = 'DF'
}

export enum CalendarItemClass {
	PRI = 'PRI',
	PUB = 'PUB',
	CON = 'CON'
}

export enum FreeBusyStatus {
	F = 'F',
	B = 'B',
	T = 'T',
	O = 'O'
}

export enum InviteCompletionStatus {
	NEED = 'NEED',
	TENT = 'TENT',
	CONF = 'CONF',
	CANC = 'CANC',
	COMP = 'COMP',
	INPR = 'INPR',
	WAITING = 'WAITING',
	DEFERRED = 'DEFERRED'
}

export enum FolderView {
	search = 'search',
	folder = 'folder',
	tag = 'tag',
	conversation = 'conversation',
	message = 'message',
	contact = 'contact',
	document = 'document',
	appointment = 'appointment',
	virtual = 'virtual',
	remote = 'remote',
	wiki = 'wiki',
	task = 'task',
	chat = 'chat',
	note = 'note',
	comment = 'comment'
}

export enum FilterMatchCondition {
	allof = 'allof',
	anyof = 'anyof'
}

export enum Importance {
	high = 'high',
	normal = 'normal',
	low = 'low'
}

export enum SetRecoveryAccountChannel {
	email = 'email'
}

export enum SetRecoveryAccountOp {
	sendCode = 'sendCode',
	validateCode = 'validateCode',
	resendCode = 'resendCode',
	reset = 'reset'
}

export enum RecoverAccountOp {
	getRecoveryAccount = 'getRecoveryAccount',
	sendRecoveryCode = 'sendRecoveryCode'
}

export enum SortBy {
	none = 'none',
	dateAsc = 'dateAsc',
	dateDesc = 'dateDesc',
	subjAsc = 'subjAsc',
	subjDesc = 'subjDesc',
	nameAsc = 'nameAsc',
	nameDesc = 'nameDesc',
	rcptAsc = 'rcptAsc',
	rcptDesc = 'rcptDesc',
	attachAsc = 'attachAsc',
	attachDesc = 'attachDesc',
	flagAsc = 'flagAsc',
	flagDesc = 'flagDesc',
	priorityAsc = 'priorityAsc',
	priorityDesc = 'priorityDesc',
	readAsc = 'readAsc',
	readDesc = 'readDesc',
	sizeAsc = 'sizeAsc',
	sizeDesc = 'sizeDesc'
}

export enum SearchType {
	conversation = 'conversation',
	message = 'message',
	contact = 'contact',
	appointment = 'appointment',
	task = 'task',
	wiki = 'wiki',
	document = 'document'
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
	imap = 'imap',
	pop3 = 'pop3'
}

export enum ConnectionType {
	cleartext = 'cleartext',
	ssl = 'ssl',
	tls = 'tls',
	tls_is_available = 'tls_is_available'
}

export enum AddressType {
	f = 'f',
	t = 't',
	c = 'c',
	b = 'b',
	r = 'r',
	s = 's',
	n = 'n',
	rf = 'rf'
}

export enum InviteReplyType {
	r = 'r',
	w = 'w'
}

export enum InviteReplyVerb {
	ACCEPT = 'ACCEPT',
	DECLINE = 'DECLINE',
	TENTATIVE = 'TENTATIVE'
}
