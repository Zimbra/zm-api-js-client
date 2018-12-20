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
	autoComplete?: AutoCompleteResponse | null;
	autoCompleteGAL?: AutoCompleteGALResponse | null;
	downloadMessage?: SMimeMessage | null;
	freeBusy?: FreeBusy[] | null;
	getContact?: Contact[] | null;
	getAppointments?: SearchResponse | null;
	getContactFrequency?: ContactFrequencyResponse | null;
	getConversation?: Conversation | null;
	getFilterRules?: Filter[] | null;
	getFolder?: Folder | null;
	getMailboxMetadata?: MailboxMetadata | null;
	getMessage?: MessageInfo | null;
	getSMimePublicCerts?: SMimePublicCertsResponse | null;
	getSearchFolder?: Folder | null;
	getTask?: boolean | null;
	getWhiteBlackList?: WhiteBlackList | null;
	noop?: boolean | null;
	preferences?: Preferences | null;
	recoverAccount?: RecoverAccount | null;
	relatedContacts?: RelatedContact[] | null;
	shareInfos?: ShareInfo[] | null;
	search?: SearchResponse | null /* Perform a search for a variety types using a flexible query interface.[[SOAP Search API Documentation]](https://files.zimbra.com/docs/soap_api/8.7.11/api-reference/zimbraMail/Search.html)[[Query Tips]](https://wiki.zimbra.com/wiki/Zimbra_Web_Client_Search_Tips) */;
	searchGal?: SearchResponse | null;
	taskFolders?: Folder[] | null;
}

export interface AccountInfo {
	id: string;
	name?: string | null;
	publicURL?: string | null;
	rest?: string | null;
	profileImageId?: number | null;
	soapURL?: string | null;
	version?: string | null;
	identities?: Identities | null;
	dataSources: DataSources;
	signatures?: Signatures | null;
	attrs?: AccountInfoAttrs | null;
	prefs?: Preferences | null;
	license?: License | null;
	zimlets?: AccountZimlet | null;
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
	zimbraFeatureWebClientOfflineAccessEnabled?: boolean | null;
	zimbraMailBlacklistMaxNumEntries?: number | null;
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
	zimbraPrefWebClientOfflineBrowserKey?: string | null;
	zimbraPrefTimeZoneId?: string | null;
}

export interface License {
	status: LicenseStatus;
	attr?: LicenseAttrs[] | null;
}

export interface LicenseAttrs {
	name: string;
	_content: boolean;
}

export interface AccountZimlet {
	zimlet?: AccountZimletInfo[] | null;
}

export interface AccountZimletInfo {
	zimletContext?: AccountZimletContext[] | null;
	zimlet?: AccountZimletDesc[] | null;
	zimletConfig?: AccountZimletConfigInfo[] | null;
}

export interface AccountZimletContext {
	baseUrl?: string | null;
	priority?: number | null;
	presence?: ZimletPresence | null;
}

export interface AccountZimletDesc {
	name?: string | null;
	version?: string | null;
	description?: string | null;
	extension?: string | null;
	label?: string | null;
	zimbraXZimletCompatibleSemVer?: string | null;
}

export interface AccountZimletConfigInfo {
	name?: string | null;
	version?: string | null;
	description?: string | null;
	extension?: string | null;
	target?: string | null;
	label?: string | null;
}

export interface AutoCompleteResponse {
	canBeCached?: boolean | null;
	match?: AutoCompleteMatch[] | null;
}

export interface AutoCompleteMatch {
	email?: string | null;
	type?: AutoCompleteMatchType | null;
	ranking?: number | null;
	isGroup?: boolean | null;
	exp?: boolean | null;
	id?: string | null;
	folderId?: string | null;
	display?: string | null;
	first?: string | null;
	middle?: string | null;
	last?: string | null;
	full?: string | null;
	nick?: string | null;
	company?: string | null;
	fileas?: string | null;
}

export interface AutoCompleteGALResponse {
	contacts?: Contact[] | null;
}

export interface Contact {
	id: string;
	date?: number | null;
	folderId?: string | null;
	revision?: number | null;
	sortField?: string | null;
	fileAsStr?: string | null;
	memberOf?: string | null;
	attributes?: ContactAttributes | null;
	members?: ContactListMember[] | null;
}

export interface ContactAttributes {
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
	image?: ContactImage | null;
	userCertificate?: string | null;
	zimbraCalResType?: string | null;
	fileAs?: string | null /* Used for contact lists */;
	type?: string | null;
}

export interface ContactImage {
	ct?: string | null;
	filename?: string | null;
	part?: string | null;
	s?: string | null;
}

export interface ContactListMember {
	contacts?: Contact[] | null;
	type: string;
	value: string;
}

export interface SMimeMessage {
	id?: string | null;
	content?: string | null;
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

export interface SearchResponse {
	contacts?: Contact[] | null;
	messages?: MessageInfo[] | null;
	conversations?: Conversation[] | null;
	tasks?: CalendarItemHitInfo[] | null;
	appointments?: CalendarItemHitInfo[] | null;
	more?: boolean | null;
	offset?: number | null;
	sortBy?: string | null;
	paginationSupported?: boolean | null;
}

export interface MessageInfo extends MailItem {
	id?: string | null;
	size?: number | null;
	date?: number | null;
	folderId?: string | null;
	origId?: string | null;
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
	attributes?: MessageAttributes | null;
}

export interface EmailAddress {
	address?: string | null;
	name?: string | null;
	type?: string | null;
	displayName?: string | null;
}

export interface InviteInfo {
	type?: InviteType | null;
	components?: InviteComponent[] | null;
	replies?: InviteReplies[] | null;
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
	relatedTo?: AlarmRelatedTo | null;
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
	calendarUserType?: string | null;
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

export interface InviteReplies {
	reply?: CalendarItemReply[] | null;
}

export interface CalendarItemReply {
	participationStatus?: ParticipationStatus | null;
	attendee?: string | null;
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

export interface MessageAttributes {
	isEncrypted?: boolean | null;
	isSigned?: boolean | null;
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
	timezoneOffset?: number | null;
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
	replies: InviteReplies[];
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
	url?: string | null;
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
	zimbraPrefSMIMELastOperation?: string | null;
	zimbraPrefContactSourceFolderID?: string | null;
}

export interface SMimePublicCertsResponse {
	certs?: SMimePublicCerts[] | null;
}

export interface SMimePublicCerts {
	email?: string | null;
	cert?: SMimePublicCert[] | null;
}

export interface SMimePublicCert {
	store: string;
	field: string;
	_content?: string | null;
}

export interface WhiteBlackList {
	whiteList: WhiteBlackListArr[];
	blackList: WhiteBlackListArr[];
}

export interface WhiteBlackListArr {
	addr?: WhiteBlackAddress[] | null;
}

export interface WhiteBlackAddress {
	_content: string;
	op?: string | null;
}

export interface RecoverAccount {
	recoveryAccount?: string | null;
	recoveryAttemptsLeft?: number | null;
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

export interface Mutation {
	action?: boolean | null;
	testExternalAccount?: ExternalAccountTestResponse | null;
	addExternalAccount?: string | null;
	cancelTask?: boolean | null;
	changeCalendarColor?: boolean | null;
	changePassword?: string | null;
	modifyProfileImage?: string | null;
	checkCalendar?: boolean | null;
	contactAction?: ActionOpResponse | null;
	conversationAction?: boolean | null;
	createAppointment?: boolean | null;
	createAppointmentException?: boolean | null;
	createCalendar?: boolean | null;
	createContact?: Contact | null;
	createContactList?: Contact | null;
	modifyContact?: Contact | null;
	modifyContactList?: boolean | null;
	createFolder?: Folder | null;
	createMountpoint?: boolean | null;
	createSharedCalendar?: boolean | null;
	createSearchFolder?: Folder | null;
	createSignature?: SignatureResponse | null;
	createTask?: boolean | null;
	deleteAppointment?: boolean | null;
	deleteExternalAccount?: boolean | null;
	deleteSignature?: string | null;
	folderAction?: boolean | null;
	itemAction?: boolean | null;
	importExternalAccount?: boolean | null;
	logout?: boolean | null;
	login?: AuthResponse | null;
	messageAction?: boolean | null;
	modifyExternalAccount?: boolean | null;
	modifyAppointment?: ModifyAppointmentResponse | null;
	modifyIdentity?: string | null;
	modifyPrefs?: boolean | null;
	modifyZimletPrefs?: ModifyZimletPrefsResponse | null;
	modifyFilterRules?: boolean | null;
	modifySignature?: string | null;
	modifySearchFolder?: boolean | null;
	modifyTask?: boolean | null;
	modifyWhiteBlackList?: boolean | null;
	moveTask?: string | null;
	prefAutoAddAppointmentToCalendar?: boolean | null;
	prefCalendarInitialView?: PrefCalendarInitialView | null;
	prefEnableOutOfOfficeAlertOnLogin?: boolean | null;
	prefEnableOutOfOfficeReply?: boolean | null;
	prefOutOfOfficeFromDate?: string | null;
	prefOutOfOfficeReply?: string | null;
	prefOutOfOfficeUntilDate?: string | null;
	recoverAccount?: RecoverAccount | null;
	resetPassword?: string | null;
	saveDraft?: SaveDraftResponse | null;
	sendMessage?: SendMessageResponse | null;
	sendInviteReply?: InviteReplyResponse | null;
	sendShareNotification?: boolean | null;
	setMailboxMetadata?: boolean | null;
	snoozeCalendarItem?: boolean | null;
	dismissCalendarItem?: boolean | null;
	uploadMessage?: string | null;
	setRecoveryAccount?: boolean | null;
}

export interface ExternalAccountTestResponse {
	success: boolean;
	error?: string | null;
}

export interface ActionOpResponse {
	action?: ActionOpResponseData | null;
}

export interface ActionOpResponseData {
	id: string;
	op: string;
}

export interface SignatureResponse {
	signature?: NameId[] | null;
}

export interface NameId {
	id?: string | null;
	name?: string | null;
}

export interface AuthResponse {
	authToken?: AuthToken[] | null;
	lifetime?: number | null;
	session?: Session | null;
	skin?: Skin[] | null;
}

export interface AuthToken {
	_content?: string | null;
}

export interface Session {
	id?: string | null;
	_content?: string | null;
}

export interface Skin {
	_content?: string | null;
}

export interface ModifyAppointmentResponse {
	appointmentId?: string | null;
	calendarItemId?: string | null;
	inviteId?: string | null;
	modifiedSequence?: number | null;
	revision?: number | null;
}

export interface ModifyZimletPrefsResponse {
	zimlet?: ZimletPref[] | null;
}

export interface ZimletPref {
	name?: string | null;
	presence?: string | null;
}

export interface SaveDraftResponse {
	message?: MessageInfo[] | null;
}

export interface SendMessageResponse {
	message?: MsgWithGroupInfo[] | null;
}

export interface MsgWithGroupInfo extends MailItem {
	id?: string | null;
	i4uid?: number | null;
	cif?: string | null;
	origid?: string | null;
	entityId?: string | null;
	forAcct?: string | null;
	autoSendTime?: number | null;
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

export interface InviteReplyResponse {
	inviteId?: string | null;
	calendarItemId?: string | null;
}

export interface CalendarItemAlarmAttendees {
	email: string;
}

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

	priority?: number | null;

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

	zimbraPrefCalendarFirstDayOfWeek?: string | null;

	zimbraPrefCalendarInitialView?: PrefCalendarInitialView | null;

	zimbraPrefCalendarReminderEmail?: string | null;

	zimbraPrefCalendarWorkingHours?: string | null;

	zimbraPrefDisplayExternalImages?: boolean | null;

	zimbraPrefGroupMailBy?: string | null;

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

export interface FolderQueryInput {
	uuid?: string | null;

	id?: string | null;

	view?: FolderView | null;
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
