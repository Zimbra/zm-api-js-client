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
}
/* Zimbra GraphQL Queries- [[SOAP API Reference]](https://files.zimbra.com/docs/soap_api/8.7.11/api-reference/index.html)- [[SOAP Documentation]](https://github.com/Zimbra/zm-mailbox/blob/develop/store/docs/soap.txt)- [[SOAP XML-to-JSON Documentation]](https://wiki.zimbra.com/wiki/Json_format_to_represent_soap) */
export interface Query {
	accountInfo?: AccountInfo | null;
	folder?: Folder | null;
	freeBusy?: FreeBusy[] | null;
	getContact?: Contact | null;
	getContactFrequency?: ContactFrequencyResponse | null;
	getConversation?: Conversation | null;
	getFolder?: Folder | null;
	getMailboxMetadata?: MailboxMetadata | null;
	getMessage?: MessageInfo | null;
	getSearchFolder?: Folder | null;
	getTask?: boolean | null;
	noop?: boolean | null;
	preferences?: Preferences | null;
	relatedContacts?: RelatedContacts | null;
	shareInfos?: ShareInfo[] | null;
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
	zimbraFeatureCalendarEnabled?: boolean | null;
	zimbraFeatureRelatedContactsEnabled?: boolean | null;
}

export interface Preferences {
	zimbraPrefAutoAddAppointmentsToCalendar?: boolean | null;
	zimbraPrefCalendarFirstDayOfWeek?: string | null;
	zimbraPrefCalendarInitialView?: PrefCalendarInitialView | null;
	zimbraPrefCalendarReminderEmail?: string | null;
	zimbraPrefCalendarWorkingHours?: string | null;
	zimbraPrefGroupMailBy?: string | null;
	zimbraPrefMailSelectAfterDelete?: PrefMailSelectAfterDelete | null;
	zimbraPrefMarkMsgRead?: number | null;
	zimbraPrefOutOfOfficeFromDate?: string | null;
	zimbraPrefOutOfOfficeReply?: string | null;
	zimbraPrefOutOfOfficeReplyEnabled?: boolean | null;
	zimbraPrefOutOfOfficeStatusAlertOnLogin?: boolean | null;
	zimbraPrefOutOfOfficeUntilDate?: string | null;
	zimbraPrefReadingPaneEnabled?: boolean | null;
	zimbraPrefReadingPaneLocation?: ReadingPaneLocation | null;
	zimbraPrefReadingPaneSashHorizontal?: number | null;
	zimbraPrefShowFragments?: boolean | null;
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
	owner?: string | null;
	revision?: number | null;
	view?: FolderView | null;
	parentFolderId?: string | null;
	unread?: number | null;
	query?: string | null;
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
	allDay?:
		| boolean
		| null /* duration: DurationInfo # dur - TODOrecurrence: RecurrenceInfo - TODO */;
	attendees?: CalendarItemAttendee[] | null;
	calItemId?: string | null;
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
	recurrenceId?: string | null;
	rsvp?: boolean | null;
	sequence?: number | null;
	start?: DtTimeInfo[] | null;
	status?: InviteCompletionStatus | null;
	uid?: string | null;
	x_uid?: string | null;
	aid?: string | null;
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
	inviteId: string;
	isOrganizer?: boolean | null;
	location?: string | null;
	modifiedSequence?: number | null;
	name?: string | null;
	organizer?: CalOrganizer | null;
	participationStatus?: ParticipationStatus | null;
	percentComplete?: string | null;
	priority?: number | null;
	revision?: number | null;
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

export interface Mutation {
	action?: boolean | null;
	addSignature?: SignatureResponse | null;
	addExternalAccount?: string | null;
	cancelTask?: boolean | null;
	changeCalendarColor?: boolean | null;
	changePassword?: string | null;
	checkCalendar?: boolean | null;
	conversationAction?: boolean | null;
	createAppointment?: boolean | null;
	createCalendar?: boolean | null;
	createFolder?: boolean | null;
	createSharedCalendar?: boolean | null;
	createSearchFolder?: boolean | null;
	createTask?: boolean | null;
	deleteAppointment?: boolean | null;
	deleteExternalAccount?: string | null;
	deleteSignature?: string | null;
	folderAction?: boolean | null;
	itemAction?: boolean | null;
	logout?: boolean | null;
	messageAction?: boolean | null;
	modifyExternalAccount?: string | null;
	modifyIdentity?: string | null;
	modifySignature?: string | null;
	modifyTask?: boolean | null;
	moveTask?: string | null;
	prefAutoAddAppointmentToCalendar?: boolean | null;
	prefCalendarFirstDayOfWeek?: string | null;
	prefCalendarInitialView?: PrefCalendarInitialView | null;
	prefCalendarWorkingHours?: string | null;
	prefEnableOutOfOfficeAlertOnLogin?: boolean | null;
	prefEnableOutOfOfficeReply?: boolean | null;
	prefMailForward?: string | null;
	prefOutOfOfficeFromDate?: string | null;
	prefOutOfOfficeReply?: string | null;
	prefOutOfOfficeUntilDate?: string | null;
	sendMsg?: boolean | null;
	sendShareNotification?: boolean | null;
	setMailboxMetadata?: boolean | null;
}

export interface SignatureResponse {
	id: string;
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
	message: CalendarItemMessageInput;
}

export interface CalendarItemMessageInput {
	folderId: string;
	subject: string;
	invitations: CalendarItemInviteInput;
	mimeParts?: MimePartInput | null;
	emailAddresses?: CalendarItemInviteEmailAddressInput[] | null;
	attach?: CalendarItemAttach[] | null;
}

export interface CalendarItemInviteInput {
	components: CalendarItemInviteComponentInput[];
}

export interface CalendarItemInviteComponentInput {
	name: string;
	location?: string | null;
	start?: CalendarItemDateTimeInput | null;
	end?: CalendarItemDateTimeInput | null;
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

export interface CalendarItemOrganizerInput {
	address?: string | null;
	name?: string | null;
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
	attendees?: CalendarItemAlarmAttendees | null;
}

export interface CalendarItemAlarmTriggerInput {
	relative?: CalendarItemAlarmTriggerRelativeInput | null;
	absolute?: CalendarItemAlarmTriggerAbsoluteInput | null;
}

export interface CalendarItemAlarmTriggerRelativeInput {
	seconds?: number | null;
	minutes?: number | null;
	hours?: number | null;
	days?: number | null;
	relatedTo?: AlarmRelatedTo | null;
	negative?: boolean | null;
}

export interface CalendarItemAlarmTriggerAbsoluteInput {
	date: string;
}

export interface CalendarItemAlarmAttendees {
	email: string;
}

export interface CalendarItemInviteComponentDescriptionInput {
	_content?: string | null;
}

export interface MimePartInput {
	contentType: string;
	content?: string | null;
	mimeParts?: MimePartInput[] | null;
}

export interface CalendarItemInviteEmailAddressInput {
	address: string;
	name: string;
	type: AddressType;
}

export interface CalendarItemAttach {
	aid?: string | null;
}

export interface SharedCalendarInput {
	ownerId: string;
	ownerCalendarId: string;
	name: string;
	color: string;
	reminder: boolean;
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

export interface EmailAddressInput {
	email: string;
	name: string;
	shortName: string;
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
export interface AddSignatureMutationArgs {
	name: string;
	contentType?: string | null;
	value: string;
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
	loginConfirmNewPassword: string;
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
export interface CreateSharedCalendarMutationArgs {
	sharedCalendar: SharedCalendarInput;
}
export interface CreateSearchFolderMutationArgs {
	name: string;
	parentFolderId?: string | null;
	query: string;
	view?: FolderView | null;
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
	id: string;
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
export interface MessageActionMutationArgs {
	ids: string[];
	op: string;
}
export interface ModifyExternalAccountMutationArgs {
	id: string;
	type?: AccountType | null;
	attrs: ExternalAccountModifyAttrsInput;
}
export interface ModifyIdentityMutationArgs {
	id: string;
	attrs: IdentityAttrsInput;
}
export interface ModifySignatureMutationArgs {
	id: string;
	contentType?: string | null;
	value: string;
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
export interface PrefCalendarFirstDayOfWeekMutationArgs {
	value: string;
}
export interface PrefCalendarInitialViewMutationArgs {
	value: PrefCalendarInitialView;
}
export interface PrefCalendarWorkingHoursMutationArgs {
	value: string;
}
export interface PrefEnableOutOfOfficeAlertOnLoginMutationArgs {
	value: boolean;
}
export interface PrefEnableOutOfOfficeReplyMutationArgs {
	value: boolean;
}
export interface PrefMailForwardMutationArgs {
	address?: string | null;
	deleteAndForward: boolean;
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
export interface SendMsgMutationArgs {
	subject: string;
	text: string;
	to: EmailAddressInput[];
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

export enum CalendarItemRecurrenceFrequency {
	SEC = 'SEC',
	MIN = 'MIN',
	HOU = 'HOU',
	DAI = 'DAI',
	WEE = 'WEE',
	MON = 'MON',
	YEA = 'YEA'
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
