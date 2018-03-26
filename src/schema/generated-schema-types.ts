/* tslint:disable */
//  This file was automatically generated and should not be edited.

// https://github.com/Zimbra/zm-mailbox/blob/develop/store/docs/acl.md
export enum GranteeType {
  usr = "usr",
  grp = "grp",
  egp = "egp",
  dom = "dom",
  all = "all",
  pub = "pub",
  guest = "guest",
  key = "key",
  cos = "cos",
}


export enum FolderView {
  search = "search",
  folder = "folder",
  tag = "tag",
  conversation = "conversation",
  message = "message",
  contact = "contact",
  document = "document",
  appointment = "appointment",
  virtual = "virtual",
  remote = "remote",
  wiki = "wiki",
  task = "task",
  chat = "chat",
  note = "note",
  comment = "comment",
}


export enum InviteType {
  appt = "appt",
  task = "task",
}


export enum CalendarItemClass {
  PRI = "PRI",
  PUB = "PUB",
  CON = "CON",
}


export enum FreeBusyStatus {
  F = "F",
  B = "B",
  T = "T",
  O = "O",
}


export enum InviteCompletionStatus {
  NEED = "NEED",
  TENT = "TENT",
  CONF = "CONF",
  CANC = "CANC",
  COMP = "COMP",
  INPR = "INPR",
  WAITING = "WAITING",
  DEFERRED = "DEFERRED",
}


export enum ParticipationRole {
  REQ = "REQ",
  OPT = "OPT",
  NON = "NON",
}


export enum ParticipationStatus {
  NE = "NE",
  AC = "AC",
  TE = "TE",
  DE = "DE",
  DG = "DG",
  CO = "CO",
  IN = "IN",
  WA = "WA",
  DF = "DF",
}


export interface ExternalAccountAddInput {
  accountType?: AccountType | null,
  connectionType?: ConnectionType | null,
  emailAddress?: string | null,
  host: string,
  isEnabled?: boolean | null,
  l: number,
  leaveOnServer?: boolean | null,
  name: string,
  password: string,
  port: string,
  username: string,
};

export enum AccountType {
  imap = "imap",
  pop3 = "pop3",
}


export enum ConnectionType {
  cleartext = "cleartext",
  ssl = "ssl",
  tls = "tls",
  tls_is_available = "tls_is_available",
}


export interface ExternalAccountModifyAttrsInput {
  id?: string | null,
  accountType?: AccountType | null,
  defaultSignature?: string | null,
  description?: string | null,
  emailAddress?: string | null,
  fromDisplay?: string | null,
  name?: string | null,
  replyToAddress?: string | null,
  replyToDisplay?: string | null,
  replyToEnabled?: boolean | null,
  storeAndForward?: string | null,
  useAddressForForwardReply?: boolean | null,
  username?: string | null,
  host?: string | null,
  signatureValue?: string | null,
  importOnly?: boolean | null,
  forwardReplySignature?: string | null,
  connectionType?: ConnectionType | null,
  isEnabled?: boolean | null,
  port?: string | null,
  smtpPort?: string | null,
};

export enum ActionTypeName {
  ContactAction = "ContactAction",
  ConvAction = "ConvAction",
  DistributionList = "DistributionList",
  FolderAction = "FolderAction",
  ItemAction = "ItemAction",
  MsgAction = "MsgAction",
  TagAction = "TagAction",
}


export interface CalendarItemInput {
  id?: string | null,
  modifiedSequence?: number | null,
  revision?: number | null,
  message: CalendarItemMessageInput,
};

export interface CalendarItemMessageInput {
  folderId: string,
  subject: string,
  invitations: CalendarItemInviteInput,
  mimeParts?: MimePartInput | null,
  emailAddresses?: Array< CalendarItemInviteEmailAddressInput | null > | null,
  attach?: Array< CalendarItemAttach | null > | null,
};

export interface CalendarItemInviteInput {
  components: Array< CalendarItemInviteComponentInput | null >,
};

export interface CalendarItemInviteComponentInput {
  name: string,
  location?: string | null,
  start?: CalendarItemDateTimeInput | null,
  end?: CalendarItemDateTimeInput | null,
  freeBusy?: FreeBusyStatus | null,
  allDay?: boolean | null,
  organizer?: CalendarItemOrganizerInput | null,
  recurrence?: CalendarItemRecurrenceInput | null,
  attendees?: Array< CalendarItemAttendeesInput | null > | null,
  alarms?: Array< CalendarItemAlarmInput | null > | null,
  class: CalendarItemClass,
  priority?: number | null,
  percentComplete?: string | null,
  status?: InviteCompletionStatus | null,
  noBlob?: boolean | null,
  description?: Array< CalendarItemInviteComponentDescriptionInput | null > | null,
};

export interface CalendarItemDateTimeInput {
  timezone?: string | null,
  date: string,
};

export interface CalendarItemOrganizerInput {
  address?: string | null,
  name?: string | null,
};

export interface CalendarItemRecurrenceInput {
  add?: CalendarItemRecurrenceAddInput | null,
};

export interface CalendarItemRecurrenceAddInput {
  rule?: CalendarItemRecurrenceRuleInput | null,
};

export interface CalendarItemRecurrenceRuleInput {
  interval?: CalendarItemRecurrenceIntervalInput | null,
  frequency?: CalendarItemRecurrenceFrequency | null,
};

export interface CalendarItemRecurrenceIntervalInput {
  intervalCount: number,
  zimbraPrefAutoAddAppointmentsToCalendar?: boolean | null,
};

export enum CalendarItemRecurrenceFrequency {
  SEC = "SEC",
  MIN = "MIN",
  HOU = "HOU",
  DAI = "DAI",
  WEE = "WEE",
  MON = "MON",
  YEA = "YEA",
}


export interface CalendarItemAttendeesInput {
  role?: ParticipationRole | null,
  participationStatus?: ParticipationStatus | null,
  rsvp?: boolean | null,
  address: string,
  name?: string | null,
};

export interface CalendarItemAlarmInput {
  action: AlarmAction,
  trigger: CalendarItemAlarmTriggerInput,
  attendees?: CalendarItemAlarmAttendees | null,
};

export enum AlarmAction {
  DISPLAY = "DISPLAY",
  AUDIO = "AUDIO",
  EMAIL = "EMAIL",
  PROCEDURE = "PROCEDURE",
  X_YAHOO_CALENDAR_ACTION_IM = "X_YAHOO_CALENDAR_ACTION_IM",
  X_YAHOO_CALENDAR_ACTION_MOBILE = "X_YAHOO_CALENDAR_ACTION_MOBILE",
}


export interface CalendarItemAlarmTriggerInput {
  relative?: CalendarItemAlarmTriggerRelativeInput | null,
  absolute?: CalendarItemAlarmTriggerAbsoluteInput | null,
};

export interface CalendarItemAlarmTriggerRelativeInput {
  seconds?: number | null,
  minutes?: number | null,
  hours?: number | null,
  days?: number | null,
  relatedTo?: AlarmRelatedTo | null,
  negative?: boolean | null,
};

export enum AlarmRelatedTo {
  START = "START",
  END = "END",
}


export interface CalendarItemAlarmTriggerAbsoluteInput {
  date: string,
};

export interface CalendarItemAlarmAttendees {
  email: string,
};

export interface CalendarItemInviteComponentDescriptionInput {
  _content?: string | null,
};

export interface MimePartInput {
  contentType: string,
  content?: string | null,
  mimeParts?: Array< MimePartInput | null > | null,
};

export interface CalendarItemInviteEmailAddressInput {
  address: string,
  name: string,
  type: AddressType,
};

export enum AddressType {
  f = "f",
  t = "t",
  c = "c",
  b = "b",
  r = "r",
  s = "s",
  n = "n",
  rf = "rf",
}


export interface CalendarItemAttach {
  aid?: string | null,
};

export interface SharedCalendarInput {
  ownerId: string,
  ownerCalendarId: string,
  name: string,
  color: string,
  reminder: boolean,
};

export interface MailItemHeaderInput {
  n: string,
};

export interface FolderQueryInput {
  uuid?: string | null,
  id?: string | null,
  view?: FolderView | null,
};

export interface FolderActionInput {
  id: string,
  op: string,
  grant?: Array< GrantInput | null > | null,
  name?: string | null,
  folderId?: string | null,
  zimbraId?: string | null,
};

export interface GrantInput {
  address?: string | null,
  granteeType: GranteeType,
  key?: string | null,
  password?: string | null,
  permissions: string,
  zimbraId?: string | null,
};

export interface GetFolderFolderInput {
  uuid?: string | null,
  // Folder ID
  l?: string | null,
  // Fully qualifed folder path
  path?: string | null,
};

export interface MailboxMetadataSectionAttrsInput {
  zimbraPrefCustomFolderTreeOpen?: boolean | null,
  zimbraPrefFoldersExpanded?: string | null,
  zimbraPrefFolderTreeSash?: number | null,
  zimbraPrefGenerateLinkPreviews?: boolean | null,
  zimbraPrefGroupByList?: string | null,
  zimbraPrefMessageListDensity?: string | null,
  zimbraPrefMultitasking?: string | null,
  zimbraPrefReadingPaneSashHorizontal?: number | null,
  zimbraPrefReadingPaneSashVertical?: number | null,
  zimbraPrefSmartFolderTreeOpen?: boolean | null,
  zimbraPrefUndoSendEnabled?: boolean | null,
  zimbraPrefUndoSendTimeout?: number | null,
};

export enum PrefCalendarInitialView {
  day = "day",
  list = "list",
  month = "month",
  week = "week",
  workWeek = "workWeek",
  year = "year",
}


export enum PrefMailSelectAfterDelete {
  next = "next",
  previous = "previous",
  adaptive = "adaptive",
}


export enum ReadingPaneLocation {
  off = "off",
  right = "right",
  bottom = "bottom",
}


export interface IdentityAttrsInput {
  zimbraPrefIdentityId?: string | null,
  zimbraPrefDefaultSignatureId?: string | null,
  zimbraPrefForwardReplySignatureId?: string | null,
  zimbraPrefForwardReplyFormat?: string | null,
  zimbraPrefFromAddress?: string | null,
  zimbraPrefFromAddressType?: string | null,
  zimbraPrefFromDisplay?: string | null,
  zimbraPrefIdentityName?: string | null,
  zimbraPrefMailSignatureStyle?: string | null,
  zimbraPrefReplyToAddress?: string | null,
  zimbraPrefReplyToDisplay?: string | null,
  zimbraPrefReplyToEnabled?: boolean | null,
  zimbraPrefSaveToSent?: boolean | null,
  zimbraPrefSentMailFolder?: string | null,
};

export interface EmailAddressInput {
  email: string,
  name: string,
  shortName: string,
};

export interface Cursor {
  id?: string | null,
  sortVal?: string | null,
  endSortVal?: string | null,
  includeOffset?: boolean | null,
};

export enum SortBy {
  none = "none",
  dateAsc = "dateAsc",
  dateDesc = "dateDesc",
  subjAsc = "subjAsc",
  subjDesc = "subjDesc",
  nameAsc = "nameAsc",
  nameDesc = "nameDesc",
  rcptAsc = "rcptAsc",
  rcptDesc = "rcptDesc",
  attachAsc = "attachAsc",
  attachDesc = "attachDesc",
  flagAsc = "flagAsc",
  flagDesc = "flagDesc",
  priorityAsc = "priorityAsc",
  priorityDesc = "priorityDesc",
}


export enum SearchType {
  conversation = "conversation",
  message = "message",
  contact = "contact",
  appointment = "appointment",
  task = "task",
  wiki = "wiki",
  document = "document",
}


export interface ShareNotificationInput {
  item: ShareNotificationItemInput,
  address: ShareNotificaitonEmailAddressInput,
  notes?: string | null,
};

export interface ShareNotificationItemInput {
  id: string,
};

export interface ShareNotificaitonEmailAddressInput {
  address: string,
  type?: AddressType | null,
  personalName?: string | null,
};

export interface addExternalAccountMutationVariables {
  externalAccount: ExternalAccountAddInput,
};

export interface addExternalAccountMutation {
  addExternalAccount: string | null,
};

export interface addSignatureMutationVariables {
  name: string,
  contentType?: string | null,
  value: string,
};

export interface addSignatureMutation {
  addSignature:  {
    id: string,
  } | null,
};

export interface deleteExternalAccountMutationVariables {
  id: string,
};

export interface deleteExternalAccountMutation {
  deleteExternalAccount: string | null,
};

export interface deleteSignatureMutationVariables {
  id: string,
};

export interface deleteSignatureMutation {
  deleteSignature: string | null,
};

export interface modifyExternalAccountMutationVariables {
  id: string,
  type?: AccountType | null,
  attrs: ExternalAccountModifyAttrsInput,
};

export interface modifyExternalAccountMutation {
  modifyExternalAccount: string | null,
};

export interface modifySignatureMutationVariables {
  id: string,
  contentType?: string | null,
  value: string,
};

export interface modifySignatureMutation {
  modifySignature: string | null,
};

export interface actionMutationVariables {
  type: ActionTypeName,
  id?: string | null,
  ids?: Array< string > | null,
  op: string,
  color?: number | null,
  constraints?: string | null,
  flags?: string | null,
  folderId?: string | null,
  rgb?: string | null,
  tagNames?: string | null,
  name?: string | null,
};

export interface actionMutation {
  action: boolean | null,
};

export interface createAppointmentMutationVariables {
  appointment: CalendarItemInput,
};

export interface createAppointmentMutation {
  createAppointment: boolean | null,
};

export interface deleteAppointmentMutationVariables {
  inviteId: string,
};

export interface deleteAppointmentMutation {
  deleteAppointment: boolean | null,
};

export interface changeCalendarColorMutationVariables {
  id: string,
  color: number,
};

export interface changeCalendarColorMutation {
  changeCalendarColor: boolean | null,
};

export interface checkCalendarMutationVariables {
  calendarId: string,
  value: boolean,
};

export interface checkCalendarMutation {
  checkCalendar: boolean | null,
};

export interface createSharedCalendarMutationVariables {
  sharedCalendar: SharedCalendarInput,
};

export interface createSharedCalendarMutation {
  createSharedCalendar: boolean | null,
};

export interface createCalendarMutationVariables {
  name: string,
  color: number,
  url?: string | null,
};

export interface createCalendarMutation {
  createCalendar: boolean | null,
};

export interface CalendarsAndAppointmentsQueryQueryVariables {
  start?: number | null,
  end?: number | null,
};

export interface CalendarsAndAppointmentsQueryQuery {
  calendars:  Array< {
    absFolderPath: string | null,
    acl:  {
      grant:  Array< {
        address: string | null,
        permissions: string | null,
        granteeType: GranteeType | null,
        zimbraId: string | null,
        password: string | null,
        key: string | null,
      } | null > | null,
    } | null,
    nonFolderItemCount: number | null,
    nonFolderItemCountTotal: number | null,
    revision: number | null,
    view: FolderView | null,
    owner: string | null,
    color: number | null,
    flags: string | null,
    id: string | null,
    name: string | null,
    appointments:  {
      appointments:  Array< {
        inviteId: string,
        date: number | null,
        name: string | null,
        freeBusy: FreeBusyStatus | null,
        freeBusyActual: FreeBusyStatus | null,
        duration: number | null,
        alarm: boolean | null,
        allDay: boolean | null,
        class: CalendarItemClass,
        instances:  Array< {
          start: number | null,
        } | null > | null,
      } | null > | null,
    } | null,
    linkedFolders:  Array< {
      absFolderPath: string | null,
      acl:  {
        grant:  Array< {
          address: string | null,
          permissions: string | null,
          granteeType: GranteeType | null,
          zimbraId: string | null,
          password: string | null,
          key: string | null,
        } | null > | null,
      } | null,
      nonFolderItemCount: number | null,
      nonFolderItemCountTotal: number | null,
      revision: number | null,
      view: FolderView | null,
      owner: string | null,
      color: number | null,
      flags: string | null,
      id: string | null,
      name: string | null,
      appointments:  {
        appointments:  Array< {
          inviteId: string,
          date: number | null,
          name: string | null,
          freeBusy: FreeBusyStatus | null,
          freeBusyActual: FreeBusyStatus | null,
          duration: number | null,
          alarm: boolean | null,
          allDay: boolean | null,
          class: CalendarItemClass,
          instances:  Array< {
            start: number | null,
          } | null > | null,
        } | null > | null,
      } | null,
    } | null > | null,
    folders:  Array< {
      absFolderPath: string | null,
      acl:  {
        grant:  Array< {
          address: string | null,
          permissions: string | null,
          granteeType: GranteeType | null,
          zimbraId: string | null,
          password: string | null,
          key: string | null,
        } | null > | null,
      } | null,
      nonFolderItemCount: number | null,
      nonFolderItemCountTotal: number | null,
      revision: number | null,
      view: FolderView | null,
      owner: string | null,
      color: number | null,
      flags: string | null,
      id: string | null,
      name: string | null,
      appointments:  {
        appointments:  Array< {
          inviteId: string,
          date: number | null,
          name: string | null,
          freeBusy: FreeBusyStatus | null,
          freeBusyActual: FreeBusyStatus | null,
          duration: number | null,
          alarm: boolean | null,
          allDay: boolean | null,
          class: CalendarItemClass,
          instances:  Array< {
            start: number | null,
          } | null > | null,
        } | null > | null,
      } | null,
    } | null > | null,
  } | null > | null,
};

export interface CalendarsQueryQuery {
  calendars:  Array< {
    absFolderPath: string | null,
    acl:  {
      grant:  Array< {
        address: string | null,
        permissions: string | null,
        granteeType: GranteeType | null,
        zimbraId: string | null,
        password: string | null,
        key: string | null,
      } | null > | null,
    } | null,
    nonFolderItemCount: number | null,
    nonFolderItemCountTotal: number | null,
    revision: number | null,
    view: FolderView | null,
    owner: string | null,
    color: number | null,
    flags: string | null,
    id: string | null,
    name: string | null,
    linkedFolders:  Array< {
      absFolderPath: string | null,
      acl:  {
        grant:  Array< {
          address: string | null,
          permissions: string | null,
          granteeType: GranteeType | null,
          zimbraId: string | null,
          password: string | null,
          key: string | null,
        } | null > | null,
      } | null,
      nonFolderItemCount: number | null,
      nonFolderItemCountTotal: number | null,
      revision: number | null,
      view: FolderView | null,
      owner: string | null,
      color: number | null,
      flags: string | null,
      id: string | null,
      name: string | null,
    } | null > | null,
    folders:  Array< {
      absFolderPath: string | null,
      acl:  {
        grant:  Array< {
          address: string | null,
          permissions: string | null,
          granteeType: GranteeType | null,
          zimbraId: string | null,
          password: string | null,
          key: string | null,
        } | null > | null,
      } | null,
      nonFolderItemCount: number | null,
      nonFolderItemCountTotal: number | null,
      revision: number | null,
      view: FolderView | null,
      owner: string | null,
      color: number | null,
      flags: string | null,
      id: string | null,
      name: string | null,
    } | null > | null,
  } | null > | null,
};

export interface FreeBusyQueryVariables {
  names: Array< string >,
  start?: number | null,
  end?: number | null,
};

export interface FreeBusyQuery {
  freeBusy:  Array< {
    id: string,
    free:  Array< {
      start: number | null,
      end: number | null,
    } | null > | null,
    tentative:  Array< {
      start: number | null,
      end: number | null,
    } | null > | null,
    busy:  Array< {
      start: number | null,
      end: number | null,
    } | null > | null,
    unavailable:  Array< {
      start: number | null,
      end: number | null,
    } | null > | null,
    nodata:  Array< {
      start: number | null,
      end: number | null,
    } | null > | null,
  } | null > | null,
};

export interface getContactFrequencyQueryVariables {
  email: string,
  by: string,
  offsetInMinutes?: number | null,
};

export interface getContactFrequencyQuery {
  getContactFrequency:  {
    data:  Array< {
      by: string | null,
      dataPoint:  Array< {
        label: number | null,
        value: number | null,
      } | null > | null,
    } | null > | null,
  } | null,
};

export interface getContactQueryVariables {
  id: string,
};

export interface getContactQuery {
  getContact:  {
    id: string,
    date: number | null,
    folderId: string | null,
    revision: number | null,
    sortField: string | null,
    attributes:  {
      anniversary: string | null,
      birthday: string | null,
      company: string | null,
      email: string | null,
      email2: string | null,
      fax: string | null,
      firstName: string | null,
      fullName: string | null,
      homeCity: string | null,
      homeEmail: string | null,
      homePhone: string | null,
      homePostal: string | null,
      homeState: string | null,
      homeStreet: string | null,
      im: string | null,
      im2: string | null,
      im3: string | null,
      im4: string | null,
      jobTitle: string | null,
      lastName: string | null,
      middleName: string | null,
      mobile: string | null,
      nickname: string | null,
      pager: string | null,
      phone: string | null,
      website: string | null,
      workCity: string | null,
      workEmail: string | null,
      workPhone: string | null,
      workPostal: string | null,
      workState: string | null,
      workStreet: string | null,
    } | null,
  } | null,
};

export interface relatedContactsQueryVariables {
  email: string,
};

export interface relatedContactsQuery {
  relatedContacts:  {
    relatedContacts:  Array< {
      email: string | null,
      scope: number | null,
      p: string | null,
    } | null > | null,
  } | null,
};

export interface conversationActionMutationVariables {
  ids: Array< string >,
  op: string,
};

export interface conversationActionMutation {
  conversationAction: boolean | null,
};

export interface getConversationQueryVariables {
  id: string,
  headers?: Array< MailItemHeaderInput | null > | null,
  html?: boolean | null,
  max?: number | null,
  needExp?: boolean | null,
  fetch?: string | null,
};

export interface getConversationQuery {
  conversation:  {
    id: string | null,
    size: number | null,
    date: number | null,
    folderId: string | null,
    subject: string | null,
    excerpt: string | null,
    conversationId: string | null,
    flags: string | null,
    tags: string | null,
    tagNames: string | null,
    revision: number | null,
    changeDate: number | null,
    modifiedSequence: number | null,
    // Sort field used for cursor-based pagination
    sortField: string | null,
    emailAddresses:  Array< {
      address: string | null,
      name: string | null,
      type: string | null,
      displayName: string | null,
    } | null > | null,
    messages:  Array< {
      id: string | null,
      size: number | null,
      date: number | null,
      folderId: string | null,
      subject: string | null,
      excerpt: string | null,
      conversationId: string | null,
      flags: string | null,
      tags: string | null,
      tagNames: string | null,
      revision: number | null,
      changeDate: number | null,
      modifiedSequence: number | null,
      // Sort field used for cursor-based pagination
      sortField: string | null,
      emailAddresses:  Array< {
        address: string | null,
        name: string | null,
        type: string | null,
        displayName: string | null,
      } | null > | null,
      to:  Array< {
        address: string | null,
        name: string | null,
        type: string | null,
        displayName: string | null,
      } | null > | null,
      from:  Array< {
        address: string | null,
        name: string | null,
        type: string | null,
        displayName: string | null,
      } | null > | null,
      cc:  Array< {
        address: string | null,
        name: string | null,
        type: string | null,
        displayName: string | null,
      } | null > | null,
      bcc:  Array< {
        address: string | null,
        name: string | null,
        type: string | null,
        displayName: string | null,
      } | null > | null,
      sender:  Array< {
        address: string | null,
        name: string | null,
        type: string | null,
        displayName: string | null,
      } | null > | null,
      html: string | null,
      text: string | null,
      attachments:  Array< {
        body: boolean | null,
        content: string | null,
        contentId: string | null,
        contentType: string | null,
        contentDisposition: string | null,
        // Mime part name
        part: string | null,
        // Size in bytes
        size: number | null,
        filename: string | null,
        url: string | null,
        messageId: string | null,
      } | null > | null,
      inlineAttachments:  Array< {
        body: boolean | null,
        content: string | null,
        contentId: string | null,
        contentType: string | null,
        contentDisposition: string | null,
        // Mime part name
        part: string | null,
        // Size in bytes
        size: number | null,
        filename: string | null,
        url: string | null,
        messageId: string | null,
      } | null > | null,
      mimeParts:  Array< {
        body: boolean | null,
        content: string | null,
        contentId: string | null,
        contentType: string | null,
        contentDisposition: string | null,
        // Mime part name
        part: string | null,
        // Size in bytes
        size: number | null,
        filename: string | null,
        url: string | null,
        messageId: string | null,
        mimeParts:  Array< {
          body: boolean | null,
          content: string | null,
          contentId: string | null,
          contentType: string | null,
          contentDisposition: string | null,
          // Mime part name
          part: string | null,
          // Size in bytes
          size: number | null,
          filename: string | null,
          url: string | null,
          messageId: string | null,
          mimeParts:  Array< {
            body: boolean | null,
            content: string | null,
            contentId: string | null,
            contentType: string | null,
            contentDisposition: string | null,
            // Mime part name
            part: string | null,
            // Size in bytes
            size: number | null,
            filename: string | null,
            url: string | null,
            messageId: string | null,
          } | null > | null,
        } | null > | null,
      } | null > | null,
      invitations:  Array< {
        type: InviteType,
        components:  Array< {
          // duration: DurationInfo # dur - TODO
          // recurrence: RecurrenceInfo - TODO
          allDay: boolean | null,
          calItemId: string | null,
          ciFolder: string | null,
          class: CalendarItemClass | null,
          completedDateTime: string | null,
          componentNum: number | null,
          date: number | null,
          draft: boolean | null,
          end:  Array< {
            date: string | null,
            timezone: string | null,
          } | null > | null,
          excerpt: string | null,
          freeBusy: FreeBusyStatus | null,
          freeBusyActual: FreeBusyStatus | null,
          isException: boolean | null,
          isOrganizer: boolean | null,
          location: string | null,
          name: string | null,
          noBlob: boolean | null,
          organizer:  {
            address: string | null,
            name: string | null,
            url: string | null,
          } | null,
          percentComplete: string | null,
          priority: string | null,
          recurrenceId: string | null,
          rsvp: boolean | null,
          sequence: number | null,
          start:  Array< {
            date: string | null,
            timezone: string | null,
          } | null > | null,
          status: InviteCompletionStatus | null,
          uid: string | null,
          x_uid: string | null,
          aid: string | null,
          attendees:  Array< {
            role: ParticipationRole | null,
            participationStatus: ParticipationStatus | null,
            rsvp: boolean | null,
            address: string | null,
            name: string | null,
          } | null > | null,
        } | null > | null,
      } | null > | null,
    } | null > | null,
    // Number of messages in this conversation
    numMessages: number | null,
  } | null,
};

export interface createFolderMutationVariables {
  color?: number | null,
  fetchIfExists?: boolean | null,
  flags?: string | null,
  name: string,
  parentFolderId?: string | null,
  url?: string | null,
  view?: FolderView | null,
};

export interface createFolderMutation {
  createFolder: boolean | null,
};

export interface createSearchFolderMutationVariables {
  name: string,
  parentFolderId?: string | null,
  view?: FolderView | null,
  query: string,
};

export interface createSearchFolderMutation {
  createSearchFolder: boolean | null,
};

export interface FoldersAndAppointmentsQueryQueryVariables {
  ids: Array< FolderQueryInput | null >,
  start?: number | null,
  end?: number | null,
};

export interface FoldersAndAppointmentsQueryQuery {
  folders:  Array< {
    absFolderPath: string | null,
    acl:  {
      grant:  Array< {
        address: string | null,
        permissions: string | null,
        granteeType: GranteeType | null,
        zimbraId: string | null,
        password: string | null,
        key: string | null,
      } | null > | null,
    } | null,
    nonFolderItemCount: number | null,
    nonFolderItemCountTotal: number | null,
    revision: number | null,
    view: FolderView | null,
    owner: string | null,
    color: number | null,
    flags: string | null,
    id: string | null,
    name: string | null,
    appointments:  {
      appointments:  Array< {
        date: number | null,
        duration: number | null,
        allDay: boolean | null,
        instances:  Array< {
          start: number | null,
        } | null > | null,
      } | null > | null,
    } | null,
  } | null > | null,
};

export interface FolderActionMutationMutationVariables {
  action: FolderActionInput,
};

export interface FolderActionMutationMutation {
  folderAction: boolean | null,
};

export interface FolderCreateMutationMutationVariables {
  name: string,
  view?: FolderView | null,
};

export interface FolderCreateMutationMutation {
  createFolder: boolean | null,
};

export interface getFolderQueryVariables {
  visible?: boolean | null,
  needGranteeName?: boolean | null,
  view?: FolderView | null,
  depth?: number | null,
  traverseMountpoints?: boolean | null,
  folder?: GetFolderFolderInput | null,
};

export interface getFolderQuery {
  getFolder:  {
    folders:  Array< {
      absFolderPath: string | null,
      color: number | null,
      flags: string | null,
      id: string | null,
      name: string | null,
      nonFolderItemCount: number | null,
      nonFolderItemCountTotal: number | null,
      owner: string | null,
      parentFolderId: string | null,
      revision: number | null,
      unread: number | null,
      uuid: string | null,
      view: FolderView | null,
      query: string | null,
      folders:  Array< {
        absFolderPath: string | null,
        color: number | null,
        flags: string | null,
        id: string | null,
        name: string | null,
        nonFolderItemCount: number | null,
        nonFolderItemCountTotal: number | null,
        owner: string | null,
        parentFolderId: string | null,
        revision: number | null,
        unread: number | null,
        uuid: string | null,
        view: FolderView | null,
        query: string | null,
        folders:  Array< {
          absFolderPath: string | null,
          color: number | null,
          flags: string | null,
          id: string | null,
          name: string | null,
          nonFolderItemCount: number | null,
          nonFolderItemCountTotal: number | null,
          owner: string | null,
          parentFolderId: string | null,
          revision: number | null,
          unread: number | null,
          uuid: string | null,
          view: FolderView | null,
          query: string | null,
          folders:  Array< {
            absFolderPath: string | null,
            color: number | null,
            flags: string | null,
            id: string | null,
            name: string | null,
            nonFolderItemCount: number | null,
            nonFolderItemCountTotal: number | null,
            owner: string | null,
            parentFolderId: string | null,
            revision: number | null,
            unread: number | null,
            uuid: string | null,
            view: FolderView | null,
            query: string | null,
            folders:  Array< {
              absFolderPath: string | null,
              color: number | null,
              flags: string | null,
              id: string | null,
              name: string | null,
              nonFolderItemCount: number | null,
              nonFolderItemCountTotal: number | null,
              owner: string | null,
              parentFolderId: string | null,
              revision: number | null,
              unread: number | null,
              uuid: string | null,
              view: FolderView | null,
              query: string | null,
            } | null > | null,
          } | null > | null,
        } | null > | null,
      } | null > | null,
    } | null > | null,
  } | null,
};

export interface getSearchFolderQuery {
  getSearchFolder:  {
    folders:  Array< {
      absFolderPath: string | null,
      color: number | null,
      flags: string | null,
      id: string | null,
      name: string | null,
      nonFolderItemCount: number | null,
      nonFolderItemCountTotal: number | null,
      owner: string | null,
      parentFolderId: string | null,
      revision: number | null,
      unread: number | null,
      uuid: string | null,
      view: FolderView | null,
      query: string | null,
      folders:  Array< {
        absFolderPath: string | null,
        color: number | null,
        flags: string | null,
        id: string | null,
        name: string | null,
        nonFolderItemCount: number | null,
        nonFolderItemCountTotal: number | null,
        owner: string | null,
        parentFolderId: string | null,
        revision: number | null,
        unread: number | null,
        uuid: string | null,
        view: FolderView | null,
        query: string | null,
        folders:  Array< {
          absFolderPath: string | null,
          color: number | null,
          flags: string | null,
          id: string | null,
          name: string | null,
          nonFolderItemCount: number | null,
          nonFolderItemCountTotal: number | null,
          owner: string | null,
          parentFolderId: string | null,
          revision: number | null,
          unread: number | null,
          uuid: string | null,
          view: FolderView | null,
          query: string | null,
          folders:  Array< {
            absFolderPath: string | null,
            color: number | null,
            flags: string | null,
            id: string | null,
            name: string | null,
            nonFolderItemCount: number | null,
            nonFolderItemCountTotal: number | null,
            owner: string | null,
            parentFolderId: string | null,
            revision: number | null,
            unread: number | null,
            uuid: string | null,
            view: FolderView | null,
            query: string | null,
            folders:  Array< {
              absFolderPath: string | null,
              color: number | null,
              flags: string | null,
              id: string | null,
              name: string | null,
              nonFolderItemCount: number | null,
              nonFolderItemCountTotal: number | null,
              owner: string | null,
              parentFolderId: string | null,
              revision: number | null,
              unread: number | null,
              uuid: string | null,
              view: FolderView | null,
              query: string | null,
            } | null > | null,
          } | null > | null,
        } | null > | null,
      } | null > | null,
    } | null > | null,
  } | null,
};

export interface getMailboxMetadataQueryVariables {
  section?: string | null,
};

export interface getMailboxMetadataQuery {
  getMailboxMetadata:  {
    meta:  Array< {
      section: string,
      _attrs:  {
        zimbraPrefCustomFolderTreeOpen: boolean | null,
        zimbraPrefFoldersExpanded: string | null,
        zimbraPrefFolderTreeSash: number | null,
        zimbraPrefGenerateLinkPreviews: boolean | null,
        zimbraPrefGroupByList: string | null,
        zimbraPrefMessageListDensity: string | null,
        zimbraPrefMultitasking: string | null,
        zimbraPrefReadingPaneSashHorizontal: number | null,
        zimbraPrefReadingPaneSashVertical: number | null,
        zimbraPrefSmartFolderTreeOpen: boolean | null,
        zimbraPrefUndoSendEnabled: boolean | null,
        zimbraPrefUndoSendTimeout: number | null,
      },
    } | null > | null,
  } | null,
};

export interface setMailboxMetadataMutationVariables {
  section?: string | null,
  attrs: MailboxMetadataSectionAttrsInput,
};

export interface setMailboxMetadataMutation {
  setMailboxMetadata: boolean | null,
};

export interface messageActionMutationVariables {
  ids: Array< string >,
  op: string,
};

export interface messageActionMutation {
  messageAction: boolean | null,
};

export interface getMessageQueryVariables {
  id: string,
};

export interface getMessageQuery {
  message:  {
    id: string | null,
    size: number | null,
    date: number | null,
    folderId: string | null,
    subject: string | null,
    excerpt: string | null,
    conversationId: string | null,
    flags: string | null,
    tags: string | null,
    tagNames: string | null,
    revision: number | null,
    changeDate: number | null,
    modifiedSequence: number | null,
    // Sort field used for cursor-based pagination
    sortField: string | null,
    emailAddresses:  Array< {
      address: string | null,
      name: string | null,
      type: string | null,
      displayName: string | null,
    } | null > | null,
    to:  Array< {
      address: string | null,
      name: string | null,
      type: string | null,
      displayName: string | null,
    } | null > | null,
    from:  Array< {
      address: string | null,
      name: string | null,
      type: string | null,
      displayName: string | null,
    } | null > | null,
    cc:  Array< {
      address: string | null,
      name: string | null,
      type: string | null,
      displayName: string | null,
    } | null > | null,
    bcc:  Array< {
      address: string | null,
      name: string | null,
      type: string | null,
      displayName: string | null,
    } | null > | null,
    sender:  Array< {
      address: string | null,
      name: string | null,
      type: string | null,
      displayName: string | null,
    } | null > | null,
    html: string | null,
    text: string | null,
    attachments:  Array< {
      body: boolean | null,
      content: string | null,
      contentId: string | null,
      contentType: string | null,
      contentDisposition: string | null,
      // Mime part name
      part: string | null,
      // Size in bytes
      size: number | null,
      filename: string | null,
      url: string | null,
      messageId: string | null,
    } | null > | null,
    inlineAttachments:  Array< {
      body: boolean | null,
      content: string | null,
      contentId: string | null,
      contentType: string | null,
      contentDisposition: string | null,
      // Mime part name
      part: string | null,
      // Size in bytes
      size: number | null,
      filename: string | null,
      url: string | null,
      messageId: string | null,
    } | null > | null,
    mimeParts:  Array< {
      body: boolean | null,
      content: string | null,
      contentId: string | null,
      contentType: string | null,
      contentDisposition: string | null,
      // Mime part name
      part: string | null,
      // Size in bytes
      size: number | null,
      filename: string | null,
      url: string | null,
      messageId: string | null,
      mimeParts:  Array< {
        body: boolean | null,
        content: string | null,
        contentId: string | null,
        contentType: string | null,
        contentDisposition: string | null,
        // Mime part name
        part: string | null,
        // Size in bytes
        size: number | null,
        filename: string | null,
        url: string | null,
        messageId: string | null,
        mimeParts:  Array< {
          body: boolean | null,
          content: string | null,
          contentId: string | null,
          contentType: string | null,
          contentDisposition: string | null,
          // Mime part name
          part: string | null,
          // Size in bytes
          size: number | null,
          filename: string | null,
          url: string | null,
          messageId: string | null,
        } | null > | null,
      } | null > | null,
    } | null > | null,
    invitations:  Array< {
      type: InviteType,
      components:  Array< {
        // duration: DurationInfo # dur - TODO
        // recurrence: RecurrenceInfo - TODO
        allDay: boolean | null,
        calItemId: string | null,
        ciFolder: string | null,
        class: CalendarItemClass | null,
        completedDateTime: string | null,
        componentNum: number | null,
        date: number | null,
        draft: boolean | null,
        end:  Array< {
          date: string | null,
          timezone: string | null,
        } | null > | null,
        excerpt: string | null,
        freeBusy: FreeBusyStatus | null,
        freeBusyActual: FreeBusyStatus | null,
        isException: boolean | null,
        isOrganizer: boolean | null,
        location: string | null,
        name: string | null,
        noBlob: boolean | null,
        organizer:  {
          address: string | null,
          name: string | null,
          url: string | null,
        } | null,
        percentComplete: string | null,
        priority: string | null,
        recurrenceId: string | null,
        rsvp: boolean | null,
        sequence: number | null,
        start:  Array< {
          date: string | null,
          timezone: string | null,
        } | null > | null,
        status: InviteCompletionStatus | null,
        uid: string | null,
        x_uid: string | null,
        aid: string | null,
        attendees:  Array< {
          role: ParticipationRole | null,
          participationStatus: ParticipationStatus | null,
          rsvp: boolean | null,
          address: string | null,
          name: string | null,
        } | null > | null,
      } | null > | null,
    } | null > | null,
  } | null,
};

export interface noopQuery {
  noop: boolean | null,
};

export interface AccountInfoQuery {
  accountInfo:  {
    id: string,
    name: string | null,
    publicURL: string | null,
    rest: string | null,
    attrs:  {
      displayName: string | null,
      zimbraFeatureCalendarEnabled: boolean | null,
      zimbraFeatureRelatedContactsEnabled: boolean | null,
    } | null,
    identities:  {
      identity:  Array< {
        id: string,
        name: string | null,
        _attrs:  {
          zimbraPrefIdentityId: string,
          zimbraPrefDefaultSignatureId: string | null,
          zimbraPrefForwardReplyFormat: string | null,
          zimbraPrefFromAddress: string | null,
          zimbraPrefFromAddressType: string | null,
          zimbraPrefFromDisplay: string | null,
          zimbraPrefIdentityName: string | null,
          zimbraPrefMailSignatureStyle: string | null,
          zimbraPrefReplyToAddress: string | null,
          zimbraPrefReplyToDisplay: string | null,
          zimbraPrefReplyToEnabled: boolean | null,
          zimbraPrefSaveToSent: boolean | null,
          zimbraPrefSentMailFolder: string | null,
        } | null,
      } | null > | null,
    } | null,
    dataSources:  {
      imap:  Array< {
        id: string,
        connectionType: string | null,
        defaultSignature: string | null,
        emailAddress: string | null,
        forwardReplySignature: string | null,
        fromDisplay: string | null,
        host: string | null,
        importOnly: boolean | null,
        isEnabled: boolean | null,
        name: string | null,
        port: string | null,
        replyToAddress: string | null,
        replyToDisplay: string | null,
        smtpPort: string | null,
        useAddressForForwardReply: boolean | null,
        username: string | null,
        l: string | null,
        failingSince: string | null,
        lastError: Array< string | null > | null,
      } | null > | null,
      pop3:  Array< {
        id: string,
        connectionType: string | null,
        defaultSignature: string | null,
        emailAddress: string | null,
        forwardReplySignature: string | null,
        fromDisplay: string | null,
        host: string | null,
        importOnly: boolean | null,
        isEnabled: boolean | null,
        name: string | null,
        port: string | null,
        replyToAddress: string | null,
        replyToDisplay: string | null,
        smtpPort: string | null,
        useAddressForForwardReply: boolean | null,
        username: string | null,
        l: string | null,
        failingSince: string | null,
        lastError: Array< string | null > | null,
      } | null > | null,
      cal:  Array< {
        id: string,
        connectionType: string | null,
        defaultSignature: string | null,
        emailAddress: string | null,
        forwardReplySignature: string | null,
        fromDisplay: string | null,
        host: string | null,
        importOnly: boolean | null,
        isEnabled: boolean | null,
        name: string | null,
        port: string | null,
        replyToAddress: string | null,
        replyToDisplay: string | null,
        smtpPort: string | null,
        useAddressForForwardReply: boolean | null,
        username: string | null,
        l: string | null,
        failingSince: string | null,
        lastError: Array< string | null > | null,
      } | null > | null,
    },
    signatures:  {
      signature:  Array< {
        id: string | null,
        name: string | null,
        content:  Array< {
          _content: string | null,
          type: string | null,
        } | null > | null,
      } | null > | null,
    } | null,
    prefs:  {
      zimbraPrefAutoAddAppointmentsToCalendar: boolean | null,
      zimbraPrefCalendarFirstDayOfWeek: string | null,
      zimbraPrefCalendarInitialView: PrefCalendarInitialView | null,
      zimbraPrefCalendarReminderEmail: string | null,
      zimbraPrefCalendarWorkingHours: string | null,
      zimbraPrefGroupMailBy: string | null,
      zimbraPrefMailSelectAfterDelete: PrefMailSelectAfterDelete | null,
      zimbraPrefMarkMsgRead: number | null,
      zimbraPrefOutOfOfficeFromDate: string | null,
      zimbraPrefOutOfOfficeReply: string | null,
      zimbraPrefOutOfOfficeReplyEnabled: boolean | null,
      zimbraPrefOutOfOfficeStatusAlertOnLogin: boolean | null,
      zimbraPrefOutOfOfficeUntilDate: string | null,
      zimbraPrefReadingPaneEnabled: boolean | null,
      zimbraPrefReadingPaneLocation: ReadingPaneLocation | null,
      zimbraPrefReadingPaneSashHorizontal: number | null,
      zimbraPrefShowFragments: boolean | null,
    } | null,
  } | null,
};

export interface prefAutoAddAppointmentToCalendarMutationVariables {
  value: boolean,
};

export interface prefAutoAddAppointmentToCalendarMutation {
  prefAutoAddAppointmentToCalendar: boolean | null,
};

export interface prefCalendarFirstDayOfWeekMutationVariables {
  value: string,
};

export interface prefCalendarFirstDayOfWeekMutation {
  prefCalendarFirstDayOfWeek: string | null,
};

export interface prefCalendarInitialViewMutationVariables {
  value: PrefCalendarInitialView,
};

export interface prefCalendarInitialViewMutation {
  prefCalendarInitialView: PrefCalendarInitialView | null,
};

export interface prefCalendarWorkingHoursMutationVariables {
  value: string,
};

export interface prefCalendarWorkingHoursMutation {
  prefCalendarWorkingHours: string | null,
};

export interface modifyIdentityMutationVariables {
  id: string,
  attrs: IdentityAttrsInput,
};

export interface modifyIdentityMutation {
  modifyIdentity: string | null,
};

export interface prefMailForwardMutationVariables {
  address?: string | null,
  deleteAndForward: boolean,
};

export interface prefMailForwardMutation {
  prefMailForward: string | null,
};

export interface prefEnableOutOfOfficeAlertOnLoginMutationVariables {
  value: boolean,
};

export interface prefEnableOutOfOfficeAlertOnLoginMutation {
  prefEnableOutOfOfficeAlertOnLogin: boolean | null,
};

export interface prefOutOfOfficeFromDateMutationVariables {
  value: string,
};

export interface prefOutOfOfficeFromDateMutation {
  prefOutOfOfficeFromDate: string | null,
};

export interface prefEnableOutOfOfficeReplyMutationVariables {
  value: boolean,
};

export interface prefEnableOutOfOfficeReplyMutation {
  prefEnableOutOfOfficeReply: boolean | null,
};

export interface prefOutOfOfficeReplyMutationVariables {
  value: string,
};

export interface prefOutOfOfficeReplyMutation {
  prefOutOfOfficeReply: string | null,
};

export interface prefOutOfOfficeUntilDateMutationVariables {
  value: string,
};

export interface prefOutOfOfficeUntilDateMutation {
  prefOutOfOfficeUntilDate: string | null,
};

export interface sendMsgMutationVariables {
  subject: string,
  text: string,
  to: Array< EmailAddressInput | null >,
};

export interface sendMsgMutation {
  sendMsg: boolean | null,
};

export interface PreferencesQuery {
  preferences:  {
    zimbraPrefCalendarInitialView: PrefCalendarInitialView | null,
    zimbraPrefCalendarReminderEmail: string | null,
    zimbraPrefCalendarWorkingHours: string | null,
    zimbraPrefCalendarFirstDayOfWeek: string | null,
    zimbraPrefAutoAddAppointmentsToCalendar: boolean | null,
    zimbraPrefOutOfOfficeStatusAlertOnLogin: boolean | null,
    zimbraPrefOutOfOfficeReplyEnabled: boolean | null,
    zimbraPrefOutOfOfficeReply: string | null,
    zimbraPrefOutOfOfficeFromDate: string | null,
    zimbraPrefOutOfOfficeUntilDate: string | null,
    zimbraPrefReadingPaneEnabled: boolean | null,
    zimbraPrefReadingPaneLocation: ReadingPaneLocation | null,
    zimbraPrefReadingPaneSashHorizontal: number | null,
  } | null,
};

export interface searchQueryVariables {
  cursor?: Cursor | null,
  fetch?: string | null,
  fullConversation?: boolean | null,
  limit?: number | null,
  needExp?: boolean | null,
  offset?: number | null,
  query?: string | null,
  recip?: number | null,
  sortBy?: SortBy | null,
  types?: SearchType | null,
};

export interface searchQuery {
  // Perform a search for a variety types using a flexible query interface.
  // [[SOAP Search API Documentation]](https://files.zimbra.com/docs/soap_api/8.7.11/api-reference/zimbraMail/Search.html)
  // [[Query Tips]](https://wiki.zimbra.com/wiki/Zimbra_Web_Client_Search_Tips)
  search:  {
    more: boolean | null,
    offset: number | null,
    sortBy: string | null,
    contacts:  Array< {
      id: string,
      date: number | null,
      folderId: string | null,
      revision: number | null,
      sortField: string | null,
      attributes:  {
        anniversary: string | null,
        birthday: string | null,
        company: string | null,
        email: string | null,
        email2: string | null,
        fax: string | null,
        firstName: string | null,
        fullName: string | null,
        homeCity: string | null,
        homeEmail: string | null,
        homePhone: string | null,
        homePostal: string | null,
        homeState: string | null,
        homeStreet: string | null,
        im: string | null,
        im2: string | null,
        im3: string | null,
        im4: string | null,
        jobTitle: string | null,
        lastName: string | null,
        middleName: string | null,
        mobile: string | null,
        nickname: string | null,
        pager: string | null,
        phone: string | null,
        website: string | null,
        workCity: string | null,
        workEmail: string | null,
        workPhone: string | null,
        workPostal: string | null,
        workState: string | null,
        workStreet: string | null,
      } | null,
    } | null > | null,
    messages:  Array< {
      id: string | null,
      size: number | null,
      date: number | null,
      folderId: string | null,
      subject: string | null,
      excerpt: string | null,
      conversationId: string | null,
      flags: string | null,
      tags: string | null,
      tagNames: string | null,
      revision: number | null,
      changeDate: number | null,
      modifiedSequence: number | null,
      // Sort field used for cursor-based pagination
      sortField: string | null,
      emailAddresses:  Array< {
        address: string | null,
        name: string | null,
        type: string | null,
        displayName: string | null,
      } | null > | null,
      attachments:  Array< {
        body: boolean | null,
        content: string | null,
        contentId: string | null,
        contentType: string | null,
        contentDisposition: string | null,
        // Mime part name
        part: string | null,
        // Size in bytes
        size: number | null,
        filename: string | null,
        url: string | null,
        messageId: string | null,
      } | null > | null,
      inlineAttachments:  Array< {
        body: boolean | null,
        content: string | null,
        contentId: string | null,
        contentType: string | null,
        contentDisposition: string | null,
        // Mime part name
        part: string | null,
        // Size in bytes
        size: number | null,
        filename: string | null,
        url: string | null,
        messageId: string | null,
      } | null > | null,
      mimeParts:  Array< {
        body: boolean | null,
        content: string | null,
        contentId: string | null,
        contentType: string | null,
        contentDisposition: string | null,
        // Mime part name
        part: string | null,
        // Size in bytes
        size: number | null,
        filename: string | null,
        url: string | null,
        messageId: string | null,
        mimeParts:  Array< {
          body: boolean | null,
          content: string | null,
          contentId: string | null,
          contentType: string | null,
          contentDisposition: string | null,
          // Mime part name
          part: string | null,
          // Size in bytes
          size: number | null,
          filename: string | null,
          url: string | null,
          messageId: string | null,
          mimeParts:  Array< {
            body: boolean | null,
            content: string | null,
            contentId: string | null,
            contentType: string | null,
            contentDisposition: string | null,
            // Mime part name
            part: string | null,
            // Size in bytes
            size: number | null,
            filename: string | null,
            url: string | null,
            messageId: string | null,
          } | null > | null,
        } | null > | null,
      } | null > | null,
    } | null > | null,
    conversations:  Array< {
      id: string | null,
      size: number | null,
      date: number | null,
      folderId: string | null,
      subject: string | null,
      excerpt: string | null,
      conversationId: string | null,
      flags: string | null,
      tags: string | null,
      tagNames: string | null,
      revision: number | null,
      changeDate: number | null,
      modifiedSequence: number | null,
      // Sort field used for cursor-based pagination
      sortField: string | null,
      emailAddresses:  Array< {
        address: string | null,
        name: string | null,
        type: string | null,
        displayName: string | null,
      } | null > | null,
      // Number of messages in this conversation
      numMessages: number | null,
      messages:  Array< {
        id: string | null,
        date: number | null,
        folderId: string | null,
        subject: string | null,
        excerpt: string | null,
      } | null > | null,
    } | null > | null,
  } | null,
};

export interface sendShareNotificationMutationVariables {
  shareNotification: ShareNotificationInput,
};

export interface sendShareNotificationMutation {
  sendShareNotification: boolean | null,
};

export interface ShareInfosQueryQueryVariables {
  addresses?: Array< string > | null,
};

export interface ShareInfosQueryQuery {
  shareInfos:  Array< {
    folderUuid: string | null,
    view: FolderView | null,
  } | null > | null,
};

export interface FoldersQueryQuery {
  taskFolders:  Array< {
    absFolderPath: string | null,
    acl:  {
      grant:  Array< {
        address: string | null,
        permissions: string | null,
        granteeType: GranteeType | null,
        zimbraId: string | null,
        password: string | null,
        key: string | null,
      } | null > | null,
    } | null,
    nonFolderItemCount: number | null,
    nonFolderItemCountTotal: number | null,
    revision: number | null,
    view: FolderView | null,
    owner: string | null,
    color: number | null,
    flags: string | null,
    id: string | null,
    name: string | null,
    tasks:  {
      tasks:  Array< {
        date: number | null,
        excerpt: string | null,
        folderId: string,
        id: string,
        instances:  Array< {
          dueDate: number | null,
          tzoDue: number | null,
        } | null > | null,
        inviteId: string,
        modifiedSequence: number | null,
        name: string | null,
        percentComplete: string | null,
        priority: number | null,
        revision: number | null,
        status: InviteCompletionStatus | null,
      } | null > | null,
    } | null,
  } | null > | null,
};

export interface TaskQueryQueryVariables {
  id: string,
};

export interface TaskQueryQuery {
  task:  {
    id: string | null,
    date: number | null,
    folderId: string | null,
    invitations:  Array< {
      components:  Array< {
        description:  Array< {
          _content: string | null,
        } | null > | null,
        end:  Array< {
          date: string | null,
        } | null > | null,
        name: string | null,
        percentComplete: string | null,
        priority: string | null,
        status: InviteCompletionStatus | null,
      } | null > | null,
    } | null > | null,
    modifiedSequence: number | null,
    revision: number | null,
  } | null,
};

export interface TaskCreateMutationMutationVariables {
  task: CalendarItemInput,
};

export interface TaskCreateMutationMutation {
  createTask: boolean | null,
};

export interface TaskModifyMutationMutationVariables {
  task: CalendarItemInput,
};

export interface TaskModifyMutationMutation {
  modifyTask: boolean | null,
};

export interface TaskCancelMutationMutationVariables {
  inviteId: string,
};

export interface TaskCancelMutationMutation {
  cancelTask: boolean | null,
};

export interface TaskHardDeleteMutationMutationVariables {
  id: string,
};

export interface TaskHardDeleteMutationMutation {
  itemAction: boolean | null,
};

export interface TaskMoveMutationMutationVariables {
  id: string,
  folderId: string,
};

export interface TaskMoveMutationMutation {
  itemAction: boolean | null,
};

export interface calendarFieldsFragment {
  absFolderPath: string | null,
  acl:  {
    grant:  Array< {
      address: string | null,
      permissions: string | null,
      granteeType: GranteeType | null,
      zimbraId: string | null,
      password: string | null,
      key: string | null,
    } | null > | null,
  } | null,
  nonFolderItemCount: number | null,
  nonFolderItemCountTotal: number | null,
  revision: number | null,
  view: FolderView | null,
  owner: string | null,
  color: number | null,
  flags: string | null,
  id: string | null,
  name: string | null,
};

export interface contactFieldsFragment {
  id: string,
  date: number | null,
  folderId: string | null,
  revision: number | null,
  sortField: string | null,
  attributes:  {
    anniversary: string | null,
    birthday: string | null,
    company: string | null,
    email: string | null,
    email2: string | null,
    fax: string | null,
    firstName: string | null,
    fullName: string | null,
    homeCity: string | null,
    homeEmail: string | null,
    homePhone: string | null,
    homePostal: string | null,
    homeState: string | null,
    homeStreet: string | null,
    im: string | null,
    im2: string | null,
    im3: string | null,
    im4: string | null,
    jobTitle: string | null,
    lastName: string | null,
    middleName: string | null,
    mobile: string | null,
    nickname: string | null,
    pager: string | null,
    phone: string | null,
    website: string | null,
    workCity: string | null,
    workEmail: string | null,
    workPhone: string | null,
    workPostal: string | null,
    workState: string | null,
    workStreet: string | null,
  } | null,
};

export interface conversationFieldsFragment {
  id: string | null,
  size: number | null,
  date: number | null,
  folderId: string | null,
  subject: string | null,
  excerpt: string | null,
  conversationId: string | null,
  flags: string | null,
  tags: string | null,
  tagNames: string | null,
  revision: number | null,
  changeDate: number | null,
  modifiedSequence: number | null,
  // Sort field used for cursor-based pagination
  sortField: string | null,
  emailAddresses:  Array< {
    address: string | null,
    name: string | null,
    type: string | null,
    displayName: string | null,
  } | null > | null,
  messages:  Array< {
    id: string | null,
    size: number | null,
    date: number | null,
    folderId: string | null,
    subject: string | null,
    excerpt: string | null,
    conversationId: string | null,
    flags: string | null,
    tags: string | null,
    tagNames: string | null,
    revision: number | null,
    changeDate: number | null,
    modifiedSequence: number | null,
    // Sort field used for cursor-based pagination
    sortField: string | null,
    emailAddresses:  Array< {
      address: string | null,
      name: string | null,
      type: string | null,
      displayName: string | null,
    } | null > | null,
    to:  Array< {
      address: string | null,
      name: string | null,
      type: string | null,
      displayName: string | null,
    } | null > | null,
    from:  Array< {
      address: string | null,
      name: string | null,
      type: string | null,
      displayName: string | null,
    } | null > | null,
    cc:  Array< {
      address: string | null,
      name: string | null,
      type: string | null,
      displayName: string | null,
    } | null > | null,
    bcc:  Array< {
      address: string | null,
      name: string | null,
      type: string | null,
      displayName: string | null,
    } | null > | null,
    sender:  Array< {
      address: string | null,
      name: string | null,
      type: string | null,
      displayName: string | null,
    } | null > | null,
    html: string | null,
    text: string | null,
    attachments:  Array< {
      body: boolean | null,
      content: string | null,
      contentId: string | null,
      contentType: string | null,
      contentDisposition: string | null,
      // Mime part name
      part: string | null,
      // Size in bytes
      size: number | null,
      filename: string | null,
      url: string | null,
      messageId: string | null,
    } | null > | null,
    inlineAttachments:  Array< {
      body: boolean | null,
      content: string | null,
      contentId: string | null,
      contentType: string | null,
      contentDisposition: string | null,
      // Mime part name
      part: string | null,
      // Size in bytes
      size: number | null,
      filename: string | null,
      url: string | null,
      messageId: string | null,
    } | null > | null,
    mimeParts:  Array< {
      body: boolean | null,
      content: string | null,
      contentId: string | null,
      contentType: string | null,
      contentDisposition: string | null,
      // Mime part name
      part: string | null,
      // Size in bytes
      size: number | null,
      filename: string | null,
      url: string | null,
      messageId: string | null,
      mimeParts:  Array< {
        body: boolean | null,
        content: string | null,
        contentId: string | null,
        contentType: string | null,
        contentDisposition: string | null,
        // Mime part name
        part: string | null,
        // Size in bytes
        size: number | null,
        filename: string | null,
        url: string | null,
        messageId: string | null,
        mimeParts:  Array< {
          body: boolean | null,
          content: string | null,
          contentId: string | null,
          contentType: string | null,
          contentDisposition: string | null,
          // Mime part name
          part: string | null,
          // Size in bytes
          size: number | null,
          filename: string | null,
          url: string | null,
          messageId: string | null,
        } | null > | null,
      } | null > | null,
    } | null > | null,
    invitations:  Array< {
      type: InviteType,
      components:  Array< {
        // duration: DurationInfo # dur - TODO
        // recurrence: RecurrenceInfo - TODO
        allDay: boolean | null,
        calItemId: string | null,
        ciFolder: string | null,
        class: CalendarItemClass | null,
        completedDateTime: string | null,
        componentNum: number | null,
        date: number | null,
        draft: boolean | null,
        end:  Array< {
          date: string | null,
          timezone: string | null,
        } | null > | null,
        excerpt: string | null,
        freeBusy: FreeBusyStatus | null,
        freeBusyActual: FreeBusyStatus | null,
        isException: boolean | null,
        isOrganizer: boolean | null,
        location: string | null,
        name: string | null,
        noBlob: boolean | null,
        organizer:  {
          address: string | null,
          name: string | null,
          url: string | null,
        } | null,
        percentComplete: string | null,
        priority: string | null,
        recurrenceId: string | null,
        rsvp: boolean | null,
        sequence: number | null,
        start:  Array< {
          date: string | null,
          timezone: string | null,
        } | null > | null,
        status: InviteCompletionStatus | null,
        uid: string | null,
        x_uid: string | null,
        aid: string | null,
        attendees:  Array< {
          role: ParticipationRole | null,
          participationStatus: ParticipationStatus | null,
          rsvp: boolean | null,
          address: string | null,
          name: string | null,
        } | null > | null,
      } | null > | null,
    } | null > | null,
  } | null > | null,
  // Number of messages in this conversation
  numMessages: number | null,
};

export interface dataSourceFieldsFragment {
  id: string,
  connectionType: string | null,
  defaultSignature: string | null,
  emailAddress: string | null,
  forwardReplySignature: string | null,
  fromDisplay: string | null,
  host: string | null,
  importOnly: boolean | null,
  isEnabled: boolean | null,
  name: string | null,
  port: string | null,
  replyToAddress: string | null,
  replyToDisplay: string | null,
  smtpPort: string | null,
  useAddressForForwardReply: boolean | null,
  username: string | null,
  l: string | null,
  failingSince: string | null,
  lastError: Array< string | null > | null,
};

export interface folderFieldsFragment {
  absFolderPath: string | null,
  color: number | null,
  flags: string | null,
  id: string | null,
  name: string | null,
  nonFolderItemCount: number | null,
  nonFolderItemCountTotal: number | null,
  owner: string | null,
  parentFolderId: string | null,
  revision: number | null,
  unread: number | null,
  uuid: string | null,
  view: FolderView | null,
  query: string | null,
};

export interface emailAddressFieldsFragment {
  address: string | null,
  name: string | null,
  type: string | null,
  displayName: string | null,
};

export interface messageFieldsFragment {
  id: string | null,
  size: number | null,
  date: number | null,
  folderId: string | null,
  subject: string | null,
  excerpt: string | null,
  conversationId: string | null,
  flags: string | null,
  tags: string | null,
  tagNames: string | null,
  revision: number | null,
  changeDate: number | null,
  modifiedSequence: number | null,
  // Sort field used for cursor-based pagination
  sortField: string | null,
  emailAddresses:  Array< {
    address: string | null,
    name: string | null,
    type: string | null,
    displayName: string | null,
  } | null > | null,
  to:  Array< {
    address: string | null,
    name: string | null,
    type: string | null,
    displayName: string | null,
  } | null > | null,
  from:  Array< {
    address: string | null,
    name: string | null,
    type: string | null,
    displayName: string | null,
  } | null > | null,
  cc:  Array< {
    address: string | null,
    name: string | null,
    type: string | null,
    displayName: string | null,
  } | null > | null,
  bcc:  Array< {
    address: string | null,
    name: string | null,
    type: string | null,
    displayName: string | null,
  } | null > | null,
  sender:  Array< {
    address: string | null,
    name: string | null,
    type: string | null,
    displayName: string | null,
  } | null > | null,
  html: string | null,
  text: string | null,
  attachments:  Array< {
    body: boolean | null,
    content: string | null,
    contentId: string | null,
    contentType: string | null,
    contentDisposition: string | null,
    // Mime part name
    part: string | null,
    // Size in bytes
    size: number | null,
    filename: string | null,
    url: string | null,
    messageId: string | null,
  } | null > | null,
  inlineAttachments:  Array< {
    body: boolean | null,
    content: string | null,
    contentId: string | null,
    contentType: string | null,
    contentDisposition: string | null,
    // Mime part name
    part: string | null,
    // Size in bytes
    size: number | null,
    filename: string | null,
    url: string | null,
    messageId: string | null,
  } | null > | null,
  mimeParts:  Array< {
    body: boolean | null,
    content: string | null,
    contentId: string | null,
    contentType: string | null,
    contentDisposition: string | null,
    // Mime part name
    part: string | null,
    // Size in bytes
    size: number | null,
    filename: string | null,
    url: string | null,
    messageId: string | null,
    mimeParts:  Array< {
      body: boolean | null,
      content: string | null,
      contentId: string | null,
      contentType: string | null,
      contentDisposition: string | null,
      // Mime part name
      part: string | null,
      // Size in bytes
      size: number | null,
      filename: string | null,
      url: string | null,
      messageId: string | null,
      mimeParts:  Array< {
        body: boolean | null,
        content: string | null,
        contentId: string | null,
        contentType: string | null,
        contentDisposition: string | null,
        // Mime part name
        part: string | null,
        // Size in bytes
        size: number | null,
        filename: string | null,
        url: string | null,
        messageId: string | null,
      } | null > | null,
    } | null > | null,
  } | null > | null,
  invitations:  Array< {
    type: InviteType,
    components:  Array< {
      // duration: DurationInfo # dur - TODO
      // recurrence: RecurrenceInfo - TODO
      allDay: boolean | null,
      calItemId: string | null,
      ciFolder: string | null,
      class: CalendarItemClass | null,
      completedDateTime: string | null,
      componentNum: number | null,
      date: number | null,
      draft: boolean | null,
      end:  Array< {
        date: string | null,
        timezone: string | null,
      } | null > | null,
      excerpt: string | null,
      freeBusy: FreeBusyStatus | null,
      freeBusyActual: FreeBusyStatus | null,
      isException: boolean | null,
      isOrganizer: boolean | null,
      location: string | null,
      name: string | null,
      noBlob: boolean | null,
      organizer:  {
        address: string | null,
        name: string | null,
        url: string | null,
      } | null,
      percentComplete: string | null,
      priority: string | null,
      recurrenceId: string | null,
      rsvp: boolean | null,
      sequence: number | null,
      start:  Array< {
        date: string | null,
        timezone: string | null,
      } | null > | null,
      status: InviteCompletionStatus | null,
      uid: string | null,
      x_uid: string | null,
      aid: string | null,
      attendees:  Array< {
        role: ParticipationRole | null,
        participationStatus: ParticipationStatus | null,
        rsvp: boolean | null,
        address: string | null,
        name: string | null,
      } | null > | null,
    } | null > | null,
  } | null > | null,
};

export interface mimePartFieldsFragment {
  body: boolean | null,
  content: string | null,
  contentId: string | null,
  contentType: string | null,
  contentDisposition: string | null,
  // Mime part name
  part: string | null,
  // Size in bytes
  size: number | null,
  filename: string | null,
  url: string | null,
  messageId: string | null,
};

export interface calendarWithAppointmentFieldsFragment {
  absFolderPath: string | null,
  acl:  {
    grant:  Array< {
      address: string | null,
      permissions: string | null,
      granteeType: GranteeType | null,
      zimbraId: string | null,
      password: string | null,
      key: string | null,
    } | null > | null,
  } | null,
  nonFolderItemCount: number | null,
  nonFolderItemCountTotal: number | null,
  revision: number | null,
  view: FolderView | null,
  owner: string | null,
  color: number | null,
  flags: string | null,
  id: string | null,
  name: string | null,
  appointments:  {
    appointments:  Array< {
      inviteId: string,
      date: number | null,
      name: string | null,
      freeBusy: FreeBusyStatus | null,
      freeBusyActual: FreeBusyStatus | null,
      duration: number | null,
      alarm: boolean | null,
      allDay: boolean | null,
      class: CalendarItemClass,
      instances:  Array< {
        start: number | null,
      } | null > | null,
    } | null > | null,
  } | null,
};

export interface searchConversationFieldsFragment {
  id: string | null,
  size: number | null,
  date: number | null,
  folderId: string | null,
  subject: string | null,
  excerpt: string | null,
  conversationId: string | null,
  flags: string | null,
  tags: string | null,
  tagNames: string | null,
  revision: number | null,
  changeDate: number | null,
  modifiedSequence: number | null,
  // Sort field used for cursor-based pagination
  sortField: string | null,
  emailAddresses:  Array< {
    address: string | null,
    name: string | null,
    type: string | null,
    displayName: string | null,
  } | null > | null,
  // Number of messages in this conversation
  numMessages: number | null,
  messages:  Array< {
    id: string | null,
    date: number | null,
    folderId: string | null,
    subject: string | null,
    excerpt: string | null,
  } | null > | null,
};

export interface searchMessageFieldsFragment {
  id: string | null,
  size: number | null,
  date: number | null,
  folderId: string | null,
  subject: string | null,
  excerpt: string | null,
  conversationId: string | null,
  flags: string | null,
  tags: string | null,
  tagNames: string | null,
  revision: number | null,
  changeDate: number | null,
  modifiedSequence: number | null,
  // Sort field used for cursor-based pagination
  sortField: string | null,
  emailAddresses:  Array< {
    address: string | null,
    name: string | null,
    type: string | null,
    displayName: string | null,
  } | null > | null,
  attachments:  Array< {
    body: boolean | null,
    content: string | null,
    contentId: string | null,
    contentType: string | null,
    contentDisposition: string | null,
    // Mime part name
    part: string | null,
    // Size in bytes
    size: number | null,
    filename: string | null,
    url: string | null,
    messageId: string | null,
  } | null > | null,
  inlineAttachments:  Array< {
    body: boolean | null,
    content: string | null,
    contentId: string | null,
    contentType: string | null,
    contentDisposition: string | null,
    // Mime part name
    part: string | null,
    // Size in bytes
    size: number | null,
    filename: string | null,
    url: string | null,
    messageId: string | null,
  } | null > | null,
  mimeParts:  Array< {
    body: boolean | null,
    content: string | null,
    contentId: string | null,
    contentType: string | null,
    contentDisposition: string | null,
    // Mime part name
    part: string | null,
    // Size in bytes
    size: number | null,
    filename: string | null,
    url: string | null,
    messageId: string | null,
    mimeParts:  Array< {
      body: boolean | null,
      content: string | null,
      contentId: string | null,
      contentType: string | null,
      contentDisposition: string | null,
      // Mime part name
      part: string | null,
      // Size in bytes
      size: number | null,
      filename: string | null,
      url: string | null,
      messageId: string | null,
      mimeParts:  Array< {
        body: boolean | null,
        content: string | null,
        contentId: string | null,
        contentType: string | null,
        contentDisposition: string | null,
        // Mime part name
        part: string | null,
        // Size in bytes
        size: number | null,
        filename: string | null,
        url: string | null,
        messageId: string | null,
      } | null > | null,
    } | null > | null,
  } | null > | null,
};
