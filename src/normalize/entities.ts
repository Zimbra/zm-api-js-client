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
	s: 'size'
});

MimePart.addMapping({
	mp: ['mimeParts', MimePart]
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

const CalendarItemAlarmAttendees = new Entity({
	a: 'email'
});

const IntervalRule = new Entity({
	ival: 'intervalCount'
});

const SimpleRepeatingRule = new Entity({
	freq: 'frequency',
	interval: ['interval', IntervalRule]
});

const AddRecurrenceInfo = new Entity({
	rule: ['rule', SimpleRepeatingRule]
});

const RecurrenceInfo = new Entity({
	add: ['add', AddRecurrenceInfo]
});

const CalendarItemAlarm = new Entity({
	trigger: CalendarItemAlarmTrigger,
	at: ['attendees', CalendarItemAlarmAttendees]
});

const CalendarItemDateTime = new Entity({
	d: 'date',
	tz: 'timezone',
	tzoDue: 'timezoneDue'
});

const CalendarItemAttendees = new Entity({
	ptst: 'participationStatus',
	a: 'address',
	d: 'name'
});

const CalendarItemOrganizer = new Entity({
	a: 'address',
	d: 'name'
});

const commonMessageFields = {
	d: 'date',
	f: 'flags',
	fr: 'excerpt',
	l: 'folderId',
	md: 'changeDate',
	ms: 'modifiedSequence',
	rev: 'revision',
	s: 'size',
	sf: 'sortField',
	t: 'tags',
	tn: 'tagNames'
};

const commonInviteFields = {
	compNum: 'componentNum',
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
	seq: 'sequence'
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
	mp: ['mimeParts', MimePart]
});

const InviteInfo = new Entity({
	comp: ['components', InviteComponent],
	mp: ['mimeParts', MimePart]
});

const CalendarItemInviteEmailAddress = new Entity({
	a: 'address',
	p: 'name',
	d: 'displayName',
	t: 'type'
});

const commonMailItemFields = {
	...commonMessageFields,
	e: ['emailAddresses', CalendarItemInviteEmailAddress],
	inv: ['invitations', InviteInfo],
	mp: ['mimeParts', MimePart],
	su: 'subject'
};

export const MessageInfo = new Entity(commonMailItemFields);

export const Conversation = new Entity({
	...commonMailItemFields,
	n: 'numMessages',
	m: ['messages', MessageInfo],
	u: 'unread'
});

export const CalendarItemCreateModifyRequest = new Entity({
	ms: 'modifiedSequence',
	rev: 'revision',
	m: ['message', MessageInfo]
});

const ACLGrant = new Entity({
	d: 'address',
	gt: 'granteeType',
	perm: 'permissions',
	zid: 'zimbraId',
	pw: 'password'
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
	s: 'start',
	recur: 'isRecurring',
	ridZ: 'utcRecurrenceId'
});

export const CalendarItemHitInfo = new Entity({
	...commonMessageFields,
	...commonInviteFields,
	recur: 'isRecurring',
	ptst: 'participationStatus',
	dur: 'duration',
	inst: ['instances', Instance],
	inv: ['invitations', Invitation],
	sf: 'sortField'
});

const Folder = new Entity({
	u: 'unread',
	l: 'parentFolderId',
	f: 'flags',
	n: 'nonFolderItemCount',
	s: 'nonFolderItemCountTotal',
	rev: 'revision',
	acl: ACL
});

Folder.addMapping({
	folder: ['folders', Folder],
	link: ['linkedFolders', Folder]
});
export { Folder };

export const GetFolderResponse = new Entity({
	folder: ['folders', Folder]
});

const FreeBusyInstance = new Entity({
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

export const FolderAction = new Entity({
	l: 'folderId',
	zid: 'zimbraId',
	grant: ACLGrant
});

export const ShareNotification = new Entity({
	e: ['address', ShareNotificationAddress]
});

export const ExternalCalendar = new Entity({
	name: 'accountName',
	l: 'folderId'
});

const Contact = new Entity({
	d: 'date',
	l: 'folderId',
	rev: 'revision',
	sf: 'sortField',
	_attrs: 'attributes'
});

export const SearchResponse = new Entity({
	m: ['messages', MessageInfo],
	c: ['conversations', Conversation],
	cn: ['contacts', Contact]
});
