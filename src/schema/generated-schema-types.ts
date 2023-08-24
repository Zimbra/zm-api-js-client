export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  granteeType?: Maybe<GranteeType>;
  key?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  permissions?: Maybe<Scalars['String']>;
  zimbraId?: Maybe<Scalars['ID']>;
};

export type AccountAceInfo = {
  __typename?: 'AccountACEInfo';
  address?: Maybe<Scalars['String']>;
  checkGrantee?: Maybe<Scalars['Boolean']>;
  deny?: Maybe<Scalars['Boolean']>;
  granteeType: GranteeType;
  key?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  right: Scalars['String'];
  zimbraId?: Maybe<Scalars['ID']>;
};

export type AccountAceInfoInput = {
  address?: InputMaybe<Scalars['String']>;
  checkGrantee?: InputMaybe<Scalars['Boolean']>;
  deny?: InputMaybe<Scalars['Boolean']>;
  granteeType: GranteeType;
  key?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  right: Scalars['String'];
  zimbraId?: InputMaybe<Scalars['ID']>;
};

export type AccountCos = {
  __typename?: 'AccountCos';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type AccountInfo = {
  __typename?: 'AccountInfo';
  adminDelegated?: Maybe<Scalars['Boolean']>;
  attrs?: Maybe<AccountInfoAttrs>;
  changePasswordURL?: Maybe<Scalars['String']>;
  cos?: Maybe<AccountCos>;
  habRoots?: Maybe<HabRoots>;
  id: Scalars['ID'];
  license?: Maybe<License>;
  name?: Maybe<Scalars['String']>;
  pasteitcleanedEnabled?: Maybe<Scalars['Boolean']>;
  profileImageId?: Maybe<Scalars['Int']>;
  props?: Maybe<PropList>;
  publicURL?: Maybe<Scalars['String']>;
  rest?: Maybe<Scalars['String']>;
  soapURL?: Maybe<Scalars['String']>;
  used?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  zimlets?: Maybe<AccountZimlet>;
};

export type AccountInfoAttrs = {
  __typename?: 'AccountInfoAttrs';
  displayName?: Maybe<Scalars['String']>;
  zimbraBlockEmailSendFromImapPop?: Maybe<Scalars['Boolean']>;
  zimbraBrandingFolderName?: Maybe<Scalars['String']>;
  zimbraDomainTrialConvertAtExpiration?: Maybe<Scalars['Boolean']>;
  zimbraDomainTrialExpirationDate?: Maybe<Scalars['String']>;
  zimbraDumpsterEnabled?: Maybe<Scalars['Boolean']>;
  zimbraExternalSharingEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureAdminMailEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureAdminPreferencesEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureAllowUsernameInPassword?: Maybe<Scalars['Boolean']>;
  zimbraFeatureAntispamEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureAppSpecificPasswordsEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureBriefcasesEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureCalendarEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureChangePasswordEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureConversationsEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureDiscardInFiltersEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureDocumentEditingEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureExportFolderEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureFiltersEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureGalAutoCompleteEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureGalEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureGroupCalendarEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureIdentitiesEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureImapDataSourceEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureImportFolderEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureInstantNotify?: Maybe<Scalars['Boolean']>;
  zimbraFeatureMailEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureMailForwardingEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureMailForwardingInFiltersEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureMailPriorityEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureMailSendLaterEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureManageZimlets?: Maybe<Scalars['Boolean']>;
  zimbraFeatureMobileSyncEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureOutOfOfficeReplyEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeaturePop3DataSourceEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeaturePowerPasteEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureReadReceiptsEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureRelatedContactsEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureResetPasswordStatus?: Maybe<ResetPasswordStatus>;
  zimbraFeatureRetentionPolicyEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureSharingEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureTaggingEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureTasksEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureTrustedDevicesEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureTwoFactorAuthAvailable?: Maybe<Scalars['Boolean']>;
  zimbraFeatureTwoFactorAuthRequired?: Maybe<Scalars['Boolean']>;
  zimbraFeatureViewInHtmlEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureWebClientOfflineAccessEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFeatureZulipChatEnabled?: Maybe<Scalars['Boolean']>;
  zimbraFileUploadMaxSize?: Maybe<Scalars['Float']>;
  zimbraFileUploadMaxSizePerFile?: Maybe<Scalars['Float']>;
  zimbraHierarchicalAddressBookRoot?: Maybe<Scalars['String']>;
  zimbraIdentityMaxNumEntries?: Maybe<Scalars['Int']>;
  zimbraIsAdminAccount?: Maybe<Scalars['Boolean']>;
  zimbraIsDelegatedAdminAccount?: Maybe<Scalars['Boolean']>;
  zimbraMailAlias?: Maybe<Array<Maybe<Scalars['String']>>>;
  zimbraMailAttachmentMaxSize?: Maybe<Scalars['Float']>;
  zimbraMailBlacklistMaxNumEntries?: Maybe<Scalars['Int']>;
  zimbraMailQuota?: Maybe<Scalars['String']>;
  zimbraMailSignatureMaxLength?: Maybe<Scalars['Float']>;
  zimbraMailWhitelistMaxNumEntries?: Maybe<Scalars['Int']>;
  zimbraMtaMaxMessageSize?: Maybe<Scalars['Float']>;
  zimbraPasswordAllowedChars?: Maybe<Scalars['String']>;
  zimbraPasswordAllowedPunctuationChars?: Maybe<Scalars['String']>;
  zimbraPasswordBlockCommonEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPasswordEnforceHistory?: Maybe<Scalars['Int']>;
  zimbraPasswordMaxAge?: Maybe<Scalars['Int']>;
  zimbraPasswordMaxLength?: Maybe<Scalars['Int']>;
  zimbraPasswordMinAge?: Maybe<Scalars['Int']>;
  zimbraPasswordMinAlphaChars?: Maybe<Scalars['Int']>;
  zimbraPasswordMinDigitsOrPuncs?: Maybe<Scalars['Int']>;
  zimbraPasswordMinLength?: Maybe<Scalars['Int']>;
  zimbraPasswordMinLowerCaseChars?: Maybe<Scalars['Int']>;
  zimbraPasswordMinNumericChars?: Maybe<Scalars['Int']>;
  zimbraPasswordMinPunctuationChars?: Maybe<Scalars['Int']>;
  zimbraPasswordMinUpperCaseChars?: Maybe<Scalars['Int']>;
  zimbraPublicSharingEnabled?: Maybe<Scalars['Boolean']>;
  zimbraSignupAffiliate?: Maybe<Scalars['String']>;
  zimbraSignupRecoveryEmail?: Maybe<Scalars['String']>;
  zimbraTrialConvertAtExpiration?: Maybe<Scalars['Boolean']>;
  zimbraTrialExpirationDate?: Maybe<Scalars['String']>;
  zimbraTwoFactorAuthEnabled?: Maybe<Scalars['Boolean']>;
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
  name?: Maybe<Scalars['String']>;
  property?: Maybe<Array<Maybe<ZimletConfigProperty>>>;
  version?: Maybe<Scalars['String']>;
};

export type AccountZimletContext = {
  __typename?: 'AccountZimletContext';
  baseUrl?: Maybe<Scalars['String']>;
  presence?: Maybe<ZimletPresence>;
  priority?: Maybe<Scalars['Int']>;
};

export type AccountZimletDesc = {
  __typename?: 'AccountZimletDesc';
  description?: Maybe<Scalars['String']>;
  extension?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  zimbraXZimletCompatibleSemVer?: Maybe<Scalars['String']>;
};

export type AccountZimletInfo = {
  __typename?: 'AccountZimletInfo';
  zimlet?: Maybe<Array<Maybe<AccountZimletDesc>>>;
  zimletConfig?: Maybe<Array<Maybe<AccountZimletConfigInfo>>>;
  zimletContext?: Maybe<Array<Maybe<AccountZimletContext>>>;
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
  absFolderPath?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  folderId: Scalars['ID'];
  meta?: InputMaybe<Scalars['String']>;
};

export type AddRecurrenceInfo = {
  __typename?: 'AddRecurrenceInfo';
  add?: Maybe<Array<Maybe<AddRecurrenceInfo>>>;
  cancel?: Maybe<Array<Maybe<CancelRuleInfo>>>;
  except?: Maybe<Array<Maybe<ExceptionRuleInfo>>>;
  exclude?: Maybe<Array<Maybe<ExcludeRecurrenceInfo>>>;
  rule?: Maybe<Array<Maybe<SimpleRepeatingRule>>>;
};

export type AddressCondition = {
  __typename?: 'AddressCondition';
  caseSensitive?: Maybe<Scalars['Boolean']>;
  countComparison?: Maybe<Scalars['String']>;
  header: Scalars['String'];
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
  part: Scalars['String'];
  stringComparison: Scalars['String'];
  value: Scalars['String'];
  valueComparison?: Maybe<Scalars['String']>;
};

export type AddressConditionInput = {
  caseSensitive?: InputMaybe<Scalars['Boolean']>;
  countComparison?: InputMaybe<Scalars['String']>;
  header: Scalars['String'];
  index?: InputMaybe<Scalars['Int']>;
  negative?: InputMaybe<Scalars['Boolean']>;
  part: Scalars['String'];
  stringComparison: Scalars['String'];
  value: Scalars['String'];
  valueComparison?: InputMaybe<Scalars['String']>;
};

export enum AddressType {
  B = 'b',
  C = 'c',
  F = 'f',
  N = 'n',
  R = 'r',
  Rf = 'rf',
  S = 's',
  T = 't'
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
  Audio = 'AUDIO',
  Display = 'DISPLAY',
  Email = 'EMAIL',
  None = 'NONE',
  Procedure = 'PROCEDURE',
  XYahooCalendarActionIm = 'X_YAHOO_CALENDAR_ACTION_IM',
  XYahooCalendarActionMobile = 'X_YAHOO_CALENDAR_ACTION_MOBILE'
}

export enum AlarmRelatedTo {
  End = 'END',
  Start = 'START'
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

export type AttachDoc = {
  __typename?: 'AttachDoc';
  doc?: Maybe<Array<Maybe<AttachDocs>>>;
};

export type AttachDocInput = {
  doc?: InputMaybe<Array<InputMaybe<AttachDocsInput>>>;
};

export type AttachDocs = {
  __typename?: 'AttachDocs';
  optional?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
};

export type AttachDocsInput = {
  optional?: InputMaybe<Scalars['Int']>;
  path?: InputMaybe<Scalars['String']>;
};

export type Attachment = {
  __typename?: 'Attachment';
  content?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export type AttachmentInput = {
  attachmentId?: InputMaybe<Scalars['String']>;
  cd?: InputMaybe<Scalars['String']>;
  ct?: InputMaybe<Scalars['String']>;
  documents?: InputMaybe<Array<InputMaybe<DocumentInput>>>;
  existingAttachments?: InputMaybe<Array<InputMaybe<ExistingAttachmentInput>>>;
  messages?: InputMaybe<Array<InputMaybe<EmlInput>>>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  authToken?: Maybe<Array<Maybe<AuthToken>>>;
  csrfToken?: Maybe<CsrfToken>;
  lifetime?: Maybe<Scalars['Float']>;
  session?: Maybe<Session>;
  skin?: Maybe<Array<Maybe<Skin>>>;
  trustedDevicesEnabled?: Maybe<TrustedDevicesEnabled>;
  twoFactorAuthRequired?: Maybe<TwoFactorAuthRequired>;
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
  company?: Maybe<Scalars['String']>;
  display?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  exp?: Maybe<Scalars['Boolean']>;
  fileas?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['String']>;
  folderId?: Maybe<Scalars['ID']>;
  full?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isGroup?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['String']>;
  middle?: Maybe<Scalars['String']>;
  nick?: Maybe<Scalars['String']>;
  ranking?: Maybe<Scalars['Int']>;
  type?: Maybe<AutoCompleteMatchType>;
};

export enum AutoCompleteMatchType {
  Contact = 'contact',
  Gal = 'gal',
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
  index?: InputMaybe<Scalars['Int']>;
};

export type BasicCondition = {
  __typename?: 'BasicCondition';
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type BasicConditionInput = {
  index?: InputMaybe<Scalars['Int']>;
  negative?: InputMaybe<Scalars['Boolean']>;
};

export type BodyCondition = {
  __typename?: 'BodyCondition';
  caseSensitive?: Maybe<Scalars['Boolean']>;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
  value?: Maybe<Scalars['String']>;
};

export type BodyConditionInput = {
  caseSensitive?: InputMaybe<Scalars['Boolean']>;
  index?: InputMaybe<Scalars['Int']>;
  negative?: InputMaybe<Scalars['Boolean']>;
  value?: InputMaybe<Scalars['String']>;
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
  sentBy?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type CalResource = {
  __typename?: 'CalResource';
  _attrs?: Maybe<CalResourceAttributes>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type CalResourceAttributes = {
  __typename?: 'CalResourceAttributes';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  zimbraCalResBuilding?: Maybe<Scalars['String']>;
  zimbraCalResCapacity?: Maybe<Scalars['String']>;
  zimbraCalResContactEmail?: Maybe<Scalars['String']>;
  zimbraCalResContactName?: Maybe<Scalars['String']>;
  zimbraCalResContactPhone?: Maybe<Scalars['String']>;
  zimbraCalResFloor?: Maybe<Scalars['String']>;
  zimbraCalResLocationDisplayName?: Maybe<Scalars['String']>;
  zimbraCalResRoom?: Maybe<Scalars['String']>;
  zimbraCalResSite?: Maybe<Scalars['String']>;
  zimbraCalResType?: Maybe<Scalars['String']>;
};

export type CalTzInfo = {
  __typename?: 'CalTZInfo';
  daylight?: Maybe<TzOnsetInfo>;
  dayname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  standard?: Maybe<TzOnsetInfo>;
  stdname?: Maybe<Scalars['String']>;
  timezoneDaylightOffset?: Maybe<Scalars['Int']>;
  timezoneStdOffset?: Maybe<Scalars['Int']>;
};

export type CalendarCounterAppointmentInput = {
  components: Array<InputMaybe<CalendarItemInviteComponentCounterInput>>;
};

export type CalendarItemAlarm = {
  __typename?: 'CalendarItemAlarm';
  action: AlarmAction;
  attendees?: Maybe<Array<Maybe<CalendarItemAlarmAttendees>>>;
  trigger?: Maybe<Array<Maybe<CalendarItemAlarmTrigger>>>;
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
  attendees?: InputMaybe<CalendarItemAlarmAttendeesInput>;
  trigger: CalendarItemAlarmTriggerInput;
};

export type CalendarItemAlarmTrigger = {
  __typename?: 'CalendarItemAlarmTrigger';
  relative?: Maybe<Array<Maybe<CalendarItemAlarmTriggerRelative>>>;
};

export type CalendarItemAlarmTriggerAbsoluteInput = {
  date: Scalars['String'];
};

export type CalendarItemAlarmTriggerInput = {
  absolute?: InputMaybe<CalendarItemAlarmTriggerAbsoluteInput>;
  relative?: InputMaybe<CalendarItemAlarmTriggerRelativeInput>;
};

export type CalendarItemAlarmTriggerRelative = {
  __typename?: 'CalendarItemAlarmTriggerRelative';
  days?: Maybe<Scalars['Int']>;
  hours?: Maybe<Scalars['Int']>;
  minutes?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
  relatedTo?: Maybe<AlarmRelatedTo>;
  seconds?: Maybe<Scalars['Int']>;
  weeks?: Maybe<Scalars['Int']>;
};

export type CalendarItemAlarmTriggerRelativeInput = {
  days?: InputMaybe<Scalars['Int']>;
  hours?: InputMaybe<Scalars['Int']>;
  minutes?: InputMaybe<Scalars['Int']>;
  negative?: InputMaybe<Scalars['Boolean']>;
  relatedTo?: InputMaybe<AlarmRelatedTo>;
  seconds?: InputMaybe<Scalars['Int']>;
  weeks?: InputMaybe<Scalars['Int']>;
};

export type CalendarItemAttendee = {
  __typename?: 'CalendarItemAttendee';
  address?: Maybe<Scalars['String']>;
  calendarUserType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  participationStatus?: Maybe<ParticipationStatus>;
  role?: Maybe<ParticipationRole>;
  rsvp?: Maybe<Scalars['Boolean']>;
};

export type CalendarItemAttendeesInput = {
  address: Scalars['String'];
  calendarUserType?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  participationStatus?: InputMaybe<ParticipationStatus>;
  role?: InputMaybe<ParticipationRole>;
  rsvp?: InputMaybe<Scalars['Boolean']>;
};

export enum CalendarItemClass {
  Con = 'CON',
  Pri = 'PRI',
  Pub = 'PUB'
}

export type CalendarItemDateTimeInput = {
  date: Scalars['String'];
  timezone?: InputMaybe<Scalars['String']>;
};

export type CalendarItemHitInfo = {
  __typename?: 'CalendarItemHitInfo';
  aid?: Maybe<Scalars['String']>;
  alarm?: Maybe<Scalars['Boolean']>;
  alarmData?: Maybe<Array<Maybe<Alarm>>>;
  allDay?: Maybe<Scalars['Boolean']>;
  changeDate?: Maybe<Scalars['Float']>;
  class: CalendarItemClass;
  componentNum?: Maybe<Scalars['Int']>;
  date?: Maybe<Scalars['Float']>;
  draft?: Maybe<Scalars['Boolean']>;
  duration?: Maybe<Scalars['Float']>;
  excerpt?: Maybe<Scalars['String']>;
  flags?: Maybe<Scalars['String']>;
  folderId: Scalars['ID'];
  freeBusy?: Maybe<FreeBusyStatus>;
  freeBusyActual?: Maybe<FreeBusyStatus>;
  id: Scalars['ID'];
  instances?: Maybe<Array<Maybe<Instance>>>;
  invitations?: Maybe<Array<Maybe<Invitation>>>;
  inviteId: Scalars['ID'];
  isOrganizer?: Maybe<Scalars['Boolean']>;
  isRecurring?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  modifiedSequence?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  neverSent?: Maybe<Scalars['Boolean']>;
  organizer?: Maybe<CalOrganizer>;
  otherAttendees?: Maybe<Scalars['Boolean']>;
  participationStatus?: Maybe<ParticipationStatus>;
  percentComplete?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  sortField?: Maybe<Scalars['String']>;
  status?: Maybe<InviteCompletionStatus>;
  tagNames?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  timezoneOffset?: Maybe<Scalars['Int']>;
  uid?: Maybe<Scalars['String']>;
  utcRecurrenceId?: Maybe<Scalars['String']>;
  x_uid?: Maybe<Scalars['String']>;
};

export type CalendarItemInput = {
  componentNum?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  message: CalendarItemMessageInput;
  modifiedSequence?: InputMaybe<Scalars['Float']>;
  revision?: InputMaybe<Scalars['Float']>;
};

export type CalendarItemInviteComponentCounterInput = {
  alarms?: InputMaybe<Array<InputMaybe<CalendarItemAlarmInput>>>;
  allDay?: InputMaybe<Scalars['Boolean']>;
  attendees?: InputMaybe<Array<InputMaybe<CalendarItemAttendeesInput>>>;
  class?: InputMaybe<CalendarItemClass>;
  description?: InputMaybe<Array<InputMaybe<CalendarItemInviteComponentDescriptionInput>>>;
  draft?: InputMaybe<Scalars['Boolean']>;
  end: CalendarItemDateTimeInput;
  exceptId?: InputMaybe<CalendarOptionalItemDateTimeInput>;
  freeBusy?: InputMaybe<FreeBusyStatus>;
  location?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  noBlob?: InputMaybe<Scalars['Boolean']>;
  organizer?: InputMaybe<CalendarItemOrganizerInput>;
  percentComplete?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<Scalars['String']>;
  recurrence?: InputMaybe<CalendarItemRecurrenceInput>;
  start: CalendarItemDateTimeInput;
  status?: InputMaybe<InviteCompletionStatus>;
  uid?: InputMaybe<Scalars['String']>;
};

export type CalendarItemInviteComponentDescriptionInput = {
  _content?: InputMaybe<Scalars['String']>;
};

export type CalendarItemInviteComponentInput = {
  alarms?: InputMaybe<Array<InputMaybe<CalendarItemAlarmInput>>>;
  allDay?: InputMaybe<Scalars['Boolean']>;
  attendees?: InputMaybe<Array<InputMaybe<CalendarItemAttendeesInput>>>;
  class: CalendarItemClass;
  description?: InputMaybe<Array<InputMaybe<CalendarItemInviteComponentDescriptionInput>>>;
  draft?: InputMaybe<Scalars['Boolean']>;
  end?: InputMaybe<CalendarItemDateTimeInput>;
  exceptId?: InputMaybe<CalendarOptionalItemDateTimeInput>;
  freeBusy?: InputMaybe<FreeBusyStatus>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  noBlob?: InputMaybe<Scalars['Boolean']>;
  organizer?: InputMaybe<CalendarItemOrganizerInput>;
  percentComplete?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<Scalars['String']>;
  recurrence?: InputMaybe<CalendarItemRecurrenceInput>;
  start?: InputMaybe<CalendarItemDateTimeInput>;
  status?: InputMaybe<InviteCompletionStatus>;
};

export type CalendarItemInviteInput = {
  components: Array<InputMaybe<CalendarItemInviteComponentInput>>;
};

export type CalendarItemMessageInput = {
  attachments?: InputMaybe<Array<InputMaybe<AttachmentInput>>>;
  emailAddresses?: InputMaybe<Array<InputMaybe<MailItemEmailAddressInput>>>;
  folderId?: InputMaybe<Scalars['ID']>;
  invitations?: InputMaybe<CalendarItemInviteInput>;
  mimeParts?: InputMaybe<Array<InputMaybe<MimePartInput>>>;
  replyType?: InputMaybe<InviteReplyType>;
  subject?: InputMaybe<Scalars['String']>;
};

export type CalendarItemOrganizerInput = {
  address?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  sentBy?: InputMaybe<Scalars['String']>;
};

export type CalendarItemRecurrenceAddInput = {
  rule?: InputMaybe<CalendarItemRecurrenceRuleInput>;
};

export type CalendarItemRecurrenceByDayInput = {
  wkday?: InputMaybe<Array<InputMaybe<WkDayInput>>>;
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
  Dai = 'DAI',
  Hou = 'HOU',
  Min = 'MIN',
  Mon = 'MON',
  Sec = 'SEC',
  Wee = 'WEE',
  Yea = 'YEA'
}

export type CalendarItemRecurrenceInput = {
  add?: InputMaybe<CalendarItemRecurrenceAddInput>;
};

export type CalendarItemRecurrenceIntervalInput = {
  intervalCount: Scalars['Int'];
  zimbraPrefAutoAddAppointmentsToCalendar?: InputMaybe<Scalars['Boolean']>;
};

export type CalendarItemRecurrenceRuleInput = {
  byday?: InputMaybe<CalendarItemRecurrenceByDayInput>;
  bymonth?: InputMaybe<CalendarItemRecurrenceByMonthInput>;
  bymonthday?: InputMaybe<CalendarItemRecurrenceByMonthDayInput>;
  bysetpos?: InputMaybe<CalendarItemRecurrenceBySetPosInput>;
  count?: InputMaybe<CalendarItemRecurrenceEndCountInput>;
  frequency?: InputMaybe<CalendarItemRecurrenceFrequency>;
  interval?: InputMaybe<CalendarItemRecurrenceIntervalInput>;
  until?: InputMaybe<CalendarItemRecurrenceEndDateInput>;
};

export type CalendarItemReply = {
  __typename?: 'CalendarItemReply';
  attendee?: Maybe<Scalars['String']>;
  participationStatus?: Maybe<ParticipationStatus>;
};

export type CalendarOptionalItemDateTimeInput = {
  date?: InputMaybe<Scalars['String']>;
  timezone?: InputMaybe<Scalars['String']>;
};

export type CancelRuleInfo = {
  __typename?: 'CancelRuleInfo';
  rangeType?: Maybe<Scalars['Int']>;
  recurId?: Maybe<Scalars['String']>;
  ridZ?: Maybe<Scalars['String']>;
  tz?: Maybe<Scalars['String']>;
};

export type ClientInfoAttributes = {
  __typename?: 'ClientInfoAttributes';
  zimbraFeatureResetPasswordStatus?: Maybe<ResetPasswordStatus>;
  zimbraHelpModernURL?: Maybe<Scalars['String']>;
  zimbraWebClientLoginURL?: Maybe<Scalars['String']>;
  zimbraWebClientLogoutURL?: Maybe<Scalars['String']>;
  zimbraWebClientSkipLogoff?: Maybe<Scalars['Boolean']>;
};

export type ClientInfoType = {
  __typename?: 'ClientInfoType';
  attributes?: Maybe<ClientInfoAttributes>;
};

export type ConditionInput = {
  attr?: InputMaybe<Scalars['String']>;
  op?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type ConditionsInput = {
  cond?: InputMaybe<Array<InputMaybe<ConditionInput>>>;
};

export enum ConnectionType {
  Cleartext = 'cleartext',
  Ssl = 'ssl',
  Tls = 'tls',
  TlsIsAvailable = 'tls_is_available'
}

export type Contact = {
  __typename?: 'Contact';
  attributes?: Maybe<ContactAttributes>;
  certificate?: Maybe<Array<Maybe<SmimeCert>>>;
  date?: Maybe<Scalars['Float']>;
  fileAsStr?: Maybe<Scalars['String']>;
  folderId?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  memberOf?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<ContactListMember>>>;
  revision?: Maybe<Scalars['Float']>;
  sortField?: Maybe<Scalars['String']>;
  tagNames?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
};

export type ContactAttributes = {
  __typename?: 'ContactAttributes';
  anniversary?: Maybe<Scalars['String']>;
  assistantPhone?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  callbackPhone?: Maybe<Scalars['String']>;
  carPhone?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  companyPhone?: Maybe<Scalars['String']>;
  companyPhone2?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email2?: Maybe<Scalars['String']>;
  fileAs?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  homeCity?: Maybe<Scalars['String']>;
  homeCountry?: Maybe<Scalars['String']>;
  homeEmail?: Maybe<Scalars['String']>;
  homeEmail2?: Maybe<Scalars['String']>;
  homeFax?: Maybe<Scalars['String']>;
  homeFax2?: Maybe<Scalars['String']>;
  homePhone?: Maybe<Scalars['String']>;
  homePhone2?: Maybe<Scalars['String']>;
  homePostalCode?: Maybe<Scalars['String']>;
  homeState?: Maybe<Scalars['String']>;
  homeStreet?: Maybe<Scalars['String']>;
  homeURL?: Maybe<Scalars['String']>;
  imAddress?: Maybe<Scalars['String']>;
  imAddress1?: Maybe<Scalars['String']>;
  imAddress2?: Maybe<Scalars['String']>;
  imAddress3?: Maybe<Scalars['String']>;
  imAddress4?: Maybe<Scalars['String']>;
  imAddress5?: Maybe<Scalars['String']>;
  image?: Maybe<ContactImage>;
  jobTitle?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  maidenName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  mobilePhone?: Maybe<Scalars['String']>;
  mobilePhone2?: Maybe<Scalars['String']>;
  namePrefix?: Maybe<Scalars['String']>;
  nameSuffix?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  other?: Maybe<Array<Maybe<OtherContactAttribute>>>;
  otherCity?: Maybe<Scalars['String']>;
  otherCountry?: Maybe<Scalars['String']>;
  otherFax?: Maybe<Scalars['String']>;
  otherPhone?: Maybe<Scalars['String']>;
  otherPhone2?: Maybe<Scalars['String']>;
  otherPostalCode?: Maybe<Scalars['String']>;
  otherState?: Maybe<Scalars['String']>;
  otherStreet?: Maybe<Scalars['String']>;
  otherURL?: Maybe<Scalars['String']>;
  pager?: Maybe<Scalars['String']>;
  pager2?: Maybe<Scalars['String']>;
  phoneticCompany?: Maybe<Scalars['String']>;
  phoneticFirstName?: Maybe<Scalars['String']>;
  phoneticLastName?: Maybe<Scalars['String']>;
  thumbnailPhoto?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userCertificate?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  workCity?: Maybe<Scalars['String']>;
  workCountry?: Maybe<Scalars['String']>;
  workEmail?: Maybe<Scalars['String']>;
  workEmail2?: Maybe<Scalars['String']>;
  workFax?: Maybe<Scalars['String']>;
  workFax2?: Maybe<Scalars['String']>;
  workPhone?: Maybe<Scalars['String']>;
  workPhone2?: Maybe<Scalars['String']>;
  workPostalCode?: Maybe<Scalars['String']>;
  workState?: Maybe<Scalars['String']>;
  workStreet?: Maybe<Scalars['String']>;
  workURL?: Maybe<Scalars['String']>;
  zimbraCalResType?: Maybe<Scalars['String']>;
};

export type ContactAttrsInput = {
  anniversary?: InputMaybe<Scalars['String']>;
  assistantPhone?: InputMaybe<Scalars['String']>;
  birthday?: InputMaybe<Scalars['String']>;
  callbackPhone?: InputMaybe<Scalars['String']>;
  carPhone?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  companyPhone?: InputMaybe<Scalars['String']>;
  companyPhone2?: InputMaybe<Scalars['String']>;
  department?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  email2?: InputMaybe<Scalars['String']>;
  fileAs?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  homeCity?: InputMaybe<Scalars['String']>;
  homeCountry?: InputMaybe<Scalars['String']>;
  homeEmail?: InputMaybe<Scalars['String']>;
  homeEmail2?: InputMaybe<Scalars['String']>;
  homeFax?: InputMaybe<Scalars['String']>;
  homeFax2?: InputMaybe<Scalars['String']>;
  homePhone?: InputMaybe<Scalars['String']>;
  homePhone2?: InputMaybe<Scalars['String']>;
  homePostalCode?: InputMaybe<Scalars['String']>;
  homeState?: InputMaybe<Scalars['String']>;
  homeStreet?: InputMaybe<Scalars['String']>;
  homeURL?: InputMaybe<Scalars['String']>;
  imAddress?: InputMaybe<Scalars['String']>;
  imAddress1?: InputMaybe<Scalars['String']>;
  imAddress2?: InputMaybe<Scalars['String']>;
  imAddress3?: InputMaybe<Scalars['String']>;
  imAddress4?: InputMaybe<Scalars['String']>;
  imAddress5?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  jobTitle?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  maidenName?: InputMaybe<Scalars['String']>;
  middleName?: InputMaybe<Scalars['String']>;
  mobilePhone?: InputMaybe<Scalars['String']>;
  mobilePhone2?: InputMaybe<Scalars['String']>;
  namePrefix?: InputMaybe<Scalars['String']>;
  nameSuffix?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  other?: InputMaybe<Array<InputMaybe<OtherContactAttributeInput>>>;
  otherCity?: InputMaybe<Scalars['String']>;
  otherCountry?: InputMaybe<Scalars['String']>;
  otherFax?: InputMaybe<Scalars['String']>;
  otherPhone?: InputMaybe<Scalars['String']>;
  otherPhone2?: InputMaybe<Scalars['String']>;
  otherPostalCode?: InputMaybe<Scalars['String']>;
  otherState?: InputMaybe<Scalars['String']>;
  otherStreet?: InputMaybe<Scalars['String']>;
  otherURL?: InputMaybe<Scalars['String']>;
  pager?: InputMaybe<Scalars['String']>;
  pager2?: InputMaybe<Scalars['String']>;
  phoneticCompany?: InputMaybe<Scalars['String']>;
  phoneticFirstName?: InputMaybe<Scalars['String']>;
  phoneticLastName?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  userCertificate?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
  workCity?: InputMaybe<Scalars['String']>;
  workCountry?: InputMaybe<Scalars['String']>;
  workEmail?: InputMaybe<Scalars['String']>;
  workEmail2?: InputMaybe<Scalars['String']>;
  workFax?: InputMaybe<Scalars['String']>;
  workFax2?: InputMaybe<Scalars['String']>;
  workPhone?: InputMaybe<Scalars['String']>;
  workPhone2?: InputMaybe<Scalars['String']>;
  workPostalCode?: InputMaybe<Scalars['String']>;
  workState?: InputMaybe<Scalars['String']>;
  workStreet?: InputMaybe<Scalars['String']>;
  workURL?: InputMaybe<Scalars['String']>;
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
  interval: Scalars['String'];
  range: Scalars['String'];
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
  changeDate?: Maybe<Scalars['Float']>;
  conversationId?: Maybe<Scalars['ID']>;
  date?: Maybe<Scalars['Float']>;
  emailAddresses?: Maybe<Array<Maybe<EmailAddress>>>;
  excerpt?: Maybe<Scalars['String']>;
  flags?: Maybe<Scalars['String']>;
  folderId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  invitations?: Maybe<Array<Maybe<InviteInfo>>>;
  messages?: Maybe<Array<Maybe<MessageInfo>>>;
  messagesMetaData?: Maybe<Array<Maybe<MessageInfo>>>;
  meta?: Maybe<Array<Maybe<CustomMetadataMeta>>>;
  modifiedSequence?: Maybe<Scalars['Float']>;
  numMessages?: Maybe<Scalars['Float']>;
  replyType?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Float']>;
  senderDate?: Maybe<Scalars['Float']>;
  share?: Maybe<Array<Maybe<ShareNotification>>>;
  size?: Maybe<Scalars['Float']>;
  sortField?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  tagNames?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  unread?: Maybe<Scalars['Float']>;
};

export type ConversationCondition = {
  __typename?: 'ConversationCondition';
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
  where?: Maybe<Scalars['String']>;
};

export type ConversationConditionInput = {
  index?: InputMaybe<Scalars['Int']>;
  negative?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<Scalars['String']>;
};

export type CounterAppointmentInput = {
  componentNum?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
  message: CounterAppointmentMessageInput;
  modifiedSequence?: InputMaybe<Scalars['Float']>;
  revision?: InputMaybe<Scalars['Float']>;
};

export type CounterAppointmentMessageInput = {
  attachments?: InputMaybe<Array<InputMaybe<AttachmentInput>>>;
  emailAddresses?: InputMaybe<Array<InputMaybe<MailItemEmailAddressInput>>>;
  folderId?: InputMaybe<Scalars['ID']>;
  invitations?: InputMaybe<CalendarCounterAppointmentInput>;
  mimeParts?: InputMaybe<Array<InputMaybe<MimePartInput>>>;
  origId?: InputMaybe<Scalars['ID']>;
  replyType?: InputMaybe<InviteReplyType>;
  subject?: InputMaybe<Scalars['String']>;
};

export type CreateAppSpecificPasswordResponse = {
  __typename?: 'CreateAppSpecificPasswordResponse';
  password?: Maybe<Scalars['String']>;
};

export type CreateContactInput = {
  attributes: ContactAttrsInput;
  folderId?: InputMaybe<Scalars['ID']>;
  tagNames?: InputMaybe<Scalars['String']>;
};

export type CreateIdentityInput = {
  attrs?: InputMaybe<IdentityAttrsInput>;
  name: Scalars['String'];
};

export type CreateMountpointInput = {
  link?: InputMaybe<NewMountpointSpec>;
};

export type CreateTagInput = {
  color?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type CsrfToken = {
  __typename?: 'CsrfToken';
  _content?: Maybe<Scalars['String']>;
};

export type Cursor = {
  endSortVal?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  includeOffset?: InputMaybe<Scalars['Boolean']>;
  sortVal?: InputMaybe<Scalars['String']>;
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
  key?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type CustomMetadataInput = {
  attrs?: InputMaybe<Array<InputMaybe<CustomMetadataAttrsInput>>>;
  id: Scalars['ID'];
  section?: InputMaybe<Scalars['String']>;
};

export type CustomMetadataMeta = {
  __typename?: 'CustomMetadataMeta';
  _attrs?: Maybe<Array<Maybe<CustomMetadataAttrs>>>;
  section?: Maybe<Scalars['String']>;
};

export type DataSource = {
  __typename?: 'DataSource';
  connectionType?: Maybe<Scalars['String']>;
  defaultSignature?: Maybe<Scalars['ID']>;
  emailAddress?: Maybe<Scalars['String']>;
  failingSince?: Maybe<Scalars['String']>;
  forwardReplySignature?: Maybe<Scalars['ID']>;
  fromDisplay?: Maybe<Scalars['String']>;
  host?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  importOnly?: Maybe<Scalars['Boolean']>;
  isEnabled?: Maybe<Scalars['Boolean']>;
  l?: Maybe<Scalars['ID']>;
  lastError?: Maybe<StringContent>;
  leaveOnServer?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  pollingInterval?: Maybe<Scalars['Float']>;
  port?: Maybe<Scalars['String']>;
  replyToAddress?: Maybe<Scalars['String']>;
  replyToDisplay?: Maybe<Scalars['String']>;
  smtpPort?: Maybe<Scalars['String']>;
  useAddressForForwardReply?: Maybe<Scalars['Boolean']>;
  username?: Maybe<Scalars['String']>;
};

export type DataSources = {
  __typename?: 'DataSources';
  cal?: Maybe<Array<Maybe<DataSource>>>;
  imap?: Maybe<Array<Maybe<DataSource>>>;
  pop3?: Maybe<Array<Maybe<DataSource>>>;
};

export type DateCondition = {
  __typename?: 'DateCondition';
  date?: Maybe<Scalars['Float']>;
  dateComparison?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type DateConditionInput = {
  date?: InputMaybe<Scalars['Float']>;
  dateComparison?: InputMaybe<Scalars['String']>;
  index?: InputMaybe<Scalars['Int']>;
  negative?: InputMaybe<Scalars['Boolean']>;
};

export type DeleteAppointmentInput = {
  componentNum: Scalars['Int'];
  instanceDate?: InputMaybe<InstanceDate>;
  inviteId: Scalars['String'];
  message?: InputMaybe<CalendarItemMessageInput>;
  start?: InputMaybe<Scalars['Int']>;
};

export type DeleteIdentityInput = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type Device = {
  __typename?: 'Device';
  firstReqReceived?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  lastPolicyUpdate?: Maybe<Scalars['Int']>;
  lastUpdatedBy?: Maybe<Scalars['String']>;
  lastUsedDate?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  protocol?: Maybe<Scalars['Float']>;
  provisionable?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  ua?: Maybe<Scalars['String']>;
};

export type DiscoverRightInput = {
  _content?: InputMaybe<Scalars['String']>;
};

export type DiscoverRights = {
  __typename?: 'DiscoverRights';
  targets?: Maybe<Array<Maybe<Targets>>>;
};

export type DismissInput = {
  dismissedAt: Scalars['Float'];
  id: Scalars['ID'];
};

export type DlAttrs = {
  __typename?: 'DlAttrs';
  commonName?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type DlGroupMember = {
  __typename?: 'DlGroupMember';
  attributes?: Maybe<DlAttrs>;
  name?: Maybe<Scalars['String']>;
};

export type Document = {
  __typename?: 'Document';
  acl?: Maybe<Acl>;
  changeDate?: Maybe<Scalars['Float']>;
  contentType?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Float']>;
  descriptionEnabled?: Maybe<Scalars['Boolean']>;
  docs?: Maybe<Array<Maybe<Document>>>;
  flags?: Maybe<Scalars['String']>;
  folderId?: Maybe<Scalars['ID']>;
  folderUuid?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastEditedAccount?: Maybe<Scalars['String']>;
  lockOwnerId?: Maybe<Scalars['ID']>;
  metadataVersion?: Maybe<Scalars['Float']>;
  modifiedSequence?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  permission?: Maybe<Scalars['String']>;
  revisedCreationDate?: Maybe<Scalars['Float']>;
  revision?: Maybe<Scalars['Float']>;
  revisonCreator?: Maybe<Scalars['String']>;
  sfid?: Maybe<Scalars['ID']>;
  size?: Maybe<Scalars['Float']>;
  sortField?: Maybe<Scalars['String']>;
  tagNames?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['ID']>;
  version?: Maybe<Scalars['Float']>;
};

export type DocumentActionData = {
  __typename?: 'DocumentActionData';
  action?: Maybe<ActionData>;
};

export type DocumentInput = {
  id?: InputMaybe<Scalars['ID']>;
  optional?: InputMaybe<Scalars['Int']>;
  path?: InputMaybe<Scalars['String']>;
};

export type DtTimeInfo = {
  __typename?: 'DtTimeInfo';
  date?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  utc?: Maybe<Scalars['Float']>;
};

export type EmlInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type EmailAddress = {
  __typename?: 'EmailAddress';
  address?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type EmailAddressInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  shortName: Scalars['String'];
};

export type EnableTwoFactorAuthInput = {
  authToken?: InputMaybe<Scalars['String']>;
  csrfTokenSecured: Scalars['Boolean'];
  ignoreSameSite?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  twoFactorCode?: InputMaybe<Scalars['String']>;
};

export type EnableTwoFactorAuthResponse = {
  __typename?: 'EnableTwoFactorAuthResponse';
  authToken?: Maybe<Array<Maybe<AuthToken>>>;
  csrfToken?: Maybe<Array<Maybe<CsrfToken>>>;
  scratchCodes?: Maybe<Array<Maybe<ScratchCode>>>;
  secret?: Maybe<Array<Maybe<Secret>>>;
};

export type ExceptionRuleInfo = {
  __typename?: 'ExceptionRuleInfo';
  add?: Maybe<Array<Maybe<AddRecurrenceInfo>>>;
  exclude?: Maybe<Array<Maybe<ExcludeRecurrenceInfo>>>;
  rangeType?: Maybe<Scalars['Int']>;
  recurId?: Maybe<Scalars['String']>;
  ridZ?: Maybe<Scalars['String']>;
  tz?: Maybe<Scalars['String']>;
};

export type ExcludeRecurrenceInfo = {
  __typename?: 'ExcludeRecurrenceInfo';
  except?: Maybe<Array<Maybe<ExceptionRuleInfo>>>;
  exclude?: Maybe<Array<Maybe<ExcludeRecurrenceInfo>>>;
};

export type ExistingAttachmentInput = {
  messageId?: InputMaybe<Scalars['ID']>;
  part?: InputMaybe<Scalars['String']>;
};

export type ExternalAccount = {
  accountType?: InputMaybe<AccountType>;
  connectionType?: InputMaybe<ConnectionType>;
  host: Scalars['String'];
  id: Scalars['ID'];
  isEnabled?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  password: Scalars['String'];
  port: Scalars['String'];
  username: Scalars['String'];
};

export type ExternalAccountAddInput = {
  accountType?: InputMaybe<AccountType>;
  connectionType?: InputMaybe<ConnectionType>;
  emailAddress?: InputMaybe<Scalars['String']>;
  host: Scalars['String'];
  isEnabled?: InputMaybe<Scalars['Boolean']>;
  l: Scalars['ID'];
  leaveOnServer?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  password: Scalars['String'];
  port: Scalars['String'];
  username: Scalars['String'];
};

export type ExternalAccountImportInput = {
  accountType?: InputMaybe<AccountType>;
  id: Scalars['ID'];
};

export type ExternalAccountModifyAttrsInput = {
  accountType?: InputMaybe<AccountType>;
  connectionType?: InputMaybe<ConnectionType>;
  defaultSignature?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  forwardReplySignature?: InputMaybe<Scalars['ID']>;
  fromDisplay?: InputMaybe<Scalars['String']>;
  host?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  importOnly?: InputMaybe<Scalars['Boolean']>;
  isEnabled?: InputMaybe<Scalars['Boolean']>;
  l: Scalars['ID'];
  leaveOnServer?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  port?: InputMaybe<Scalars['String']>;
  replyToAddress?: InputMaybe<Scalars['String']>;
  replyToDisplay?: InputMaybe<Scalars['String']>;
  replyToEnabled?: InputMaybe<Scalars['Boolean']>;
  signatureValue?: InputMaybe<Scalars['String']>;
  smtpPort?: InputMaybe<Scalars['String']>;
  storeAndForward?: InputMaybe<Scalars['String']>;
  useAddressForForwardReply?: InputMaybe<Scalars['Boolean']>;
  username?: InputMaybe<Scalars['String']>;
};

export type ExternalAccountTestInput = {
  accountType?: InputMaybe<AccountType>;
  connectionType?: InputMaybe<ConnectionType>;
  emailAddress?: InputMaybe<Scalars['String']>;
  host: Scalars['String'];
  leaveOnServer?: InputMaybe<Scalars['Boolean']>;
  password: Scalars['String'];
  port: Scalars['String'];
  username: Scalars['String'];
};

export type ExternalAccountTestResponse = {
  __typename?: 'ExternalAccountTestResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type FileIntoAction = {
  __typename?: 'FileIntoAction';
  copy?: Maybe<Scalars['Boolean']>;
  folderPath?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
};

export type FileIntoActionInput = {
  copy?: InputMaybe<Scalars['Boolean']>;
  folderPath?: InputMaybe<Scalars['String']>;
  index?: InputMaybe<Scalars['Int']>;
};

export type Filter = {
  __typename?: 'Filter';
  actions?: Maybe<Array<Maybe<FilterAction>>>;
  active: Scalars['Boolean'];
  conditions?: Maybe<Array<Maybe<FilterCondition>>>;
  name: Scalars['String'];
};

export type FilterAction = {
  __typename?: 'FilterAction';
  discard?: Maybe<Array<Maybe<BasicAction>>>;
  fileInto?: Maybe<Array<Maybe<FileIntoAction>>>;
  flag?: Maybe<Array<Maybe<FlagAction>>>;
  keep?: Maybe<Array<Maybe<BasicAction>>>;
  notify?: Maybe<Array<Maybe<NotifyAction>>>;
  redirect?: Maybe<Array<Maybe<RedirectAction>>>;
  reply?: Maybe<Array<Maybe<ReplyAction>>>;
  stop?: Maybe<Array<Maybe<BasicAction>>>;
  tag?: Maybe<Array<Maybe<TagAction>>>;
};

export type FilterActionInput = {
  discard?: InputMaybe<Array<InputMaybe<BasicActionInput>>>;
  fileInto?: InputMaybe<Array<InputMaybe<FileIntoActionInput>>>;
  flag?: InputMaybe<Array<InputMaybe<FlagActionInput>>>;
  keep?: InputMaybe<Array<InputMaybe<BasicActionInput>>>;
  notify?: InputMaybe<Array<InputMaybe<NotifyActionInput>>>;
  redirect?: InputMaybe<Array<InputMaybe<RedirectActionInput>>>;
  reply?: InputMaybe<Array<InputMaybe<ReplyActionInput>>>;
  stop?: InputMaybe<Array<InputMaybe<BasicActionInput>>>;
  tag?: InputMaybe<Array<InputMaybe<TagActionInput>>>;
};

export type FilterCondition = {
  __typename?: 'FilterCondition';
  address?: Maybe<Array<Maybe<AddressCondition>>>;
  addressBook?: Maybe<Array<Maybe<HeaderCheckCondition>>>;
  allOrAny: FilterMatchCondition;
  attachment?: Maybe<Array<Maybe<BasicCondition>>>;
  body?: Maybe<Array<Maybe<BodyCondition>>>;
  bulk?: Maybe<Array<Maybe<BasicCondition>>>;
  communityConnections?: Maybe<Array<Maybe<BasicCondition>>>;
  communityContent?: Maybe<Array<Maybe<BasicCondition>>>;
  communityRequests?: Maybe<Array<Maybe<BasicCondition>>>;
  contactRanking?: Maybe<Array<Maybe<HeaderCheckCondition>>>;
  conversation?: Maybe<Array<Maybe<ConversationCondition>>>;
  date?: Maybe<Array<Maybe<DateCondition>>>;
  facebook?: Maybe<Array<Maybe<BasicCondition>>>;
  flag?: Maybe<Array<Maybe<FlagCondition>>>;
  header?: Maybe<Array<Maybe<HeaderCondition>>>;
  headerExists?: Maybe<Array<Maybe<HeaderCheckCondition>>>;
  importance?: Maybe<Array<Maybe<ImportanceCondition>>>;
  invite?: Maybe<Array<Maybe<InviteCondition>>>;
  linkedin?: Maybe<Array<Maybe<BasicCondition>>>;
  list?: Maybe<Array<Maybe<BasicCondition>>>;
  me?: Maybe<Array<Maybe<HeaderCheckCondition>>>;
  mimeHeader?: Maybe<Array<Maybe<MimeHeaderCondition>>>;
  size?: Maybe<Array<Maybe<SizeCondition>>>;
  twitter?: Maybe<Array<Maybe<BasicCondition>>>;
};

export type FilterConditionInput = {
  address?: InputMaybe<Array<InputMaybe<AddressConditionInput>>>;
  addressBook?: InputMaybe<Array<InputMaybe<HeaderCheckConditionInput>>>;
  allOrAny: FilterMatchCondition;
  attachment?: InputMaybe<Array<InputMaybe<BasicConditionInput>>>;
  body?: InputMaybe<Array<InputMaybe<BodyConditionInput>>>;
  bulk?: InputMaybe<Array<InputMaybe<BasicConditionInput>>>;
  communityConnections?: InputMaybe<Array<InputMaybe<BasicConditionInput>>>;
  communityContent?: InputMaybe<Array<InputMaybe<BasicConditionInput>>>;
  communityRequests?: InputMaybe<Array<InputMaybe<BasicConditionInput>>>;
  contactRanking?: InputMaybe<Array<InputMaybe<HeaderCheckConditionInput>>>;
  conversation?: InputMaybe<Array<InputMaybe<ConversationConditionInput>>>;
  date?: InputMaybe<Array<InputMaybe<DateConditionInput>>>;
  facebook?: InputMaybe<Array<InputMaybe<BasicConditionInput>>>;
  flag?: InputMaybe<Array<InputMaybe<FlagConditionInput>>>;
  header?: InputMaybe<Array<InputMaybe<HeaderConditionInput>>>;
  headerExists?: InputMaybe<Array<InputMaybe<HeaderCheckConditionInput>>>;
  importance?: InputMaybe<Array<InputMaybe<ImportanceConditionInput>>>;
  invite?: InputMaybe<Array<InputMaybe<InviteConditionInput>>>;
  linkedin?: InputMaybe<Array<InputMaybe<BasicConditionInput>>>;
  list?: InputMaybe<Array<InputMaybe<BasicConditionInput>>>;
  me?: InputMaybe<Array<InputMaybe<HeaderCheckConditionInput>>>;
  mimeHeader?: InputMaybe<Array<InputMaybe<MimeHeaderConditionInput>>>;
  size?: InputMaybe<Array<InputMaybe<SizeConditionInput>>>;
  twitter?: InputMaybe<Array<InputMaybe<BasicConditionInput>>>;
};

export type FilterInput = {
  actions?: InputMaybe<Array<InputMaybe<FilterActionInput>>>;
  active: Scalars['Boolean'];
  conditions?: InputMaybe<Array<InputMaybe<FilterConditionInput>>>;
  name: Scalars['String'];
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
  flagName?: InputMaybe<Scalars['String']>;
  index?: InputMaybe<Scalars['Int']>;
};

export type FlagCondition = {
  __typename?: 'FlagCondition';
  flagName: Scalars['String'];
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type FlagConditionInput = {
  flagName: Scalars['String'];
  index?: InputMaybe<Scalars['Int']>;
  negative?: InputMaybe<Scalars['Boolean']>;
};

export type Folder = {
  __typename?: 'Folder';
  absFolderPath?: Maybe<Scalars['String']>;
  acl?: Maybe<Acl>;
  broken?: Maybe<Scalars['Boolean']>;
  color?: Maybe<Scalars['Int']>;
  deletable?: Maybe<Scalars['Boolean']>;
  droppable?: Maybe<Scalars['Boolean']>;
  flags?: Maybe<Scalars['String']>;
  folders?: Maybe<Array<Maybe<Folder>>>;
  id?: Maybe<Scalars['ID']>;
  linkedFolders?: Maybe<Array<Maybe<Folder>>>;
  local?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  nonFolderItemCount?: Maybe<Scalars['Float']>;
  nonFolderItemCountTotal?: Maybe<Scalars['Float']>;
  oname?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  ownerZimbraId?: Maybe<Scalars['ID']>;
  parentFolderId?: Maybe<Scalars['ID']>;
  permissions?: Maybe<Scalars['String']>;
  query?: Maybe<Scalars['String']>;
  retentionPolicy?: Maybe<Array<Maybe<RetentionPolicy>>>;
  revision?: Maybe<Scalars['Float']>;
  search?: Maybe<Array<Maybe<Folder>>>;
  sharedItemId?: Maybe<Scalars['ID']>;
  types?: Maybe<Scalars['String']>;
  unread?: Maybe<Scalars['Float']>;
  unreadDescendent?: Maybe<Scalars['Boolean']>;
  url?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
  uuid?: Maybe<Scalars['ID']>;
  view?: Maybe<FolderView>;
};

export type FolderActionChangeColorInput = {
  color: Scalars['Int'];
  id: Scalars['ID'];
};

export type FolderActionCheckCalendarInput = {
  id: Scalars['ID'];
  value?: InputMaybe<Scalars['Boolean']>;
};

export type FolderActionInput = {
  color?: InputMaybe<Scalars['Int']>;
  folderId?: InputMaybe<Scalars['ID']>;
  grant?: InputMaybe<Array<InputMaybe<GrantInput>>>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  op: Scalars['String'];
  retentionPolicy?: InputMaybe<Array<InputMaybe<RetentionPolicyInput>>>;
  zimbraId?: InputMaybe<Scalars['ID']>;
};

export type FolderQueryInput = {
  id?: InputMaybe<Scalars['ID']>;
  uuid?: InputMaybe<Scalars['ID']>;
  view?: InputMaybe<FolderView>;
};

export enum FolderView {
  Appointment = 'appointment',
  Chat = 'chat',
  Comment = 'comment',
  Contact = 'contact',
  Conversation = 'conversation',
  Document = 'document',
  Folder = 'folder',
  Message = 'message',
  Note = 'note',
  Remote = 'remote',
  Search = 'search',
  Tag = 'tag',
  Task = 'task',
  Unknown = 'unknown',
  Virtual = 'virtual',
  Wiki = 'wiki'
}

export type ForwardAppointmentInput = {
  exceptId?: InputMaybe<ForwardExceptIdInput>;
  id: Scalars['ID'];
  message: ForwardMessageInput;
};

export type ForwardAppointmentInviteInput = {
  id: Scalars['ID'];
  message: ForwardMessageInput;
};

export type ForwardExceptIdInput = {
  date: Scalars['String'];
  timezone: Scalars['String'];
};

export type ForwardMessageInput = {
  emailAddresses?: InputMaybe<Array<InputMaybe<MailItemEmailAddressInput>>>;
  mimeParts?: InputMaybe<Array<InputMaybe<MimePartInput>>>;
  subject?: InputMaybe<Scalars['String']>;
};

export type FreeBusy = {
  __typename?: 'FreeBusy';
  busy?: Maybe<Array<Maybe<FreeBusyInstance>>>;
  free?: Maybe<Array<Maybe<FreeBusyInstance>>>;
  id: Scalars['String'];
  nodata?: Maybe<Array<Maybe<FreeBusyInstance>>>;
  tentative?: Maybe<Array<Maybe<FreeBusyInstance>>>;
  unavailable?: Maybe<Array<Maybe<FreeBusyInstance>>>;
};

export type FreeBusyInstance = {
  __typename?: 'FreeBusyInstance';
  end?: Maybe<Scalars['Float']>;
  start?: Maybe<Scalars['Float']>;
};

export enum FreeBusyStatus {
  B = 'B',
  F = 'F',
  O = 'O',
  T = 'T'
}

export enum GalSearchType {
  Account = 'account',
  All = 'all',
  Group = 'group',
  Resource = 'resource'
}

export type GetAppointmentResponse = {
  __typename?: 'GetAppointmentResponse';
  appointment?: Maybe<Array<Maybe<AppointmentInfo>>>;
};

export type GetDocumentShareUrlItemInput = {
  folderId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
};

export type GetDocumentShareUrlResponse = {
  __typename?: 'GetDocumentShareURLResponse';
  content?: Maybe<Scalars['String']>;
};

export type GetFolderFolderInput = {
  parentFolderId?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
  uuid?: InputMaybe<Scalars['ID']>;
};

export type GetRightsInput = {
  access?: InputMaybe<Array<InputMaybe<Right>>>;
};

export type GetTrustedDevicesResponse = {
  __typename?: 'GetTrustedDevicesResponse';
  nOtherDevices?: Maybe<Scalars['Int']>;
  thisDeviceTrusted?: Maybe<Scalars['Boolean']>;
};

export type GrantInput = {
  address?: InputMaybe<Scalars['String']>;
  granteeType: GranteeType;
  key?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  permissions: Scalars['String'];
  zimbraId?: InputMaybe<Scalars['ID']>;
};

export type GrantRightsInput = {
  access?: InputMaybe<Array<InputMaybe<AccountAceInfoInput>>>;
};

export type Grantee = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export enum GranteeType {
  All = 'all',
  Cos = 'cos',
  Dom = 'dom',
  Egp = 'egp',
  Grp = 'grp',
  Guest = 'guest',
  Key = 'key',
  Pub = 'pub',
  Usr = 'usr'
}

export type HabGroup = {
  __typename?: 'HabGroup';
  attributes?: Maybe<HabGroupAttrs>;
  habGroups?: Maybe<Array<Maybe<HabGroup>>>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parentHabGroupId?: Maybe<Scalars['ID']>;
  seniorityIndex?: Maybe<Scalars['Int']>;
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
  index?: InputMaybe<Scalars['Int']>;
  negative?: InputMaybe<Scalars['Boolean']>;
};

export type HeaderCondition = {
  __typename?: 'HeaderCondition';
  caseSensitive?: Maybe<Scalars['Boolean']>;
  countComparison?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
  stringComparison?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  valueComparison?: Maybe<Scalars['String']>;
};

export type HeaderConditionInput = {
  caseSensitive?: InputMaybe<Scalars['Boolean']>;
  countComparison?: InputMaybe<Scalars['String']>;
  header?: InputMaybe<Scalars['String']>;
  index?: InputMaybe<Scalars['Int']>;
  negative?: InputMaybe<Scalars['Boolean']>;
  stringComparison?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
  valueComparison?: InputMaybe<Scalars['String']>;
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
  _attrs?: Maybe<IdentityAttrs>;
  defaultSignature?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type IdentityAttrs = {
  __typename?: 'IdentityAttrs';
  zimbraPrefDefaultSignatureId?: Maybe<Scalars['ID']>;
  zimbraPrefForwardReplyFormat?: Maybe<Scalars['String']>;
  zimbraPrefForwardReplySignatureId?: Maybe<Scalars['ID']>;
  zimbraPrefFromAddress?: Maybe<Scalars['String']>;
  zimbraPrefFromAddressType?: Maybe<Scalars['String']>;
  zimbraPrefFromDisplay?: Maybe<Scalars['String']>;
  zimbraPrefIdentityId: Scalars['ID'];
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
  zimbraPrefDefaultSignatureId?: InputMaybe<Scalars['ID']>;
  zimbraPrefForwardReplyFormat?: InputMaybe<Scalars['String']>;
  zimbraPrefForwardReplySignatureId?: InputMaybe<Scalars['ID']>;
  zimbraPrefFromAddress?: InputMaybe<Scalars['String']>;
  zimbraPrefFromAddressType?: InputMaybe<Scalars['String']>;
  zimbraPrefFromDisplay?: InputMaybe<Scalars['String']>;
  zimbraPrefIdentityId?: InputMaybe<Scalars['ID']>;
  zimbraPrefIdentityName?: InputMaybe<Scalars['String']>;
  zimbraPrefMailSignatureStyle?: InputMaybe<Scalars['String']>;
  zimbraPrefReplyToAddress?: InputMaybe<Scalars['String']>;
  zimbraPrefReplyToDisplay?: InputMaybe<Scalars['String']>;
  zimbraPrefReplyToEnabled?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefSentMailFolder?: InputMaybe<Scalars['String']>;
  zimbraPrefWhenInFolderIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  zimbraPrefWhenInFoldersEnabled?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefWhenSentToAddresses?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  zimbraPrefWhenSentToEnabled?: InputMaybe<Scalars['Boolean']>;
};

export type ImportStatus = {
  __typename?: 'ImportStatus';
  error?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isRunning?: Maybe<Scalars['Boolean']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ImportStatusResponse = {
  __typename?: 'ImportStatusResponse';
  imap?: Maybe<Array<Maybe<ImportStatus>>>;
  pop3?: Maybe<Array<Maybe<ImportStatus>>>;
};

export enum Importance {
  High = 'high',
  Low = 'low',
  Normal = 'normal'
}

export type ImportanceCondition = {
  __typename?: 'ImportanceCondition';
  importance: Importance;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type ImportanceConditionInput = {
  importance: Importance;
  index?: InputMaybe<Scalars['Int']>;
  negative?: InputMaybe<Scalars['Boolean']>;
};

export type Instance = {
  __typename?: 'Instance';
  alarm?: Maybe<Scalars['Boolean']>;
  allDay?: Maybe<Scalars['Boolean']>;
  changeDate?: Maybe<Scalars['Float']>;
  class?: Maybe<CalendarItemClass>;
  componentNum?: Maybe<Scalars['Int']>;
  date?: Maybe<Scalars['Float']>;
  dueDate?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  exceptId?: Maybe<Array<Maybe<DtTimeInfo>>>;
  excerpt?: Maybe<Scalars['String']>;
  flags?: Maybe<Scalars['String']>;
  freeBusy?: Maybe<FreeBusyStatus>;
  freeBusyActual?: Maybe<FreeBusyStatus>;
  inviteId?: Maybe<Scalars['ID']>;
  isException?: Maybe<Scalars['Boolean']>;
  isOrganizer?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  modifiedSequence?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  organizer?: Maybe<CalOrganizer>;
  otherAttendees?: Maybe<Scalars['Boolean']>;
  participationStatus?: Maybe<ParticipationStatus>;
  revision?: Maybe<Scalars['Float']>;
  start?: Maybe<Scalars['Float']>;
  status?: Maybe<InviteCompletionStatus>;
  timezoneOffset?: Maybe<Scalars['Int']>;
  tzoDue?: Maybe<Scalars['Int']>;
  utcRecurrenceId?: Maybe<Scalars['String']>;
};

export type InstanceDate = {
  date?: InputMaybe<Scalars['String']>;
};

export type IntervalRule = {
  __typename?: 'IntervalRule';
  intervalCount?: Maybe<Scalars['Int']>;
};

export type Invitation = {
  __typename?: 'Invitation';
  componentNum: Scalars['Int'];
  components: Array<Maybe<InviteComponent>>;
  id: Scalars['Int'];
  mimeParts?: Maybe<MimePart>;
  recurrenceId?: Maybe<Scalars['String']>;
  replies?: Maybe<Array<Maybe<InviteReplies>>>;
  sequenceNumber: Scalars['Float'];
  type: Scalars['String'];
  tz?: Maybe<CalTzInfo>;
};

export enum InviteCompletionStatus {
  Canc = 'CANC',
  Comp = 'COMP',
  Conf = 'CONF',
  Deferred = 'DEFERRED',
  Inpr = 'INPR',
  Need = 'NEED',
  Tent = 'TENT',
  Waiting = 'WAITING'
}

export type InviteComponent = {
  __typename?: 'InviteComponent';
  aid?: Maybe<Scalars['String']>;
  alarms?: Maybe<Array<Maybe<CalendarItemAlarm>>>;
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
  end?: Maybe<Array<Maybe<DtTimeInfo>>>;
  exceptId?: Maybe<Array<Maybe<DtTimeInfo>>>;
  excerpt?: Maybe<Scalars['String']>;
  freeBusy?: Maybe<FreeBusyStatus>;
  freeBusyActual?: Maybe<FreeBusyStatus>;
  htmlDescription?: Maybe<Array<Maybe<StringContent>>>;
  isException?: Maybe<Scalars['Boolean']>;
  isOrganizer?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  method?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  neverSent?: Maybe<Scalars['Boolean']>;
  noBlob?: Maybe<Scalars['Boolean']>;
  organizer?: Maybe<CalOrganizer>;
  percentComplete?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['String']>;
  recurrence?: Maybe<Array<Maybe<RecurrenceInfo>>>;
  rsvp?: Maybe<Scalars['Boolean']>;
  sequence?: Maybe<Scalars['Float']>;
  start?: Maybe<Array<Maybe<DtTimeInfo>>>;
  status?: Maybe<InviteCompletionStatus>;
  uid?: Maybe<Scalars['String']>;
  utcRecurrenceId?: Maybe<Scalars['String']>;
  x_uid?: Maybe<Scalars['String']>;
};

export type InviteCondition = {
  __typename?: 'InviteCondition';
  index?: Maybe<Scalars['Int']>;
  methods?: Maybe<Array<Maybe<Scalars['String']>>>;
  negative?: Maybe<Scalars['Boolean']>;
};

export type InviteConditionInput = {
  index?: InputMaybe<Scalars['Int']>;
  methods?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  negative?: InputMaybe<Scalars['Boolean']>;
};

export type InviteInfo = {
  __typename?: 'InviteInfo';
  components?: Maybe<Array<Maybe<InviteComponent>>>;
  replies?: Maybe<Array<Maybe<InviteReplies>>>;
  type?: Maybe<InviteType>;
};

export type InviteReplies = {
  __typename?: 'InviteReplies';
  reply?: Maybe<Array<Maybe<CalendarItemReply>>>;
};

export type InviteReplyInput = {
  componentNum: Scalars['Int'];
  exceptId?: InputMaybe<InstanceDate>;
  id: Scalars['ID'];
  message?: InputMaybe<CalendarItemMessageInput>;
  updateOrganizer?: InputMaybe<Scalars['Boolean']>;
  verb: InviteReplyVerb;
};

export type InviteReplyResponse = {
  __typename?: 'InviteReplyResponse';
  calendarItemId?: Maybe<Scalars['ID']>;
  inviteId?: Maybe<Scalars['ID']>;
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
  attr?: Maybe<Array<Maybe<LicenseAttrs>>>;
  status: LicenseStatus;
};

export type LicenseAttrs = {
  __typename?: 'LicenseAttrs';
  _content: Scalars['Boolean'];
  name: Scalars['String'];
};

export enum LicenseStatus {
  ActivationGracePeriod = 'ACTIVATION_GRACE_PERIOD',
  Expired = 'EXPIRED',
  Invalid = 'INVALID',
  InFuture = 'IN_FUTURE',
  LicenseGracePeriod = 'LICENSE_GRACE_PERIOD',
  NotActivated = 'NOT_ACTIVATED',
  NotInstalled = 'NOT_INSTALLED',
  Ok = 'OK'
}

export type Locale = {
  __typename?: 'Locale';
  id?: Maybe<Scalars['ID']>;
  localName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type MailItem = {
  changeDate?: Maybe<Scalars['Float']>;
  conversationId?: Maybe<Scalars['ID']>;
  date?: Maybe<Scalars['Float']>;
  emailAddresses?: Maybe<Array<Maybe<EmailAddress>>>;
  excerpt?: Maybe<Scalars['String']>;
  flags?: Maybe<Scalars['String']>;
  folderId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  invitations?: Maybe<Array<Maybe<InviteInfo>>>;
  modifiedSequence?: Maybe<Scalars['Float']>;
  replyType?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Float']>;
  senderDate?: Maybe<Scalars['Float']>;
  share?: Maybe<Array<Maybe<ShareNotification>>>;
  size?: Maybe<Scalars['Float']>;
  sortField?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  tagNames?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
};

export type MailItemEmailAddressInput = {
  address: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
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
  archivedFolder?: Maybe<Scalars['String']>;
  privacyOverlayPrefs_showOverlay?: Maybe<Scalars['Boolean']>;
  privacyOverlayPrefs_timeOut?: Maybe<Scalars['Int']>;
  zimbraPrefContactSourceFolderID?: Maybe<Scalars['String']>;
  zimbraPrefCustomFolderTreeOpen?: Maybe<Scalars['Boolean']>;
  zimbraPrefDateFormat?: Maybe<Scalars['String']>;
  zimbraPrefFolderTreeSash?: Maybe<Scalars['Int']>;
  zimbraPrefFoldersExpanded?: Maybe<Scalars['String']>;
  zimbraPrefGenerateLinkPreviews?: Maybe<Scalars['Boolean']>;
  zimbraPrefGroupByList?: Maybe<Scalars['String']>;
  zimbraPrefMessageListDensity?: Maybe<Scalars['String']>;
  zimbraPrefMultitasking?: Maybe<Scalars['String']>;
  zimbraPrefReadingPaneSashHorizontal?: Maybe<Scalars['Int']>;
  zimbraPrefReadingPaneSashVertical?: Maybe<Scalars['Int']>;
  zimbraPrefSMIMEDefaultSetting?: Maybe<Scalars['String']>;
  zimbraPrefSMIMELastOperation?: Maybe<Scalars['String']>;
  zimbraPrefSharedFolderTreeOpen?: Maybe<Scalars['Boolean']>;
  zimbraPrefSmartFolderTreeOpen?: Maybe<Scalars['Boolean']>;
  zimbraPrefTimeFormat?: Maybe<Scalars['String']>;
  zimbraPrefUndoSendEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefUndoSendTimeout?: Maybe<Scalars['Int']>;
};

export type MailboxMetadataMeta = {
  __typename?: 'MailboxMetadataMeta';
  _attrs: MailboxMetadataAttrs;
  section: Scalars['String'];
};

export type MailboxMetadataSectionAttrsInput = {
  archivedFolder?: InputMaybe<Scalars['String']>;
  privacyOverlayPrefs_showOverlay?: InputMaybe<Scalars['Boolean']>;
  privacyOverlayPrefs_timeOut?: InputMaybe<Scalars['Int']>;
  zimbraPrefContactSourceFolderID?: InputMaybe<Scalars['String']>;
  zimbraPrefCustomFolderTreeOpen?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefDateFormat?: InputMaybe<Scalars['String']>;
  zimbraPrefFolderTreeSash?: InputMaybe<Scalars['Int']>;
  zimbraPrefFoldersExpanded?: InputMaybe<Scalars['String']>;
  zimbraPrefGenerateLinkPreviews?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefGroupByList?: InputMaybe<Scalars['String']>;
  zimbraPrefMessageListDensity?: InputMaybe<Scalars['String']>;
  zimbraPrefMultitasking?: InputMaybe<Scalars['String']>;
  zimbraPrefReadingPaneSashHorizontal?: InputMaybe<Scalars['Int']>;
  zimbraPrefReadingPaneSashVertical?: InputMaybe<Scalars['Int']>;
  zimbraPrefSMIMEDefaultSetting?: InputMaybe<Scalars['String']>;
  zimbraPrefSMIMELastOperation?: InputMaybe<Scalars['String']>;
  zimbraPrefSharedFolderTreeOpen?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefSmartFolderTreeOpen?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefTimeFormat?: InputMaybe<Scalars['String']>;
  zimbraPrefUndoSendEnabled?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefUndoSendTimeout?: InputMaybe<Scalars['Int']>;
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
  attachments?: Maybe<Array<Maybe<MimePart>>>;
  attributes?: Maybe<MessageAttributes>;
  autoSendTime?: Maybe<Scalars['Float']>;
  bcc?: Maybe<Array<Maybe<EmailAddress>>>;
  cc?: Maybe<Array<Maybe<EmailAddress>>>;
  certificate?: Maybe<Array<Maybe<SmimeCert>>>;
  changeDate?: Maybe<Scalars['Float']>;
  conversationId?: Maybe<Scalars['ID']>;
  date?: Maybe<Scalars['Float']>;
  decryptionErrorCode?: Maybe<Scalars['String']>;
  emailAddresses?: Maybe<Array<Maybe<EmailAddress>>>;
  excerpt?: Maybe<Scalars['String']>;
  flags?: Maybe<Scalars['String']>;
  folderId?: Maybe<Scalars['ID']>;
  from?: Maybe<Array<Maybe<EmailAddress>>>;
  html?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  inlineAttachments?: Maybe<Array<Maybe<MimePart>>>;
  invitations?: Maybe<Array<Maybe<InviteInfo>>>;
  isEncrypted?: Maybe<Scalars['Boolean']>;
  isSigned?: Maybe<Scalars['Boolean']>;
  local?: Maybe<Scalars['Boolean']>;
  meta?: Maybe<Array<Maybe<CustomMetadataMeta>>>;
  mimeParts?: Maybe<Array<Maybe<MimePart>>>;
  modifiedSequence?: Maybe<Scalars['Float']>;
  origId?: Maybe<Scalars['ID']>;
  part?: Maybe<Scalars['String']>;
  replyTo?: Maybe<Array<Maybe<EmailAddress>>>;
  replyType?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Float']>;
  sender?: Maybe<Array<Maybe<EmailAddress>>>;
  senderDate?: Maybe<Scalars['Float']>;
  share?: Maybe<Array<Maybe<ShareNotification>>>;
  size?: Maybe<Scalars['Float']>;
  sortField?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  tagNames?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  to?: Maybe<Array<Maybe<EmailAddress>>>;
};

export type MimeHeaderCondition = {
  __typename?: 'MimeHeaderCondition';
  caseSensitive?: Maybe<Scalars['Boolean']>;
  header?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
  stringComparison?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type MimeHeaderConditionInput = {
  caseSensitive?: InputMaybe<Scalars['Boolean']>;
  header?: InputMaybe<Scalars['String']>;
  index?: InputMaybe<Scalars['Int']>;
  negative?: InputMaybe<Scalars['Boolean']>;
  stringComparison?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type MimePart = {
  __typename?: 'MimePart';
  attach?: Maybe<AttachDoc>;
  base64?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['Boolean']>;
  content?: Maybe<Scalars['String']>;
  contentDisposition?: Maybe<Scalars['String']>;
  contentId?: Maybe<Scalars['String']>;
  contentLocation?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  messageId?: Maybe<Scalars['ID']>;
  mimeParts?: Maybe<Array<Maybe<MimePart>>>;
  part?: Maybe<Scalars['ID']>;
  size?: Maybe<Scalars['Float']>;
  truncated?: Maybe<Scalars['Boolean']>;
  url?: Maybe<Scalars['String']>;
};

export type MimePartInput = {
  attach?: InputMaybe<AttachDocInput>;
  attachments?: InputMaybe<Array<InputMaybe<AttachmentInput>>>;
  base64?: InputMaybe<Scalars['String']>;
  body?: InputMaybe<Scalars['Boolean']>;
  content?: InputMaybe<Scalars['String']>;
  contentDisposition?: InputMaybe<Scalars['String']>;
  contentId?: InputMaybe<Scalars['String']>;
  contentType?: InputMaybe<Scalars['String']>;
  filename?: InputMaybe<Scalars['String']>;
  messageId?: InputMaybe<Scalars['ID']>;
  mimeParts?: InputMaybe<Array<InputMaybe<MimePartInput>>>;
  part?: InputMaybe<Scalars['ID']>;
  size?: InputMaybe<Scalars['Float']>;
  truncated?: InputMaybe<Scalars['Boolean']>;
  url?: InputMaybe<Scalars['String']>;
};

export enum Mode {
  Html = 'html',
  Text = 'text'
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
  attributes: ContactAttrsInput;
  folderId?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  memberOps?: InputMaybe<Array<InputMaybe<ContactListOps>>>;
  tagNames?: InputMaybe<Scalars['String']>;
};

export type ModifyIdentityInput = {
  attrs?: InputMaybe<IdentityAttrsInput>;
  id: Scalars['ID'];
};

export type ModifyZimletPrefsResponse = {
  __typename?: 'ModifyZimletPrefsResponse';
  zimlet?: Maybe<Array<Maybe<ZimletPref>>>;
};

export type MsgWithGroupInfo = MailItem & {
  __typename?: 'MsgWithGroupInfo';
  autoSendTime?: Maybe<Scalars['Float']>;
  changeDate?: Maybe<Scalars['Float']>;
  cif?: Maybe<Scalars['String']>;
  conversationId?: Maybe<Scalars['ID']>;
  date?: Maybe<Scalars['Float']>;
  emailAddresses?: Maybe<Array<Maybe<EmailAddress>>>;
  entityId?: Maybe<Scalars['ID']>;
  excerpt?: Maybe<Scalars['String']>;
  flags?: Maybe<Scalars['String']>;
  folderId?: Maybe<Scalars['ID']>;
  forAcct?: Maybe<Scalars['String']>;
  i4uid?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  invitations?: Maybe<Array<Maybe<InviteInfo>>>;
  modifiedSequence?: Maybe<Scalars['Float']>;
  origid?: Maybe<Scalars['String']>;
  replyType?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Float']>;
  senderDate?: Maybe<Scalars['Float']>;
  share?: Maybe<Array<Maybe<ShareNotification>>>;
  size?: Maybe<Scalars['Float']>;
  sortField?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  tagNames?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  accountOnlyRemoteWipeSync?: Maybe<Device>;
  action?: Maybe<Scalars['Boolean']>;
  addExternalAccount?: Maybe<Scalars['ID']>;
  addMessage?: Maybe<MessageInfo>;
  allowDeviceSync?: Maybe<Device>;
  applyFilterRules?: Maybe<Array<Maybe<Scalars['String']>>>;
  blockDeviceSync?: Maybe<Device>;
  cancelPendingAccountOnlyRemoteWipeSync?: Maybe<Device>;
  cancelPendingRemoteWipeSync?: Maybe<Device>;
  cancelTask?: Maybe<Scalars['Boolean']>;
  changeFolderColor?: Maybe<Scalars['Boolean']>;
  changePassword?: Maybe<AuthResponse>;
  checkCalendar?: Maybe<Scalars['Boolean']>;
  contactAction?: Maybe<ActionOpResponse>;
  conversationAction?: Maybe<Scalars['Boolean']>;
  counterAppointment?: Maybe<Scalars['Boolean']>;
  createAppSpecificPassword?: Maybe<CreateAppSpecificPasswordResponse>;
  createAppointment?: Maybe<Scalars['Boolean']>;
  createAppointmentException?: Maybe<Scalars['Boolean']>;
  createCalendar?: Maybe<Folder>;
  createContact?: Maybe<Contact>;
  createContactList?: Maybe<Contact>;
  createFolder?: Maybe<Folder>;
  createIdentity?: Maybe<Identities>;
  createMountpoint?: Maybe<Scalars['Boolean']>;
  createSearchFolder?: Maybe<Folder>;
  createSharedCalendar?: Maybe<Scalars['Boolean']>;
  createSignature?: Maybe<SignatureResponse>;
  createTag?: Maybe<Tag>;
  createTask?: Maybe<Scalars['Boolean']>;
  declineCounterAppointment?: Maybe<Scalars['Boolean']>;
  deleteAppointment?: Maybe<Scalars['Boolean']>;
  deleteExternalAccount?: Maybe<Scalars['Boolean']>;
  deleteIdentity?: Maybe<Scalars['Boolean']>;
  deleteSignature?: Maybe<Scalars['Boolean']>;
  disableTwoFactorAuth?: Maybe<Scalars['Boolean']>;
  dismissCalendarItem?: Maybe<Scalars['Boolean']>;
  documentAction?: Maybe<DocumentActionData>;
  enableTwoFactorAuth?: Maybe<EnableTwoFactorAuthResponse>;
  folderAction?: Maybe<Scalars['Boolean']>;
  forwardAppointment?: Maybe<Scalars['Boolean']>;
  forwardAppointmentInvite?: Maybe<Scalars['Boolean']>;
  generateScratchCodes?: Maybe<ScratchCodes>;
  grantRights?: Maybe<RightsResponse>;
  importExternalAccount?: Maybe<Scalars['Boolean']>;
  itemAction?: Maybe<Scalars['Boolean']>;
  login?: Maybe<AuthResponse>;
  logout?: Maybe<Scalars['Boolean']>;
  messageAction?: Maybe<Scalars['Boolean']>;
  modifyAppointment?: Maybe<ModifyAppointmentResponse>;
  modifyContact?: Maybe<Contact>;
  modifyContactList?: Maybe<Contact>;
  modifyExternalAccount?: Maybe<Scalars['Boolean']>;
  modifyFilterRules?: Maybe<Scalars['Boolean']>;
  modifyIdentity?: Maybe<Scalars['Boolean']>;
  modifyPrefs?: Maybe<Scalars['Boolean']>;
  modifyProfileImage?: Maybe<ProfileImageChangeResponse>;
  modifyProps?: Maybe<Scalars['Boolean']>;
  modifySearchFolder?: Maybe<Scalars['Boolean']>;
  modifySignature?: Maybe<Scalars['Boolean']>;
  modifyTask?: Maybe<Scalars['Boolean']>;
  modifyWhiteBlackList?: Maybe<Scalars['Boolean']>;
  modifyZimletPrefs?: Maybe<ModifyZimletPrefsResponse>;
  moveTask?: Maybe<Scalars['String']>;
  prefEnableOutOfOfficeAlertOnLogin?: Maybe<Scalars['Boolean']>;
  prefEnableOutOfOfficeReply?: Maybe<Scalars['Boolean']>;
  prefOutOfOfficeFromDate?: Maybe<Scalars['String']>;
  prefOutOfOfficeReply?: Maybe<Scalars['String']>;
  prefOutOfOfficeUntilDate?: Maybe<Scalars['String']>;
  purgeRevision?: Maybe<Scalars['Boolean']>;
  quarantineDeviceSync?: Maybe<Device>;
  recoverAccount?: Maybe<RecoverAccount>;
  remoteWipeSync?: Maybe<Device>;
  removeDeviceSync?: Maybe<Scalars['Boolean']>;
  resetPassword?: Maybe<ResetPasswordResponse>;
  revokeAppSpecificPassword?: Maybe<Scalars['Boolean']>;
  revokeOtherTrustedDevices?: Maybe<Scalars['Boolean']>;
  revokeRights?: Maybe<RightsResponse>;
  revokeTrustedDevice?: Maybe<Scalars['Boolean']>;
  saveDocument?: Maybe<SaveDocumentResponse>;
  saveDraft?: Maybe<SaveDraftResponse>;
  saveSMimeCert?: Maybe<SmimeCertInfoResponse>;
  sendDeliveryReport?: Maybe<Scalars['Boolean']>;
  sendInviteReply?: Maybe<InviteReplyResponse>;
  sendMessage?: Maybe<SendMessageResponse>;
  sendShareNotification?: Maybe<Scalars['Boolean']>;
  setCustomMetadata?: Maybe<Scalars['Boolean']>;
  setMailboxMetadata?: Maybe<Scalars['Boolean']>;
  setRecoveryAccount?: Maybe<Scalars['Boolean']>;
  snoozeCalendarItem?: Maybe<Scalars['Boolean']>;
  tagAction?: Maybe<Scalars['Boolean']>;
  testExternalAccount?: Maybe<ExternalAccountTestResponse>;
  uploadMessage?: Maybe<Scalars['String']>;
};


export type MutationAccountOnlyRemoteWipeSyncArgs = {
  deviceId?: InputMaybe<Scalars['String']>;
};


export type MutationActionArgs = {
  color?: InputMaybe<Scalars['Int']>;
  constraints?: InputMaybe<Scalars['String']>;
  destFolderLocal?: InputMaybe<Scalars['Boolean']>;
  flags?: InputMaybe<Scalars['String']>;
  folderId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  isLocal?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  op: Scalars['String'];
  recursive?: InputMaybe<Scalars['Boolean']>;
  rgb?: InputMaybe<Scalars['String']>;
  tagNames?: InputMaybe<Scalars['String']>;
  type: ActionTypeName;
};


export type MutationAddExternalAccountArgs = {
  externalAccount: ExternalAccountAddInput;
};


export type MutationAddMessageArgs = {
  message: AddMsgInput;
};


export type MutationAllowDeviceSyncArgs = {
  deviceId?: InputMaybe<Scalars['String']>;
};


export type MutationApplyFilterRulesArgs = {
  filterRules?: InputMaybe<Array<InputMaybe<FilterRuleInput>>>;
  ids: Scalars['String'];
};


export type MutationBlockDeviceSyncArgs = {
  deviceId?: InputMaybe<Scalars['String']>;
};


export type MutationCancelPendingAccountOnlyRemoteWipeSyncArgs = {
  deviceId?: InputMaybe<Scalars['String']>;
};


export type MutationCancelPendingRemoteWipeSyncArgs = {
  deviceId?: InputMaybe<Scalars['String']>;
};


export type MutationCancelTaskArgs = {
  inviteId: Scalars['ID'];
};


export type MutationChangeFolderColorArgs = {
  color: Scalars['Int'];
  id: Scalars['ID'];
};


export type MutationChangePasswordArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']>;
  loginNewPassword: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCheckCalendarArgs = {
  id: Scalars['ID'];
  value: Scalars['Boolean'];
};


export type MutationContactActionArgs = {
  folderId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  op: Scalars['String'];
  tagNames?: InputMaybe<Scalars['String']>;
};


export type MutationConversationActionArgs = {
  ids: Array<Scalars['ID']>;
  op: Scalars['String'];
};


export type MutationCounterAppointmentArgs = {
  counterAppointmentInvite: CounterAppointmentInput;
};


export type MutationCreateAppSpecificPasswordArgs = {
  appName: Scalars['String'];
};


export type MutationCreateAppointmentArgs = {
  accountName?: InputMaybe<Scalars['String']>;
  appointment: CalendarItemInput;
};


export type MutationCreateAppointmentExceptionArgs = {
  accountName?: InputMaybe<Scalars['String']>;
  appointment: CalendarItemInput;
};


export type MutationCreateCalendarArgs = {
  color: Scalars['Int'];
  name: Scalars['String'];
  parentFolderId?: InputMaybe<Scalars['ID']>;
  url?: InputMaybe<Scalars['String']>;
};


export type MutationCreateContactArgs = {
  contact: CreateContactInput;
};


export type MutationCreateContactListArgs = {
  contact: CreateContactInput;
};


export type MutationCreateFolderArgs = {
  color?: InputMaybe<Scalars['Int']>;
  fetchIfExists?: InputMaybe<Scalars['Boolean']>;
  flags?: InputMaybe<Scalars['String']>;
  isLocalFolder?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  parentFolderId?: InputMaybe<Scalars['ID']>;
  url?: InputMaybe<Scalars['String']>;
  view?: InputMaybe<FolderView>;
};


export type MutationCreateIdentityArgs = {
  attrs?: InputMaybe<IdentityAttrsInput>;
  name: Scalars['String'];
};


export type MutationCreateMountpointArgs = {
  link: NewMountpointSpec;
};


export type MutationCreateSearchFolderArgs = {
  name: Scalars['String'];
  parentFolderId?: InputMaybe<Scalars['ID']>;
  query: Scalars['String'];
  types?: InputMaybe<FolderView>;
};


export type MutationCreateSharedCalendarArgs = {
  link: NewMountpointSpec;
};


export type MutationCreateSignatureArgs = {
  signature: SignatureInput;
};


export type MutationCreateTagArgs = {
  tag?: InputMaybe<CreateTagInput>;
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


export type MutationDeleteExternalAccountArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteIdentityArgs = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteSignatureArgs = {
  signature: NameIdInput;
};


export type MutationDismissCalendarItemArgs = {
  appointment?: InputMaybe<Array<InputMaybe<DismissInput>>>;
  task?: InputMaybe<DismissInput>;
};


export type MutationDocumentActionArgs = {
  action: FolderActionInput;
};


export type MutationEnableTwoFactorAuthArgs = {
  options: EnableTwoFactorAuthInput;
};


export type MutationFolderActionArgs = {
  action: FolderActionInput;
};


export type MutationForwardAppointmentArgs = {
  appointmentInvite: ForwardAppointmentInput;
};


export type MutationForwardAppointmentInviteArgs = {
  appointmentInvite: ForwardAppointmentInviteInput;
};


export type MutationGenerateScratchCodesArgs = {
  username: Scalars['String'];
};


export type MutationGrantRightsArgs = {
  input: GrantRightsInput;
};


export type MutationImportExternalAccountArgs = {
  externalAccount: ExternalAccountImportInput;
};


export type MutationItemActionArgs = {
  folderId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  op: Scalars['String'];
  tagNames?: InputMaybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  csrfTokenSecured: Scalars['Boolean'];
  deviceTrusted?: InputMaybe<Scalars['Boolean']>;
  ignoreSameSite?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
  persistAuthTokenCookie?: InputMaybe<Scalars['Boolean']>;
  recoveryCode?: InputMaybe<Scalars['String']>;
  tokenType?: InputMaybe<Scalars['String']>;
  twoFactorCode?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};


export type MutationMessageActionArgs = {
  ids: Array<Scalars['ID']>;
  op: Scalars['String'];
};


export type MutationModifyAppointmentArgs = {
  accountName?: InputMaybe<Scalars['String']>;
  appointment: CalendarItemInput;
};


export type MutationModifyContactArgs = {
  contact: ModifyContactInput;
};


export type MutationModifyContactListArgs = {
  contact: ModifyContactInput;
};


export type MutationModifyExternalAccountArgs = {
  attrs: ExternalAccountModifyAttrsInput;
  id: Scalars['ID'];
  type?: InputMaybe<AccountType>;
};


export type MutationModifyFilterRulesArgs = {
  filters?: InputMaybe<Array<FilterInput>>;
};


export type MutationModifyIdentityArgs = {
  attrs?: InputMaybe<IdentityAttrsInput>;
  id: Scalars['ID'];
};


export type MutationModifyPrefsArgs = {
  prefs: PreferencesInput;
};


export type MutationModifyProfileImageArgs = {
  content?: InputMaybe<Scalars['String']>;
  contentType?: InputMaybe<Scalars['String']>;
};


export type MutationModifyPropsArgs = {
  props?: InputMaybe<Array<PropertiesInput>>;
};


export type MutationModifySearchFolderArgs = {
  search: SearchFolderInput;
};


export type MutationModifySignatureArgs = {
  signature: SignatureInput;
};


export type MutationModifyTaskArgs = {
  task: CalendarItemInput;
};


export type MutationModifyWhiteBlackListArgs = {
  whiteBlackList: WhiteBlackListInput;
};


export type MutationModifyZimletPrefsArgs = {
  zimlets?: InputMaybe<Array<ZimletPreferenceInput>>;
};


export type MutationMoveTaskArgs = {
  destFolderId: Scalars['ID'];
  inviteId: Scalars['ID'];
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


export type MutationPurgeRevisionArgs = {
  id: Scalars['ID'];
  includeOlderRevisions?: InputMaybe<Scalars['Int']>;
  ver: Scalars['Int'];
};


export type MutationQuarantineDeviceSyncArgs = {
  deviceId?: InputMaybe<Scalars['String']>;
};


export type MutationRecoverAccountArgs = {
  channel: SetRecoveryAccountChannel;
  email: Scalars['String'];
  op: RecoverAccountOp;
};


export type MutationRemoteWipeSyncArgs = {
  deviceId?: InputMaybe<Scalars['String']>;
};


export type MutationRemoveDeviceSyncArgs = {
  deviceId?: InputMaybe<Scalars['String']>;
};


export type MutationResetPasswordArgs = {
  cancelResetPassword?: InputMaybe<Scalars['Boolean']>;
  dryRun?: InputMaybe<Scalars['Boolean']>;
  getPasswordRules?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
};


export type MutationRevokeAppSpecificPasswordArgs = {
  appName: Scalars['String'];
};


export type MutationRevokeRightsArgs = {
  input: RevokeRightsInput;
};


export type MutationSaveDocumentArgs = {
  document?: InputMaybe<SaveDocumentInput>;
};


export type MutationSaveDraftArgs = {
  accountName?: InputMaybe<Scalars['String']>;
  message: SendMessageInput;
};


export type MutationSaveSMimeCertArgs = {
  password?: InputMaybe<Scalars['String']>;
  upload: SaveSMimeCertInputUpload;
};


export type MutationSendDeliveryReportArgs = {
  messageId: Scalars['ID'];
};


export type MutationSendInviteReplyArgs = {
  inviteReply: InviteReplyInput;
};


export type MutationSendMessageArgs = {
  accountName?: InputMaybe<Scalars['String']>;
  encrypt?: InputMaybe<Scalars['Boolean']>;
  message: SendMessageInput;
  sign?: InputMaybe<Scalars['Boolean']>;
};


export type MutationSendShareNotificationArgs = {
  shareNotification: ShareNotificationInput;
};


export type MutationSetCustomMetadataArgs = {
  customMetaData: CustomMetadataInput;
};


export type MutationSetMailboxMetadataArgs = {
  attrs: MailboxMetadataSectionAttrsInput;
  section?: InputMaybe<Scalars['String']>;
};


export type MutationSetRecoveryAccountArgs = {
  channel: SetRecoveryAccountChannel;
  op: SetRecoveryAccountOp;
  recoveryAccount?: InputMaybe<Scalars['String']>;
  recoveryAccountVerificationCode?: InputMaybe<Scalars['String']>;
};


export type MutationSnoozeCalendarItemArgs = {
  appointment?: InputMaybe<Array<InputMaybe<SnoozeInput>>>;
  task?: InputMaybe<SnoozeInput>;
};


export type MutationTagActionArgs = {
  action?: InputMaybe<FolderActionInput>;
};


export type MutationTestExternalAccountArgs = {
  externalAccount: ExternalAccountTestInput;
};


export type MutationUploadMessageArgs = {
  value: Scalars['String'];
};

export type NameId = {
  __typename?: 'NameId';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type NameIdInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export enum NeedIsMemberType {
  All = 'all',
  DirectOnly = 'directOnly',
  None = 'none'
}

export type NewMountpointSpec = {
  color?: InputMaybe<Scalars['Int']>;
  flags?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  owner?: InputMaybe<Scalars['String']>;
  ownerZimbraId?: InputMaybe<Scalars['ID']>;
  parentFolderId?: InputMaybe<Scalars['ID']>;
  reminder?: InputMaybe<Scalars['Boolean']>;
  sharedItemId?: InputMaybe<Scalars['ID']>;
  view?: InputMaybe<SearchType>;
};

export type NoOpResponse = {
  __typename?: 'NoOpResponse';
  waitDisallowed?: Maybe<Scalars['Boolean']>;
};

export type Notes = {
  _content?: InputMaybe<Scalars['String']>;
};

export type NotifyAction = {
  __typename?: 'NotifyAction';
  address?: Maybe<Scalars['String']>;
  content?: Maybe<Array<Maybe<Scalars['String']>>>;
  index?: Maybe<Scalars['Int']>;
  maxBodySize?: Maybe<Scalars['Int']>;
  origHeaders?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
};

export type NotifyActionInput = {
  address?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  index?: InputMaybe<Scalars['Int']>;
  maxBodySize?: InputMaybe<Scalars['Int']>;
  origHeaders?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
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
  key?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type Owner = {
  _content?: InputMaybe<Scalars['String']>;
  by?: InputMaybe<Scalars['String']>;
};

export enum ParticipationRole {
  Cha = 'CHA',
  Non = 'NON',
  Opt = 'OPT',
  Req = 'REQ'
}

export enum ParticipationStatus {
  Ac = 'AC',
  Co = 'CO',
  De = 'DE',
  Df = 'DF',
  Dg = 'DG',
  In = 'IN',
  Ne = 'NE',
  Te = 'TE',
  Wa = 'WA'
}

export enum PasswordRecoveryAddressStatus {
  Pending = 'pending',
  Verified = 'verified'
}

export type Policy = {
  __typename?: 'Policy';
  policy?: Maybe<Array<Maybe<PolicyAttrs>>>;
};

export type PolicyAttrs = {
  __typename?: 'PolicyAttrs';
  lifetime?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type PolicyAttrsInput = {
  lifetime?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type PolicyInput = {
  policy?: InputMaybe<Array<InputMaybe<PolicyAttrsInput>>>;
};

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
  Standard = 'standard',
  Zimbrax = 'zimbrax'
}

export enum PrefDelegatedSendSaveTarget {
  Both = 'both',
  None = 'none',
  Owner = 'owner',
  Sender = 'sender'
}

export enum PrefMailSelectAfterDelete {
  Adaptive = 'adaptive',
  Next = 'next',
  Previous = 'previous'
}

export enum PrefMailSendReadReceipts {
  Always = 'always',
  Never = 'never',
  Prompt = 'prompt'
}

export type Preferences = {
  __typename?: 'Preferences';
  zimbraPrefAppleIcalDelegationEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefAutoAddAppointmentsToCalendar?: Maybe<Scalars['Boolean']>;
  zimbraPrefBriefcaseReadingPaneLocation?: Maybe<ReadingPaneLocation>;
  zimbraPrefCalendarAlwaysShowMiniCal?: Maybe<Scalars['Boolean']>;
  zimbraPrefCalendarApptReminderWarningTime?: Maybe<Scalars['Int']>;
  zimbraPrefCalendarAutoAddInvites?: Maybe<Scalars['Boolean']>;
  zimbraPrefCalendarFirstDayOfWeek?: Maybe<Scalars['Int']>;
  zimbraPrefCalendarInitialView?: Maybe<PrefCalendarInitialView>;
  zimbraPrefCalendarReminderEmail?: Maybe<Scalars['String']>;
  zimbraPrefCalendarShowDeclinedMeetings?: Maybe<Scalars['Boolean']>;
  zimbraPrefCalendarShowPastDueReminders?: Maybe<Scalars['Boolean']>;
  zimbraPrefCalendarToasterEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefCalendarWorkingHours?: Maybe<Scalars['String']>;
  zimbraPrefClientType?: Maybe<PrefClientType>;
  zimbraPrefComposeDirection?: Maybe<Scalars['String']>;
  zimbraPrefComposeFormat?: Maybe<Mode>;
  zimbraPrefDefaultCalendarId?: Maybe<Scalars['ID']>;
  zimbraPrefDelegatedSendSaveTarget?: Maybe<PrefDelegatedSendSaveTarget>;
  zimbraPrefDeleteInviteOnReply?: Maybe<Scalars['Boolean']>;
  zimbraPrefDisplayExternalImages?: Maybe<Scalars['Boolean']>;
  zimbraPrefDisplayTimeInMailList?: Maybe<Scalars['Boolean']>;
  zimbraPrefGroupMailBy?: Maybe<Scalars['String']>;
  zimbraPrefHtmlEditorDefaultFontColor?: Maybe<Scalars['String']>;
  zimbraPrefHtmlEditorDefaultFontFamily?: Maybe<Scalars['String']>;
  zimbraPrefHtmlEditorDefaultFontSize?: Maybe<Scalars['String']>;
  zimbraPrefLocale?: Maybe<Scalars['String']>;
  zimbraPrefMailForwardingAddress?: Maybe<Scalars['String']>;
  zimbraPrefMailLocalDeliveryDisabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefMailPollingInterval?: Maybe<Scalars['String']>;
  zimbraPrefMailRequestReadReceipts?: Maybe<Scalars['Boolean']>;
  zimbraPrefMailSelectAfterDelete?: Maybe<PrefMailSelectAfterDelete>;
  zimbraPrefMailSendReadReceipts?: Maybe<PrefMailSendReadReceipts>;
  zimbraPrefMailToasterEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefMailTrustedSenderList?: Maybe<Array<Maybe<Scalars['String']>>>;
  zimbraPrefMarkMsgRead?: Maybe<Scalars['Int']>;
  zimbraPrefMessageViewHtmlPreferred?: Maybe<Scalars['Boolean']>;
  zimbraPrefOutOfOfficeExternalReply?: Maybe<Scalars['String']>;
  zimbraPrefOutOfOfficeExternalReplyEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefOutOfOfficeFromDate?: Maybe<Scalars['String']>;
  zimbraPrefOutOfOfficeReply?: Maybe<Scalars['String']>;
  zimbraPrefOutOfOfficeReplyEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefOutOfOfficeStatusAlertOnLogin?: Maybe<Scalars['Boolean']>;
  zimbraPrefOutOfOfficeSuppressExternalReply?: Maybe<Scalars['Boolean']>;
  zimbraPrefOutOfOfficeUntilDate?: Maybe<Scalars['String']>;
  zimbraPrefPasswordRecoveryAddress?: Maybe<Scalars['String']>;
  zimbraPrefPasswordRecoveryAddressStatus?: Maybe<PasswordRecoveryAddressStatus>;
  zimbraPrefPowerPasteEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefReadingPaneEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefReadingPaneLocation?: Maybe<ReadingPaneLocation>;
  zimbraPrefSaveToSent?: Maybe<Scalars['Boolean']>;
  zimbraPrefSharedAddrBookAutoCompleteEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefShowAllNewMailNotifications?: Maybe<Scalars['Boolean']>;
  zimbraPrefShowFragments?: Maybe<Scalars['Boolean']>;
  zimbraPrefSlackCalendarReminderEnabled?: Maybe<Scalars['Boolean']>;
  zimbraPrefSortOrder?: Maybe<Scalars['String']>;
  zimbraPrefTagTreeOpen?: Maybe<Scalars['Boolean']>;
  zimbraPrefTimeZoneId?: Maybe<Scalars['String']>;
  zimbraPrefUseTimeZoneListInCalendar?: Maybe<Scalars['Boolean']>;
  zimbraPrefWebClientOfflineBrowserKey?: Maybe<Scalars['String']>;
};

export type PreferencesInput = {
  zimbraPrefAppleIcalDelegationEnabled?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefAutoAddAppointmentsToCalendar?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefBriefcaseReadingPaneLocation?: InputMaybe<ReadingPaneLocation>;
  zimbraPrefCalendarAlwaysShowMiniCal?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefCalendarApptReminderWarningTime?: InputMaybe<Scalars['Int']>;
  zimbraPrefCalendarAutoAddInvites?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefCalendarFirstDayOfWeek?: InputMaybe<Scalars['Int']>;
  zimbraPrefCalendarInitialView?: InputMaybe<PrefCalendarInitialView>;
  zimbraPrefCalendarReminderEmail?: InputMaybe<Scalars['String']>;
  zimbraPrefCalendarShowDeclinedMeetings?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefCalendarShowPastDueReminders?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefCalendarToasterEnabled?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefCalendarWorkingHours?: InputMaybe<Scalars['String']>;
  zimbraPrefClientType?: InputMaybe<PrefClientType>;
  zimbraPrefComposeDirection?: InputMaybe<Scalars['String']>;
  zimbraPrefComposeFormat?: InputMaybe<Mode>;
  zimbraPrefDefaultCalendarId?: InputMaybe<Scalars['ID']>;
  zimbraPrefDelegatedSendSaveTarget?: InputMaybe<PrefDelegatedSendSaveTarget>;
  zimbraPrefDisplayExternalImages?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefDisplayTimeInMailList?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefGroupMailBy?: InputMaybe<Scalars['String']>;
  zimbraPrefHtmlEditorDefaultFontColor?: InputMaybe<Scalars['String']>;
  zimbraPrefHtmlEditorDefaultFontFamily?: InputMaybe<Scalars['String']>;
  zimbraPrefHtmlEditorDefaultFontSize?: InputMaybe<Scalars['String']>;
  zimbraPrefLocale?: InputMaybe<Scalars['String']>;
  zimbraPrefMailForwardingAddress?: InputMaybe<Scalars['String']>;
  zimbraPrefMailLocalDeliveryDisabled?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefMailPollingInterval?: InputMaybe<Scalars['String']>;
  zimbraPrefMailRequestReadReceipts?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefMailSelectAfterDelete?: InputMaybe<PrefMailSelectAfterDelete>;
  zimbraPrefMailSendReadReceipts?: InputMaybe<PrefMailSendReadReceipts>;
  zimbraPrefMailToasterEnabled?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefMailTrustedSenderList?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  zimbraPrefMarkMsgRead?: InputMaybe<Scalars['Int']>;
  zimbraPrefMessageViewHtmlPreferred?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefOutOfOfficeExternalReply?: InputMaybe<Scalars['String']>;
  zimbraPrefOutOfOfficeExternalReplyEnabled?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefOutOfOfficeFromDate?: InputMaybe<Scalars['String']>;
  zimbraPrefOutOfOfficeReply?: InputMaybe<Scalars['String']>;
  zimbraPrefOutOfOfficeReplyEnabled?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefOutOfOfficeStatusAlertOnLogin?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefOutOfOfficeSuppressExternalReply?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefOutOfOfficeUntilDate?: InputMaybe<Scalars['String']>;
  zimbraPrefPowerPasteEnabled?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefReadingPaneEnabled?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefReadingPaneLocation?: InputMaybe<ReadingPaneLocation>;
  zimbraPrefSaveToSent?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefSharedAddrBookAutoCompleteEnabled?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefShowAllNewMailNotifications?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefShowFragments?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefSlackCalendarReminderEnabled?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefSortOrder?: InputMaybe<Scalars['String']>;
  zimbraPrefTagTreeOpen?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefTimeZoneId?: InputMaybe<Scalars['String']>;
  zimbraPrefUseTimeZoneListInCalendar?: InputMaybe<Scalars['Boolean']>;
  zimbraPrefWebClientOfflineBrowserKey?: InputMaybe<Scalars['String']>;
};

export type ProfileImageChangeResponse = {
  __typename?: 'ProfileImageChangeResponse';
  itemId?: Maybe<Scalars['ID']>;
};

export type Prop = {
  __typename?: 'Prop';
  _content?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  zimlet?: Maybe<Scalars['String']>;
};

export type PropList = {
  __typename?: 'PropList';
  prop?: Maybe<Array<Maybe<Prop>>>;
};

export type PropertiesInput = {
  _content?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  zimlet: Scalars['String'];
};

export type PurgetRevisionInput = {
  id: Scalars['ID'];
  includeOlderRevisions?: InputMaybe<Scalars['Int']>;
  ver: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  accountInfo?: Maybe<AccountInfo>;
  autoComplete?: Maybe<AutoCompleteResponse>;
  autoCompleteGAL?: Maybe<AutoCompleteGalResponse>;
  clientInfo?: Maybe<ClientInfoType>;
  discoverRights?: Maybe<DiscoverRights>;
  downloadAttachment?: Maybe<Attachment>;
  downloadDocument?: Maybe<Attachment>;
  downloadMessage?: Maybe<SMimeMessage>;
  freeBusy?: Maybe<Array<Maybe<FreeBusy>>>;
  getAppSpecificPasswords?: Maybe<AppSpecificPasswordsResponse>;
  getAppointment?: Maybe<GetAppointmentResponse>;
  getAppointments?: Maybe<SearchResponse>;
  getAvailableLocales?: Maybe<Array<Maybe<Locale>>>;
  getContact?: Maybe<Array<Maybe<Contact>>>;
  getContactFrequency?: Maybe<ContactFrequencyResponse>;
  getConversation?: Maybe<Conversation>;
  getCustomMetadata?: Maybe<CustomMetadata>;
  getDataSources: DataSources;
  getDeviceStatus?: Maybe<Array<Maybe<Device>>>;
  getDistributionListMembers?: Maybe<Array<Maybe<DlGroupMember>>>;
  getDocumentShareURL?: Maybe<GetDocumentShareUrlResponse>;
  getFilterRules?: Maybe<Array<Maybe<Filter>>>;
  getFolder?: Maybe<Folder>;
  getHAB?: Maybe<HabGroup>;
  getIdentities?: Maybe<Identities>;
  getImportStatus?: Maybe<ImportStatusResponse>;
  getMailboxMetadata?: Maybe<MailboxMetadata>;
  getMessage?: Maybe<MessageInfo>;
  getMessagesMetadata?: Maybe<Array<Maybe<MessageInfo>>>;
  getPreferences?: Maybe<Preferences>;
  getReminders?: Maybe<RemindersResponse>;
  getRights?: Maybe<RightsResponse>;
  getSMimeCertInfo?: Maybe<SmimeCertInfoResponse>;
  getSMimePublicCerts?: Maybe<SMimePublicCertsResponse>;
  getScratchCodes?: Maybe<ScratchCodes>;
  getSearchFolder?: Maybe<Folder>;
  getSignatures?: Maybe<Signatures>;
  getTag?: Maybe<Array<Maybe<Tag>>>;
  getTasks?: Maybe<SearchResponse>;
  getTrustedDevices?: Maybe<GetTrustedDevicesResponse>;
  getWhiteBlackList?: Maybe<WhiteBlackList>;
  getWorkingHours?: Maybe<Array<Maybe<WorkingHours>>>;
  listDocumentRevisions?: Maybe<Document>;
  noop?: Maybe<NoOpResponse>;
  recoverAccount?: Maybe<RecoverAccount>;
  relatedContacts?: Maybe<Array<Maybe<RelatedContact>>>;
  search?: Maybe<SearchResponse>;
  searchCalendarResources?: Maybe<SearchCalendarResourcesResponse>;
  searchGal?: Maybe<SearchResponse>;
  shareInfo?: Maybe<Array<Maybe<ShareInfo>>>;
  taskFolders?: Maybe<Array<Maybe<Folder>>>;
};


export type QueryAutoCompleteArgs = {
  folders?: InputMaybe<Scalars['String']>;
  includeGal?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  needExp?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<GalSearchType>;
};


export type QueryAutoCompleteGalArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  needExp?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<GalSearchType>;
};


export type QueryClientInfoArgs = {
  by?: InputMaybe<Scalars['String']>;
  domain?: InputMaybe<Scalars['String']>;
};


export type QueryDiscoverRightsArgs = {
  right: Array<DiscoverRightInput>;
};


export type QueryDownloadAttachmentArgs = {
  id: Scalars['ID'];
  part: Scalars['ID'];
};


export type QueryDownloadDocumentArgs = {
  id: Scalars['ID'];
  url: Scalars['String'];
};


export type QueryDownloadMessageArgs = {
  id: Scalars['ID'];
  isLocal?: InputMaybe<Scalars['Boolean']>;
  isSecure?: InputMaybe<Scalars['Boolean']>;
};


export type QueryFreeBusyArgs = {
  end?: InputMaybe<Scalars['Float']>;
  names: Array<Scalars['String']>;
  start?: InputMaybe<Scalars['Float']>;
};


export type QueryGetAppointmentArgs = {
  id: Scalars['ID'];
};


export type QueryGetAppointmentsArgs = {
  calExpandInstEnd: Scalars['Float'];
  calExpandInstStart: Scalars['Float'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  query: Scalars['String'];
  types?: InputMaybe<SearchType>;
};


export type QueryGetContactArgs = {
  derefGroupMember?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  memberOf?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGetContactFrequencyArgs = {
  by: Scalars['String'];
  email: Scalars['String'];
  offsetInMinutes?: InputMaybe<Scalars['String']>;
  spec?: InputMaybe<Array<ContactFrequencySpec>>;
};


export type QueryGetConversationArgs = {
  fetch?: InputMaybe<Scalars['String']>;
  header?: InputMaybe<Array<InputMaybe<MailItemHeaderInput>>>;
  html?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  max?: InputMaybe<Scalars['Int']>;
  needExp?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGetCustomMetadataArgs = {
  id: Scalars['ID'];
  section?: InputMaybe<Scalars['String']>;
};


export type QueryGetDistributionListMembersArgs = {
  dl?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetDocumentShareUrlArgs = {
  item?: InputMaybe<GetDocumentShareUrlItemInput>;
};


export type QueryGetFolderArgs = {
  depth?: InputMaybe<Scalars['Int']>;
  folder?: InputMaybe<GetFolderFolderInput>;
  local?: InputMaybe<Scalars['Boolean']>;
  needGranteeName?: InputMaybe<Scalars['Boolean']>;
  traverseMountpoints?: InputMaybe<Scalars['Boolean']>;
  view?: InputMaybe<FolderView>;
  visible?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGetHabArgs = {
  habRootGroupId?: InputMaybe<Scalars['ID']>;
};


export type QueryGetMailboxMetadataArgs = {
  section?: InputMaybe<Scalars['String']>;
};


export type QueryGetMessageArgs = {
  header?: InputMaybe<Array<InputMaybe<MailItemHeaderInput>>>;
  html?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  isLocal?: InputMaybe<Scalars['Boolean']>;
  max?: InputMaybe<Scalars['Int']>;
  needExp?: InputMaybe<Scalars['Boolean']>;
  neuter?: InputMaybe<Scalars['Boolean']>;
  part?: InputMaybe<Scalars['ID']>;
  raw?: InputMaybe<Scalars['Boolean']>;
  read?: InputMaybe<Scalars['Boolean']>;
  ridZ?: InputMaybe<Scalars['String']>;
};


export type QueryGetMessagesMetadataArgs = {
  ids: Array<Scalars['ID']>;
  isLocal?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGetRemindersArgs = {
  calExpandInstEnd: Scalars['Float'];
  calExpandInstStart: Scalars['Float'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  query: Scalars['String'];
  types?: InputMaybe<SearchType>;
};


export type QueryGetRightsArgs = {
  input: GetRightsInput;
};


export type QueryGetSMimeCertInfoArgs = {
  certId?: InputMaybe<Scalars['String']>;
};


export type QueryGetSMimePublicCertsArgs = {
  contactAddr: Scalars['String'];
  store: Scalars['String'];
};


export type QueryGetScratchCodesArgs = {
  username: Scalars['String'];
};


export type QueryGetTasksArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  query: Scalars['String'];
  types?: InputMaybe<SearchType>;
};


export type QueryGetWorkingHoursArgs = {
  end?: InputMaybe<Scalars['Float']>;
  names: Array<Scalars['String']>;
  start?: InputMaybe<Scalars['Float']>;
};


export type QueryListDocumentRevisionsArgs = {
  count: Scalars['Int'];
  id: Scalars['ID'];
  version: Scalars['Int'];
};


export type QueryNoopArgs = {
  limitToOneBlocked?: InputMaybe<Scalars['Int']>;
  wait?: InputMaybe<Scalars['Int']>;
};


export type QueryRecoverAccountArgs = {
  channel: SetRecoveryAccountChannel;
  email: Scalars['String'];
  op: RecoverAccountOp;
};


export type QueryRelatedContactsArgs = {
  email: Scalars['String'];
};


export type QuerySearchArgs = {
  contact?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<Cursor>;
  fetch?: InputMaybe<Scalars['String']>;
  fullConversation?: InputMaybe<Scalars['Boolean']>;
  inDumpster?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  memberOf?: InputMaybe<Scalars['Boolean']>;
  needExp?: InputMaybe<Scalars['Boolean']>;
  offset?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  recip?: InputMaybe<Scalars['Int']>;
  resultMode?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<SortBy>;
  types?: InputMaybe<SearchType>;
};


export type QuerySearchCalendarResourcesArgs = {
  attrs?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  needExp?: InputMaybe<Scalars['Boolean']>;
  offset?: InputMaybe<Scalars['Int']>;
  searchFilter?: InputMaybe<SearchConditionsInput>;
};


export type QuerySearchGalArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  needExp?: InputMaybe<Scalars['Boolean']>;
  needIsMember?: InputMaybe<NeedIsMemberType>;
  needIsOwner?: InputMaybe<Scalars['Boolean']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<GalSearchType>;
};


export type QueryShareInfoArgs = {
  grantee?: InputMaybe<Grantee>;
  includeSelf?: InputMaybe<Scalars['Boolean']>;
  internal?: InputMaybe<Scalars['Boolean']>;
  owner?: InputMaybe<Owner>;
};

export enum ReadingPaneLocation {
  Bottom = 'bottom',
  Off = 'off',
  Right = 'right'
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
  cancel?: Maybe<Array<Maybe<CancelRuleInfo>>>;
  except?: Maybe<Array<Maybe<ExceptionRuleInfo>>>;
  exclude?: Maybe<Array<Maybe<ExcludeRecurrenceInfo>>>;
  rule?: Maybe<Array<Maybe<SimpleRepeatingRule>>>;
};

export type RedirectAction = {
  __typename?: 'RedirectAction';
  address?: Maybe<Scalars['String']>;
  copy?: Maybe<Scalars['Boolean']>;
  index?: Maybe<Scalars['Int']>;
};

export type RedirectActionInput = {
  address?: InputMaybe<Scalars['String']>;
  copy?: InputMaybe<Scalars['Boolean']>;
  index?: InputMaybe<Scalars['Int']>;
};

export type RelatedContact = {
  __typename?: 'RelatedContact';
  email?: Maybe<Scalars['String']>;
  p?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['Int']>;
};

export type ReminderItemHitInfo = {
  __typename?: 'ReminderItemHitInfo';
  aid?: Maybe<Scalars['String']>;
  alarm?: Maybe<Scalars['Boolean']>;
  alarmData?: Maybe<Array<Maybe<Alarm>>>;
  allDay?: Maybe<Scalars['Boolean']>;
  changeDate?: Maybe<Scalars['Float']>;
  class: CalendarItemClass;
  componentNum?: Maybe<Scalars['Int']>;
  date?: Maybe<Scalars['Float']>;
  draft?: Maybe<Scalars['Boolean']>;
  duration?: Maybe<Scalars['Float']>;
  excerpt?: Maybe<Scalars['String']>;
  flags?: Maybe<Scalars['String']>;
  folderId: Scalars['ID'];
  freeBusy?: Maybe<FreeBusyStatus>;
  freeBusyActual?: Maybe<FreeBusyStatus>;
  id: Scalars['ID'];
  instances?: Maybe<Array<Maybe<Instance>>>;
  invitations?: Maybe<Array<Maybe<Invitation>>>;
  inviteId: Scalars['ID'];
  isOrganizer?: Maybe<Scalars['Boolean']>;
  isRecurring?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  modifiedSequence?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  neverSent?: Maybe<Scalars['Boolean']>;
  organizer?: Maybe<CalOrganizer>;
  otherAttendees?: Maybe<Scalars['Boolean']>;
  participationStatus?: Maybe<ParticipationStatus>;
  percentComplete?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  sortField?: Maybe<Scalars['String']>;
  status?: Maybe<InviteCompletionStatus>;
  tagNames?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  timezoneOffset?: Maybe<Scalars['Int']>;
  uid?: Maybe<Scalars['String']>;
  utcRecurrenceId?: Maybe<Scalars['String']>;
  x_uid?: Maybe<Scalars['String']>;
};

export type RemindersResponse = {
  __typename?: 'RemindersResponse';
  appointments?: Maybe<Array<Maybe<ReminderItemHitInfo>>>;
  tasks?: Maybe<Array<Maybe<ReminderItemHitInfo>>>;
};

export type ReplyAction = {
  __typename?: 'ReplyAction';
  content?: Maybe<Array<Maybe<Scalars['String']>>>;
  index?: Maybe<Scalars['Int']>;
};

export type ReplyActionInput = {
  content?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  index?: InputMaybe<Scalars['Int']>;
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
  Disabled = 'disabled',
  Enabled = 'enabled',
  Suspended = 'suspended'
}

export type RetentionPolicy = {
  __typename?: 'RetentionPolicy';
  keep?: Maybe<Array<Maybe<Policy>>>;
  purge?: Maybe<Array<Maybe<Policy>>>;
};

export type RetentionPolicyInput = {
  keep?: InputMaybe<Array<InputMaybe<PolicyInput>>>;
  purge?: InputMaybe<Array<InputMaybe<PolicyInput>>>;
};

export type RevokeRightsInput = {
  access?: InputMaybe<Array<InputMaybe<AccountAceInfoInput>>>;
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
  content?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isSecure?: Maybe<Scalars['Boolean']>;
};

export type SMimePublicCert = {
  __typename?: 'SMimePublicCert';
  _content?: Maybe<Scalars['String']>;
  field: Scalars['String'];
  store: Scalars['String'];
};

export type SMimePublicCerts = {
  __typename?: 'SMimePublicCerts';
  cert?: Maybe<Array<Maybe<SMimePublicCert>>>;
  email?: Maybe<Scalars['String']>;
};

export type SMimePublicCertsResponse = {
  __typename?: 'SMimePublicCertsResponse';
  certs?: Maybe<Array<Maybe<SMimePublicCerts>>>;
};

export type SaveDocument = {
  __typename?: 'SaveDocument';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};

export enum SaveDocumentAction {
  Create = 'create'
}

export type SaveDocumentInput = {
  action?: InputMaybe<SaveDocumentAction>;
  contentType?: InputMaybe<Scalars['String']>;
  descriptionEnabled?: InputMaybe<Scalars['Boolean']>;
  document?: InputMaybe<SaveDocumentInput>;
  folderId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  messageData?: InputMaybe<Array<InputMaybe<MessagePartForDocument>>>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<SaveDocumentType>;
  upload?: InputMaybe<UploadDocument>;
  version?: InputMaybe<Scalars['Float']>;
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
  content: Scalars['String'];
  id: Scalars['ID'];
  meta: Scalars['String'];
};

export type SaveSMimeCertInputUpload = {
  id?: InputMaybe<Scalars['String']>;
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
  paginationSupported?: Maybe<Scalars['Boolean']>;
  sortBy?: Maybe<Scalars['String']>;
};

export type SearchConditionsInput = {
  conds?: InputMaybe<ConditionsInput>;
};

export type SearchFolderInput = {
  id: Scalars['ID'];
  query: Scalars['String'];
  types: FolderView;
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  appointments?: Maybe<Array<Maybe<CalendarItemHitInfo>>>;
  contacts?: Maybe<Array<Maybe<Contact>>>;
  conversations?: Maybe<Array<Maybe<Conversation>>>;
  documents?: Maybe<Array<Maybe<Document>>>;
  hit?: Maybe<Array<Maybe<Hit>>>;
  messages?: Maybe<Array<Maybe<MessageInfo>>>;
  more?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  paginationSupported?: Maybe<Scalars['Boolean']>;
  sortBy?: Maybe<Scalars['String']>;
  tasks?: Maybe<Array<Maybe<CalendarItemHitInfo>>>;
};

export enum SearchType {
  Appointment = 'appointment',
  Contact = 'contact',
  Conversation = 'conversation',
  Document = 'document',
  Message = 'message',
  Task = 'task',
  Wiki = 'wiki'
}

export type Secret = {
  __typename?: 'Secret';
  _content?: Maybe<Scalars['String']>;
};

export type SendMessageInput = {
  attach?: InputMaybe<Array<InputMaybe<AttachmentInput>>>;
  attachmentId?: InputMaybe<Scalars['ID']>;
  attachments?: InputMaybe<Array<InputMaybe<AttachmentInput>>>;
  autoSendTime?: InputMaybe<Scalars['Float']>;
  draftId?: InputMaybe<Scalars['ID']>;
  emailAddresses?: InputMaybe<Array<InputMaybe<MailItemEmailAddressInput>>>;
  entityId?: InputMaybe<Scalars['String']>;
  flags?: InputMaybe<Scalars['String']>;
  folderId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  inReplyTo?: InputMaybe<Scalars['String']>;
  inlineAttachments?: InputMaybe<Array<InputMaybe<MimePartInput>>>;
  mimeParts?: InputMaybe<Array<InputMaybe<MimePartInput>>>;
  origId?: InputMaybe<Scalars['ID']>;
  replyType?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
};

export type SendMessageResponse = {
  __typename?: 'SendMessageResponse';
  message?: Maybe<Array<Maybe<MsgWithGroupInfo>>>;
};

export type Session = {
  __typename?: 'Session';
  _content?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export enum SetRecoveryAccountChannel {
  Email = 'email'
}

export enum SetRecoveryAccountOp {
  ResendCode = 'resendCode',
  Reset = 'reset',
  SendCode = 'sendCode',
  ValidateCode = 'validateCode'
}

export type ShareInfo = {
  __typename?: 'ShareInfo';
  folderId: Scalars['ID'];
  folderPath?: Maybe<Scalars['String']>;
  folderUuid?: Maybe<Scalars['String']>;
  granteeDisplayName?: Maybe<Scalars['String']>;
  granteeId?: Maybe<Scalars['String']>;
  granteeName?: Maybe<Scalars['String']>;
  granteeType?: Maybe<Scalars['String']>;
  mid?: Maybe<Scalars['ID']>;
  ownerEmail?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  ownerName?: Maybe<Scalars['String']>;
  rights?: Maybe<Scalars['String']>;
  view?: Maybe<FolderView>;
};

export enum ShareInputAction {
  Edit = 'edit',
  Expire = 'expire',
  Revoke = 'revoke'
}

export type ShareNotificaitonEmailAddressInput = {
  address: Scalars['String'];
  personalName?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<AddressType>;
};

export type ShareNotification = {
  __typename?: 'ShareNotification';
  content?: Maybe<Scalars['String']>;
  truncated?: Maybe<Scalars['Boolean']>;
};

export type ShareNotificationInput = {
  action?: InputMaybe<ShareInputAction>;
  address: ShareNotificaitonEmailAddressInput;
  item: ShareNotificationItemInput;
  notes?: InputMaybe<Notes>;
};

export type ShareNotificationItemInput = {
  id: Scalars['ID'];
};

export type Signature = {
  __typename?: 'Signature';
  content?: Maybe<Array<Maybe<SignatureContent>>>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type SignatureContent = {
  __typename?: 'SignatureContent';
  _content?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type SignatureContentInput = {
  _content?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type SignatureInput = {
  content?: InputMaybe<Array<InputMaybe<SignatureContentInput>>>;
  contentId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
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
  byday?: Maybe<Array<Maybe<ByDayRule>>>;
  bymonth?: Maybe<Array<Maybe<ByMonthRule>>>;
  bymonthday?: Maybe<Array<Maybe<ByMonthDayRule>>>;
  bysetpos?: Maybe<Array<Maybe<BySetPosRule>>>;
  count?: Maybe<Array<Maybe<CalendarItemRecurrenceEndCount>>>;
  frequency?: Maybe<CalendarItemRecurrenceFrequency>;
  interval?: Maybe<Array<Maybe<IntervalRule>>>;
  until?: Maybe<Array<Maybe<CalendarItemRecurrenceEndDate>>>;
};

export type SizeCondition = {
  __typename?: 'SizeCondition';
  index?: Maybe<Scalars['Int']>;
  negative?: Maybe<Scalars['Boolean']>;
  numberComparison?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
};

export type SizeConditionInput = {
  index?: InputMaybe<Scalars['Int']>;
  negative?: InputMaybe<Scalars['Boolean']>;
  numberComparison?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['String']>;
};

export type Skin = {
  __typename?: 'Skin';
  _content?: Maybe<Scalars['String']>;
};

export type SmimeCert = {
  __typename?: 'SmimeCert';
  default?: Maybe<Scalars['Boolean']>;
  emailAddress?: Maybe<Scalars['String']>;
  errorCode?: Maybe<Scalars['String']>;
  issuedBy?: Maybe<SmimeCertIssuedBy>;
  issuedTo?: Maybe<SmimeCertIssuedTo>;
  privateKeyId?: Maybe<Scalars['String']>;
  publicCertificateId?: Maybe<Scalars['String']>;
  signature?: Maybe<SmimeCertSignature>;
  subjectAltName?: Maybe<SmimeCertSubjectAltName>;
  validity?: Maybe<SmimeCertValidity>;
};

export type SmimeCertInfoResponse = {
  __typename?: 'SmimeCertInfoResponse';
  certificates?: Maybe<Array<Maybe<SmimeCert>>>;
};

export type SmimeCertIssuedBy = {
  __typename?: 'SmimeCertIssuedBy';
  commonName?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  locality?: Maybe<Scalars['String']>;
  organizationName?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type SmimeCertIssuedTo = {
  __typename?: 'SmimeCertIssuedTo';
  commonName?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  organizationName?: Maybe<Scalars['String']>;
  organizationUnit?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type SmimeCertSignature = {
  __typename?: 'SmimeCertSignature';
  algorithm?: Maybe<Scalars['String']>;
  serialNo?: Maybe<Scalars['String']>;
};

export type SmimeCertSubjectAltName = {
  __typename?: 'SmimeCertSubjectAltName';
  rfc822Name?: Maybe<Array<Maybe<SmimeCertSubjectRfc822Name>>>;
};

export type SmimeCertSubjectRfc822Name = {
  __typename?: 'SmimeCertSubjectRfc822Name';
  content?: Maybe<Scalars['String']>;
};

export type SmimeCertValidity = {
  __typename?: 'SmimeCertValidity';
  endDate?: Maybe<Scalars['Float']>;
  startDate?: Maybe<Scalars['Float']>;
};

export type SnoozeInput = {
  id: Scalars['ID'];
  until: Scalars['Float'];
};

export enum SortBy {
  AttachAsc = 'attachAsc',
  AttachDesc = 'attachDesc',
  DateAsc = 'dateAsc',
  DateDesc = 'dateDesc',
  FlagAsc = 'flagAsc',
  FlagDesc = 'flagDesc',
  NameAsc = 'nameAsc',
  NameDesc = 'nameDesc',
  None = 'none',
  PriorityAsc = 'priorityAsc',
  PriorityDesc = 'priorityDesc',
  RcptAsc = 'rcptAsc',
  RcptDesc = 'rcptDesc',
  ReadAsc = 'readAsc',
  ReadDesc = 'readDesc',
  SizeAsc = 'sizeAsc',
  SizeDesc = 'sizeDesc',
  SubjAsc = 'subjAsc',
  SubjDesc = 'subjDesc'
}

export type StringContent = {
  __typename?: 'StringContent';
  _content?: Maybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  color?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  rgb?: Maybe<Scalars['String']>;
  unread?: Maybe<Scalars['Float']>;
};

export type TagAction = {
  __typename?: 'TagAction';
  index?: Maybe<Scalars['Int']>;
  tagName: Scalars['String'];
};

export type TagActionInput = {
  index?: InputMaybe<Scalars['Int']>;
  tagName: Scalars['String'];
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
  hour?: Maybe<Scalars['Int']>;
  mday?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
  mon?: Maybe<Scalars['Int']>;
  sec?: Maybe<Scalars['Int']>;
  week?: Maybe<Scalars['Int']>;
  wkday?: Maybe<Scalars['Int']>;
};

export enum Weekday {
  Fr = 'FR',
  Mo = 'MO',
  Sa = 'SA',
  Su = 'SU',
  Th = 'TH',
  Tu = 'TU',
  We = 'WE'
}

export type WhiteBlackAddress = {
  __typename?: 'WhiteBlackAddress';
  _content: Scalars['String'];
  op?: Maybe<Scalars['String']>;
};

export type WhiteBlackAddressOpts = {
  _content: Scalars['String'];
  op?: InputMaybe<Scalars['String']>;
};

export type WhiteBlackList = {
  __typename?: 'WhiteBlackList';
  blackList: Array<Maybe<WhiteBlackListArr>>;
  whiteList: Array<Maybe<WhiteBlackListArr>>;
};

export type WhiteBlackListArr = {
  __typename?: 'WhiteBlackListArr';
  addr?: Maybe<Array<Maybe<WhiteBlackAddress>>>;
};

export type WhiteBlackListArrInput = {
  addr?: InputMaybe<Array<InputMaybe<WhiteBlackAddressOpts>>>;
};

export type WhiteBlackListInput = {
  blackList?: InputMaybe<WhiteBlackListArrInput>;
  whiteList?: InputMaybe<WhiteBlackListArrInput>;
};

export type WkDay = {
  __typename?: 'WkDay';
  day?: Maybe<Weekday>;
  ordwk?: Maybe<Scalars['Int']>;
};

export type WkDayInput = {
  day: Weekday;
  ordwk?: InputMaybe<Scalars['Int']>;
};

export type WorkingHours = {
  __typename?: 'WorkingHours';
  busy?: Maybe<Array<Maybe<WorkingHoursInstance>>>;
  free?: Maybe<Array<Maybe<WorkingHoursInstance>>>;
  id: Scalars['ID'];
  nodata?: Maybe<Array<Maybe<WorkingHoursInstance>>>;
  tentative?: Maybe<Array<Maybe<WorkingHoursInstance>>>;
  unavailable?: Maybe<Array<Maybe<WorkingHoursInstance>>>;
};

export type WorkingHoursInstance = {
  __typename?: 'WorkingHoursInstance';
  end?: Maybe<Scalars['Float']>;
  start?: Maybe<Scalars['Float']>;
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
  content?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
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
  Disabled = 'disabled',
  Enabled = 'enabled',
  Mandatory = 'mandatory'
}

export type HabRootId = {
  __typename?: 'habRootId';
  _content?: Maybe<Scalars['String']>;
};

export type MessagePartForDocument = {
  attachmentPart: Scalars['String'];
  messageId: Scalars['ID'];
};

export type UploadDocument = {
  id: Scalars['ID'];
};
