import { Entity } from '.';

/**
 * This file provides the schema necessary to normalize/denormalize the json response we get from the zimbra-apis
 * into more human-readable field names and vice-versa for sending data from our codebase to the zimbra apis.
 *
 * It is only necessary to specify fields that you want renamed.  Fields that you do not want renamed will be kept and be unmodified
 */

const MimePart = new Entity({
	cd: 'contentDisposition',
	ci: 'contentId',
	ct: 'contentType',
	s: 'size',
	part: 'part',
	mid: 'messageId',
	content: 'content'
});

const CalendarItemAlarmTriggerRelative = new Entity({
	w: 'weeks',
	d: 'days',
	h: 'hours',
	m: 'minutes',
	s: 'seconds',
	related: 'relatedTo',
	neg: 'negative'
});

const CalendarItemAlarmTrigger = new Entity({
	rel: ['relative', CalendarItemAlarmTriggerRelative]
});

const IntervalRule = new Entity({
	ival: 'intervalCount'
});

const NumOfOccurences = new Entity({
	num: 'number'
});

const UntilDate = new Entity({
	d: 'date'
});

const ByMonthDayRule = new Entity({
	modaylist: 'dayList'
});

const ByMonthRule = new Entity({
	molist: 'monthList'
});

const SimpleRepeatingRule = new Entity({
	freq: 'frequency',
	interval: ['interval', IntervalRule],
	count: ['count', NumOfOccurences],
	until: ['until', UntilDate],
	bymonthday: ['bymonthday', ByMonthDayRule],
	bymonth: ['bymonth', ByMonthRule]
});

const AddRecurrenceInfo = new Entity({
	rule: ['rule', SimpleRepeatingRule]
});

const RecurrenceInfo = new Entity({
	add: ['add', AddRecurrenceInfo]
});

const CalendarItemAlarmAttendees = new Entity({
	a: 'email'
});

const CalendarItemAlarm = new Entity({
	trigger: CalendarItemAlarmTrigger,
	at: ['attendees', CalendarItemAlarmAttendees]
});

const CalendarItemDateTime = new Entity({
	d: 'date',
	tz: 'timezone',
	tzoDue: 'timezoneDue',
	u: 'utc'
});

const CalendarItemAttendees = new Entity({
	ptst: 'participationStatus',
	a: 'address',
	d: 'name',
	cutype: 'calendarUserType'
});

const CalendarItemReply = new Entity({
	ptst: 'participationStatus',
	at: 'attendee'
});

const CalendarItemOrganizer = new Entity({
	a: 'address',
	d: 'name'
});

const commonFieldForMessageAndDocuments = {
	d: 'date',
	f: 'flags',
	l: 'folderId',
	md: 'changeDate',
	ms: 'modifiedSequence',
	rev: 'revision',
	s: 'size',
	sf: 'sortField',
	t: 'tags',
	tn: 'tagNames'
};

const commonMessageFields = {
	...commonFieldForMessageAndDocuments,
	cid: 'conversationId',
	fr: 'excerpt'
};

const commonInviteFields = {
	compNum: 'componentNum',
	calItemId: 'calendarItemId',
	fb: 'freeBusy',
	fba: 'freeBusyActual',
	fr: 'excerpt',
	isOrg: 'isOrganizer',
	invId: 'inviteId',
	loc: 'location',
	or: ['organizer', CalendarItemOrganizer],
	ridZ: 'utcRecurrenceId'
};

const InviteComponent = new Entity({
	...commonMessageFields,
	...commonInviteFields,
	alarm: ['alarms', CalendarItemAlarm],
	at: ['attendees', CalendarItemAttendees],
	completed: 'completedDateTime',
	desc: 'description',
	descHtml: 'htmlDescription',
	e: ['end', CalendarItemDateTime],
	ex: 'isException',
	recur: ['recurrence', RecurrenceInfo],
	s: ['start', CalendarItemDateTime],
	exceptId: ['exceptId', CalendarItemDateTime],
	seq: 'sequence'
});

const InviteReplies = new Entity({
	reply: ['reply', CalendarItemReply]
});

const CalTZInfo = new Entity({
	stdoff: 'timezoneStdOffset',
	dayoff: 'timezoneDaylightOffset'
});

const Invitation = new Entity({
	seq: 'sequenceNumber',
	compNum: 'componentNum',
	recurId: 'recurrenceId',
	tz: ['tz', CalTZInfo],
	comp: ['components', InviteComponent],
	replies: ['replies', InviteReplies],
	mp: ['mimeParts', MimePart]
});

const InviteInfo = new Entity({
	comp: ['components', InviteComponent],
	replies: ['replies', InviteReplies],
	mp: ['mimeParts', MimePart]
});

const MailItemEmailAddress = new Entity({
	a: 'address',
	p: 'name',
	d: 'displayName',
	t: 'type'
});

const ExistingAttachmentsInfo = new Entity({
	mid: 'messageId',
	part: 'part'
});

const AttachmentsInfo = new Entity({
	aid: 'attachmentId',
	mp: ['existingAttachments', ExistingAttachmentsInfo]
});

MimePart.addMapping({
	mp: ['mimeParts', MimePart],
	attach: ['attachments', AttachmentsInfo]
});

const commonMailItemFields = {
	...commonMessageFields,
	e: ['emailAddresses', MailItemEmailAddress],
	inv: ['invitations', InviteInfo],
	mp: ['mimeParts', MimePart],
	shr: 'share',
	su: 'subject',
	origid: 'origId',
	attach: ['attachments', AttachmentsInfo],
	rt: 'replyType'
};

const SendMessageFields = new Entity({
	...commonMailItemFields,
	id: 'id',
	aid: 'attachmentId',
	irt: 'inReplyTo',
	rt: 'replyType',
	did: 'draftId',
	idnt: 'entityId'
});

export const SendMessageInfo = new Entity({
	m: ['message', SendMessageFields]
});

export const MessageInfo = new Entity({
	...commonMailItemFields
});

export const Conversation = new Entity({
	...commonMailItemFields,
	n: 'numMessages',
	m: ['messages', MessageInfo],
	u: 'unread'
});

export const SearchConversation = new Entity({
	...commonMailItemFields,
	n: 'numMessages',
	m: ['messagesMetaData', MessageInfo],
	u: 'unread'
});

export const CalendarItemCreateModifyRequest = new Entity({
	rev: 'revision',
	comp: 'componentNum',
	m: ['message', MessageInfo],
	apptId: 'appointmentId',
	calItemId: 'calendarItemId',
	invId: 'inviteId'
});

export const InstanceDate = new Entity({
	d: 'date',
	tz: 'timezone'
});

export const CalendarItemDeleteRequest = new Entity({
	inst: ['instanceDate', InstanceDate],
	id: 'inviteId',
	comp: 'componentNum',
	s: 'start',
	m: ['message', MessageInfo]
});

const NewMountpointSpec = new Entity({
	rid: 'sharedItemId',
	zid: 'ownerZimbraId',
	f: 'flags',
	l: 'parentFolderId'
});

export const CreateMountpointRequest = new Entity({
	link: NewMountpointSpec
});

const commonAccessControlEntities = {
	d: 'address',
	gt: 'granteeType',
	zid: 'zimbraId',
	pw: 'password'
};

const ACLGrant = new Entity({
	...commonAccessControlEntities,
	perm: 'permissions'
});

const ACL = new Entity({
	grant: ACLGrant
});

const ShareNotificationAddress = new Entity({
	a: 'address',
	t: 'type',
	p: 'personalName'
});

const Instance = new Entity({
	...commonMessageFields,
	...commonInviteFields,
	otherAtt: 'otherAttendees',
	s: 'start',
	ptst: 'participationStatus',
	dur: 'duration',
	ex: 'isException'
});

const Alarm = new Entity({
	compNum: 'componentNum',
	invId: 'inviteId',
	loc: 'location'
});

export const CalendarItemHitInfo = new Entity({
	...commonMessageFields,
	...commonInviteFields,
	recur: 'isRecurring',
	ptst: 'participationStatus',
	dur: 'duration',
	tzo: 'timezoneOffset',
	otherAtt: 'otherAttendees',
	inst: ['instances', Instance],
	inv: ['invitations', Invitation],
	alarmData: ['alarmData', Alarm],
	sf: 'sortField'
});

export const Hit = new Entity({
	sf: 'sortField'
});

const Folder = new Entity({
	u: 'unread',
	l: 'parentFolderId',
	f: 'flags',
	n: 'nonFolderItemCount',
	s: 'nonFolderItemCountTotal',
	rev: 'revision',
	acl: ACL,
	perm: 'permissions',
	rid: 'sharedItemId',
	zid: 'ownerZimbraId'
});

Folder.addMapping({
	folder: ['folders', Folder],
	link: ['linkedFolders', Folder]
});
export { Folder };

const ForwardMessageInput = new Entity({
	e: ['emailAddresses', MailItemEmailAddress],
	mp: ['mimeParts', MimePart],
	su: 'subject'
});

export const ForwardAppointmentInfo = new Entity({
	m: ['message', ForwardMessageInput],
	exceptId: ['exceptId', InstanceDate]
});

export const ForwardAppointmentInviteInfo = new Entity({
	m: ['message', ForwardMessageInput]
});

export const FreeBusyInstance = new Entity({
	s: 'start',
	e: 'end'
});

export const FreeBusy = new Entity({
	t: ['tentative', FreeBusyInstance],
	f: ['free', FreeBusyInstance],
	b: ['busy', FreeBusyInstance],
	u: ['unavailable', FreeBusyInstance],
	n: ['nodata', FreeBusyInstance]
});

export const ActionOptions = new Entity({
	l: 'folderId',
	tcon: 'constraints',
	tn: 'tagNames',
	f: 'flags',
	zid: 'zimbraId',
	grant: ACLGrant
});

export const AutoComplete = new Entity({
	t: 'type'
});

export const AutoCompleteMatch = new Entity({
	l: 'folderId'
});

export const AutoCompleteResponse = new Entity({
	match: AutoCompleteMatch
});

export const ShareNotification = new Entity({
	e: ['address', ShareNotificationAddress]
});

export const ExternalCalendar = new Entity({
	name: 'accountName',
	l: 'folderId'
});

const ImageFields = new Entity({
	ct: 'contentType',
	s: 'size'
});

const ContactAttributes = new Entity({
	image: ImageFields
});

const contactFields = {
	d: 'date',
	l: 'folderId',
	rev: 'revision',
	sf: 'sortField',
	_attrs: ['attributes', ContactAttributes]
};

const contactListMembers = new Entity({
	cn: ['contacts', new Entity({ ...contactFields })]
});

export const ClientInfoResponse = new Entity({
	_attrs: 'attributes'
});

export const Contact = new Entity({
	...contactFields,
	m: ['members', contactListMembers]
});

export const AutoCompleteGALResponse = new Entity({
	cn: ['contacts', Contact]
});

export const Appointment = new Entity({
	alarm: 'alarm',
	inst: ['instances', Instance]
});

export const Document = new Entity({
	...commonFieldForMessageAndDocuments,
	luuid: 'folderUuid',
	mdver: 'metadataVersion',
	meta: 'metaData',
	descEnabled: 'descriptionEnabled',
	ver: 'version', //same item may have different versions (i.e same names) will need to implement ListDocumentRevisionsRequest
	leb: 'lastEditedAccount',
	cr: 'revisonCreator',
	cd: 'revisedCreationDate',
	loid: 'lockOwnerId',
	ct: 'contentType'
});


export const SaveDocument = new Entity({
	l: 'folderId',
	name: 'name',
	ver: 'version', //same item may have different versions (i.e same names) will need to implement ListDocumentRevisionsRequest
	ct: 'contentType',
	descEnabled: 'descriptionEnabled'
});

export const SearchResponse = new Entity({
	m: ['messages', MessageInfo],
	c: ['conversations', SearchConversation],
	cn: ['contacts', Contact],
	appt: ['appointments', CalendarItemHitInfo],
	doc: ['documents', Document],
	hit: Hit
});

const RedirectAction = new Entity({
	a: 'address'
});

const NotifyAction = new Entity({
	a: 'address',
	su: 'subject'
});

const FilterAction = new Entity({
	actionKeep: 'keep',
	actionDiscard: 'discard',
	actionFileInto: 'fileInto',
	actionFlag: 'flag',
	actionTag: 'tag',
	actionRedirect: ['redirect', RedirectAction],
	actionReply: 'reply',
	actionNotify: ['notify', NotifyAction],
	actionStop: 'stop'
});

const DateCondition = new Entity({
	d: 'date'
});

const ImportanceCondition = new Entity({
	imp: 'importance'
});

const SizeCondition = new Entity({
	s: 'size'
});

const FilterCondition = new Entity({
	condition: 'allOrAny',

	addressBookTest: 'addressBook',
	addressTest: 'address',
	attachmentTest: 'attachment',
	bodyTest: 'body',
	bulkTest: 'bulk',
	contactRankingTest: 'contactRanking',
	conversationTest: 'conversation',
	dateTest: ['date', DateCondition],
	facebookTest: 'facebook',
	flaggedTest: 'flag',
	headerExistsTest: 'headerExists',
	headerTest: 'header',
	importanceTest: ['importance', ImportanceCondition],
	inviteTest: 'invite',
	linkedinTest: 'linkedin',
	listTest: 'list',
	meTest: 'me',
	mimeHeaderTest: 'mimeHeader',
	sizeTest: ['size', SizeCondition],
	twitterTest: 'twitter',
	communityRequestsTest: 'communityRequests',
	communityContentTest: 'communityContent',
	communityConnectionsTest: 'communityConnections'
});

export const Filter = new Entity({
	filterActions: ['actions', FilterAction],
	filterTests: ['conditions', FilterCondition]
});

export const InviteReply = new Entity({
	compNum: 'componentNum',
	m: ['message', MessageInfo],
	rt: 'replyType',
	exceptId: ['exceptId', InstanceDate]
});

const Signature = new Entity({
	cid: 'contentId'
});

export const CreateSignatureRequest = new Entity({
	signature: Signature
});

const GetFolderSpec = new Entity({
	l: 'parentFolderId'
});

export const GetFolderRequest = new Entity({
	tr: 'traverseMountpoints',
	folder: GetFolderSpec
});

const ContactInputAttributes = new Entity({
	n: 'name',
	_content: 'content'
});

export const ContactInputRequest = new Entity({
	l: 'folderId',
	tn: 'tagNames',
	a: ['attributes', ContactInputAttributes],
	m: 'memberOps'
});

const contentInfo = new Entity({
	_content: 'content'
});

const AddMsgAttributes = new Entity({
	content: ['content', contentInfo],
	d: 'date',
	f: 'flags',
	l: 'folderId',
	t: 'tags',
	tn: 'tagNames'
});

export const AddMsgInfo = new Entity({
	m: ['message', AddMsgAttributes]
});

const OnlyEmailAddress = new Entity({
	addr: 'emailAddress'
});

const Target = new Entity({
	d: 'displayName',
	email: ['email', OnlyEmailAddress]
});

const Targets = new Entity({
	target: ['target', Target]
});

export const DiscoverRightsResponse = new Entity({
	targets: ['targets', Targets]
});

export const AccountACEInfo = new Entity({
	...commonAccessControlEntities,
	chkgt: 'checkGrantee'
});

export const AccountRights = new Entity({
	ace: ['access', AccountACEInfo]
});

export const SaveDocuments = new Entity ({
	doc : ['document', SaveDocument]
})

export const GetRightsRequest = new Entity({
	ace: 'access'
});

export const CreateAppSpecificPasswordResponse = new Entity({
	pw: 'password'
});

export const Tag = new Entity({
	u: 'unread'
});

export const Mailbox = new Entity({
	s: 'used'
});
