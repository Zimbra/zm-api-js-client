export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Acl = {
  __typename?: 'ACL';
  grant?: Maybe<Array<Maybe<AclGrant>>>;
};

export type AclGrant = {
  __typename?: 'ACLGrant';
  address?: Maybe<Scalars['String']>;
  permissions?: Maybe<Scalars['String']>;
  granteeType?: Maybe<GranteeType>;
  zimbraId?: Maybe<Scalars['ID']>;
  password?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
};

export type AccountAceInfo = {
  __typename?: 'AccountACEInfo';
  zimbraId?: Maybe<Scalars['ID']>;
  granteeType: GranteeType;
  right: Scalars['String'];
  address?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  deny?: Maybe<Scalars['Boolean']>;
  checkGrantee?: Maybe<Scalars['Boolean']>;
};

export type AccountAceInfoInput = {
  zimbraId?: Maybe<Scalars['ID']>;
  granteeType: GranteeType;
  right: Scalars['String'];
  address?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  deny?: Maybe<Scalars['Boolean']>;
  checkGrantee?: Maybe<Scalars['Boolean']>;
};

export type AccountCos = {
  __typename?: 'AccountCos';
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export type AccountInfo = {
  __typename?: 'AccountInfo';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  publicURL?: Maybe<Scalars['String']>;
  rest?: Maybe<Scalars['String']>;
  used?: Maybe<Scalars['String']>;
  profileImageId?: Maybe<Scalars['Int']>;
  changePasswordURL?: Maybe<Scalars['String']>;
  soapURL?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  attrs?: Maybe<AccountInfoAttrs>;
  habRoots?: Maybe<HabRoots>;
  license?: Maybe<License>;
  props?: Maybe<PropList>;
  zimlets?: Maybe<AccountZimlet>;
  cos?: Maybe<AccountCos>;
  pasteitcleanedEnabled?: Maybe<Scalars['Boolean']>;
};

export type AccountInfoAttrs = {
  __typename?: 'AccountInfoAttrs';
  displayName?: Maybe<Scalars['String']>;
  zimbraBrandingFolderName?: Maybe<Scalars['String']>;
  zimbraDomainTrialConvertAtExpiration?: Maybe<Scalars['Boolean']>;
  zimbraDomainTrialExpirationDate?: Maybe<Scalars['String']>;
  zimbraDumpsterEnabled?: Maybe<Scalars['Boolean']>;
  zimbraIsAdminAccount?: Maybe<Scalars['Boolean']>;
  zimbraIsDelegatedAdminAccount?: Maybe<Scalars['Boolean']>;
  zimbraFeatureMailEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureCalendarEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureBriefcasesEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureMobileSyncEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureRelatedContactsEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPasswordBlockCommonEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPasswordMinAlphaChars?: Maybe<Scalars['Int']>;
  zimbraPasswordMinNumericChars?: Maybe<Scalars['Int']>;
  zimbraPasswordMinUpperCaseChars?: Maybe<Scalars['Int']>;
  zimbraPasswordMinDigitsOrPuncs?: Maybe<Scalars['Int']>;
  zimbraPasswordMinPunctuationChars?: Maybe<Scalars['Int']>;
  zimbraPasswordMaxLength?: Maybe<Scalars['Int']>;
  zimbraPasswordMinLength?: Maybe<Scalars['Int']>;
  zimbraPasswordMinLowerCaseChars?: Maybe<Scalars['Int']>;
  zimbraPasswordMinAge?: Maybe<Scalars['Int']>;
  zimbraPasswordMaxAge?: Maybe<Scalars['Int']>;
  zimbraPasswordEnforceHistory?: Maybe<Scalars['Int']>;
  zimbraPasswordAllowedChars?: Maybe<Scalars['String']>;
  zimbraPasswordAllowedPunctuationChars?: Maybe<Scalars['String']>;
  zimbraFeatureChangePasswordEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureResetPasswordStatus?: Maybe<ResetPasswordStatus>;
  zimbraFeatureWebClientOfflineAccessEnabled?: Maybe<Scalars['Boolean']>;
  zimbraMailBlacklistMaxNumEntries?: Maybe<Scalars['Int']>;
  zimbraMailQuota?: Maybe<Scalars['String']>;
  zimbraPublicSharingEnabled?: Maybe<Scalars['Boolean']>;
  zimbraExternalSharingEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureGalEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureGalAutoCompleteEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureOutOfOfficeReplyEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureFiltersEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureReadReceiptsEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureSharingEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureManageZimlets?: Maybe<Scalars['Boolean']>;
  zimbraFeatureTwoFactorAuthAvailable?: Maybe<Scalars['Boolean']>;
  zimbraFeatureTwoFactorAuthRequired?: Maybe<Scalars['Boolean']>;
  zimbraFeatureViewInHtmlEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureZulipChatEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureDocumentEditingEnabled?: Maybe<Scalars['Boolean']>;
  zimbraTwoFactorAuthEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureTrustedDevicesEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureAppSpecificPasswordsEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureMailPriorityEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFileUploadMaxSize?: Maybe<Scalars['Float']>;
  zimbraFileUploadMaxSizePerFile?: Maybe<Scalars['Float']>;
  zimbraMailAttachmentMaxSize?: Maybe<Scalars['Float']>;
  zimbraMtaMaxMessageSize?: Maybe<Scalars['Float']>;
  zimbraMailAlias?: Maybe<Array<Maybe<Scalars['String']>>>;
  zimbraFeatureTaggingEnabled?: Maybe<Scalars['Boolean']>;
  zimbraIdentityMaxNumEntries?: Maybe<Scalars['Int']>;
  zimbraFeatureIdentitiesEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureMailSendLaterEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeaturePowerPasteEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureConversationsEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureImapDataSourceEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeaturePop3DataSourceEnabled?: Maybe<Scalars['Boolean']>;
  zimbraSignupAffiliate?: Maybe<Scalars['String']>;
  zimbraSignupRecoveryEmail?: Maybe<Scalars['String']>;
  zimbraTrialExpirationDate?: Maybe<Scalars['String']>;
  zimbraTrialConvertAtExpiration?: Maybe<Scalars['Boolean']>;
  zimbraHierarchicalAddressBookRoot?: Maybe<Scalars['String']>;
};

export enum AccountType {
  Imap = 'imap',
  Pop3 = 'pop3'
}

export type AccountZimlet = {
  __typename?: 'AccountZimlet';
  zimlet?: Maybe<Array<Maybe<AccountZimletInfo>>>;
};

export type AccountZimletConfigInfo = {
  __typename?: 'AccountZimletConfigInfo';
  global?: Maybe<Array<Maybe<ZimletConfigGlobal>>>;
  host?: Maybe<Array<Maybe<ZimletConfigHost>>>;
  property?: Maybe<Array<Maybe<ZimletConfigProperty>>>;
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type AccountZimletContext = {
  __typename?: 'AccountZimletContext';
  baseUrl?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
  presence?: Maybe<ZimletPresence>;
};

export type AccountZimletDesc = {
  __typename?: 'AccountZimletDesc';
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  extension?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  zimbraXZimletCompatibleSemVer?: Maybe<Scalars['String']>;
};

export type AccountZimletInfo = {
  __typename?: 'AccountZimletInfo';
  zimletContext?: Maybe<Array<Maybe<AccountZimletContext>>>;
  zimlet?: Maybe<Array<Maybe<AccountZimletDesc>>>;
  zimletConfig?: Maybe<Array<Maybe<AccountZimletConfigInfo>>>;
};

export type ActionData = {
  __typename?: 'ActionData';
  address?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  op?: Maybe<Scalars['String']>;
  zimbraId?: Maybe<Scalars['ID']>;
};

export type ActionOpResponse = {
  __typename?: 'ActionOpResponse';
  action?: Maybe<ActionOpResponseData>;
};

export type ActionOpResponseData = {
  __typename?: 'ActionOpResponseData';
  id: Scalars['ID'];
  op: Scalars['String'];
};

export enum ActionTypeName {
  ContactAction = 'ContactAction',
  ConvAction = 'ConvAction',
  DistributionList = 'DistributionList',
  FolderAction = 'FolderAction',
  ItemAction = 'ItemAction',
  MsgAction = 'MsgAction',
  TagAction = 'TagAction'
}

export type AddMsgInput = {
  folderId: Scalars['ID'];
  absFolderPath?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  meta?: Maybe<Scalars['String']>;
};

export type AddRecurrenceInfo = {
  __typename?: 'AddRecurrenceInfo';
  add?: Maybe<Array<Maybe<AddRecurrenceInfo>>>;
  exclude?: Maybe<Array<Maybe<ExcludeRecurrenceInfo>>>;
  except?: Maybe<Array<Maybe<ExceptionRuleInfo>>>;
  cancel?: Maybe<Array<Maybe<CancelRuleInfo>>>;
  rule?: Maybe<Array<Maybe<SimpleRepeatingRule>>>;
};

export type AddressCondition = {
  __typename?: 'AddressCondition';
  header: Scalars['String'];
  part: Scalars['String'];
  stringComparison: Scalars['String'];
  caseSensitive?: Maybe<Scalars['Boolean']>;
  value: Scalars['String'];
  valueComparison?: Maybe<Scalars['String']>;
  countComparison?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type AddressConditionInput = {
  header: Scalars['String'];
  part: Scalars['String'];
  stringComparison: Scalars['String'];
  caseSensitive?: Maybe<Scalars['Boolean']>;
  value: Scalars['String'];
  valueComparison?: Maybe<Scalars['String']>;
  countComparison?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

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

export type Alarm = {
  __typename?: 'Alarm';
  alarmInstStart?: Maybe<Scalars['Float']>;
  componentNum?: Maybe<Scalars['Int']>;
  inviteId?: Maybe<Scalars['ID']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nextAlarm?: Maybe<Scalars['Float']>;
};

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

export type AppSpecificPassword = {
  __typename?: 'AppSpecificPassword';
  appName?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['Float']>;
  lastUsed?: Maybe<Scalars['Float']>;
};

export type AppSpecificPasswords = {
  __typename?: 'AppSpecificPasswords';
  passwordData?: Maybe<Array<Maybe<AppSpecificPassword>>>;
};

export type AppSpecificPasswordsResponse = {
  __typename?: 'AppSpecificPasswordsResponse';
  appSpecificPasswords?: Maybe<AppSpecificPasswords>;
  maxAppPasswords?: Maybe<Array<Maybe<MaxAppPasswords>>>;
};

export type AppointmentInfo = {
  __typename?: 'AppointmentInfo';
  id: Scalars['ID'];
  invitations?: Maybe<Array<Maybe<Invitation>>>;
};

export type Attachment = {
  __typename?: 'Attachment';
  id?: Maybe<Scalars['ID']>;
  content?: Maybe<Scalars['String']>;
};

export type AttachmentInput = {
  attachmentId?: Maybe<Scalars['String']>;
  documents?: Maybe<Array<Maybe<DocumentInput>>>;
  existingAttachments?: Maybe<Array<Maybe<ExistingAttachmentInput>>>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  authToken?: Maybe<Array<Maybe<AuthToken>>>;
  twoFactorAuthRequired?: Maybe<TwoFactorAuthRequired>;
  trustedDevicesEnabled?: Maybe<TrustedDevicesEnabled>;
  lifetime?: Maybe<Scalars['Float']>;
  session?: Maybe<Session>;
  skin?: Maybe<Array<Maybe<Skin>>>;
  csrfToken?: Maybe<CsrfToken>;
};

export type AuthToken = {
  __typename?: 'AuthToken';
  _content?: Maybe<Scalars['String']>;
};

export type AutoCompleteGalResponse = {
  __typename?: 'AutoCompleteGALResponse';
  contacts?: Maybe<Array<Maybe<Contact>>>;
};

export type AutoCompleteMatch = {
  __typename?: 'AutoCompleteMatch';
  email?: Maybe<Scalars['String']>;
  type?: Maybe<AutoCompleteMatchType>;
  ranking?: Maybe<Scalars['Int']>;
  isGroup?: Maybe<Scalars['Boolean']>;
  exp?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  folderId?: Maybe<Scalars['ID']>;
  display?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['String']>;
  middle?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['String']>;
  full?: Maybe<Scalars['String']>;
  nick?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  fileas?: Maybe<Scalars['String']>;
};

export enum AutoCompleteMatchType {
  Gal = 'gal',
  Contact = 'contact',
  RankingTable = 'rankingTable'
}

export type AutoCompleteResponse = {
  __typename?: 'AutoCompleteResponse';
  canBeCached?: Maybe<Scalars['Boolean']>;
  match?: Maybe<Array<Maybe<AutoCompleteMatch>>>;
};

export type BasicAction = {
  __typename?: 'BasicAction';
  index?: Maybe<Scalars['Int']>;
};

export type BasicActionInput = {
  index?: Maybe<Scalars['Int']>;
};

export type BasicCondition = {
  __typename?: 'BasicCondition';
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type BasicConditionInput = {
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type BodyCondition = {
  __typename?: 'BodyCondition';
  caseSensitive?: Maybe<Scalars['Boolean']>;
  value?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type BodyConditionInput = {
  caseSensitive?: Maybe<Scalars['Boolean']>;
  value?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type ByDayRule = {
  __typename?: 'ByDayRule';
  wkday?: Maybe<Array<Maybe<WkDay>>>;
};

export type ByMonthDayRule = {
  __typename?: 'ByMonthDayRule';
  dayList?: Maybe<Scalars['String']>;
};

export type ByMonthRule = {
  __typename?: 'ByMonthRule';
  monthList?: Maybe<Scalars['Int']>;
};

export type BySetPosRule = {
  __typename?: 'BySetPosRule';
  poslist?: Maybe<Scalars['Int']>;
};

export type CalOrganizer = {
  __typename?: 'CalOrganizer';
  address?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  sentBy?: Maybe<Scalars['String']>;
};

export type CalResource = {
  __typename?: 'CalResource';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  _attrs?: Maybe<CalResourceAttributes>;
};

export type CalResourceAttributes = {
  __typename?: 'CalResourceAttributes';
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  zimbraCalResLocationDisplayName?: Maybe<Scalars['String']>;
  zimbraCalResSite?: Maybe<Scalars['String']>;
  zimbraCalResBuilding?: Maybe<Scalars['String']>;
  zimbraCalResFloor?: Maybe<Scalars['String']>;
  zimbraCalResRoom?: Maybe<Scalars['String']>;
  zimbraCalResCapacity?: Maybe<Scalars['String']>;
  zimbraCalResType?: Maybe<Scalars['String']>;
  zimbraCalResContactEmail?: Maybe<Scalars['String']>;
  zimbraCalResContactPhone?: Maybe<Scalars['String']>;
  zimbraCalResContactName?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
};

export type CalTzInfo = {
  __typename?: 'CalTZInfo';
  id?: Maybe<Scalars['String']>;
  timezoneStdOffset?: Maybe<Scalars['Int']>;
  timezoneDaylightOffset?: Maybe<Scalars['Int']>;
  stdname?: Maybe<Scalars['String']>;
  dayname?: Maybe<Scalars['String']>;
  standard?: Maybe<TzOnsetInfo>;
  daylight?: Maybe<TzOnsetInfo>;
};

export type CalendarCounterAppointmentInput = {
  components: Array<Maybe<CalendarItemInviteComponentCounterInput>>;
};

export type CalendarItemAlarm = {
  __typename?: 'CalendarItemAlarm';
  action: AlarmAction;
  trigger?: Maybe<Array<Maybe<CalendarItemAlarmTrigger>>>;
  attendees?: Maybe<Array<Maybe<CalendarItemAlarmAttendees>>>;
};

export type CalendarItemAlarmAttendees = {
  __typename?: 'CalendarItemAlarmAttendees';
  email: Scalars['String'];
};

export type CalendarItemAlarmAttendeesInput = {
  email: Scalars['String'];
};

export type CalendarItemAlarmInput = {
  action: AlarmAction;
  trigger: CalendarItemAlarmTriggerInput;
  attendees?: Maybe<CalendarItemAlarmAttendeesInput>;
};

export type CalendarItemAlarmTrigger = {
  __typename?: 'CalendarItemAlarmTrigger';
  relative?: Maybe<Array<Maybe<CalendarItemAlarmTriggerRelative>>>;
};

export type CalendarItemAlarmTriggerAbsoluteInput = {
  date: Scalars['String'];
};

export type CalendarItemAlarmTriggerInput = {
  relative?: Maybe<CalendarItemAlarmTriggerRelativeInput>;
  absolute?: Maybe<CalendarItemAlarmTriggerAbsoluteInput>;
};

export type CalendarItemAlarmTriggerRelative = {
  __typename?: 'CalendarItemAlarmTriggerRelative';
  weeks?: Maybe<Scalars['Int']>;
  days?: Maybe<Scalars['Int']>;
  hours?: Maybe<Scalars['Int']>;
  minutes?: Maybe<Scalars['Int']>;
  seconds?: Maybe<Scalars['Int']>;
  relatedTo?: Maybe<AlarmRelatedTo>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type CalendarItemAlarmTriggerRelativeInput = {
  weeks?: Maybe<Scalars['Int']>;
  days?: Maybe<Scalars['Int']>;
  hours?: Maybe<Scalars['Int']>;
  minutes?: Maybe<Scalars['Int']>;
  seconds?: Maybe<Scalars['Int']>;
  relatedTo?: Maybe<AlarmRelatedTo>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type CalendarItemAttendee = {
  __typename?: 'CalendarItemAttendee';
  role?: Maybe<ParticipationRole>;
  participationStatus?: Maybe<ParticipationStatus>;
  rsvp?: Maybe<Scalars['Boolean']>;
  address?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  calendarUserType?: Maybe<Scalars['String']>;
};

export type CalendarItemAttendeesInput = {
  role?: Maybe<ParticipationRole>;
  participationStatus?: Maybe<ParticipationStatus>;
  rsvp?: Maybe<Scalars['Boolean']>;
  address: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  calendarUserType?: Maybe<Scalars['String']>;
};

export enum CalendarItemClass {
  Pri = 'PRI',
  Pub = 'PUB',
  Con = 'CON'
}

export type CalendarItemDateTimeInput = {
  timezone?: Maybe<Scalars['String']>;
  date: Scalars['String'];
};

export type CalendarItemHitInfo = {
  __typename?: 'CalendarItemHitInfo';
  alarm?: Maybe<Scalars['Boolean']>;
  allDay?: Maybe<Scalars['Boolean']>;
  changeDate?: Maybe<Scalars['Float']>;
  class: CalendarItemClass;
  componentNum?: Maybe<Scalars['Int']>;
  date?: Maybe<Scalars['Float']>;
  timezoneOffset?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['Float']>;
  excerpt?: Maybe<Scalars['String']>;
  flags?: Maybe<Scalars['String']>;
  folderId: Scalars['ID'];
  freeBusy?: Maybe<FreeBusyStatus>;
  freeBusyActual?: Maybe<FreeBusyStatus>;
  id: Scalars['ID'];
  alarmData?: Maybe<Array<Maybe<Alarm>>>;
  instances?: Maybe<Array<Maybe<Instance>>>;
  invitations?: Maybe<Array<Maybe<Invitation>>>;
  inviteId: Scalars['ID'];
  isOrganizer?: Maybe<Scalars['Boolean']>;
  isRecurring?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  modifiedSequence?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  organizer?: Maybe<CalOrganizer>;
  otherAttendees?: Maybe<Scalars['Boolean']>;
  participationStatus?: Maybe<ParticipationStatus>;
  percentComplete?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Float']>;
  utcRecurrenceId?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
  sortField?: Maybe<Scalars['String']>;
  status?: Maybe<InviteCompletionStatus>;
  tagNames?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
  x_uid?: Maybe<Scalars['String']>;
  aid?: Maybe<Scalars['String']>;
  draft?: Maybe<Scalars['Boolean']>;
  neverSent?: Maybe<Scalars['Boolean']>;
};

export type CalendarItemInput = {
  id?: Maybe<Scalars['ID']>;
  modifiedSequence?: Maybe<Scalars['Float']>;
  revision?: Maybe<Scalars['Float']>;
  componentNum?: Maybe<Scalars['Int']>;
  message: CalendarItemMessageInput;
};

export type CalendarItemInviteComponentCounterInput = {
  name: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  start: CalendarItemDateTimeInput;
  end: CalendarItemDateTimeInput;
  exceptId?: Maybe<CalendarOptionalItemDateTimeInput>;
  freeBusy?: Maybe<FreeBusyStatus>;
  allDay?: Maybe<Scalars['Boolean']>;
  organizer?: Maybe<CalendarItemOrganizerInput>;
  recurrence?: Maybe<CalendarItemRecurrenceInput>;
  attendees?: Maybe<Array<Maybe<CalendarItemAttendeesInput>>>;
  alarms?: Maybe<Array<Maybe<CalendarItemAlarmInput>>>;
  class?: Maybe<CalendarItemClass>;
  uid?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['String']>;
  percentComplete?: Maybe<Scalars['String']>;
  status?: Maybe<InviteCompletionStatus>;
  noBlob?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Array<Maybe<CalendarItemInviteComponentDescriptionInput>>>;
  draft?: Maybe<Scalars['Boolean']>;
};

export type CalendarItemInviteComponentDescriptionInput = {
  _content?: Maybe<Scalars['String']>;
};

export type CalendarItemInviteComponentInput = {
  name?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  start?: Maybe<CalendarItemDateTimeInput>;
  end?: Maybe<CalendarItemDateTimeInput>;
  exceptId?: Maybe<CalendarOptionalItemDateTimeInput>;
  freeBusy?: Maybe<FreeBusyStatus>;
  allDay?: Maybe<Scalars['Boolean']>;
  organizer?: Maybe<CalendarItemOrganizerInput>;
  recurrence?: Maybe<CalendarItemRecurrenceInput>;
  attendees?: Maybe<Array<Maybe<CalendarItemAttendeesInput>>>;
  alarms?: Maybe<Array<Maybe<CalendarItemAlarmInput>>>;
  class: CalendarItemClass;
  priority?: Maybe<Scalars['String']>;
  percentComplete?: Maybe<Scalars['String']>;
  status?: Maybe<InviteCompletionStatus>;
  noBlob?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Array<Maybe<CalendarItemInviteComponentDescriptionInput>>>;
  draft?: Maybe<Scalars['Boolean']>;
};

export type CalendarItemInviteInput = {
  components: Array<Maybe<CalendarItemInviteComponentInput>>;
};

export type CalendarItemMessageInput = {
  folderId?: Maybe<Scalars['ID']>;
  subject?: Maybe<Scalars['String']>;
  invitations?: Maybe<CalendarItemInviteInput>;
  mimeParts?: Maybe<Array<Maybe<MimePartInput>>>;
  emailAddresses?: Maybe<Array<Maybe<MailItemEmailAddressInput>>>;
  attachments?: Maybe<Array<Maybe<AttachmentInput>>>;
  replyType?: Maybe<InviteReplyType>;
};

export type CalendarItemOrganizerInput = {
  address?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  sentBy?: Maybe<Scalars['String']>;
};

export type CalendarItemRecurrenceAddInput = {
  rule?: Maybe<CalendarItemRecurrenceRuleInput>;
};

export type CalendarItemRecurrenceByDayInput = {
  wkday?: Maybe<Array<Maybe<WkDayInput>>>;
};

export type CalendarItemRecurrenceByMonthDayInput = {
  dayList: Scalars['String'];
};

export type CalendarItemRecurrenceByMonthInput = {
  monthList: Scalars['Int'];
};

export type CalendarItemRecurrenceBySetPosInput = {
  poslist: Scalars['Int'];
};

export type CalendarItemRecurrenceEndCount = {
  __typename?: 'CalendarItemRecurrenceEndCount';
  number?: Maybe<Scalars['Int']>;
};

export type CalendarItemRecurrenceEndCountInput = {
  number: Scalars['Int'];
};

export type CalendarItemRecurrenceEndDate = {
  __typename?: 'CalendarItemRecurrenceEndDate';
  date?: Maybe<Scalars['String']>;
};

export type CalendarItemRecurrenceEndDateInput = {
  date: Scalars['String'];
};

export enum CalendarItemRecurrenceFrequency {
  Sec = 'SEC',
  Min = 'MIN',
  Hou = 'HOU',
  Dai = 'DAI',
  Wee = 'WEE',
  Mon = 'MON',
  Yea = 'YEA'
}

export type CalendarItemRecurrenceInput = {
  add?: Maybe<CalendarItemRecurrenceAddInput>;
};

export type CalendarItemRecurrenceIntervalInput = {
  intervalCount: Scalars['Int'];
  zimbraPrefAutoAddAppointmentsToCalendar?: Maybe<Scalars['Boolean']>;
};

export type CalendarItemRecurrenceRuleInput = {
  interval?: Maybe<CalendarItemRecurrenceIntervalInput>;
  frequency?: Maybe<CalendarItemRecurrenceFrequency>;
  count?: Maybe<CalendarItemRecurrenceEndCountInput>;
  until?: Maybe<CalendarItemRecurrenceEndDateInput>;
  byday?: Maybe<CalendarItemRecurrenceByDayInput>;
  bymonthday?: Maybe<CalendarItemRecurrenceByMonthDayInput>;
  bymonth?: Maybe<CalendarItemRecurrenceByMonthInput>;
  bysetpos?: Maybe<CalendarItemRecurrenceBySetPosInput>;
};

export type CalendarItemReply = {
  __typename?: 'CalendarItemReply';
  participationStatus?: Maybe<ParticipationStatus>;
  attendee?: Maybe<Scalars['String']>;
};

export type CalendarOptionalItemDateTimeInput = {
  timezone?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
};

export type CancelRuleInfo = {
  __typename?: 'CancelRuleInfo';
  rangeType?: Maybe<Scalars['Int']>;
  recurId?: Maybe<Scalars['String']>;
  tz?: Maybe<Scalars['String']>;
  ridZ?: Maybe<Scalars['String']>;
};

export type ClientInfoAttributes = {
  __typename?: 'ClientInfoAttributes';
  zimbraWebClientLoginURL?: Maybe<Scalars['String']>;
  zimbraWebClientLogoutURL?: Maybe<Scalars['String']>;
  zimbraFeatureResetPasswordStatus?: Maybe<ResetPasswordStatus>;
};

export type ClientInfoType = {
  __typename?: 'ClientInfoType';
  attributes?: Maybe<ClientInfoAttributes>;
};

export type ConditionInput = {
  attr?: Maybe<Scalars['String']>;
  op?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ConditionsInput = {
  cond?: Maybe<Array<Maybe<ConditionInput>>>;
};

export enum ConnectionType {
  Cleartext = 'cleartext',
  Ssl = 'ssl',
  Tls = 'tls',
  TlsIsAvailable = 'tls_is_available'
}

export type Contact = {
  __typename?: 'Contact';
  id: Scalars['ID'];
  date?: Maybe<Scalars['Float']>;
  folderId?: Maybe<Scalars['ID']>;
  revision?: Maybe<Scalars['Float']>;
  sortField?: Maybe<Scalars['String']>;
  fileAsStr?: Maybe<Scalars['String']>;
  memberOf?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  tagNames?: Maybe<Scalars['String']>;
  attributes?: Maybe<ContactAttributes>;
  members?: Maybe<Array<Maybe<ContactListMember>>>;
};

export type ContactAttributes = {
  __typename?: 'ContactAttributes';
  firstName?: Maybe<Scalars['String']>;
  phoneticFirstName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneticLastName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  maidenName?: Maybe<Scalars['String']>;
  namePrefix?: Maybe<Scalars['String']>;
  nameSuffix?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email2?: Maybe<Scalars['String']>;
  workEmail?: Maybe<Scalars['String']>;
  workEmail2?: Maybe<Scalars['String']>;
  homeEmail?: Maybe<Scalars['String']>;
  homeEmail2?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  phone2?: Maybe<Scalars['String']>;
  companyPhone?: Maybe<Scalars['String']>;
  companyPhone2?: Maybe<Scalars['String']>;
  otherPhone?: Maybe<Scalars['String']>;
  otherPhone2?: Maybe<Scalars['String']>;
  mobilePhone?: Maybe<Scalars['String']>;
  mobilePhone2?: Maybe<Scalars['String']>;
  homePhone?: Maybe<Scalars['String']>;
  homePhone2?: Maybe<Scalars['String']>;
  workPhone?: Maybe<Scalars['String']>;
  workPhone2?: Maybe<Scalars['String']>;
  pager?: Maybe<Scalars['String']>;
  pager2?: Maybe<Scalars['String']>;
  homeFax?: Maybe<Scalars['String']>;
  homeFax2?: Maybe<Scalars['String']>;
  workFax?: Maybe<Scalars['String']>;
  workFax2?: Maybe<Scalars['String']>;
  imAddress?: Maybe<Scalars['String']>;
  imAddress1?: Maybe<Scalars['String']>;
  imAddress2?: Maybe<Scalars['String']>;
  imAddress3?: Maybe<Scalars['String']>;
  imAddress4?: Maybe<Scalars['String']>;
  imAddress5?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  homeStreet?: Maybe<Scalars['String']>;
  homeCity?: Maybe<Scalars['String']>;
  homeState?: Maybe<Scalars['String']>;
  homePostalCode?: Maybe<Scalars['String']>;
  homeCountry?: Maybe<Scalars['String']>;
  homeURL?: Maybe<Scalars['String']>;
  workStreet?: Maybe<Scalars['String']>;
  workCity?: Maybe<Scalars['String']>;
  workState?: Maybe<Scalars['String']>;
  workPostalCode?: Maybe<Scalars['String']>;
  workCountry?: Maybe<Scalars['String']>;
  workURL?: Maybe<Scalars['String']>;
  jobTitle?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  anniversary?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  thumbnailPhoto?: Maybe<Scalars['String']>;
  image?: Maybe<ContactImage>;
  userCertificate?: Maybe<Scalars['String']>;
  zimbraCalResType?: Maybe<Scalars['String']>;
  assistantPhone?: Maybe<Scalars['String']>;
  callbackPhone?: Maybe<Scalars['String']>;
  carPhone?: Maybe<Scalars['String']>;
  otherCity?: Maybe<Scalars['String']>;
  otherCountry?: Maybe<Scalars['String']>;
  otherFax?: Maybe<Scalars['String']>;
  otherPostalCode?: Maybe<Scalars['String']>;
  otherState?: Maybe<Scalars['String']>;
  otherStreet?: Maybe<Scalars['String']>;
  otherURL?: Maybe<Scalars['String']>;
  fileAs?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  other?: Maybe<Array<Maybe<OtherContactAttribute>>>;
};

export type ContactAttrsInput = {
  firstName?: Maybe<Scalars['String']>;
  phoneticFirstName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneticLastName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  maidenName?: Maybe<Scalars['String']>;
  namePrefix?: Maybe<Scalars['String']>;
  nameSuffix?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email2?: Maybe<Scalars['String']>;
  workEmail?: Maybe<Scalars['String']>;
  workEmail2?: Maybe<Scalars['String']>;
  homeEmail?: Maybe<Scalars['String']>;
  homeEmail2?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  phone2?: Maybe<Scalars['String']>;
  companyPhone?: Maybe<Scalars['String']>;
  companyPhone2?: Maybe<Scalars['String']>;
  otherPhone?: Maybe<Scalars['String']>;
  otherPhone2?: Maybe<Scalars['String']>;
  mobilePhone?: Maybe<Scalars['String']>;
  mobilePhone2?: Maybe<Scalars['String']>;
  homePhone?: Maybe<Scalars['String']>;
  homePhone2?: Maybe<Scalars['String']>;
  workPhone?: Maybe<Scalars['String']>;
  workPhone2?: Maybe<Scalars['String']>;
  pager?: Maybe<Scalars['String']>;
  pager2?: Maybe<Scalars['String']>;
  homeFax2?: Maybe<Scalars['String']>;
  workFax2?: Maybe<Scalars['String']>;
  imAddress?: Maybe<Scalars['String']>;
  imAddress1?: Maybe<Scalars['String']>;
  imAddress2?: Maybe<Scalars['String']>;
  imAddress3?: Maybe<Scalars['String']>;
  imAddress4?: Maybe<Scalars['String']>;
  imAddress5?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  homeStreet?: Maybe<Scalars['String']>;
  homeCity?: Maybe<Scalars['String']>;
  homeFax?: Maybe<Scalars['String']>;
  homeState?: Maybe<Scalars['String']>;
  homePostalCode?: Maybe<Scalars['String']>;
  homeCountry?: Maybe<Scalars['String']>;
  homeURL?: Maybe<Scalars['String']>;
  workFax?: Maybe<Scalars['String']>;
  workStreet?: Maybe<Scalars['String']>;
  workCity?: Maybe<Scalars['String']>;
  workState?: Maybe<Scalars['String']>;
  workPostalCode?: Maybe<Scalars['String']>;
  workCountry?: Maybe<Scalars['String']>;
  workURL?: Maybe<Scalars['String']>;
  jobTitle?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  anniversary?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  userCertificate?: Maybe<Scalars['String']>;
  assistantPhone?: Maybe<Scalars['String']>;
  callbackPhone?: Maybe<Scalars['String']>;
  carPhone?: Maybe<Scalars['String']>;
  otherCity?: Maybe<Scalars['String']>;
  otherCountry?: Maybe<Scalars['String']>;
  otherFax?: Maybe<Scalars['String']>;
  otherPostalCode?: Maybe<Scalars['String']>;
  otherState?: Maybe<Scalars['String']>;
  otherStreet?: Maybe<Scalars['String']>;
  otherURL?: Maybe<Scalars['String']>;
  fileAs?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  other?: Maybe<Array<Maybe<OtherContactAttributeInput>>>;
};

export type ContactFrequencyData = {
  __typename?: 'ContactFrequencyData';
  by?: Maybe<Scalars['String']>;
  dataPoint?: Maybe<Array<Maybe<ContactFrequencyDataPoints>>>;
};

export type ContactFrequencyDataPoints = {
  __typename?: 'ContactFrequencyDataPoints';
  label?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Int']>;
};

export type ContactFrequencyResponse = {
  __typename?: 'ContactFrequencyResponse';
  data?: Maybe<Array<Maybe<ContactFrequencyData>>>;
};

export type ContactFrequencySpec = {
  range: Scalars['String'];
  interval: Scalars['String'];
};

export type ContactImage = {
  __typename?: 'ContactImage';
  contentType?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  part?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
};

export type ContactListMember = {
  __typename?: 'ContactListMember';
  contacts?: Maybe<Array<Maybe<Contact>>>;
  type: ContactType;
  value: Scalars['ID'];
};

export type ContactListOps = {
  op: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['String'];
};

export enum ContactType {
  C = 'C',
  G = 'G',
  I = 'I'
}

export type Conversation = MailItem & {
  __typename?: 'Conversation';
  id?: Maybe<Scalars['ID']>;
  size?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['Float']>;
  folderId?: Maybe<Scalars['ID']>;
  subject?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
  emailAddresses?: Maybe<Array<Maybe<EmailAddress>>>;
  conversationId?: Maybe<Scalars['ID']>;
  flags?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  tagNames?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Float']>;
  changeDate?: Maybe<Scalars['Float']>;
  modifiedSequence?: Maybe<Scalars['Float']>;
  invitations?: Maybe<Array<Maybe<InviteInfo>>>;
  sortField?: Maybe<Scalars['String']>;
  messages?: Maybe<Array<Maybe<MessageInfo>>>;
  messagesMetaData?: Maybe<Array<Maybe<MessageInfo>>>;
  numMessages?: Maybe<Scalars['Float']>;
  unread?: Maybe<Scalars['Float']>;
  share?: Maybe<Array<Maybe<ShareNotification>>>;
  replyType?: Maybe<Scalars['String']>;
};

export type ConversationCondition = {
  __typename?: 'ConversationCondition';
  where?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type ConversationConditionInput = {
  where?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type CounterAppointmentInput = {
  id: Scalars['ID'];
  modifiedSequence?: Maybe<Scalars['Float']>;
  revision?: Maybe<Scalars['Float']>;
  componentNum?: Maybe<Scalars['Int']>;
  message: CounterAppointmentMessageInput;
};

export type CounterAppointmentMessageInput = {
  origId?: Maybe<Scalars['ID']>;
  folderId?: Maybe<Scalars['ID']>;
  subject?: Maybe<Scalars['String']>;
  invitations?: Maybe<CalendarCounterAppointmentInput>;
  mimeParts?: Maybe<Array<Maybe<MimePartInput>>>;
  emailAddresses?: Maybe<Array<Maybe<MailItemEmailAddressInput>>>;
  attachments?: Maybe<Array<Maybe<AttachmentInput>>>;
  replyType?: Maybe<InviteReplyType>;
};

export type CreateAppSpecificPasswordResponse = {
  __typename?: 'CreateAppSpecificPasswordResponse';
  password?: Maybe<Scalars['String']>;
};

export type CreateContactInput = {
  folderId?: Maybe<Scalars['ID']>;
  tagNames?: Maybe<Scalars['String']>;
  attributes: ContactAttrsInput;
};

export type CreateIdentityInput = {
  name: Scalars['String'];
  attrs?: Maybe<IdentityAttrsInput>;
};

export type CreateMountpointInput = {
  link?: Maybe<NewMountpointSpec>;
};

export type CreateTagInput = {
  name: Scalars['String'];
  color?: Maybe<Scalars['Int']>;
};

export type CsrfToken = {
  __typename?: 'CsrfToken';
  _content?: Maybe<Scalars['String']>;
};

export type Cursor = {
  id?: Maybe<Scalars['ID']>;
  sortField?: Maybe<Scalars['String']>;
  endSortVal?: Maybe<Scalars['String']>;
  includeOffset?: Maybe<Scalars['Boolean']>;
};

export type CustomMetadata = {
  __typename?: 'CustomMetadata';
  meta?: Maybe<Array<Maybe<CustomMetadataMeta>>>;
};

export type CustomMetadataAttrs = {
  __typename?: 'CustomMetadataAttrs';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type CustomMetadataAttrsInput = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type CustomMetadataInput = {
  id: Scalars['ID'];
  section?: Maybe<Scalars['String']>;
  attrs?: Maybe<Array<Maybe<CustomMetadataAttrsInput>>>;
};

export type CustomMetadataMeta = {
  __typename?: 'CustomMetadataMeta';
  section: Scalars['String'];
  _attrs?: Maybe<Array<Maybe<CustomMetadataAttrs>>>;
};

export type DataSource = {
  __typename?: 'DataSource';
  id: Scalars['ID'];
  connectionType?: Maybe<Scalars['String']>;
  defaultSignature?: Maybe<Scalars['ID']>;
  emailAddress?: Maybe<Scalars['String']>;
  l?: Maybe<Scalars['ID']>;
  forwardReplySignature?: Maybe<Scalars['ID']>;
  fromDisplay?: Maybe<Scalars['String']>;
  host?: Maybe<Scalars['String']>;
  importOnly?: Maybe<Scalars['Boolean']>;
  isEnabled?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  pollingInterval?: Maybe<Scalars['Float']>;
  leaveOnServer?: Maybe<Scalars['Boolean']>;
  port?: Maybe<Scalars['String']>;
  replyToAddress?: Maybe<Scalars['String']>;
  replyToDisplay?: Maybe<Scalars['String']>;
  smtpPort?: Maybe<Scalars['String']>;
  useAddressForForwardReply?: Maybe<Scalars['Boolean']>;
  username?: Maybe<Scalars['String']>;
  failingSince?: Maybe<Scalars['String']>;
  lastError?: Maybe<StringContent>;
};

export type DataSources = {
  __typename?: 'DataSources';
  imap?: Maybe<Array<Maybe<DataSource>>>;
  pop3?: Maybe<Array<Maybe<DataSource>>>;
  cal?: Maybe<Array<Maybe<DataSource>>>;
};

export type DateCondition = {
  __typename?: 'DateCondition';
  dateComparison?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Float']>;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type DateConditionInput = {
  dateComparison?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Float']>;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type DeleteAppointmentInput = {
  instanceDate?: Maybe<InstanceDate>;
  inviteId: Scalars['String'];
  componentNum: Scalars['Int'];
  start?: Maybe<Scalars['Int']>;
  message?: Maybe<CalendarItemMessageInput>;
};

export type DeleteIdentityInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Device = {
  __typename?: 'Device';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  firstReqReceived?: Maybe<Scalars['Int']>;
  lastPolicyUpdate?: Maybe<Scalars['Int']>;
  lastUsedDate?: Maybe<Scalars['String']>;
  lastUpdatedBy?: Maybe<Scalars['String']>;
  protocol?: Maybe<Scalars['Float']>;
  provisionable?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  ua?: Maybe<Scalars['String']>;
};

export type DiscoverRights = {
  __typename?: 'DiscoverRights';
  targets?: Maybe<Array<Maybe<Targets>>>;
};

export type DismissInput = {
  id: Scalars['ID'];
  dismissedAt: Scalars['Float'];
};

export type DlAttrs = {
  __typename?: 'DlAttrs';
  commonName?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type DlGroupMember = {
  __typename?: 'DlGroupMember';
  name?: Maybe<Scalars['String']>;
  attributes?: Maybe<DlAttrs>;
};

export type Document = {
  __typename?: 'Document';
  id?: Maybe<Scalars['ID']>;
  acl?: Maybe<Acl>;
  folderId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Float']>;
  contentType?: Maybe<Scalars['String']>;
  descriptionEnabled?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['Float']>;
  changeDate?: Maybe<Scalars['Float']>;
  modifiedSequence?: Maybe<Scalars['Float']>;
  revision?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  sortField?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  tagNames?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['ID']>;
  folderUuid?: Maybe<Scalars['String']>;
  metadataVersion?: Maybe<Scalars['Float']>;
  lastEditedAccount?: Maybe<Scalars['String']>;
  revisonCreator?: Maybe<Scalars['String']>;
  revisedCreationDate?: Maybe<Scalars['Float']>;
  lockOwnerId?: Maybe<Scalars['ID']>;
  flags?: Maybe<Scalars['String']>;
};

export type DocumentActionData = {
  __typename?: 'DocumentActionData';
  action?: Maybe<ActionData>;
};

export type DocumentInput = {
  id?: Maybe<Scalars['ID']>;
};

export type DtTimeInfo = {
  __typename?: 'DtTimeInfo';
  date?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  utc?: Maybe<Scalars['Float']>;
};

export type EmailAddress = {
  __typename?: 'EmailAddress';
  address?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
};

export type EmailAddressInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  shortName: Scalars['String'];
};

export type EnableTwoFactorAuthInput = {
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  twoFactorCode?: Maybe<Scalars['String']>;
  authToken?: Maybe<Scalars['String']>;
  csrfTokenSecured: Scalars['Boolean'];
};

export type EnableTwoFactorAuthResponse = {
  __typename?: 'EnableTwoFactorAuthResponse';
  secret?: Maybe<Array<Maybe<Secret>>>;
  scratchCodes?: Maybe<Array<Maybe<ScratchCode>>>;
  authToken?: Maybe<Array<Maybe<AuthToken>>>;
  csrfToken?: Maybe<Array<Maybe<CsrfToken>>>;
};

export type ExceptionRuleInfo = {
  __typename?: 'ExceptionRuleInfo';
  rangeType?: Maybe<Scalars['Int']>;
  recurId?: Maybe<Scalars['String']>;
  tz?: Maybe<Scalars['String']>;
  ridZ?: Maybe<Scalars['String']>;
  add?: Maybe<Array<Maybe<AddRecurrenceInfo>>>;
  exclude?: Maybe<Array<Maybe<ExcludeRecurrenceInfo>>>;
};

export type ExcludeRecurrenceInfo = {
  __typename?: 'ExcludeRecurrenceInfo';
  exclude?: Maybe<Array<Maybe<ExcludeRecurrenceInfo>>>;
  except?: Maybe<Array<Maybe<ExceptionRuleInfo>>>;
};

export type ExistingAttachmentInput = {
  messageId?: Maybe<Scalars['ID']>;
  part?: Maybe<Scalars['String']>;
};

export type ExternalAccount = {
  id: Scalars['ID'];
  name: Scalars['String'];
  accountType?: Maybe<AccountType>;
  isEnabled?: Maybe<Scalars['Int']>;
  host: Scalars['String'];
  port: Scalars['String'];
  connectionType?: Maybe<ConnectionType>;
  username: Scalars['String'];
  password: Scalars['String'];
};

export type ExternalAccountAddInput = {
  accountType?: Maybe<AccountType>;
  connectionType?: Maybe<ConnectionType>;
  emailAddress?: Maybe<Scalars['String']>;
  host: Scalars['String'];
  isEnabled?: Maybe<Scalars['Boolean']>;
  l: Scalars['ID'];
  leaveOnServer?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  password: Scalars['String'];
  port: Scalars['String'];
  username: Scalars['String'];
};

export type ExternalAccountImportInput = {
  accountType?: Maybe<AccountType>;
  id: Scalars['ID'];
};

export type ExternalAccountModifyAttrsInput = {
  id?: Maybe<Scalars['ID']>;
  accountType?: Maybe<AccountType>;
  defaultSignature?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  fromDisplay?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  replyToAddress?: Maybe<Scalars['String']>;
  replyToDisplay?: Maybe<Scalars['String']>;
  replyToEnabled?: Maybe<Scalars['Boolean']>;
  storeAndForward?: Maybe<Scalars['String']>;
  useAddressForForwardReply?: Maybe<Scalars['Boolean']>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  host?: Maybe<Scalars['String']>;
  l: Scalars['ID'];
  leaveOnServer?: Maybe<Scalars['Boolean']>;
  signatureValue?: Maybe<Scalars['String']>;
  importOnly?: Maybe<Scalars['Boolean']>;
  forwardReplySignature?: Maybe<Scalars['ID']>;
  connectionType?: Maybe<ConnectionType>;
  isEnabled?: Maybe<Scalars['Boolean']>;
  port?: Maybe<Scalars['String']>;
  smtpPort?: Maybe<Scalars['String']>;
};

export type ExternalAccountTestInput = {
  accountType?: Maybe<AccountType>;
  connectionType?: Maybe<ConnectionType>;
  emailAddress?: Maybe<Scalars['String']>;
  host: Scalars['String'];
  leaveOnServer?: Maybe<Scalars['Boolean']>;
  port: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type ExternalAccountTestResponse = {
  __typename?: 'ExternalAccountTestResponse';
  success: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type FileIntoAction = {
  __typename?: 'FileIntoAction';
  folderPath?: Maybe<Scalars['String']>;
  copy?: Maybe<Scalars['Boolean']>;
  index?: Maybe<Scalars['Int']>;
};

export type FileIntoActionInput = {
  folderPath?: Maybe<Scalars['String']>;
  copy?: Maybe<Scalars['Boolean']>;
  index?: Maybe<Scalars['Int']>;
};

export type Filter = {
  __typename?: 'Filter';
  name: Scalars['String'];
  active: Scalars['Boolean'];
  actions?: Maybe<Array<Maybe<FilterAction>>>;
  conditions?: Maybe<Array<Maybe<FilterCondition>>>;
};

export type FilterAction = {
  __typename?: 'FilterAction';
  keep?: Maybe<Array<Maybe<BasicAction>>>;
  discard?: Maybe<Array<Maybe<BasicAction>>>;
  fileInto?: Maybe<Array<Maybe<FileIntoAction>>>;
  flag?: Maybe<Array<Maybe<FlagAction>>>;
  tag?: Maybe<Array<Maybe<TagAction>>>;
  redirect?: Maybe<Array<Maybe<RedirectAction>>>;
  reply?: Maybe<Array<Maybe<ReplyAction>>>;
  notify?: Maybe<Array<Maybe<NotifyAction>>>;
  stop?: Maybe<Array<Maybe<BasicAction>>>;
};

export type FilterActionInput = {
  keep?: Maybe<Array<Maybe<BasicActionInput>>>;
  discard?: Maybe<Array<Maybe<BasicActionInput>>>;
  fileInto?: Maybe<Array<Maybe<FileIntoActionInput>>>;
  flag?: Maybe<Array<Maybe<FlagActionInput>>>;
  tag?: Maybe<Array<Maybe<TagActionInput>>>;
  redirect?: Maybe<Array<Maybe<RedirectActionInput>>>;
  reply?: Maybe<Array<Maybe<ReplyActionInput>>>;
  notify?: Maybe<Array<Maybe<NotifyActionInput>>>;
  stop?: Maybe<Array<Maybe<BasicActionInput>>>;
};

export type FilterCondition = {
  __typename?: 'FilterCondition';
  allOrAny: FilterMatchCondition;
  addressBook?: Maybe<Array<Maybe<HeaderCheckCondition>>>;
  address?: Maybe<Array<Maybe<AddressCondition>>>;
  attachment?: Maybe<Array<Maybe<BasicCondition>>>;
  body?: Maybe<Array<Maybe<BodyCondition>>>;
  bulk?: Maybe<Array<Maybe<BasicCondition>>>;
  contactRanking?: Maybe<Array<Maybe<HeaderCheckCondition>>>;
  conversation?: Maybe<Array<Maybe<ConversationCondition>>>;
  date?: Maybe<Array<Maybe<DateCondition>>>;
  facebook?: Maybe<Array<Maybe<BasicCondition>>>;
  flag?: Maybe<Array<Maybe<FlagCondition>>>;
  headerExists?: Maybe<Array<Maybe<HeaderCheckCondition>>>;
  header?: Maybe<Array<Maybe<HeaderCondition>>>;
  importance?: Maybe<Array<Maybe<ImportanceCondition>>>;
  invite?: Maybe<Array<Maybe<InviteCondition>>>;
  linkedin?: Maybe<Array<Maybe<BasicCondition>>>;
  list?: Maybe<Array<Maybe<BasicCondition>>>;
  me?: Maybe<Array<Maybe<HeaderCheckCondition>>>;
  mimeHeader?: Maybe<Array<Maybe<MimeHeaderCondition>>>;
  size?: Maybe<Array<Maybe<SizeCondition>>>;
  twitter?: Maybe<Array<Maybe<BasicCondition>>>;
  communityRequests?: Maybe<Array<Maybe<BasicCondition>>>;
  communityContent?: Maybe<Array<Maybe<BasicCondition>>>;
  communityConnections?: Maybe<Array<Maybe<BasicCondition>>>;
};

export type FilterConditionInput = {
  allOrAny: FilterMatchCondition;
  addressBook?: Maybe<Array<Maybe<HeaderCheckConditionInput>>>;
  address?: Maybe<Array<Maybe<AddressConditionInput>>>;
  attachment?: Maybe<Array<Maybe<BasicConditionInput>>>;
  body?: Maybe<Array<Maybe<BodyConditionInput>>>;
  bulk?: Maybe<Array<Maybe<BasicConditionInput>>>;
  contactRanking?: Maybe<Array<Maybe<HeaderCheckConditionInput>>>;
  conversation?: Maybe<Array<Maybe<ConversationConditionInput>>>;
  date?: Maybe<Array<Maybe<DateConditionInput>>>;
  facebook?: Maybe<Array<Maybe<BasicConditionInput>>>;
  flag?: Maybe<Array<Maybe<FlagConditionInput>>>;
  headerExists?: Maybe<Array<Maybe<HeaderCheckConditionInput>>>;
  header?: Maybe<Array<Maybe<HeaderConditionInput>>>;
  importance?: Maybe<Array<Maybe<ImportanceConditionInput>>>;
  invite?: Maybe<Array<Maybe<InviteConditionInput>>>;
  linkedin?: Maybe<Array<Maybe<BasicConditionInput>>>;
  list?: Maybe<Array<Maybe<BasicConditionInput>>>;
  me?: Maybe<Array<Maybe<HeaderCheckConditionInput>>>;
  mimeHeader?: Maybe<Array<Maybe<MimeHeaderConditionInput>>>;
  size?: Maybe<Array<Maybe<SizeConditionInput>>>;
  twitter?: Maybe<Array<Maybe<BasicConditionInput>>>;
  communityRequests?: Maybe<Array<Maybe<BasicConditionInput>>>;
  communityContent?: Maybe<Array<Maybe<BasicConditionInput>>>;
  communityConnections?: Maybe<Array<Maybe<BasicConditionInput>>>;
};

export type FilterInput = {
  name: Scalars['String'];
  active: Scalars['Boolean'];
  actions?: Maybe<Array<Maybe<FilterActionInput>>>;
  conditions?: Maybe<Array<Maybe<FilterConditionInput>>>;
};

export enum FilterMatchCondition {
  Allof = 'allof',
  Anyof = 'anyof'
}

export type FilterRuleInput = {
  name: Scalars['String'];
};

export type FlagAction = {
  __typename?: 'FlagAction';
  flagName?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
};

export type FlagActionInput = {
  flagName?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
};

export type FlagCondition = {
  __typename?: 'FlagCondition';
  flagName: Scalars['String'];
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type FlagConditionInput = {
  flagName: Scalars['String'];
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type Folder = {
  __typename?: 'Folder';
  absFolderPath?: Maybe<Scalars['String']>;
  acl?: Maybe<Acl>;
  color?: Maybe<Scalars['Int']>;
  flags?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  uuid?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  oname?: Maybe<Scalars['String']>;
  nonFolderItemCount?: Maybe<Scalars['Float']>;
  nonFolderItemCountTotal?: Maybe<Scalars['Float']>;
  linkedFolders?: Maybe<Array<Maybe<Folder>>>;
  folders?: Maybe<Array<Maybe<Folder>>>;
  search?: Maybe<Array<Maybe<Folder>>>;
  owner?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Float']>;
  view?: Maybe<FolderView>;
  parentFolderId?: Maybe<Scalars['ID']>;
  unread?: Maybe<Scalars['Float']>;
  query?: Maybe<Scalars['String']>;
  permissions?: Maybe<Scalars['String']>;
  ownerZimbraId?: Maybe<Scalars['ID']>;
  sharedItemId?: Maybe<Scalars['ID']>;
  url?: Maybe<Scalars['String']>;
  local?: Maybe<Scalars['Boolean']>;
  droppable?: Maybe<Scalars['Boolean']>;
  userId?: Maybe<Scalars['ID']>;
  broken?: Maybe<Scalars['Boolean']>;
  deletable?: Maybe<Scalars['Boolean']>;
  unreadDescendent?: Maybe<Scalars['Boolean']>;
};

export type FolderActionChangeColorInput = {
  id: Scalars['ID'];
  color: Scalars['Int'];
};

export type FolderActionCheckCalendarInput = {
  id: Scalars['ID'];
  value?: Maybe<Scalars['Boolean']>;
};

export type FolderActionInput = {
  id: Scalars['ID'];
  op: Scalars['String'];
  grant?: Maybe<Array<Maybe<GrantInput>>>;
  name?: Maybe<Scalars['String']>;
  folderId?: Maybe<Scalars['ID']>;
  zimbraId?: Maybe<Scalars['ID']>;
  color?: Maybe<Scalars['Int']>;
};

export type FolderQueryInput = {
  uuid?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  view?: Maybe<FolderView>;
};

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
  Comment = 'comment',
  Unknown = 'unknown'
}

export type ForwardAppointmentInput = {
  id: Scalars['ID'];
  message: ForwardMessageInput;
  exceptId?: Maybe<ForwardExceptIdInput>;
};

export type ForwardAppointmentInviteInput = {
  id: Scalars['ID'];
  message: ForwardMessageInput;
};

export type ForwardExceptIdInput = {
  timezone: Scalars['String'];
  date: Scalars['String'];
};

export type ForwardMessageInput = {
  subject?: Maybe<Scalars['String']>;
  mimeParts?: Maybe<Array<Maybe<MimePartInput>>>;
  emailAddresses?: Maybe<Array<Maybe<MailItemEmailAddressInput>>>;
};

export type FreeBusy = {
  __typename?: 'FreeBusy';
  id: Scalars['String'];
  tentative?: Maybe<Array<Maybe<FreeBusyInstance>>>;
  busy?: Maybe<Array<Maybe<FreeBusyInstance>>>;
  unavailable?: Maybe<Array<Maybe<FreeBusyInstance>>>;
  nodata?: Maybe<Array<Maybe<FreeBusyInstance>>>;
  free?: Maybe<Array<Maybe<FreeBusyInstance>>>;
};

export type FreeBusyInstance = {
  __typename?: 'FreeBusyInstance';
  start?: Maybe<Scalars['Float']>;
  end?: Maybe<Scalars['Float']>;
};

export enum FreeBusyStatus {
  F = 'F',
  B = 'B',
  T = 'T',
  O = 'O'
}

export enum GalSearchType {
  All = 'all',
  Account = 'account',
  Resource = 'resource',
  Group = 'group'
}

export type GetAppointmentResponse = {
  __typename?: 'GetAppointmentResponse';
  appointment?: Maybe<Array<Maybe<AppointmentInfo>>>;
};

export type GetDocumentShareUrlItemInput = {
  folderId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
};

export type GetDocumentShareUrlResponse = {
  __typename?: 'GetDocumentShareURLResponse';
  content?: Maybe<Scalars['String']>;
};

export type GetFolderFolderInput = {
  uuid?: Maybe<Scalars['ID']>;
  parentFolderId?: Maybe<Scalars['ID']>;
  path?: Maybe<Scalars['String']>;
};

export type GetRightsInput = {
  access?: Maybe<Array<Maybe<Right>>>;
};

export type GetTrustedDevicesResponse = {
  __typename?: 'GetTrustedDevicesResponse';
  nOtherDevices?: Maybe<Scalars['Int']>;
  thisDeviceTrusted?: Maybe<Scalars['Boolean']>;
};

export type GrantInput = {
  address?: Maybe<Scalars['String']>;
  granteeType: GranteeType;
  key?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  permissions: Scalars['String'];
  zimbraId?: Maybe<Scalars['ID']>;
};

export type GrantRightsInput = {
  access?: Maybe<Array<Maybe<AccountAceInfoInput>>>;
};

export type Grantee = {
  id?: Maybe<Scalars['ID']>;
  type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

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

export type HabGroup = {
  __typename?: 'HabGroup';
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  parentHabGroupId?: Maybe<Scalars['ID']>;
  seniorityIndex?: Maybe<Scalars['Int']>;
  attributes?: Maybe<HabGroupAttrs>;
  habGroups?: Maybe<Array<Maybe<HabGroup>>>;
};

export type HabGroupAttrs = {
  __typename?: 'HabGroupAttrs';
  cn?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  mail?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
  zimbraCreateTimestamp?: Maybe<Scalars['String']>;
  zimbraHABSeniorityIndex?: Maybe<Scalars['String']>;
  zimbraId?: Maybe<Scalars['ID']>;
  zimbraMailAlias?: Maybe<Scalars['String']>;
  zimbraMailHost?: Maybe<Scalars['String']>;
  zimbraMailStatus?: Maybe<Scalars['String']>;
};

export type HabRoots = {
  __typename?: 'HabRoots';
  hab?: Maybe<Array<Maybe<HabRootId>>>;
};

export type HeaderCheckCondition = {
  __typename?: 'HeaderCheckCondition';
  header: Scalars['String'];
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type HeaderCheckConditionInput = {
  header: Scalars['String'];
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type HeaderCondition = {
  __typename?: 'HeaderCondition';
  header?: Maybe<Scalars['String']>;
  stringComparison?: Maybe<Scalars['String']>;
  valueComparison?: Maybe<Scalars['String']>;
  countComparison?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  caseSensitive?: Maybe<Scalars['Boolean']>;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type HeaderConditionInput = {
  header?: Maybe<Scalars['String']>;
  stringComparison?: Maybe<Scalars['String']>;
  valueComparison?: Maybe<Scalars['String']>;
  countComparison?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  caseSensitive?: Maybe<Scalars['Boolean']>;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type Hit = {
  __typename?: 'Hit';
  id?: Maybe<Scalars['String']>;
  sortField?: Maybe<Scalars['String']>;
};

export type Identities = {
  __typename?: 'Identities';
  identity?: Maybe<Array<Maybe<Identity>>>;
};

export type Identity = {
  __typename?: 'Identity';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  _attrs?: Maybe<IdentityAttrs>;
  defaultSignature?: Maybe<Scalars['ID']>;
};

export type IdentityAttrs = {
  __typename?: 'IdentityAttrs';
  zimbraPrefIdentityId: Scalars['ID'];
  zimbraPrefDefaultSignatureId?: Maybe<Scalars['ID']>;
  zimbraPrefForwardReplySignatureId?: Maybe<Scalars['ID']>;
  zimbraPrefForwardReplyFormat?: Maybe<Scalars['String']>;
  zimbraPrefFromAddress?: Maybe<Scalars['String']>;
  zimbraPrefFromAddressType?: Maybe<Scalars['String']>;
  zimbraPrefFromDisplay?: Maybe<Scalars['String']>;
  zimbraPrefIdentityName?: Maybe<Scalars['String']>;
  zimbraPrefMailSignatureStyle?: Maybe<Scalars['String']>;
  zimbraPrefReplyToAddress?: Maybe<Scalars['String']>;
  zimbraPrefReplyToDisplay?: Maybe<Scalars['String']>;
  zimbraPrefReplyToEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefSentMailFolder?: Maybe<Scalars['String']>;
  zimbraPrefWhenInFolderIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  zimbraPrefWhenInFoldersEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefWhenSentToAddresses?: Maybe<Array<Maybe<Scalars['String']>>>;
  zimbraPrefWhenSentToEnabled?: Maybe<Scalars['Boolean']>;
};

export type IdentityAttrsInput = {
  zimbraPrefIdentityId?: Maybe<Scalars['ID']>;
  zimbraPrefDefaultSignatureId?: Maybe<Scalars['ID']>;
  zimbraPrefForwardReplySignatureId?: Maybe<Scalars['ID']>;
  zimbraPrefForwardReplyFormat?: Maybe<Scalars['String']>;
  zimbraPrefFromAddress?: Maybe<Scalars['String']>;
  zimbraPrefFromAddressType?: Maybe<Scalars['String']>;
  zimbraPrefFromDisplay?: Maybe<Scalars['String']>;
  zimbraPrefIdentityName?: Maybe<Scalars['String']>;
  zimbraPrefMailSignatureStyle?: Maybe<Scalars['String']>;
  zimbraPrefReplyToAddress?: Maybe<Scalars['String']>;
  zimbraPrefReplyToDisplay?: Maybe<Scalars['String']>;
  zimbraPrefReplyToEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefSentMailFolder?: Maybe<Scalars['String']>;
  zimbraPrefWhenInFolderIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  zimbraPrefWhenInFoldersEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefWhenSentToAddresses?: Maybe<Array<Maybe<Scalars['String']>>>;
  zimbraPrefWhenSentToEnabled?: Maybe<Scalars['Boolean']>;
};

export type ImportStatus = {
  __typename?: 'ImportStatus';
  id?: Maybe<Scalars['ID']>;
  isRunning?: Maybe<Scalars['Boolean']>;
  success?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
};

export type ImportStatusResponse = {
  __typename?: 'ImportStatusResponse';
  imap?: Maybe<Array<Maybe<ImportStatus>>>;
  pop3?: Maybe<Array<Maybe<ImportStatus>>>;
};

export enum Importance {
  High = 'high',
  Normal = 'normal',
  Low = 'low'
}

export type ImportanceCondition = {
  __typename?: 'ImportanceCondition';
  importance: Importance;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type ImportanceConditionInput = {
  importance: Importance;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type Instance = {
  __typename?: 'Instance';
  start?: Maybe<Scalars['Float']>;
  dueDate?: Maybe<Scalars['Float']>;
  tzoDue?: Maybe<Scalars['Int']>;
  utcRecurrenceId?: Maybe<Scalars['String']>;
  isException?: Maybe<Scalars['Boolean']>;
  alarm?: Maybe<Scalars['Boolean']>;
  allDay?: Maybe<Scalars['Boolean']>;
  changeDate?: Maybe<Scalars['Float']>;
  class?: Maybe<CalendarItemClass>;
  componentNum?: Maybe<Scalars['Int']>;
  date?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  excerpt?: Maybe<Scalars['String']>;
  flags?: Maybe<Scalars['String']>;
  freeBusy?: Maybe<FreeBusyStatus>;
  freeBusyActual?: Maybe<FreeBusyStatus>;
  inviteId?: Maybe<Scalars['ID']>;
  location?: Maybe<Scalars['String']>;
  modifiedSequence?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  organizer?: Maybe<CalOrganizer>;
  otherAttendees?: Maybe<Scalars['Boolean']>;
  participationStatus?: Maybe<ParticipationStatus>;
  revision?: Maybe<Scalars['Float']>;
  status?: Maybe<InviteCompletionStatus>;
  isOrganizer?: Maybe<Scalars['Boolean']>;
  exceptId?: Maybe<Array<Maybe<DtTimeInfo>>>;
};

export type InstanceDate = {
  date?: Maybe<Scalars['String']>;
};

export type IntervalRule = {
  __typename?: 'IntervalRule';
  intervalCount?: Maybe<Scalars['Int']>;
};

export type Invitation = {
  __typename?: 'Invitation';
  type: Scalars['String'];
  sequenceNumber: Scalars['Float'];
  id: Scalars['Int'];
  componentNum: Scalars['Int'];
  recurrenceId?: Maybe<Scalars['String']>;
  tz?: Maybe<CalTzInfo>;
  components: Array<Maybe<InviteComponent>>;
  replies?: Maybe<Array<Maybe<InviteReplies>>>;
  mimeParts?: Maybe<MimePart>;
};

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

export type InviteComponent = {
  __typename?: 'InviteComponent';
  alarms?: Maybe<Array<Maybe<CalendarItemAlarm>>>;
  recurrence?: Maybe<Array<Maybe<RecurrenceInfo>>>;
  allDay?: Maybe<Scalars['Boolean']>;
  attendees?: Maybe<Array<Maybe<CalendarItemAttendee>>>;
  calendarItemId?: Maybe<Scalars['ID']>;
  ciFolder?: Maybe<Scalars['ID']>;
  class?: Maybe<CalendarItemClass>;
  completedDateTime?: Maybe<Scalars['String']>;
  componentNum?: Maybe<Scalars['Int']>;
  date?: Maybe<Scalars['Float']>;
  description?: Maybe<Array<Maybe<StringContent>>>;
  draft?: Maybe<Scalars['Boolean']>;
  neverSent?: Maybe<Scalars['Boolean']>;
  end?: Maybe<Array<Maybe<DtTimeInfo>>>;
  excerpt?: Maybe<Scalars['String']>;
  freeBusy?: Maybe<FreeBusyStatus>;
  freeBusyActual?: Maybe<FreeBusyStatus>;
  htmlDescription?: Maybe<Array<Maybe<StringContent>>>;
  isException?: Maybe<Scalars['Boolean']>;
  isOrganizer?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  noBlob?: Maybe<Scalars['Boolean']>;
  organizer?: Maybe<CalOrganizer>;
  percentComplete?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['String']>;
  utcRecurrenceId?: Maybe<Scalars['String']>;
  rsvp?: Maybe<Scalars['Boolean']>;
  sequence?: Maybe<Scalars['Float']>;
  start?: Maybe<Array<Maybe<DtTimeInfo>>>;
  status?: Maybe<InviteCompletionStatus>;
  uid?: Maybe<Scalars['String']>;
  x_uid?: Maybe<Scalars['String']>;
  aid?: Maybe<Scalars['String']>;
  method?: Maybe<Scalars['String']>;
  exceptId?: Maybe<Array<Maybe<DtTimeInfo>>>;
};

export type InviteCondition = {
  __typename?: 'InviteCondition';
  methods?: Maybe<Array<Maybe<Scalars['String']>>>;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type InviteConditionInput = {
  methods?: Maybe<Array<Maybe<Scalars['String']>>>;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type InviteInfo = {
  __typename?: 'InviteInfo';
  type?: Maybe<InviteType>;
  components?: Maybe<Array<Maybe<InviteComponent>>>;
  replies?: Maybe<Array<Maybe<InviteReplies>>>;
};

export type InviteReplies = {
  __typename?: 'InviteReplies';
  reply?: Maybe<Array<Maybe<CalendarItemReply>>>;
};

export type InviteReplyInput = {
  componentNum: Scalars['Int'];
  id: Scalars['ID'];
  verb: InviteReplyVerb;
  updateOrganizer?: Maybe<Scalars['Boolean']>;
  message?: Maybe<CalendarItemMessageInput>;
  exceptId?: Maybe<InstanceDate>;
};

export type InviteReplyResponse = {
  __typename?: 'InviteReplyResponse';
  inviteId?: Maybe<Scalars['ID']>;
  calendarItemId?: Maybe<Scalars['ID']>;
};

export enum InviteReplyType {
  R = 'r',
  W = 'w'
}

export enum InviteReplyVerb {
  Accept = 'ACCEPT',
  Decline = 'DECLINE',
  Tentative = 'TENTATIVE'
}

export enum InviteType {
  Appt = 'appt',
  Task = 'task'
}

export type License = {
  __typename?: 'License';
  status: LicenseStatus;
  attr?: Maybe<Array<Maybe<LicenseAttrs>>>;
};

export type LicenseAttrs = {
  __typename?: 'LicenseAttrs';
  name: Scalars['String'];
  _content: Scalars['Boolean'];
};

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

export type Locale = {
  __typename?: 'Locale';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  localName?: Maybe<Scalars['String']>;
};

export type MailItem = {
  id?: Maybe<Scalars['ID']>;
  size?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['Float']>;
  folderId?: Maybe<Scalars['ID']>;
  subject?: Maybe<Scalars['String']>;
  emailAddresses?: Maybe<Array<Maybe<EmailAddress>>>;
  excerpt?: Maybe<Scalars['String']>;
  conversationId?: Maybe<Scalars['ID']>;
  flags?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  tagNames?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Float']>;
  changeDate?: Maybe<Scalars['Float']>;
  modifiedSequence?: Maybe<Scalars['Float']>;
  invitations?: Maybe<Array<Maybe<InviteInfo>>>;
  sortField?: Maybe<Scalars['String']>;
  share?: Maybe<Array<Maybe<ShareNotification>>>;
  replyType?: Maybe<Scalars['String']>;
};

export type MailItemEmailAddressInput = {
  address: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  type: AddressType;
};

export type MailItemHeaderInput = {
  n: Scalars['String'];
};

export type MailboxMetadata = {
  __typename?: 'MailboxMetadata';
  meta?: Maybe<Array<Maybe<MailboxMetadataMeta>>>;
};

export type MailboxMetadataAttrs = {
  __typename?: 'MailboxMetadataAttrs';
  zimbraPrefCustomFolderTreeOpen?: Maybe<Scalars['Boolean']>;
  zimbraPrefDateFormat?: Maybe<Scalars['String']>;
  zimbraPrefSharedFolderTreeOpen?: Maybe<Scalars['Boolean']>;
  zimbraPrefFoldersExpanded?: Maybe<Scalars['String']>;
  zimbraPrefFolderTreeSash?: Maybe<Scalars['Int']>;
  zimbraPrefGenerateLinkPreviews?: Maybe<Scalars['Boolean']>;
  zimbraPrefGroupByList?: Maybe<Scalars['String']>;
  zimbraPrefMessageListDensity?: Maybe<Scalars['String']>;
  zimbraPrefMultitasking?: Maybe<Scalars['String']>;
  zimbraPrefReadingPaneSashHorizontal?: Maybe<Scalars['Int']>;
  zimbraPrefReadingPaneSashVertical?: Maybe<Scalars['Int']>;
  zimbraPrefSmartFolderTreeOpen?: Maybe<Scalars['Boolean']>;
  zimbraPrefTimeFormat?: Maybe<Scalars['String']>;
  zimbraPrefUndoSendEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefUndoSendTimeout?: Maybe<Scalars['Int']>;
  archivedFolder?: Maybe<Scalars['String']>;
  privacyOverlayPrefs_showOverlay?: Maybe<Scalars['Boolean']>;
  privacyOverlayPrefs_timeOut?: Maybe<Scalars['Int']>;
  zimbraPrefSMIMEDefaultSetting?: Maybe<Scalars['String']>;
  zimbraPrefSMIMELastOperation?: Maybe<Scalars['String']>;
  zimbraPrefContactSourceFolderID?: Maybe<Scalars['String']>;
};

export type MailboxMetadataMeta = {
  __typename?: 'MailboxMetadataMeta';
  section: Scalars['String'];
  _attrs: MailboxMetadataAttrs;
};

export type MailboxMetadataSectionAttrsInput = {
  zimbraPrefCustomFolderTreeOpen?: Maybe<Scalars['Boolean']>;
  zimbraPrefDateFormat?: Maybe<Scalars['String']>;
  zimbraPrefSharedFolderTreeOpen?: Maybe<Scalars['Boolean']>;
  zimbraPrefFoldersExpanded?: Maybe<Scalars['String']>;
  zimbraPrefFolderTreeSash?: Maybe<Scalars['Int']>;
  zimbraPrefGenerateLinkPreviews?: Maybe<Scalars['Boolean']>;
  zimbraPrefGroupByList?: Maybe<Scalars['String']>;
  zimbraPrefMessageListDensity?: Maybe<Scalars['String']>;
  zimbraPrefMultitasking?: Maybe<Scalars['String']>;
  zimbraPrefReadingPaneSashHorizontal?: Maybe<Scalars['Int']>;
  zimbraPrefReadingPaneSashVertical?: Maybe<Scalars['Int']>;
  zimbraPrefSmartFolderTreeOpen?: Maybe<Scalars['Boolean']>;
  zimbraPrefTimeFormat?: Maybe<Scalars['String']>;
  zimbraPrefUndoSendEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefUndoSendTimeout?: Maybe<Scalars['Int']>;
  archivedFolder?: Maybe<Scalars['String']>;
  privacyOverlayPrefs_showOverlay?: Maybe<Scalars['Boolean']>;
  privacyOverlayPrefs_timeOut?: Maybe<Scalars['Int']>;
  zimbraPrefSMIMEDefaultSetting?: Maybe<Scalars['String']>;
  zimbraPrefSMIMELastOperation?: Maybe<Scalars['String']>;
  zimbraPrefContactSourceFolderID?: Maybe<Scalars['String']>;
};

export type MaxAppPasswords = {
  __typename?: 'MaxAppPasswords';
  _content?: Maybe<Scalars['Int']>;
};

export type MessageAttributes = {
  __typename?: 'MessageAttributes';
  isEncrypted?: Maybe<Scalars['Boolean']>;
  isSigned?: Maybe<Scalars['Boolean']>;
};

export type MessageInfo = MailItem & {
  __typename?: 'MessageInfo';
  id?: Maybe<Scalars['ID']>;
  size?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['Float']>;
  folderId?: Maybe<Scalars['ID']>;
  origId?: Maybe<Scalars['ID']>;
  subject?: Maybe<Scalars['String']>;
  emailAddresses?: Maybe<Array<Maybe<EmailAddress>>>;
  excerpt?: Maybe<Scalars['String']>;
  conversationId?: Maybe<Scalars['ID']>;
  flags?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  tagNames?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Float']>;
  changeDate?: Maybe<Scalars['Float']>;
  modifiedSequence?: Maybe<Scalars['Float']>;
  invitations?: Maybe<Array<Maybe<InviteInfo>>>;
  sortField?: Maybe<Scalars['String']>;
  mimeParts?: Maybe<Array<Maybe<MimePart>>>;
  to?: Maybe<Array<Maybe<EmailAddress>>>;
  from?: Maybe<Array<Maybe<EmailAddress>>>;
  cc?: Maybe<Array<Maybe<EmailAddress>>>;
  bcc?: Maybe<Array<Maybe<EmailAddress>>>;
  sender?: Maybe<Array<Maybe<EmailAddress>>>;
  html?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  attachments?: Maybe<Array<Maybe<MimePart>>>;
  inlineAttachments?: Maybe<Array<Maybe<MimePart>>>;
  share?: Maybe<Array<Maybe<ShareNotification>>>;
  replyType?: Maybe<Scalars['String']>;
  attributes?: Maybe<MessageAttributes>;
  autoSendTime?: Maybe<Scalars['Float']>;
  local?: Maybe<Scalars['Boolean']>;
};

export type MimeHeaderCondition = {
  __typename?: 'MimeHeaderCondition';
  header?: Maybe<Scalars['String']>;
  stringComparison?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  caseSensitive?: Maybe<Scalars['Boolean']>;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type MimeHeaderConditionInput = {
  header?: Maybe<Scalars['String']>;
  stringComparison?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  caseSensitive?: Maybe<Scalars['Boolean']>;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type MimePart = {
  __typename?: 'MimePart';
  body?: Maybe<Scalars['Boolean']>;
  filename?: Maybe<Scalars['String']>;
  part?: Maybe<Scalars['ID']>;
  content?: Maybe<Scalars['String']>;
  contentId?: Maybe<Scalars['String']>;
  contentLocation?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
  contentDisposition?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
  mimeParts?: Maybe<Array<Maybe<MimePart>>>;
  url?: Maybe<Scalars['String']>;
  messageId?: Maybe<Scalars['ID']>;
  base64?: Maybe<Scalars['String']>;
};

export type MimePartInput = {
  body?: Maybe<Scalars['Boolean']>;
  filename?: Maybe<Scalars['String']>;
  part?: Maybe<Scalars['ID']>;
  content?: Maybe<Scalars['String']>;
  contentId?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
  contentDisposition?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
  mimeParts?: Maybe<Array<Maybe<MimePartInput>>>;
  url?: Maybe<Scalars['String']>;
  messageId?: Maybe<Scalars['ID']>;
  attachments?: Maybe<Array<Maybe<AttachmentInput>>>;
  base64?: Maybe<Scalars['String']>;
};

export enum Mode {
  Text = 'text',
  Html = 'html'
}

export type ModifyAppointmentResponse = {
  __typename?: 'ModifyAppointmentResponse';
  appointmentId?: Maybe<Scalars['ID']>;
  calendarItemId?: Maybe<Scalars['ID']>;
  inviteId?: Maybe<Scalars['ID']>;
  modifiedSequence?: Maybe<Scalars['Float']>;
  revision?: Maybe<Scalars['Float']>;
};

export type ModifyContactInput = {
  id: Scalars['ID'];
  folderId?: Maybe<Scalars['ID']>;
  tagNames?: Maybe<Scalars['String']>;
  attributes: ContactAttrsInput;
  memberOps?: Maybe<Array<Maybe<ContactListOps>>>;
};

export type ModifyIdentityInput = {
  id: Scalars['ID'];
  attrs?: Maybe<IdentityAttrsInput>;
};

export type ModifyZimletPrefsResponse = {
  __typename?: 'ModifyZimletPrefsResponse';
  zimlet?: Maybe<Array<Maybe<ZimletPref>>>;
};

export type MsgWithGroupInfo = MailItem & {
  __typename?: 'MsgWithGroupInfo';
  id?: Maybe<Scalars['ID']>;
  i4uid?: Maybe<Scalars['Int']>;
  cif?: Maybe<Scalars['String']>;
  origid?: Maybe<Scalars['String']>;
  entityId?: Maybe<Scalars['ID']>;
  forAcct?: Maybe<Scalars['String']>;
  autoSendTime?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['Float']>;
  folderId?: Maybe<Scalars['ID']>;
  subject?: Maybe<Scalars['String']>;
  emailAddresses?: Maybe<Array<Maybe<EmailAddress>>>;
  excerpt?: Maybe<Scalars['String']>;
  conversationId?: Maybe<Scalars['ID']>;
  flags?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  tagNames?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Float']>;
  changeDate?: Maybe<Scalars['Float']>;
  modifiedSequence?: Maybe<Scalars['Float']>;
  invitations?: Maybe<Array<Maybe<InviteInfo>>>;
  sortField?: Maybe<Scalars['String']>;
  share?: Maybe<Array<Maybe<ShareNotification>>>;
  replyType?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  action?: Maybe<Scalars['Boolean']>;
  applyFilterRules?: Maybe<Array<Maybe<Scalars['String']>>>;
  testExternalAccount?: Maybe<ExternalAccountTestResponse>;
  addExternalAccount?: Maybe<Scalars['ID']>;
  addMessage?: Maybe<MessageInfo>;
  cancelTask?: Maybe<Scalars['Boolean']>;
  saveDocument?: Maybe<SaveDocumentResponse>;
  changeFolderColor?: Maybe<Scalars['Boolean']>;
  changePassword?: Maybe<AuthResponse>;
  modifyProfileImage?: Maybe<ProfileImageChangeResponse>;
  checkCalendar?: Maybe<Scalars['Boolean']>;
  contactAction?: Maybe<ActionOpResponse>;
  conversationAction?: Maybe<Scalars['Boolean']>;
  counterAppointment?: Maybe<Scalars['Boolean']>;
  createAppointment?: Maybe<Scalars['Boolean']>;
  createAppointmentException?: Maybe<Scalars['Boolean']>;
  createAppSpecificPassword?: Maybe<CreateAppSpecificPasswordResponse>;
  createCalendar?: Maybe<Folder>;
  createContact?: Maybe<Contact>;
  createContactList?: Maybe<Contact>;
  modifyContact?: Maybe<Contact>;
  modifyContactList?: Maybe<Contact>;
  createFolder?: Maybe<Folder>;
  createIdentity?: Maybe<Identities>;
  createMountpoint?: Maybe<Scalars['Boolean']>;
  createSharedCalendar?: Maybe<Scalars['Boolean']>;
  createSearchFolder?: Maybe<Folder>;
  createSignature?: Maybe<SignatureResponse>;
  createTask?: Maybe<Scalars['Boolean']>;
  declineCounterAppointment?: Maybe<Scalars['Boolean']>;
  deleteAppointment?: Maybe<Scalars['Boolean']>;
  deleteIdentity?: Maybe<Scalars['Boolean']>;
  deleteExternalAccount?: Maybe<Scalars['Boolean']>;
  deleteSignature?: Maybe<Scalars['Boolean']>;
  generateScratchCodes?: Maybe<ScratchCodes>;
  grantRights?: Maybe<RightsResponse>;
  folderAction?: Maybe<Scalars['Boolean']>;
  documentAction?: Maybe<DocumentActionData>;
  forwardAppointmentInvite?: Maybe<Scalars['Boolean']>;
  forwardAppointment?: Maybe<Scalars['Boolean']>;
  itemAction?: Maybe<Scalars['Boolean']>;
  importExternalAccount?: Maybe<Scalars['Boolean']>;
  logout?: Maybe<Scalars['Boolean']>;
  login?: Maybe<AuthResponse>;
  enableTwoFactorAuth?: Maybe<EnableTwoFactorAuthResponse>;
  disableTwoFactorAuth?: Maybe<Scalars['Boolean']>;
  messageAction?: Maybe<Scalars['Boolean']>;
  modifyExternalAccount?: Maybe<Scalars['Boolean']>;
  modifyAppointment?: Maybe<ModifyAppointmentResponse>;
  modifyIdentity?: Maybe<Scalars['Boolean']>;
  modifyPrefs?: Maybe<Scalars['Boolean']>;
  modifyProps?: Maybe<Scalars['Boolean']>;
  modifyZimletPrefs?: Maybe<ModifyZimletPrefsResponse>;
  modifyFilterRules?: Maybe<Scalars['Boolean']>;
  modifySignature?: Maybe<Scalars['Boolean']>;
  modifySearchFolder?: Maybe<Scalars['Boolean']>;
  modifyTask?: Maybe<Scalars['Boolean']>;
  modifyWhiteBlackList?: Maybe<Scalars['Boolean']>;
  moveTask?: Maybe<Scalars['String']>;
  prefEnableOutOfOfficeAlertOnLogin?: Maybe<Scalars['Boolean']>;
  prefEnableOutOfOfficeReply?: Maybe<Scalars['Boolean']>;
  prefOutOfOfficeFromDate?: Maybe<Scalars['String']>;
  prefOutOfOfficeReply?: Maybe<Scalars['String']>;
  prefOutOfOfficeUntilDate?: Maybe<Scalars['String']>;
  recoverAccount?: Maybe<RecoverAccount>;
  resetPassword?: Maybe<ResetPasswordResponse>;
  revokeAppSpecificPassword?: Maybe<Scalars['Boolean']>;
  revokeOtherTrustedDevices?: Maybe<Scalars['Boolean']>;
  revokeRights?: Maybe<RightsResponse>;
  revokeTrustedDevice?: Maybe<Scalars['Boolean']>;
  saveDraft?: Maybe<SaveDraftResponse>;
  sendMessage?: Maybe<SendMessageResponse>;
  sendDeliveryReport?: Maybe<Scalars['Boolean']>;
  sendInviteReply?: Maybe<InviteReplyResponse>;
  sendShareNotification?: Maybe<Scalars['Boolean']>;
  setCustomMetadata?: Maybe<Scalars['Boolean']>;
  setMailboxMetadata?: Maybe<Scalars['Boolean']>;
  snoozeCalendarItem?: Maybe<Scalars['Boolean']>;
  dismissCalendarItem?: Maybe<Scalars['Boolean']>;
  uploadMessage?: Maybe<Scalars['String']>;
  setRecoveryAccount?: Maybe<Scalars['Boolean']>;
  createTag?: Maybe<Tag>;
  tagAction?: Maybe<Scalars['Boolean']>;
  quarantineDeviceSync?: Maybe<Device>;
  allowDeviceSync?: Maybe<Device>;
  removeDeviceSync?: Maybe<Scalars['Boolean']>;
  blockDeviceSync?: Maybe<Device>;
  accountOnlyRemoteWipeSync?: Maybe<Device>;
  cancelPendingAccountOnlyRemoteWipeSync?: Maybe<Device>;
  remoteWipeSync?: Maybe<Device>;
  cancelPendingRemoteWipeSync?: Maybe<Device>;
};


export type MutationActionArgs = {
  type: ActionTypeName;
  id?: Maybe<Scalars['ID']>;
  ids?: Maybe<Array<Scalars['ID']>>;
  op: Scalars['String'];
  color?: Maybe<Scalars['Int']>;
  constraints?: Maybe<Scalars['String']>;
  flags?: Maybe<Scalars['String']>;
  folderId?: Maybe<Scalars['ID']>;
  rgb?: Maybe<Scalars['String']>;
  tagNames?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  isLocal?: Maybe<Scalars['Boolean']>;
  recursive?: Maybe<Scalars['Boolean']>;
};


export type MutationApplyFilterRulesArgs = {
  ids: Scalars['String'];
  filterRules?: Maybe<Array<Maybe<FilterRuleInput>>>;
};


export type MutationTestExternalAccountArgs = {
  externalAccount: ExternalAccountTestInput;
};


export type MutationAddExternalAccountArgs = {
  externalAccount: ExternalAccountAddInput;
};


export type MutationAddMessageArgs = {
  message: AddMsgInput;
};


export type MutationCancelTaskArgs = {
  inviteId: Scalars['ID'];
};


export type MutationSaveDocumentArgs = {
  document?: Maybe<SaveDocumentInput>;
};


export type MutationChangeFolderColorArgs = {
  id: Scalars['ID'];
  color: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  dryRun?: Maybe<Scalars['Boolean']>;
  loginNewPassword: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationModifyProfileImageArgs = {
  content?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
};


export type MutationCheckCalendarArgs = {
  id: Scalars['ID'];
  value: Scalars['Boolean'];
};


export type MutationContactActionArgs = {
  id?: Maybe<Scalars['ID']>;
  ids?: Maybe<Array<Scalars['ID']>>;
  folderId?: Maybe<Scalars['ID']>;
  op: Scalars['String'];
  tagNames?: Maybe<Scalars['String']>;
};


export type MutationConversationActionArgs = {
  ids: Array<Scalars['ID']>;
  op: Scalars['String'];
};


export type MutationCounterAppointmentArgs = {
  counterAppointmentInvite: CounterAppointmentInput;
};


export type MutationCreateAppointmentArgs = {
  accountName?: Maybe<Scalars['String']>;
  appointment: CalendarItemInput;
};


export type MutationCreateAppointmentExceptionArgs = {
  accountName?: Maybe<Scalars['String']>;
  appointment: CalendarItemInput;
};


export type MutationCreateAppSpecificPasswordArgs = {
  appName: Scalars['String'];
};


export type MutationCreateCalendarArgs = {
  name: Scalars['String'];
  color: Scalars['Int'];
  url?: Maybe<Scalars['String']>;
};


export type MutationCreateContactArgs = {
  contact: CreateContactInput;
};


export type MutationCreateContactListArgs = {
  contact: CreateContactInput;
};


export type MutationModifyContactArgs = {
  contact: ModifyContactInput;
};


export type MutationModifyContactListArgs = {
  contact: ModifyContactInput;
};


export type MutationCreateFolderArgs = {
  color?: Maybe<Scalars['Int']>;
  fetchIfExists?: Maybe<Scalars['Boolean']>;
  flags?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  parentFolderId?: Maybe<Scalars['ID']>;
  url?: Maybe<Scalars['String']>;
  isLocalFolder?: Maybe<Scalars['Boolean']>;
  view?: Maybe<FolderView>;
};


export type MutationCreateIdentityArgs = {
  name: Scalars['String'];
  attrs?: Maybe<IdentityAttrsInput>;
};


export type MutationCreateMountpointArgs = {
  link: NewMountpointSpec;
};


export type MutationCreateSharedCalendarArgs = {
  link: NewMountpointSpec;
};


export type MutationCreateSearchFolderArgs = {
  name: Scalars['String'];
  parentFolderId?: Maybe<Scalars['ID']>;
  query: Scalars['String'];
  types?: Maybe<FolderView>;
};


export type MutationCreateSignatureArgs = {
  signature: SignatureInput;
};


export type MutationCreateTaskArgs = {
  task: CalendarItemInput;
};


export type MutationDeclineCounterAppointmentArgs = {
  counterAppointmentInvite: CounterAppointmentInput;
};


export type MutationDeleteAppointmentArgs = {
  appointment: DeleteAppointmentInput;
};


export type MutationDeleteIdentityArgs = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};


export type MutationDeleteExternalAccountArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSignatureArgs = {
  signature: NameIdInput;
};


export type MutationGenerateScratchCodesArgs = {
  username: Scalars['String'];
};


export type MutationGrantRightsArgs = {
  input: GrantRightsInput;
};


export type MutationFolderActionArgs = {
  action: FolderActionInput;
};


export type MutationDocumentActionArgs = {
  action: FolderActionInput;
};


export type MutationForwardAppointmentInviteArgs = {
  appointmentInvite: ForwardAppointmentInviteInput;
};


export type MutationForwardAppointmentArgs = {
  appointmentInvite: ForwardAppointmentInput;
};


export type MutationItemActionArgs = {
  id?: Maybe<Scalars['ID']>;
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>;
  folderId?: Maybe<Scalars['ID']>;
  op: Scalars['String'];
  tagNames?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};


export type MutationImportExternalAccountArgs = {
  externalAccount: ExternalAccountImportInput;
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  recoveryCode?: Maybe<Scalars['String']>;
  tokenType?: Maybe<Scalars['String']>;
  persistAuthTokenCookie?: Maybe<Scalars['Boolean']>;
  twoFactorCode?: Maybe<Scalars['String']>;
  deviceTrusted?: Maybe<Scalars['Boolean']>;
  csrfTokenSecured: Scalars['Boolean'];
};


export type MutationEnableTwoFactorAuthArgs = {
  options: EnableTwoFactorAuthInput;
};


export type MutationMessageActionArgs = {
  ids: Array<Scalars['ID']>;
  op: Scalars['String'];
};


export type MutationModifyExternalAccountArgs = {
  id: Scalars['ID'];
  type?: Maybe<AccountType>;
  attrs: ExternalAccountModifyAttrsInput;
};


export type MutationModifyAppointmentArgs = {
  accountName?: Maybe<Scalars['String']>;
  appointment: CalendarItemInput;
};


export type MutationModifyIdentityArgs = {
  id: Scalars['ID'];
  attrs?: Maybe<IdentityAttrsInput>;
};


export type MutationModifyPrefsArgs = {
  prefs: PreferencesInput;
};


export type MutationModifyPropsArgs = {
  props?: Maybe<Array<PropertiesInput>>;
};


export type MutationModifyZimletPrefsArgs = {
  zimlets?: Maybe<Array<ZimletPreferenceInput>>;
};


export type MutationModifyFilterRulesArgs = {
  filters?: Maybe<Array<FilterInput>>;
};


export type MutationModifySignatureArgs = {
  signature: SignatureInput;
};


export type MutationModifySearchFolderArgs = {
  search: SearchFolderInput;
};


export type MutationModifyTaskArgs = {
  task: CalendarItemInput;
};


export type MutationModifyWhiteBlackListArgs = {
  whiteBlackList: WhiteBlackListInput;
};


export type MutationMoveTaskArgs = {
  inviteId: Scalars['ID'];
  destFolderId: Scalars['ID'];
};


export type MutationPrefEnableOutOfOfficeAlertOnLoginArgs = {
  value: Scalars['Boolean'];
};


export type MutationPrefEnableOutOfOfficeReplyArgs = {
  value: Scalars['Boolean'];
};


export type MutationPrefOutOfOfficeFromDateArgs = {
  value: Scalars['String'];
};


export type MutationPrefOutOfOfficeReplyArgs = {
  value: Scalars['String'];
};


export type MutationPrefOutOfOfficeUntilDateArgs = {
  value: Scalars['String'];
};


export type MutationRecoverAccountArgs = {
  op: RecoverAccountOp;
  email: Scalars['String'];
  channel: SetRecoveryAccountChannel;
};


export type MutationResetPasswordArgs = {
  password?: Maybe<Scalars['String']>;
  dryRun?: Maybe<Scalars['Boolean']>;
  getPasswordRules?: Maybe<Scalars['Boolean']>;
  cancelResetPassword?: Maybe<Scalars['Boolean']>;
};


export type MutationRevokeAppSpecificPasswordArgs = {
  appName: Scalars['String'];
};


export type MutationRevokeRightsArgs = {
  input: RevokeRightsInput;
};


export type MutationSaveDraftArgs = {
  message: SendMessageInput;
  accountName?: Maybe<Scalars['String']>;
};


export type MutationSendMessageArgs = {
  message: SendMessageInput;
  accountName?: Maybe<Scalars['String']>;
};


export type MutationSendDeliveryReportArgs = {
  messageId: Scalars['ID'];
};


export type MutationSendInviteReplyArgs = {
  inviteReply: InviteReplyInput;
};


export type MutationSendShareNotificationArgs = {
  shareNotification: ShareNotificationInput;
};


export type MutationSetCustomMetadataArgs = {
  customMetaData: CustomMetadataInput;
};


export type MutationSetMailboxMetadataArgs = {
  section?: Maybe<Scalars['String']>;
  attrs: MailboxMetadataSectionAttrsInput;
};


export type MutationSnoozeCalendarItemArgs = {
  appointment?: Maybe<Array<Maybe<SnoozeInput>>>;
  task?: Maybe<SnoozeInput>;
};


export type MutationDismissCalendarItemArgs = {
  appointment?: Maybe<Array<Maybe<DismissInput>>>;
  task?: Maybe<DismissInput>;
};


export type MutationUploadMessageArgs = {
  value: Scalars['String'];
};


export type MutationSetRecoveryAccountArgs = {
  channel: SetRecoveryAccountChannel;
  op: SetRecoveryAccountOp;
  recoveryAccount?: Maybe<Scalars['String']>;
  recoveryAccountVerificationCode?: Maybe<Scalars['String']>;
};


export type MutationCreateTagArgs = {
  tag?: Maybe<CreateTagInput>;
};


export type MutationTagActionArgs = {
  action?: Maybe<FolderActionInput>;
};


export type MutationQuarantineDeviceSyncArgs = {
  deviceId?: Maybe<Scalars['String']>;
};


export type MutationAllowDeviceSyncArgs = {
  deviceId?: Maybe<Scalars['String']>;
};


export type MutationRemoveDeviceSyncArgs = {
  deviceId?: Maybe<Scalars['String']>;
};


export type MutationBlockDeviceSyncArgs = {
  deviceId?: Maybe<Scalars['String']>;
};


export type MutationAccountOnlyRemoteWipeSyncArgs = {
  deviceId?: Maybe<Scalars['String']>;
};


export type MutationCancelPendingAccountOnlyRemoteWipeSyncArgs = {
  deviceId?: Maybe<Scalars['String']>;
};


export type MutationRemoteWipeSyncArgs = {
  deviceId?: Maybe<Scalars['String']>;
};


export type MutationCancelPendingRemoteWipeSyncArgs = {
  deviceId?: Maybe<Scalars['String']>;
};

export type NameId = {
  __typename?: 'NameId';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type NameIdInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export enum NeedIsMemberType {
  All = 'all',
  DirectOnly = 'directOnly',
  None = 'none'
}

export type NewMountpointSpec = {
  name: Scalars['String'];
  owner?: Maybe<Scalars['String']>;
  view?: Maybe<SearchType>;
  flags?: Maybe<Scalars['String']>;
  ownerZimbraId?: Maybe<Scalars['ID']>;
  sharedItemId?: Maybe<Scalars['ID']>;
  color?: Maybe<Scalars['Int']>;
  reminder?: Maybe<Scalars['Boolean']>;
  parentFolderId?: Maybe<Scalars['ID']>;
};

export type NoOpResponse = {
  __typename?: 'NoOpResponse';
  waitDisallowed?: Maybe<Scalars['Boolean']>;
};

export type Notes = {
  _content?: Maybe<Scalars['String']>;
};

export type NotifyAction = {
  __typename?: 'NotifyAction';
  address?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  maxBodySize?: Maybe<Scalars['Int']>;
  origHeaders?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  content?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type NotifyActionInput = {
  address?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  maxBodySize?: Maybe<Scalars['Int']>;
  origHeaders?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  content?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type OnlyEmailAddress = {
  __typename?: 'OnlyEmailAddress';
  emailAddress?: Maybe<Scalars['String']>;
};

export type OtherContactAttribute = {
  __typename?: 'OtherContactAttribute';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type OtherContactAttributeInput = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Owner = {
  by?: Maybe<Scalars['String']>;
  _content?: Maybe<Scalars['String']>;
};

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

export enum PasswordRecoveryAddressStatus {
  Verified = 'verified',
  Pending = 'pending'
}

export enum PrefCalendarInitialView {
  Day = 'day',
  List = 'list',
  Month = 'month',
  Week = 'week',
  WorkWeek = 'workWeek',
  Year = 'year'
}

export enum PrefClientType {
  Advanced = 'advanced',
  Modern = 'modern',
  Zimbrax = 'zimbrax',
  Standard = 'standard'
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

export type Preferences = {
  __typename?: 'Preferences';
  zimbraPrefAutoAddAppointmentsToCalendar?: Maybe<Scalars['Boolean']>;
  zimbraPrefCalendarAutoAddInvites?: Maybe<Scalars['Boolean']>;
  zimbraPrefCalendarFirstDayOfWeek?: Maybe<Scalars['Int']>;
  zimbraPrefCalendarInitialView?: Maybe<PrefCalendarInitialView>;
  zimbraPrefCalendarReminderEmail?: Maybe<Scalars['String']>;
  zimbraPrefCalendarWorkingHours?: Maybe<Scalars['String']>;
  zimbraPrefCalendarApptReminderWarningTime?: Maybe<Scalars['Int']>;
  zimbraPrefCalendarShowPastDueReminders?: Maybe<Scalars['Boolean']>;
  zimbraPrefCalendarToasterEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefCalendarAlwaysShowMiniCal?: Maybe<Scalars['Boolean']>;
  zimbraPrefComposeDirection?: Maybe<Scalars['String']>;
  zimbraPrefComposeFormat?: Maybe<Mode>;
  zimbraPrefHtmlEditorDefaultFontColor?: Maybe<Scalars['String']>;
  zimbraPrefHtmlEditorDefaultFontFamily?: Maybe<Scalars['String']>;
  zimbraPrefHtmlEditorDefaultFontSize?: Maybe<Scalars['String']>;
  zimbraPrefMailToasterEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefShowAllNewMailNotifications?: Maybe<Scalars['Boolean']>;
  zimbraPrefDefaultCalendarId?: Maybe<Scalars['ID']>;
  zimbraPrefDeleteInviteOnReply?: Maybe<Scalars['Boolean']>;
  zimbraPrefDelegatedSendSaveTarget?: Maybe<PrefDelegatedSendSaveTarget>;
  zimbraPrefDisplayExternalImages?: Maybe<Scalars['Boolean']>;
  zimbraPrefGroupMailBy?: Maybe<Scalars['String']>;
  zimbraPrefMailPollingInterval?: Maybe<Scalars['String']>;
  zimbraPrefMailRequestReadReceipts?: Maybe<Scalars['Boolean']>;
  zimbraPrefMailSelectAfterDelete?: Maybe<PrefMailSelectAfterDelete>;
  zimbraPrefMailSendReadReceipts?: Maybe<PrefMailSendReadReceipts>;
  zimbraPrefMailTrustedSenderList?: Maybe<Array<Maybe<Scalars['String']>>>;
  zimbraPrefMarkMsgRead?: Maybe<Scalars['Int']>;
  zimbraPrefMessageViewHtmlPreferred?: Maybe<Scalars['Boolean']>;
  zimbraPrefOutOfOfficeFromDate?: Maybe<Scalars['String']>;
  zimbraPrefOutOfOfficeExternalReply?: Maybe<Scalars['String']>;
  zimbraPrefOutOfOfficeExternalReplyEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefOutOfOfficeReply?: Maybe<Scalars['String']>;
  zimbraPrefOutOfOfficeReplyEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefOutOfOfficeStatusAlertOnLogin?: Maybe<Scalars['Boolean']>;
  zimbraPrefOutOfOfficeSuppressExternalReply?: Maybe<Scalars['Boolean']>;
  zimbraPrefOutOfOfficeUntilDate?: Maybe<Scalars['String']>;
  zimbraPrefReadingPaneEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefReadingPaneLocation?: Maybe<ReadingPaneLocation>;
  zimbraPrefBriefcaseReadingPaneLocation?: Maybe<ReadingPaneLocation>;
  zimbraPrefPasswordRecoveryAddress?: Maybe<Scalars['String']>;
  zimbraPrefPasswordRecoveryAddressStatus?: Maybe<PasswordRecoveryAddressStatus>;
  zimbraPrefSaveToSent?: Maybe<Scalars['Boolean']>;
  zimbraPrefShowFragments?: Maybe<Scalars['Boolean']>;
  zimbraPrefSlackCalendarReminderEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefSortOrder?: Maybe<Scalars['String']>;
  zimbraPrefWebClientOfflineBrowserKey?: Maybe<Scalars['String']>;
  zimbraPrefTimeZoneId?: Maybe<Scalars['String']>;
  zimbraPrefLocale?: Maybe<Scalars['String']>;
  zimbraPrefClientType?: Maybe<PrefClientType>;
  zimbraPrefAppleIcalDelegationEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefCalendarShowDeclinedMeetings?: Maybe<Scalars['Boolean']>;
  zimbraPrefUseTimeZoneListInCalendar?: Maybe<Scalars['Boolean']>;
  zimbraPrefMailForwardingAddress?: Maybe<Scalars['String']>;
  zimbraPrefMailLocalDeliveryDisabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefTagTreeOpen?: Maybe<Scalars['Boolean']>;
  zimbraPrefPowerPasteEnabled?: Maybe<Scalars['Boolean']>;
};

export type PreferencesInput = {
  zimbraPrefAutoAddAppointmentsToCalendar?: Maybe<Scalars['Boolean']>;
  zimbraPrefCalendarAutoAddInvites?: Maybe<Scalars['Boolean']>;
  zimbraPrefDefaultCalendarId?: Maybe<Scalars['ID']>;
  zimbraPrefCalendarFirstDayOfWeek?: Maybe<Scalars['Int']>;
  zimbraPrefCalendarInitialView?: Maybe<PrefCalendarInitialView>;
  zimbraPrefCalendarReminderEmail?: Maybe<Scalars['String']>;
  zimbraPrefCalendarWorkingHours?: Maybe<Scalars['String']>;
  zimbraPrefCalendarApptReminderWarningTime?: Maybe<Scalars['Int']>;
  zimbraPrefCalendarShowPastDueReminders?: Maybe<Scalars['Boolean']>;
  zimbraPrefCalendarToasterEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefCalendarAlwaysShowMiniCal?: Maybe<Scalars['Boolean']>;
  zimbraPrefComposeDirection?: Maybe<Scalars['String']>;
  zimbraPrefComposeFormat?: Maybe<Mode>;
  zimbraPrefHtmlEditorDefaultFontColor?: Maybe<Scalars['String']>;
  zimbraPrefHtmlEditorDefaultFontFamily?: Maybe<Scalars['String']>;
  zimbraPrefHtmlEditorDefaultFontSize?: Maybe<Scalars['String']>;
  zimbraPrefMailToasterEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefShowAllNewMailNotifications?: Maybe<Scalars['Boolean']>;
  zimbraPrefDelegatedSendSaveTarget?: Maybe<PrefDelegatedSendSaveTarget>;
  zimbraPrefDisplayExternalImages?: Maybe<Scalars['Boolean']>;
  zimbraPrefGroupMailBy?: Maybe<Scalars['String']>;
  zimbraPrefMailPollingInterval?: Maybe<Scalars['String']>;
  zimbraPrefMailRequestReadReceipts?: Maybe<Scalars['Boolean']>;
  zimbraPrefMailSelectAfterDelete?: Maybe<PrefMailSelectAfterDelete>;
  zimbraPrefMailSendReadReceipts?: Maybe<PrefMailSendReadReceipts>;
  zimbraPrefMailTrustedSenderList?: Maybe<Array<Maybe<Scalars['String']>>>;
  zimbraPrefMarkMsgRead?: Maybe<Scalars['Int']>;
  zimbraPrefMessageViewHtmlPreferred?: Maybe<Scalars['Boolean']>;
  zimbraPrefOutOfOfficeFromDate?: Maybe<Scalars['String']>;
  zimbraPrefOutOfOfficeExternalReply?: Maybe<Scalars['String']>;
  zimbraPrefOutOfOfficeExternalReplyEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefOutOfOfficeReply?: Maybe<Scalars['String']>;
  zimbraPrefOutOfOfficeReplyEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefOutOfOfficeStatusAlertOnLogin?: Maybe<Scalars['Boolean']>;
  zimbraPrefOutOfOfficeSuppressExternalReply?: Maybe<Scalars['Boolean']>;
  zimbraPrefOutOfOfficeUntilDate?: Maybe<Scalars['String']>;
  zimbraPrefReadingPaneEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefReadingPaneLocation?: Maybe<ReadingPaneLocation>;
  zimbraPrefBriefcaseReadingPaneLocation?: Maybe<ReadingPaneLocation>;
  zimbraPrefSaveToSent?: Maybe<Scalars['Boolean']>;
  zimbraPrefShowFragments?: Maybe<Scalars['Boolean']>;
  zimbraPrefSlackCalendarReminderEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefSortOrder?: Maybe<Scalars['String']>;
  zimbraPrefWebClientOfflineBrowserKey?: Maybe<Scalars['String']>;
  zimbraPrefTimeZoneId?: Maybe<Scalars['String']>;
  zimbraPrefLocale?: Maybe<Scalars['String']>;
  zimbraPrefClientType?: Maybe<PrefClientType>;
  zimbraPrefAppleIcalDelegationEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefCalendarShowDeclinedMeetings?: Maybe<Scalars['Boolean']>;
  zimbraPrefUseTimeZoneListInCalendar?: Maybe<Scalars['Boolean']>;
  zimbraPrefMailForwardingAddress?: Maybe<Scalars['String']>;
  zimbraPrefMailLocalDeliveryDisabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefTagTreeOpen?: Maybe<Scalars['Boolean']>;
  zimbraPrefPowerPasteEnabled?: Maybe<Scalars['Boolean']>;
};

export type ProfileImageChangeResponse = {
  __typename?: 'ProfileImageChangeResponse';
  itemId?: Maybe<Scalars['ID']>;
};

export type Prop = {
  __typename?: 'Prop';
  zimlet?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  _content?: Maybe<Scalars['String']>;
};

export type PropList = {
  __typename?: 'PropList';
  prop?: Maybe<Array<Maybe<Prop>>>;
};

export type PropertiesInput = {
  zimlet: Scalars['String'];
  name: Scalars['String'];
  _content?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  accountInfo?: Maybe<AccountInfo>;
  autoComplete?: Maybe<AutoCompleteResponse>;
  autoCompleteGAL?: Maybe<AutoCompleteGalResponse>;
  clientInfo?: Maybe<ClientInfoType>;
  downloadMessage?: Maybe<SMimeMessage>;
  downloadAttachment?: Maybe<Attachment>;
  downloadDocument?: Maybe<Attachment>;
  discoverRights?: Maybe<DiscoverRights>;
  freeBusy?: Maybe<Array<Maybe<FreeBusy>>>;
  getContact?: Maybe<Array<Maybe<Contact>>>;
  getAppointments?: Maybe<SearchResponse>;
  getAppointment?: Maybe<GetAppointmentResponse>;
  getReminders?: Maybe<RemindersResponse>;
  getTasks?: Maybe<SearchResponse>;
  getAppSpecificPasswords?: Maybe<AppSpecificPasswordsResponse>;
  getAvailableLocales?: Maybe<Array<Maybe<Locale>>>;
  getContactFrequency?: Maybe<ContactFrequencyResponse>;
  getConversation?: Maybe<Conversation>;
  getDocumentShareURL?: Maybe<GetDocumentShareUrlResponse>;
  getFilterRules?: Maybe<Array<Maybe<Filter>>>;
  getFolder?: Maybe<Folder>;
  getHAB?: Maybe<HabGroup>;
  getDistributionListMembers?: Maybe<Array<Maybe<DlGroupMember>>>;
  getCustomMetadata?: Maybe<CustomMetadata>;
  getMailboxMetadata?: Maybe<MailboxMetadata>;
  getMessage?: Maybe<MessageInfo>;
  getMessagesMetadata?: Maybe<Array<Maybe<MessageInfo>>>;
  getRights?: Maybe<RightsResponse>;
  getSMimePublicCerts?: Maybe<SMimePublicCertsResponse>;
  getScratchCodes?: Maybe<ScratchCodes>;
  getSearchFolder?: Maybe<Folder>;
  getTrustedDevices?: Maybe<GetTrustedDevicesResponse>;
  getDeviceStatus?: Maybe<Array<Maybe<Device>>>;
  getWhiteBlackList?: Maybe<WhiteBlackList>;
  getWorkingHours?: Maybe<Array<Maybe<WorkingHours>>>;
  noop?: Maybe<NoOpResponse>;
  getPreferences?: Maybe<Preferences>;
  getDataSources: DataSources;
  getIdentities?: Maybe<Identities>;
  getImportStatus?: Maybe<ImportStatusResponse>;
  getSignatures?: Maybe<Signatures>;
  recoverAccount?: Maybe<RecoverAccount>;
  relatedContacts?: Maybe<Array<Maybe<RelatedContact>>>;
  shareInfo?: Maybe<Array<Maybe<ShareInfo>>>;
  search?: Maybe<SearchResponse>;
  searchCalendarResources?: Maybe<SearchCalendarResourcesResponse>;
  searchGal?: Maybe<SearchResponse>;
  taskFolders?: Maybe<Array<Maybe<Folder>>>;
  getTag?: Maybe<Array<Maybe<Tag>>>;
};


export type QueryAutoCompleteArgs = {
  name?: Maybe<Scalars['String']>;
  type?: Maybe<GalSearchType>;
  needExp?: Maybe<Scalars['Boolean']>;
  folders?: Maybe<Scalars['String']>;
  includeGal?: Maybe<Scalars['Boolean']>;
};


export type QueryAutoCompleteGalArgs = {
  limit?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  type?: Maybe<GalSearchType>;
  needExp?: Maybe<Scalars['Boolean']>;
};


export type QueryClientInfoArgs = {
  by?: Maybe<Scalars['String']>;
  domain?: Maybe<Scalars['String']>;
};


export type QueryDownloadMessageArgs = {
  id: Scalars['ID'];
  isSecure?: Maybe<Scalars['Boolean']>;
  isLocal?: Maybe<Scalars['Boolean']>;
};


export type QueryDownloadAttachmentArgs = {
  id: Scalars['ID'];
  part: Scalars['ID'];
};


export type QueryDownloadDocumentArgs = {
  id: Scalars['ID'];
  url: Scalars['String'];
};


export type QueryFreeBusyArgs = {
  names: Array<Scalars['String']>;
  start?: Maybe<Scalars['Float']>;
  end?: Maybe<Scalars['Float']>;
};


export type QueryGetContactArgs = {
  id?: Maybe<Scalars['ID']>;
  ids?: Maybe<Array<Scalars['ID']>>;
  derefGroupMember?: Maybe<Scalars['Boolean']>;
  memberOf?: Maybe<Scalars['Boolean']>;
};


export type QueryGetAppointmentsArgs = {
  calExpandInstStart: Scalars['Float'];
  calExpandInstEnd: Scalars['Float'];
  query: Scalars['String'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  types?: Maybe<SearchType>;
};


export type QueryGetAppointmentArgs = {
  id: Scalars['ID'];
};


export type QueryGetRemindersArgs = {
  calExpandInstStart: Scalars['Float'];
  calExpandInstEnd: Scalars['Float'];
  query: Scalars['String'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  types?: Maybe<SearchType>;
};


export type QueryGetTasksArgs = {
  query: Scalars['String'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  types?: Maybe<SearchType>;
};


export type QueryGetContactFrequencyArgs = {
  email: Scalars['String'];
  by: Scalars['String'];
  offsetInMinutes?: Maybe<Scalars['String']>;
  spec?: Maybe<Array<ContactFrequencySpec>>;
};


export type QueryGetConversationArgs = {
  id: Scalars['ID'];
  header?: Maybe<Array<Maybe<MailItemHeaderInput>>>;
  html?: Maybe<Scalars['Boolean']>;
  max?: Maybe<Scalars['Int']>;
  needExp?: Maybe<Scalars['Boolean']>;
  fetch?: Maybe<Scalars['String']>;
};


export type QueryGetDocumentShareUrlArgs = {
  item?: Maybe<GetDocumentShareUrlItemInput>;
};


export type QueryGetFolderArgs = {
  visible?: Maybe<Scalars['Boolean']>;
  needGranteeName?: Maybe<Scalars['Boolean']>;
  view?: Maybe<FolderView>;
  depth?: Maybe<Scalars['Int']>;
  traverseMountpoints?: Maybe<Scalars['Boolean']>;
  folder?: Maybe<GetFolderFolderInput>;
  local?: Maybe<Scalars['Boolean']>;
};


export type QueryGetHabArgs = {
  habRootGroupId?: Maybe<Scalars['ID']>;
};


export type QueryGetDistributionListMembersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  dl?: Maybe<Scalars['String']>;
};


export type QueryGetCustomMetadataArgs = {
  id: Scalars['ID'];
  section?: Maybe<Scalars['String']>;
};


export type QueryGetMailboxMetadataArgs = {
  section?: Maybe<Scalars['String']>;
};


export type QueryGetMessageArgs = {
  id: Scalars['ID'];
  header?: Maybe<Array<Maybe<MailItemHeaderInput>>>;
  html?: Maybe<Scalars['Boolean']>;
  isLocal?: Maybe<Scalars['Boolean']>;
  max?: Maybe<Scalars['Int']>;
  needExp?: Maybe<Scalars['Boolean']>;
  neuter?: Maybe<Scalars['Boolean']>;
  part?: Maybe<Scalars['ID']>;
  raw?: Maybe<Scalars['Boolean']>;
  read?: Maybe<Scalars['Boolean']>;
  ridZ?: Maybe<Scalars['String']>;
};


export type QueryGetMessagesMetadataArgs = {
  ids: Array<Scalars['ID']>;
  isLocal?: Maybe<Scalars['Boolean']>;
};


export type QueryGetRightsArgs = {
  input: GetRightsInput;
};


export type QueryGetSMimePublicCertsArgs = {
  contactAddr: Scalars['String'];
  store: Scalars['String'];
};


export type QueryGetScratchCodesArgs = {
  username: Scalars['String'];
};


export type QueryGetWorkingHoursArgs = {
  names: Array<Scalars['String']>;
  start?: Maybe<Scalars['Float']>;
  end?: Maybe<Scalars['Float']>;
};


export type QueryNoopArgs = {
  wait?: Maybe<Scalars['Int']>;
  limitToOneBlocked?: Maybe<Scalars['Int']>;
};


export type QueryRecoverAccountArgs = {
  op: RecoverAccountOp;
  email: Scalars['String'];
  channel: SetRecoveryAccountChannel;
};


export type QueryRelatedContactsArgs = {
  email: Scalars['String'];
};


export type QueryShareInfoArgs = {
  internal?: Maybe<Scalars['Boolean']>;
  includeSelf?: Maybe<Scalars['Boolean']>;
  grantee?: Maybe<Grantee>;
  owner?: Maybe<Owner>;
};


export type QuerySearchArgs = {
  contact?: Maybe<Scalars['String']>;
  cursor?: Maybe<Cursor>;
  fetch?: Maybe<Scalars['String']>;
  fullConversation?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  needExp?: Maybe<Scalars['Boolean']>;
  memberOf?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  query?: Maybe<Scalars['String']>;
  recip?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<SortBy>;
  types?: Maybe<SearchType>;
  resultMode?: Maybe<Scalars['String']>;
  inDumpster?: Maybe<Scalars['Boolean']>;
};


export type QuerySearchCalendarResourcesArgs = {
  limit?: Maybe<Scalars['Int']>;
  needExp?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  attrs?: Maybe<Scalars['String']>;
  searchFilter?: Maybe<SearchConditionsInput>;
};


export type QuerySearchGalArgs = {
  needIsOwner?: Maybe<Scalars['Boolean']>;
  needIsMember?: Maybe<NeedIsMemberType>;
  type?: Maybe<GalSearchType>;
  name?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Scalars['String']>;
  needExp?: Maybe<Scalars['Boolean']>;
};

export enum ReadingPaneLocation {
  Off = 'off',
  Right = 'right',
  Bottom = 'bottom'
}

export type RecoverAccount = {
  __typename?: 'RecoverAccount';
  recoveryAccount?: Maybe<Scalars['String']>;
  recoveryAttemptsLeft?: Maybe<Scalars['Int']>;
};

export enum RecoverAccountOp {
  GetRecoveryAccount = 'getRecoveryAccount',
  SendRecoveryCode = 'sendRecoveryCode'
}

export type RecurrenceInfo = {
  __typename?: 'RecurrenceInfo';
  add?: Maybe<Array<Maybe<AddRecurrenceInfo>>>;
  exclude?: Maybe<Array<Maybe<ExcludeRecurrenceInfo>>>;
  except?: Maybe<Array<Maybe<ExceptionRuleInfo>>>;
  cancel?: Maybe<Array<Maybe<CancelRuleInfo>>>;
  rule?: Maybe<Array<Maybe<SimpleRepeatingRule>>>;
};

export type RedirectAction = {
  __typename?: 'RedirectAction';
  address?: Maybe<Scalars['String']>;
  copy?: Maybe<Scalars['Boolean']>;
  index?: Maybe<Scalars['Int']>;
};

export type RedirectActionInput = {
  address?: Maybe<Scalars['String']>;
  copy?: Maybe<Scalars['Boolean']>;
  index?: Maybe<Scalars['Int']>;
};

export type RelatedContact = {
  __typename?: 'RelatedContact';
  email?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['Int']>;
  p?: Maybe<Scalars['String']>;
};

export type ReminderItemHitInfo = {
  __typename?: 'ReminderItemHitInfo';
  alarm?: Maybe<Scalars['Boolean']>;
  allDay?: Maybe<Scalars['Boolean']>;
  changeDate?: Maybe<Scalars['Float']>;
  class: CalendarItemClass;
  componentNum?: Maybe<Scalars['Int']>;
  date?: Maybe<Scalars['Float']>;
  timezoneOffset?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['Float']>;
  excerpt?: Maybe<Scalars['String']>;
  flags?: Maybe<Scalars['String']>;
  folderId: Scalars['ID'];
  freeBusy?: Maybe<FreeBusyStatus>;
  freeBusyActual?: Maybe<FreeBusyStatus>;
  id: Scalars['ID'];
  alarmData?: Maybe<Array<Maybe<Alarm>>>;
  instances?: Maybe<Array<Maybe<Instance>>>;
  invitations?: Maybe<Array<Maybe<Invitation>>>;
  inviteId: Scalars['ID'];
  isOrganizer?: Maybe<Scalars['Boolean']>;
  isRecurring?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  modifiedSequence?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  organizer?: Maybe<CalOrganizer>;
  otherAttendees?: Maybe<Scalars['Boolean']>;
  participationStatus?: Maybe<ParticipationStatus>;
  percentComplete?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Float']>;
  utcRecurrenceId?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
  sortField?: Maybe<Scalars['String']>;
  status?: Maybe<InviteCompletionStatus>;
  tagNames?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
  x_uid?: Maybe<Scalars['String']>;
  aid?: Maybe<Scalars['String']>;
  draft?: Maybe<Scalars['Boolean']>;
  neverSent?: Maybe<Scalars['Boolean']>;
};

export type RemindersResponse = {
  __typename?: 'RemindersResponse';
  tasks?: Maybe<Array<Maybe<ReminderItemHitInfo>>>;
  appointments?: Maybe<Array<Maybe<ReminderItemHitInfo>>>;
};

export type ReplyAction = {
  __typename?: 'ReplyAction';
  index?: Maybe<Scalars['Int']>;
  content?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ReplyActionInput = {
  index?: Maybe<Scalars['Int']>;
  content?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  attrs?: Maybe<ResetPasswordResponseAttributes>;
};

export type ResetPasswordResponseAttributes = {
  __typename?: 'ResetPasswordResponseAttributes';
  _attrs?: Maybe<AccountInfoAttrs>;
};

export enum ResetPasswordStatus {
  Enabled = 'enabled',
  Disabled = 'disabled',
  Suspended = 'suspended'
}

export type RevokeRightsInput = {
  access?: Maybe<Array<Maybe<AccountAceInfoInput>>>;
};

export type Right = {
  right: Scalars['String'];
};

export type RightsResponse = {
  __typename?: 'RightsResponse';
  access?: Maybe<Array<Maybe<AccountAceInfo>>>;
};

export type SMimeMessage = {
  __typename?: 'SMimeMessage';
  id?: Maybe<Scalars['ID']>;
  content?: Maybe<Scalars['String']>;
};

export type SMimePublicCert = {
  __typename?: 'SMimePublicCert';
  store: Scalars['String'];
  field: Scalars['String'];
  _content?: Maybe<Scalars['String']>;
};

export type SMimePublicCerts = {
  __typename?: 'SMimePublicCerts';
  email?: Maybe<Scalars['String']>;
  cert?: Maybe<Array<Maybe<SMimePublicCert>>>;
};

export type SMimePublicCertsResponse = {
  __typename?: 'SMimePublicCertsResponse';
  certs?: Maybe<Array<Maybe<SMimePublicCerts>>>;
};

export type SaveDocument = {
  __typename?: 'SaveDocument';
  id?: Maybe<Scalars['ID']>;
  version?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export enum SaveDocumentAction {
  Create = 'create'
}

export type SaveDocumentInput = {
  id?: Maybe<Scalars['ID']>;
  folderId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Float']>;
  contentType?: Maybe<Scalars['String']>;
  upload?: Maybe<UploadDocument>;
  messageData?: Maybe<Array<Maybe<MessagePartForDocument>>>;
  descriptionEnabled?: Maybe<Scalars['Boolean']>;
  action?: Maybe<SaveDocumentAction>;
  type?: Maybe<SaveDocumentType>;
};

export type SaveDocumentResponse = {
  __typename?: 'SaveDocumentResponse';
  document?: Maybe<Array<Maybe<SaveDocument>>>;
};

export enum SaveDocumentType {
  Document = 'document',
  Presentation = 'presentation',
  Spreadsheet = 'spreadsheet'
}

export type SaveDraftResponse = {
  __typename?: 'SaveDraftResponse';
  message?: Maybe<Array<Maybe<MessageInfo>>>;
};

export type SaveMessageDataInput = {
  id: Scalars['ID'];
  content: Scalars['String'];
  meta: Scalars['String'];
};

export type ScratchCode = {
  __typename?: 'ScratchCode';
  scratchCode?: Maybe<Array<Maybe<ScratchCodeType>>>;
};

export type ScratchCodeType = {
  __typename?: 'ScratchCodeType';
  _content?: Maybe<Scalars['String']>;
};

export type ScratchCodes = {
  __typename?: 'ScratchCodes';
  scratchCodes?: Maybe<ScratchCode>;
};

export type SearchCalendarResourcesResponse = {
  __typename?: 'SearchCalendarResourcesResponse';
  calresource?: Maybe<Array<Maybe<CalResource>>>;
  more?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Scalars['String']>;
  paginationSupported?: Maybe<Scalars['Boolean']>;
};

export type SearchConditionsInput = {
  conds?: Maybe<ConditionsInput>;
};

export type SearchFolderInput = {
  id: Scalars['ID'];
  query: Scalars['String'];
  types: FolderView;
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  contacts?: Maybe<Array<Maybe<Contact>>>;
  messages?: Maybe<Array<Maybe<MessageInfo>>>;
  conversations?: Maybe<Array<Maybe<Conversation>>>;
  tasks?: Maybe<Array<Maybe<CalendarItemHitInfo>>>;
  appointments?: Maybe<Array<Maybe<CalendarItemHitInfo>>>;
  documents?: Maybe<Array<Maybe<Document>>>;
  more?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Scalars['String']>;
  paginationSupported?: Maybe<Scalars['Boolean']>;
  hit?: Maybe<Array<Maybe<Hit>>>;
};

export enum SearchType {
  Conversation = 'conversation',
  Message = 'message',
  Contact = 'contact',
  Appointment = 'appointment',
  Task = 'task',
  Wiki = 'wiki',
  Document = 'document'
}

export type Secret = {
  __typename?: 'Secret';
  _content?: Maybe<Scalars['String']>;
};

export type SendMessageInput = {
  id?: Maybe<Scalars['ID']>;
  origId?: Maybe<Scalars['ID']>;
  folderId?: Maybe<Scalars['ID']>;
  attach?: Maybe<Array<Maybe<AttachmentInput>>>;
  attachmentId?: Maybe<Scalars['ID']>;
  replyType?: Maybe<Scalars['String']>;
  inReplyTo?: Maybe<Scalars['String']>;
  flags?: Maybe<Scalars['String']>;
  autoSendTime?: Maybe<Scalars['Float']>;
  draftId?: Maybe<Scalars['ID']>;
  entityId?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  mimeParts?: Maybe<Array<Maybe<MimePartInput>>>;
  emailAddresses?: Maybe<Array<Maybe<MailItemEmailAddressInput>>>;
  attachments?: Maybe<Array<Maybe<AttachmentInput>>>;
};

export type SendMessageResponse = {
  __typename?: 'SendMessageResponse';
  message?: Maybe<Array<Maybe<MsgWithGroupInfo>>>;
};

export type Session = {
  __typename?: 'Session';
  id?: Maybe<Scalars['ID']>;
  _content?: Maybe<Scalars['String']>;
};

export enum SetRecoveryAccountChannel {
  Email = 'email'
}

export enum SetRecoveryAccountOp {
  SendCode = 'sendCode',
  ValidateCode = 'validateCode',
  ResendCode = 'resendCode',
  Reset = 'reset'
}

export type ShareInfo = {
  __typename?: 'ShareInfo';
  folderId: Scalars['ID'];
  folderPath?: Maybe<Scalars['String']>;
  folderUuid?: Maybe<Scalars['String']>;
  granteeName?: Maybe<Scalars['String']>;
  granteeDisplayName?: Maybe<Scalars['String']>;
  granteeId?: Maybe<Scalars['String']>;
  granteeType?: Maybe<Scalars['String']>;
  ownerEmail?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  ownerName?: Maybe<Scalars['String']>;
  rights?: Maybe<Scalars['String']>;
  view?: Maybe<FolderView>;
  mid?: Maybe<Scalars['ID']>;
};

export enum ShareInputAction {
  Edit = 'edit',
  Revoke = 'revoke',
  Expire = 'expire'
}

export type ShareNotificaitonEmailAddressInput = {
  address: Scalars['String'];
  type?: Maybe<AddressType>;
  personalName?: Maybe<Scalars['String']>;
};

export type ShareNotification = {
  __typename?: 'ShareNotification';
  truncated?: Maybe<Scalars['Boolean']>;
  content?: Maybe<Scalars['String']>;
};

export type ShareNotificationInput = {
  action?: Maybe<ShareInputAction>;
  item: ShareNotificationItemInput;
  address: ShareNotificaitonEmailAddressInput;
  notes?: Maybe<Notes>;
};

export type ShareNotificationItemInput = {
  id: Scalars['ID'];
};

export type Signature = {
  __typename?: 'Signature';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  content?: Maybe<Array<Maybe<SignatureContent>>>;
};

export type SignatureContent = {
  __typename?: 'SignatureContent';
  type?: Maybe<Scalars['String']>;
  _content?: Maybe<Scalars['String']>;
};

export type SignatureContentInput = {
  type?: Maybe<Scalars['String']>;
  _content?: Maybe<Scalars['String']>;
};

export type SignatureInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  content?: Maybe<SignatureContentInput>;
  contentId?: Maybe<Scalars['String']>;
};

export type SignatureResponse = {
  __typename?: 'SignatureResponse';
  signature?: Maybe<Array<Maybe<NameId>>>;
};

export type Signatures = {
  __typename?: 'Signatures';
  signature?: Maybe<Array<Maybe<Signature>>>;
};

export type SimpleRepeatingRule = {
  __typename?: 'SimpleRepeatingRule';
  frequency?: Maybe<CalendarItemRecurrenceFrequency>;
  interval?: Maybe<Array<Maybe<IntervalRule>>>;
  byday?: Maybe<Array<Maybe<ByDayRule>>>;
  until?: Maybe<Array<Maybe<CalendarItemRecurrenceEndDate>>>;
  count?: Maybe<Array<Maybe<CalendarItemRecurrenceEndCount>>>;
  bymonthday?: Maybe<Array<Maybe<ByMonthDayRule>>>;
  bymonth?: Maybe<Array<Maybe<ByMonthRule>>>;
  bysetpos?: Maybe<Array<Maybe<BySetPosRule>>>;
};

export type SizeCondition = {
  __typename?: 'SizeCondition';
  numberComparison?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type SizeConditionInput = {
  numberComparison?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type Skin = {
  __typename?: 'Skin';
  _content?: Maybe<Scalars['String']>;
};

export type SnoozeInput = {
  id: Scalars['ID'];
  until: Scalars['Float'];
};

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

export type StringContent = {
  __typename?: 'StringContent';
  _content?: Maybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['Int']>;
  unread?: Maybe<Scalars['Float']>;
};

export type TagAction = {
  __typename?: 'TagAction';
  tagName: Scalars['String'];
  index?: Maybe<Scalars['Int']>;
};

export type TagActionInput = {
  tagName: Scalars['String'];
  index?: Maybe<Scalars['Int']>;
};

export type Target = {
  __typename?: 'Target';
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Array<Maybe<OnlyEmailAddress>>>;
  type?: Maybe<Scalars['String']>;
};

export type Targets = {
  __typename?: 'Targets';
  right?: Maybe<Scalars['String']>;
  target?: Maybe<Array<Maybe<Target>>>;
};

export type TrustedDevicesEnabled = {
  __typename?: 'TrustedDevicesEnabled';
  _content?: Maybe<Scalars['Boolean']>;
};

export type TwoFactorAuthRequired = {
  __typename?: 'TwoFactorAuthRequired';
  _content?: Maybe<Scalars['Boolean']>;
};

export type TzOnsetInfo = {
  __typename?: 'TzOnsetInfo';
  week?: Maybe<Scalars['Int']>;
  wkday?: Maybe<Scalars['Int']>;
  mon?: Maybe<Scalars['Int']>;
  mday?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
  sec?: Maybe<Scalars['Int']>;
};

export enum Weekday {
  Su = 'SU',
  Mo = 'MO',
  Tu = 'TU',
  We = 'WE',
  Th = 'TH',
  Fr = 'FR',
  Sa = 'SA'
}

export type WhiteBlackAddress = {
  __typename?: 'WhiteBlackAddress';
  _content: Scalars['String'];
  op?: Maybe<Scalars['String']>;
};

export type WhiteBlackAddressOpts = {
  _content: Scalars['String'];
  op?: Maybe<Scalars['String']>;
};

export type WhiteBlackList = {
  __typename?: 'WhiteBlackList';
  whiteList: Array<Maybe<WhiteBlackListArr>>;
  blackList: Array<Maybe<WhiteBlackListArr>>;
};

export type WhiteBlackListArr = {
  __typename?: 'WhiteBlackListArr';
  addr?: Maybe<Array<Maybe<WhiteBlackAddress>>>;
};

export type WhiteBlackListArrInput = {
  addr?: Maybe<Array<Maybe<WhiteBlackAddressOpts>>>;
};

export type WhiteBlackListInput = {
  whiteList?: Maybe<WhiteBlackListArrInput>;
  blackList?: Maybe<WhiteBlackListArrInput>;
};

export type WkDay = {
  __typename?: 'WkDay';
  day?: Maybe<Weekday>;
  ordwk?: Maybe<Scalars['Int']>;
};

export type WkDayInput = {
  day: Weekday;
  ordwk?: Maybe<Scalars['Int']>;
};

export type WorkingHours = {
  __typename?: 'WorkingHours';
  id: Scalars['ID'];
  tentative?: Maybe<Array<Maybe<WorkingHoursInstance>>>;
  busy?: Maybe<Array<Maybe<WorkingHoursInstance>>>;
  unavailable?: Maybe<Array<Maybe<WorkingHoursInstance>>>;
  nodata?: Maybe<Array<Maybe<WorkingHoursInstance>>>;
  free?: Maybe<Array<Maybe<WorkingHoursInstance>>>;
};

export type WorkingHoursInstance = {
  __typename?: 'WorkingHoursInstance';
  start?: Maybe<Scalars['Float']>;
  end?: Maybe<Scalars['Float']>;
};

export type ZimletConfigGlobal = {
  __typename?: 'ZimletConfigGlobal';
  property?: Maybe<Array<Maybe<ZimletConfigProperty>>>;
};

export type ZimletConfigHost = {
  __typename?: 'ZimletConfigHost';
  property?: Maybe<Array<Maybe<ZimletConfigProperty>>>;
};

export type ZimletConfigProperty = {
  __typename?: 'ZimletConfigProperty';
  name?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

export type ZimletPref = {
  __typename?: 'ZimletPref';
  name?: Maybe<Scalars['String']>;
  presence?: Maybe<Scalars['String']>;
};

export type ZimletPreferenceInput = {
  name: Scalars['String'];
  presence: Scalars['String'];
};

export enum ZimletPresence {
  Mandatory = 'mandatory',
  Enabled = 'enabled',
  Disabled = 'disabled'
}

export type HabRootId = {
  __typename?: 'habRootId';
  _content?: Maybe<Scalars['String']>;
};

export type MessagePartForDocument = {
  messageId: Scalars['ID'];
  attachmentPart: Scalars['String'];
};

export type UploadDocument = {
  id: Scalars['ID'];
};
