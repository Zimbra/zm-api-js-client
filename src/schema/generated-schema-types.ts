export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Acl = {
  __typename?: 'ACL';
  grant?: Maybe<Array<Maybe<AclGrant>>>;
};

export type AclGrant = {
  __typename?: 'ACLGrant';
  address?: Maybe<Scalars['String']['output']>;
  granteeType?: Maybe<GranteeType>;
  key?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  permissions?: Maybe<Scalars['String']['output']>;
  zimbraId?: Maybe<Scalars['ID']['output']>;
};

export type AccountAceInfo = {
  __typename?: 'AccountACEInfo';
  address?: Maybe<Scalars['String']['output']>;
  checkGrantee?: Maybe<Scalars['Boolean']['output']>;
  deny?: Maybe<Scalars['Boolean']['output']>;
  granteeType: GranteeType;
  key?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  right: Scalars['String']['output'];
  zimbraId?: Maybe<Scalars['ID']['output']>;
};

export type AccountAceInfoInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  checkGrantee?: InputMaybe<Scalars['Boolean']['input']>;
  deny?: InputMaybe<Scalars['Boolean']['input']>;
  granteeType: GranteeType;
  key?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  right: Scalars['String']['input'];
  zimbraId?: InputMaybe<Scalars['ID']['input']>;
};

export type AccountCos = {
  __typename?: 'AccountCos';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type AccountInfo = {
  __typename?: 'AccountInfo';
  adminDelegated?: Maybe<Scalars['Boolean']['output']>;
  attrs?: Maybe<AccountInfoAttrs>;
  changePasswordURL?: Maybe<Scalars['String']['output']>;
  cos?: Maybe<AccountCos>;
  habRoots?: Maybe<HabRoots>;
  id: Scalars['ID']['output'];
  license?: Maybe<License>;
  name?: Maybe<Scalars['String']['output']>;
  pasteitcleanedEnabled?: Maybe<Scalars['Boolean']['output']>;
  profileImageId?: Maybe<Scalars['Int']['output']>;
  props?: Maybe<PropList>;
  publicURL?: Maybe<Scalars['String']['output']>;
  rest?: Maybe<Scalars['String']['output']>;
  soapURL?: Maybe<Scalars['String']['output']>;
  used?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
  zimlets?: Maybe<AccountZimlet>;
};

export type AccountInfoAttrs = {
  __typename?: 'AccountInfoAttrs';
  displayName?: Maybe<Scalars['String']['output']>;
  zimbraBlockEmailSendFromImapPop?: Maybe<Scalars['Boolean']['output']>;
  zimbraBrandingFolderName?: Maybe<Scalars['String']['output']>;
  zimbraDomainTrialConvertAtExpiration?: Maybe<Scalars['Boolean']['output']>;
  zimbraDomainTrialExpirationDate?: Maybe<Scalars['String']['output']>;
  zimbraDumpsterEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraExternalSharingEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureAdminMailEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureAdminPreferencesEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureAllowUsernameInPassword?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureAntispamEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureAppSpecificPasswordsEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureBriefcasesEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureCalendarEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureChangePasswordEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureConversationsEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureDiscardInFiltersEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureDistributionListExpandMembersEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureDistributionListFolderEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureDocumentEditingEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureExportFolderEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureFiltersEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureGalAutoCompleteEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureGalEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureGroupCalendarEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureIdentitiesEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureImapDataSourceEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureImportFolderEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureInstantNotify?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureMailEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureMailForwardingEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureMailForwardingInFiltersEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureMailPriorityEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureMailSendLaterEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureManageZimlets?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureMobileSyncEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureOutOfOfficeReplyEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeaturePop3DataSourceEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeaturePowerPasteEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureReadReceiptsEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureRelatedContactsEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureResetPasswordStatus?: Maybe<ResetPasswordStatus>;
  zimbraFeatureRetentionPolicyEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureSharingEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureTaggingEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureTasksEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureTrustedDevicesEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureTwoFactorAuthAvailable?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureTwoFactorAuthRequired?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureViewInHtmlEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureWebClientOfflineAccessEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFeatureZulipChatEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraFileUploadMaxSize?: Maybe<Scalars['Float']['output']>;
  zimbraFileUploadMaxSizePerFile?: Maybe<Scalars['Float']['output']>;
  zimbraHierarchicalAddressBookRoot?: Maybe<Scalars['String']['output']>;
  zimbraIdentityMaxNumEntries?: Maybe<Scalars['Int']['output']>;
  zimbraIsAdminAccount?: Maybe<Scalars['Boolean']['output']>;
  zimbraIsDelegatedAdminAccount?: Maybe<Scalars['Boolean']['output']>;
  zimbraMailAlias?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  zimbraMailAttachmentMaxSize?: Maybe<Scalars['Float']['output']>;
  zimbraMailBlacklistMaxNumEntries?: Maybe<Scalars['Int']['output']>;
  zimbraMailQuota?: Maybe<Scalars['String']['output']>;
  zimbraMailSignatureMaxLength?: Maybe<Scalars['Float']['output']>;
  zimbraMailWhitelistMaxNumEntries?: Maybe<Scalars['Int']['output']>;
  zimbraMtaMaxMessageSize?: Maybe<Scalars['Float']['output']>;
  zimbraPasswordAllowedChars?: Maybe<Scalars['String']['output']>;
  zimbraPasswordAllowedPunctuationChars?: Maybe<Scalars['String']['output']>;
  zimbraPasswordBlockCommonEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraPasswordEnforceHistory?: Maybe<Scalars['Int']['output']>;
  zimbraPasswordMaxAge?: Maybe<Scalars['Int']['output']>;
  zimbraPasswordMaxLength?: Maybe<Scalars['Int']['output']>;
  zimbraPasswordMinAge?: Maybe<Scalars['Int']['output']>;
  zimbraPasswordMinAlphaChars?: Maybe<Scalars['Int']['output']>;
  zimbraPasswordMinDigitsOrPuncs?: Maybe<Scalars['Int']['output']>;
  zimbraPasswordMinLength?: Maybe<Scalars['Int']['output']>;
  zimbraPasswordMinLowerCaseChars?: Maybe<Scalars['Int']['output']>;
  zimbraPasswordMinNumericChars?: Maybe<Scalars['Int']['output']>;
  zimbraPasswordMinPunctuationChars?: Maybe<Scalars['Int']['output']>;
  zimbraPasswordMinUpperCaseChars?: Maybe<Scalars['Int']['output']>;
  zimbraPublicSharingEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraSignupAffiliate?: Maybe<Scalars['String']['output']>;
  zimbraSignupRecoveryEmail?: Maybe<Scalars['String']['output']>;
  zimbraTrialConvertAtExpiration?: Maybe<Scalars['Boolean']['output']>;
  zimbraTrialExpirationDate?: Maybe<Scalars['String']['output']>;
  zimbraTwoFactorAuthEnabled?: Maybe<Scalars['Boolean']['output']>;
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
  name?: Maybe<Scalars['String']['output']>;
  property?: Maybe<Array<Maybe<ZimletConfigProperty>>>;
  version?: Maybe<Scalars['String']['output']>;
};

export type AccountZimletContext = {
  __typename?: 'AccountZimletContext';
  baseUrl?: Maybe<Scalars['String']['output']>;
  presence?: Maybe<ZimletPresence>;
  priority?: Maybe<Scalars['Int']['output']>;
};

export type AccountZimletDesc = {
  __typename?: 'AccountZimletDesc';
  description?: Maybe<Scalars['String']['output']>;
  extension?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
  zimbraXZimletCompatibleSemVer?: Maybe<Scalars['String']['output']>;
};

export type AccountZimletInfo = {
  __typename?: 'AccountZimletInfo';
  zimlet?: Maybe<Array<Maybe<AccountZimletDesc>>>;
  zimletConfig?: Maybe<Array<Maybe<AccountZimletConfigInfo>>>;
  zimletContext?: Maybe<Array<Maybe<AccountZimletContext>>>;
};

export type ActionData = {
  __typename?: 'ActionData';
  address?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  op?: Maybe<Scalars['String']['output']>;
  zimbraId?: Maybe<Scalars['ID']['output']>;
};

export type ActionOpResponse = {
  __typename?: 'ActionOpResponse';
  action?: Maybe<ActionOpResponseData>;
};

export type ActionOpResponseData = {
  __typename?: 'ActionOpResponseData';
  id: Scalars['ID']['output'];
  op: Scalars['String']['output'];
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
  absFolderPath?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  folderId: Scalars['ID']['input'];
  meta?: InputMaybe<Scalars['String']['input']>;
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
  caseSensitive?: Maybe<Scalars['Boolean']['output']>;
  countComparison?: Maybe<Scalars['String']['output']>;
  header: Scalars['String']['output'];
  index?: Maybe<Scalars['Int']['output']>;
  negative?: Maybe<Scalars['Boolean']['output']>;
  part: Scalars['String']['output'];
  stringComparison: Scalars['String']['output'];
  value: Scalars['String']['output'];
  valueComparison?: Maybe<Scalars['String']['output']>;
};

export type AddressConditionInput = {
  caseSensitive?: InputMaybe<Scalars['Boolean']['input']>;
  countComparison?: InputMaybe<Scalars['String']['input']>;
  header: Scalars['String']['input'];
  index?: InputMaybe<Scalars['Int']['input']>;
  negative?: InputMaybe<Scalars['Boolean']['input']>;
  part: Scalars['String']['input'];
  stringComparison: Scalars['String']['input'];
  value: Scalars['String']['input'];
  valueComparison?: InputMaybe<Scalars['String']['input']>;
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
  alarmInstStart?: Maybe<Scalars['Float']['output']>;
  componentNum?: Maybe<Scalars['Int']['output']>;
  inviteId?: Maybe<Scalars['ID']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nextAlarm?: Maybe<Scalars['Float']['output']>;
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
  appName?: Maybe<Scalars['String']['output']>;
  created?: Maybe<Scalars['Float']['output']>;
  lastUsed?: Maybe<Scalars['Float']['output']>;
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
  id: Scalars['ID']['output'];
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
  optional?: Maybe<Scalars['Int']['output']>;
  path?: Maybe<Scalars['String']['output']>;
};

export type AttachDocsInput = {
  optional?: InputMaybe<Scalars['Int']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
};

export type Attachment = {
  __typename?: 'Attachment';
  content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type AttachmentInput = {
  attachmentId?: InputMaybe<Scalars['String']['input']>;
  cd?: InputMaybe<Scalars['String']['input']>;
  ct?: InputMaybe<Scalars['String']['input']>;
  documents?: InputMaybe<Array<InputMaybe<DocumentInput>>>;
  existingAttachments?: InputMaybe<Array<InputMaybe<ExistingAttachmentInput>>>;
  messages?: InputMaybe<Array<InputMaybe<EmlInput>>>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  authToken?: Maybe<Array<Maybe<AuthToken>>>;
  csrfToken?: Maybe<CsrfToken>;
  lifetime?: Maybe<Scalars['Float']['output']>;
  session?: Maybe<Session>;
  skin?: Maybe<Array<Maybe<Skin>>>;
  trustedDevicesEnabled?: Maybe<TrustedDevicesEnabled>;
  twoFactorAuthRequired?: Maybe<TwoFactorAuthRequired>;
};

export type AuthToken = {
  __typename?: 'AuthToken';
  _content?: Maybe<Scalars['String']['output']>;
};

export type AutoCompleteGalResponse = {
  __typename?: 'AutoCompleteGALResponse';
  contacts?: Maybe<Array<Maybe<Contact>>>;
};

export type AutoCompleteMatch = {
  __typename?: 'AutoCompleteMatch';
  company?: Maybe<Scalars['String']['output']>;
  display?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  exp?: Maybe<Scalars['Boolean']['output']>;
  fileas?: Maybe<Scalars['String']['output']>;
  first?: Maybe<Scalars['String']['output']>;
  folderId?: Maybe<Scalars['ID']['output']>;
  full?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isGroup?: Maybe<Scalars['Boolean']['output']>;
  last?: Maybe<Scalars['String']['output']>;
  middle?: Maybe<Scalars['String']['output']>;
  nick?: Maybe<Scalars['String']['output']>;
  ranking?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<AutoCompleteMatchType>;
};

export enum AutoCompleteMatchType {
  Contact = 'contact',
  Gal = 'gal',
  RankingTable = 'rankingTable'
}

export type AutoCompleteResponse = {
  __typename?: 'AutoCompleteResponse';
  canBeCached?: Maybe<Scalars['Boolean']['output']>;
  match?: Maybe<Array<Maybe<AutoCompleteMatch>>>;
};

export type BasicAction = {
  __typename?: 'BasicAction';
  index?: Maybe<Scalars['Int']['output']>;
};

export type BasicActionInput = {
  index?: InputMaybe<Scalars['Int']['input']>;
};

export type BasicCondition = {
  __typename?: 'BasicCondition';
  index?: Maybe<Scalars['Int']['output']>;
  negative?: Maybe<Scalars['Boolean']['output']>;
};

export type BasicConditionInput = {
  index?: InputMaybe<Scalars['Int']['input']>;
  negative?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BodyCondition = {
  __typename?: 'BodyCondition';
  caseSensitive?: Maybe<Scalars['Boolean']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  negative?: Maybe<Scalars['Boolean']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type BodyConditionInput = {
  caseSensitive?: InputMaybe<Scalars['Boolean']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  negative?: InputMaybe<Scalars['Boolean']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type ByDayRule = {
  __typename?: 'ByDayRule';
  wkday?: Maybe<Array<Maybe<WkDay>>>;
};

export type ByMonthDayRule = {
  __typename?: 'ByMonthDayRule';
  dayList?: Maybe<Scalars['String']['output']>;
};

export type ByMonthRule = {
  __typename?: 'ByMonthRule';
  monthList?: Maybe<Scalars['Int']['output']>;
};

export type BySetPosRule = {
  __typename?: 'BySetPosRule';
  poslist?: Maybe<Scalars['Int']['output']>;
};

export type CalOrganizer = {
  __typename?: 'CalOrganizer';
  address?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sentBy?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type CalResource = {
  __typename?: 'CalResource';
  _attrs?: Maybe<CalResourceAttributes>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type CalResourceAttributes = {
  __typename?: 'CalResourceAttributes';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  zimbraCalResBuilding?: Maybe<Scalars['String']['output']>;
  zimbraCalResCapacity?: Maybe<Scalars['String']['output']>;
  zimbraCalResContactEmail?: Maybe<Scalars['String']['output']>;
  zimbraCalResContactName?: Maybe<Scalars['String']['output']>;
  zimbraCalResContactPhone?: Maybe<Scalars['String']['output']>;
  zimbraCalResFloor?: Maybe<Scalars['String']['output']>;
  zimbraCalResLocationDisplayName?: Maybe<Scalars['String']['output']>;
  zimbraCalResRoom?: Maybe<Scalars['String']['output']>;
  zimbraCalResSite?: Maybe<Scalars['String']['output']>;
  zimbraCalResType?: Maybe<Scalars['String']['output']>;
};

export type CalTzInfo = {
  __typename?: 'CalTZInfo';
  daylight?: Maybe<TzOnsetInfo>;
  dayname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  standard?: Maybe<TzOnsetInfo>;
  stdname?: Maybe<Scalars['String']['output']>;
  timezoneDaylightOffset?: Maybe<Scalars['Int']['output']>;
  timezoneStdOffset?: Maybe<Scalars['Int']['output']>;
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
  email: Scalars['String']['output'];
};

export type CalendarItemAlarmAttendeesInput = {
  email: Scalars['String']['input'];
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
  date: Scalars['String']['input'];
};

export type CalendarItemAlarmTriggerInput = {
  absolute?: InputMaybe<CalendarItemAlarmTriggerAbsoluteInput>;
  relative?: InputMaybe<CalendarItemAlarmTriggerRelativeInput>;
};

export type CalendarItemAlarmTriggerRelative = {
  __typename?: 'CalendarItemAlarmTriggerRelative';
  days?: Maybe<Scalars['Int']['output']>;
  hours?: Maybe<Scalars['Int']['output']>;
  minutes?: Maybe<Scalars['Int']['output']>;
  negative?: Maybe<Scalars['Boolean']['output']>;
  relatedTo?: Maybe<AlarmRelatedTo>;
  seconds?: Maybe<Scalars['Int']['output']>;
  weeks?: Maybe<Scalars['Int']['output']>;
};

export type CalendarItemAlarmTriggerRelativeInput = {
  days?: InputMaybe<Scalars['Int']['input']>;
  hours?: InputMaybe<Scalars['Int']['input']>;
  minutes?: InputMaybe<Scalars['Int']['input']>;
  negative?: InputMaybe<Scalars['Boolean']['input']>;
  relatedTo?: InputMaybe<AlarmRelatedTo>;
  seconds?: InputMaybe<Scalars['Int']['input']>;
  weeks?: InputMaybe<Scalars['Int']['input']>;
};

export type CalendarItemAttendee = {
  __typename?: 'CalendarItemAttendee';
  address?: Maybe<Scalars['String']['output']>;
  calendarUserType?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  participationStatus?: Maybe<ParticipationStatus>;
  role?: Maybe<ParticipationRole>;
  rsvp?: Maybe<Scalars['Boolean']['output']>;
};

export type CalendarItemAttendeesInput = {
  address: Scalars['String']['input'];
  calendarUserType?: InputMaybe<Scalars['String']['input']>;
  isGroup?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  participationStatus?: InputMaybe<ParticipationStatus>;
  role?: InputMaybe<ParticipationRole>;
  rsvp?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum CalendarItemClass {
  Con = 'CON',
  Pri = 'PRI',
  Pub = 'PUB'
}

export type CalendarItemDateTimeInput = {
  date: Scalars['String']['input'];
  timezone?: InputMaybe<Scalars['String']['input']>;
};

export type CalendarItemHitInfo = {
  __typename?: 'CalendarItemHitInfo';
  aid?: Maybe<Scalars['String']['output']>;
  alarm?: Maybe<Scalars['Boolean']['output']>;
  alarmData?: Maybe<Array<Maybe<Alarm>>>;
  allDay?: Maybe<Scalars['Boolean']['output']>;
  changeDate?: Maybe<Scalars['Float']['output']>;
  class: CalendarItemClass;
  componentNum?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['Float']['output']>;
  draft?: Maybe<Scalars['Boolean']['output']>;
  duration?: Maybe<Scalars['Float']['output']>;
  excerpt?: Maybe<Scalars['String']['output']>;
  flags?: Maybe<Scalars['String']['output']>;
  folderId: Scalars['ID']['output'];
  freeBusy?: Maybe<FreeBusyStatus>;
  freeBusyActual?: Maybe<FreeBusyStatus>;
  id: Scalars['ID']['output'];
  instances?: Maybe<Array<Maybe<Instance>>>;
  invitations?: Maybe<Array<Maybe<Invitation>>>;
  inviteId: Scalars['ID']['output'];
  isOrganizer?: Maybe<Scalars['Boolean']['output']>;
  isRecurring?: Maybe<Scalars['Boolean']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  modifiedSequence?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  neverSent?: Maybe<Scalars['Boolean']['output']>;
  organizer?: Maybe<CalOrganizer>;
  otherAttendees?: Maybe<Scalars['Boolean']['output']>;
  participationStatus?: Maybe<ParticipationStatus>;
  percentComplete?: Maybe<Scalars['String']['output']>;
  priority?: Maybe<Scalars['String']['output']>;
  revision?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  sortField?: Maybe<Scalars['String']['output']>;
  status?: Maybe<InviteCompletionStatus>;
  tagNames?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['String']['output']>;
  timezoneOffset?: Maybe<Scalars['Int']['output']>;
  uid?: Maybe<Scalars['String']['output']>;
  utcRecurrenceId?: Maybe<Scalars['String']['output']>;
  x_uid?: Maybe<Scalars['String']['output']>;
};

export type CalendarItemInput = {
  componentNum?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  message: CalendarItemMessageInput;
  modifiedSequence?: InputMaybe<Scalars['Float']['input']>;
  revision?: InputMaybe<Scalars['Float']['input']>;
};

export type CalendarItemInviteComponentCounterInput = {
  alarms?: InputMaybe<Array<InputMaybe<CalendarItemAlarmInput>>>;
  allDay?: InputMaybe<Scalars['Boolean']['input']>;
  attendees?: InputMaybe<Array<InputMaybe<CalendarItemAttendeesInput>>>;
  class?: InputMaybe<CalendarItemClass>;
  description?: InputMaybe<Array<InputMaybe<CalendarItemInviteComponentDescriptionInput>>>;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  end: CalendarItemDateTimeInput;
  exceptId?: InputMaybe<CalendarOptionalItemDateTimeInput>;
  freeBusy?: InputMaybe<FreeBusyStatus>;
  location?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  noBlob?: InputMaybe<Scalars['Boolean']['input']>;
  organizer?: InputMaybe<CalendarItemOrganizerInput>;
  percentComplete?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
  recurrence?: InputMaybe<CalendarItemRecurrenceInput>;
  start: CalendarItemDateTimeInput;
  status?: InputMaybe<InviteCompletionStatus>;
  uid?: InputMaybe<Scalars['String']['input']>;
};

export type CalendarItemInviteComponentDescriptionInput = {
  _content?: InputMaybe<Scalars['String']['input']>;
};

export type CalendarItemInviteComponentInput = {
  alarms?: InputMaybe<Array<InputMaybe<CalendarItemAlarmInput>>>;
  allDay?: InputMaybe<Scalars['Boolean']['input']>;
  attendees?: InputMaybe<Array<InputMaybe<CalendarItemAttendeesInput>>>;
  class: CalendarItemClass;
  description?: InputMaybe<Array<InputMaybe<CalendarItemInviteComponentDescriptionInput>>>;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  end?: InputMaybe<CalendarItemDateTimeInput>;
  exceptId?: InputMaybe<CalendarOptionalItemDateTimeInput>;
  freeBusy?: InputMaybe<FreeBusyStatus>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  noBlob?: InputMaybe<Scalars['Boolean']['input']>;
  organizer?: InputMaybe<CalendarItemOrganizerInput>;
  percentComplete?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
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
  folderId?: InputMaybe<Scalars['ID']['input']>;
  invitations?: InputMaybe<CalendarItemInviteInput>;
  mimeParts?: InputMaybe<Array<InputMaybe<MimePartInput>>>;
  replyType?: InputMaybe<InviteReplyType>;
  subject?: InputMaybe<Scalars['String']['input']>;
};

export type CalendarItemOrganizerInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sentBy?: InputMaybe<Scalars['String']['input']>;
};

export type CalendarItemRecurrenceAddInput = {
  rule?: InputMaybe<CalendarItemRecurrenceRuleInput>;
};

export type CalendarItemRecurrenceByDayInput = {
  wkday?: InputMaybe<Array<InputMaybe<WkDayInput>>>;
};

export type CalendarItemRecurrenceByMonthDayInput = {
  dayList: Scalars['String']['input'];
};

export type CalendarItemRecurrenceByMonthInput = {
  monthList: Scalars['Int']['input'];
};

export type CalendarItemRecurrenceBySetPosInput = {
  poslist: Scalars['Int']['input'];
};

export type CalendarItemRecurrenceEndCount = {
  __typename?: 'CalendarItemRecurrenceEndCount';
  number?: Maybe<Scalars['Int']['output']>;
};

export type CalendarItemRecurrenceEndCountInput = {
  number: Scalars['Int']['input'];
};

export type CalendarItemRecurrenceEndDate = {
  __typename?: 'CalendarItemRecurrenceEndDate';
  date?: Maybe<Scalars['String']['output']>;
};

export type CalendarItemRecurrenceEndDateInput = {
  date: Scalars['String']['input'];
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
  intervalCount: Scalars['Int']['input'];
  zimbraPrefAutoAddAppointmentsToCalendar?: InputMaybe<Scalars['Boolean']['input']>;
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
  attendee?: Maybe<Scalars['String']['output']>;
  participationStatus?: Maybe<ParticipationStatus>;
};

export type CalendarOptionalItemDateTimeInput = {
  date?: InputMaybe<Scalars['String']['input']>;
  timezone?: InputMaybe<Scalars['String']['input']>;
};

export type CancelRuleInfo = {
  __typename?: 'CancelRuleInfo';
  rangeType?: Maybe<Scalars['Int']['output']>;
  recurId?: Maybe<Scalars['String']['output']>;
  ridZ?: Maybe<Scalars['String']['output']>;
  tz?: Maybe<Scalars['String']['output']>;
};

export type ClientInfoAttributes = {
  __typename?: 'ClientInfoAttributes';
  zimbraFeatureResetPasswordStatus?: Maybe<ResetPasswordStatus>;
  zimbraHelpModernURL?: Maybe<Scalars['String']['output']>;
  zimbraWebClientLoginURL?: Maybe<Scalars['String']['output']>;
  zimbraWebClientLogoutURL?: Maybe<Scalars['String']['output']>;
  zimbraWebClientSkipLogoff?: Maybe<Scalars['Boolean']['output']>;
};

export type ClientInfoType = {
  __typename?: 'ClientInfoType';
  attributes?: Maybe<ClientInfoAttributes>;
};

export type ConditionInput = {
  attr?: InputMaybe<Scalars['String']['input']>;
  op?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
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
  date?: Maybe<Scalars['Float']['output']>;
  fileAsStr?: Maybe<Scalars['String']['output']>;
  folderId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  memberOf?: Maybe<Scalars['String']['output']>;
  members?: Maybe<Array<Maybe<ContactListMember>>>;
  revision?: Maybe<Scalars['Float']['output']>;
  sortField?: Maybe<Scalars['String']['output']>;
  tagNames?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['String']['output']>;
};

export type ContactAttributes = {
  __typename?: 'ContactAttributes';
  anniversary?: Maybe<Scalars['String']['output']>;
  assistantPhone?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['String']['output']>;
  callbackPhone?: Maybe<Scalars['String']['output']>;
  carPhone?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Scalars['String']['output']>;
  companyPhone?: Maybe<Scalars['String']['output']>;
  companyPhone2?: Maybe<Scalars['String']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  email2?: Maybe<Scalars['String']['output']>;
  fileAs?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  homeCity?: Maybe<Scalars['String']['output']>;
  homeCountry?: Maybe<Scalars['String']['output']>;
  homeEmail?: Maybe<Scalars['String']['output']>;
  homeEmail2?: Maybe<Scalars['String']['output']>;
  homeFax?: Maybe<Scalars['String']['output']>;
  homeFax2?: Maybe<Scalars['String']['output']>;
  homePhone?: Maybe<Scalars['String']['output']>;
  homePhone2?: Maybe<Scalars['String']['output']>;
  homePostalCode?: Maybe<Scalars['String']['output']>;
  homeState?: Maybe<Scalars['String']['output']>;
  homeStreet?: Maybe<Scalars['String']['output']>;
  homeURL?: Maybe<Scalars['String']['output']>;
  imAddress?: Maybe<Scalars['String']['output']>;
  imAddress1?: Maybe<Scalars['String']['output']>;
  imAddress2?: Maybe<Scalars['String']['output']>;
  imAddress3?: Maybe<Scalars['String']['output']>;
  imAddress4?: Maybe<Scalars['String']['output']>;
  imAddress5?: Maybe<Scalars['String']['output']>;
  image?: Maybe<ContactImage>;
  jobTitle?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  maidenName?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
  mobilePhone?: Maybe<Scalars['String']['output']>;
  mobilePhone2?: Maybe<Scalars['String']['output']>;
  namePrefix?: Maybe<Scalars['String']['output']>;
  nameSuffix?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  other?: Maybe<Array<Maybe<OtherContactAttribute>>>;
  otherCity?: Maybe<Scalars['String']['output']>;
  otherCountry?: Maybe<Scalars['String']['output']>;
  otherFax?: Maybe<Scalars['String']['output']>;
  otherPhone?: Maybe<Scalars['String']['output']>;
  otherPhone2?: Maybe<Scalars['String']['output']>;
  otherPostalCode?: Maybe<Scalars['String']['output']>;
  otherState?: Maybe<Scalars['String']['output']>;
  otherStreet?: Maybe<Scalars['String']['output']>;
  otherURL?: Maybe<Scalars['String']['output']>;
  pager?: Maybe<Scalars['String']['output']>;
  pager2?: Maybe<Scalars['String']['output']>;
  phoneticCompany?: Maybe<Scalars['String']['output']>;
  phoneticFirstName?: Maybe<Scalars['String']['output']>;
  phoneticLastName?: Maybe<Scalars['String']['output']>;
  thumbnailPhoto?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  userCertificate?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
  workCity?: Maybe<Scalars['String']['output']>;
  workCountry?: Maybe<Scalars['String']['output']>;
  workEmail?: Maybe<Scalars['String']['output']>;
  workEmail2?: Maybe<Scalars['String']['output']>;
  workFax?: Maybe<Scalars['String']['output']>;
  workFax2?: Maybe<Scalars['String']['output']>;
  workPhone?: Maybe<Scalars['String']['output']>;
  workPhone2?: Maybe<Scalars['String']['output']>;
  workPostalCode?: Maybe<Scalars['String']['output']>;
  workState?: Maybe<Scalars['String']['output']>;
  workStreet?: Maybe<Scalars['String']['output']>;
  workURL?: Maybe<Scalars['String']['output']>;
  zimbraCalResType?: Maybe<Scalars['String']['output']>;
};

export type ContactAttrsInput = {
  anniversary?: InputMaybe<Scalars['String']['input']>;
  assistantPhone?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['String']['input']>;
  callbackPhone?: InputMaybe<Scalars['String']['input']>;
  carPhone?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  companyPhone?: InputMaybe<Scalars['String']['input']>;
  companyPhone2?: InputMaybe<Scalars['String']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  email2?: InputMaybe<Scalars['String']['input']>;
  fileAs?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  homeCity?: InputMaybe<Scalars['String']['input']>;
  homeCountry?: InputMaybe<Scalars['String']['input']>;
  homeEmail?: InputMaybe<Scalars['String']['input']>;
  homeEmail2?: InputMaybe<Scalars['String']['input']>;
  homeFax?: InputMaybe<Scalars['String']['input']>;
  homeFax2?: InputMaybe<Scalars['String']['input']>;
  homePhone?: InputMaybe<Scalars['String']['input']>;
  homePhone2?: InputMaybe<Scalars['String']['input']>;
  homePostalCode?: InputMaybe<Scalars['String']['input']>;
  homeState?: InputMaybe<Scalars['String']['input']>;
  homeStreet?: InputMaybe<Scalars['String']['input']>;
  homeURL?: InputMaybe<Scalars['String']['input']>;
  imAddress?: InputMaybe<Scalars['String']['input']>;
  imAddress1?: InputMaybe<Scalars['String']['input']>;
  imAddress2?: InputMaybe<Scalars['String']['input']>;
  imAddress3?: InputMaybe<Scalars['String']['input']>;
  imAddress4?: InputMaybe<Scalars['String']['input']>;
  imAddress5?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  maidenName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  mobilePhone?: InputMaybe<Scalars['String']['input']>;
  mobilePhone2?: InputMaybe<Scalars['String']['input']>;
  namePrefix?: InputMaybe<Scalars['String']['input']>;
  nameSuffix?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  other?: InputMaybe<Array<InputMaybe<OtherContactAttributeInput>>>;
  otherCity?: InputMaybe<Scalars['String']['input']>;
  otherCountry?: InputMaybe<Scalars['String']['input']>;
  otherFax?: InputMaybe<Scalars['String']['input']>;
  otherPhone?: InputMaybe<Scalars['String']['input']>;
  otherPhone2?: InputMaybe<Scalars['String']['input']>;
  otherPostalCode?: InputMaybe<Scalars['String']['input']>;
  otherState?: InputMaybe<Scalars['String']['input']>;
  otherStreet?: InputMaybe<Scalars['String']['input']>;
  otherURL?: InputMaybe<Scalars['String']['input']>;
  pager?: InputMaybe<Scalars['String']['input']>;
  pager2?: InputMaybe<Scalars['String']['input']>;
  phoneticCompany?: InputMaybe<Scalars['String']['input']>;
  phoneticFirstName?: InputMaybe<Scalars['String']['input']>;
  phoneticLastName?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  userCertificate?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
  workCity?: InputMaybe<Scalars['String']['input']>;
  workCountry?: InputMaybe<Scalars['String']['input']>;
  workEmail?: InputMaybe<Scalars['String']['input']>;
  workEmail2?: InputMaybe<Scalars['String']['input']>;
  workFax?: InputMaybe<Scalars['String']['input']>;
  workFax2?: InputMaybe<Scalars['String']['input']>;
  workPhone?: InputMaybe<Scalars['String']['input']>;
  workPhone2?: InputMaybe<Scalars['String']['input']>;
  workPostalCode?: InputMaybe<Scalars['String']['input']>;
  workState?: InputMaybe<Scalars['String']['input']>;
  workStreet?: InputMaybe<Scalars['String']['input']>;
  workURL?: InputMaybe<Scalars['String']['input']>;
};

export type ContactFrequencyData = {
  __typename?: 'ContactFrequencyData';
  by?: Maybe<Scalars['String']['output']>;
  dataPoint?: Maybe<Array<Maybe<ContactFrequencyDataPoints>>>;
};

export type ContactFrequencyDataPoints = {
  __typename?: 'ContactFrequencyDataPoints';
  label?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

export type ContactFrequencyResponse = {
  __typename?: 'ContactFrequencyResponse';
  data?: Maybe<Array<Maybe<ContactFrequencyData>>>;
};

export type ContactFrequencySpec = {
  interval: Scalars['String']['input'];
  range: Scalars['String']['input'];
};

export type ContactImage = {
  __typename?: 'ContactImage';
  contentType?: Maybe<Scalars['String']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  part?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['String']['output']>;
};

export type ContactListMember = {
  __typename?: 'ContactListMember';
  contacts?: Maybe<Array<Maybe<Contact>>>;
  type: ContactType;
  value: Scalars['ID']['output'];
};

export type ContactListOps = {
  op: Scalars['String']['input'];
  type: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export enum ContactType {
  C = 'C',
  G = 'G',
  I = 'I'
}

export type Conversation = MailItem & {
  __typename?: 'Conversation';
  changeDate?: Maybe<Scalars['Float']['output']>;
  conversationId?: Maybe<Scalars['ID']['output']>;
  date?: Maybe<Scalars['Float']['output']>;
  emailAddresses?: Maybe<Array<Maybe<EmailAddress>>>;
  excerpt?: Maybe<Scalars['String']['output']>;
  flags?: Maybe<Scalars['String']['output']>;
  folderId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  invitations?: Maybe<Array<Maybe<InviteInfo>>>;
  messages?: Maybe<Array<Maybe<MessageInfo>>>;
  messagesMetaData?: Maybe<Array<Maybe<MessageInfo>>>;
  meta?: Maybe<Array<Maybe<CustomMetadataMeta>>>;
  modifiedSequence?: Maybe<Scalars['Float']['output']>;
  numMessages?: Maybe<Scalars['Float']['output']>;
  replyType?: Maybe<Scalars['String']['output']>;
  revision?: Maybe<Scalars['Float']['output']>;
  senderDate?: Maybe<Scalars['Float']['output']>;
  share?: Maybe<Array<Maybe<ShareNotification>>>;
  size?: Maybe<Scalars['Float']['output']>;
  sortField?: Maybe<Scalars['String']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
  tagNames?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['String']['output']>;
  unread?: Maybe<Scalars['Float']['output']>;
};

export type ConversationCondition = {
  __typename?: 'ConversationCondition';
  index?: Maybe<Scalars['Int']['output']>;
  negative?: Maybe<Scalars['Boolean']['output']>;
  where?: Maybe<Scalars['String']['output']>;
};

export type ConversationConditionInput = {
  index?: InputMaybe<Scalars['Int']['input']>;
  negative?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Scalars['String']['input']>;
};

export type CounterAppointmentInput = {
  componentNum?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  message: CounterAppointmentMessageInput;
  modifiedSequence?: InputMaybe<Scalars['Float']['input']>;
  revision?: InputMaybe<Scalars['Float']['input']>;
};

export type CounterAppointmentMessageInput = {
  attachments?: InputMaybe<Array<InputMaybe<AttachmentInput>>>;
  emailAddresses?: InputMaybe<Array<InputMaybe<MailItemEmailAddressInput>>>;
  folderId?: InputMaybe<Scalars['ID']['input']>;
  invitations?: InputMaybe<CalendarCounterAppointmentInput>;
  mimeParts?: InputMaybe<Array<InputMaybe<MimePartInput>>>;
  origId?: InputMaybe<Scalars['ID']['input']>;
  replyType?: InputMaybe<InviteReplyType>;
  subject?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAppSpecificPasswordResponse = {
  __typename?: 'CreateAppSpecificPasswordResponse';
  password?: Maybe<Scalars['String']['output']>;
};

export type CreateContactInput = {
  attributes: ContactAttrsInput;
  folderId?: InputMaybe<Scalars['ID']['input']>;
  tagNames?: InputMaybe<Scalars['String']['input']>;
};

export type CreateIdentityInput = {
  attrs?: InputMaybe<IdentityAttrsInput>;
  name: Scalars['String']['input'];
};

export type CreateMountpointInput = {
  link?: InputMaybe<NewMountpointSpec>;
};

export type CreateTagInput = {
  color?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
};

export type CsrfToken = {
  __typename?: 'CsrfToken';
  _content?: Maybe<Scalars['String']['output']>;
};

export type Cursor = {
  endSortVal?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  includeOffset?: InputMaybe<Scalars['Boolean']['input']>;
  sortVal?: InputMaybe<Scalars['String']['input']>;
};

export type CustomMetadata = {
  __typename?: 'CustomMetadata';
  meta?: Maybe<Array<Maybe<CustomMetadataMeta>>>;
};

export type CustomMetadataAttrs = {
  __typename?: 'CustomMetadataAttrs';
  key?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type CustomMetadataAttrsInput = {
  key?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type CustomMetadataInput = {
  attrs?: InputMaybe<Array<InputMaybe<CustomMetadataAttrsInput>>>;
  id: Scalars['ID']['input'];
  section?: InputMaybe<Scalars['String']['input']>;
};

export type CustomMetadataMeta = {
  __typename?: 'CustomMetadataMeta';
  _attrs?: Maybe<Array<Maybe<CustomMetadataAttrs>>>;
  section?: Maybe<Scalars['String']['output']>;
};

export type Dl = {
  __typename?: 'DL';
  dl?: Maybe<Array<Maybe<DlDetails>>>;
};

export type DlActionAttrInput = {
  attributeName?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
};

export type DlActionGranteeInput = {
  _content?: InputMaybe<Scalars['String']['input']>;
  by?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type DlActionInput = {
  attributes?: InputMaybe<Array<InputMaybe<DlActionAttrInput>>>;
  operation?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Array<InputMaybe<DlActionGranteeInput>>>;
  right?: InputMaybe<DlActionRightInput>;
};

export type DlActionRightInput = {
  grantee?: InputMaybe<Array<InputMaybe<DlActionGranteeInput>>>;
  right?: InputMaybe<Scalars['String']['input']>;
};

export type DlAttributes = {
  __typename?: 'DLAttributes';
  description?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  mail?: Maybe<Scalars['String']['output']>;
  zimbraDistributionListSubscriptionPolicy?: Maybe<Scalars['String']['output']>;
  zimbraDistributionListUnsubscriptionPolicy?: Maybe<Scalars['String']['output']>;
  zimbraHideInGal?: Maybe<Scalars['String']['output']>;
  zimbraMailAlias?: Maybe<Scalars['String']['output']>;
  zimbraMailStatus?: Maybe<Scalars['String']['output']>;
  zimbraNotes?: Maybe<Scalars['String']['output']>;
};

export type DlDetails = {
  __typename?: 'DLDetails';
  _attrs?: Maybe<DlAttributes>;
  dynamic?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isMember?: Maybe<Scalars['Boolean']['output']>;
  isOwner?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owners?: Maybe<Array<Maybe<DlOwners>>>;
  rights?: Maybe<Array<Maybe<DlRights>>>;
};

export type DlGrantee = {
  __typename?: 'DLGrantee';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type DlMembersDetails = {
  __typename?: 'DLMembersDetails';
  dlGroupMember?: Maybe<Array<Maybe<DlGroupMember>>>;
  dlm?: Maybe<Array<Maybe<Dlm>>>;
  more?: Maybe<Scalars['Boolean']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type DlOwner = {
  __typename?: 'DLOwner';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type DlOwners = {
  __typename?: 'DLOwners';
  owner?: Maybe<Array<Maybe<DlOwner>>>;
};

export type DlRight = {
  __typename?: 'DLRight';
  grantee?: Maybe<Array<Maybe<DlGrantee>>>;
  right?: Maybe<Scalars['String']['output']>;
};

export type DlRights = {
  __typename?: 'DLRights';
  right?: Maybe<Array<Maybe<DlRight>>>;
};

export type Dls = {
  __typename?: 'DLS';
  _attrs?: Maybe<DlsAttrs>;
  d?: Maybe<Scalars['String']['output']>;
  dynamic?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isMember?: Maybe<Scalars['Boolean']['output']>;
  isOwner?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ref?: Maybe<Scalars['String']['output']>;
};

export type DlsAttrs = {
  __typename?: 'DLSAttrs';
  zimbraDistributionListSubscriptionPolicy?: Maybe<Scalars['String']['output']>;
  zimbraDistributionListUnsubscriptionPolicy?: Maybe<Scalars['String']['output']>;
  zimbraHideInGal?: Maybe<Scalars['String']['output']>;
};

export type DlsDetails = {
  __typename?: 'DLSDetails';
  dls?: Maybe<Array<Maybe<Dls>>>;
};

export type DlSelectorInput = {
  _content?: InputMaybe<Scalars['String']['input']>;
  by?: InputMaybe<Scalars['String']['input']>;
};

export type DataSource = {
  __typename?: 'DataSource';
  connectionType?: Maybe<Scalars['String']['output']>;
  defaultSignature?: Maybe<Scalars['ID']['output']>;
  emailAddress?: Maybe<Scalars['String']['output']>;
  failingSince?: Maybe<Scalars['String']['output']>;
  forwardReplySignature?: Maybe<Scalars['ID']['output']>;
  fromDisplay?: Maybe<Scalars['String']['output']>;
  host?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  importOnly?: Maybe<Scalars['Boolean']['output']>;
  isEnabled?: Maybe<Scalars['Boolean']['output']>;
  l?: Maybe<Scalars['ID']['output']>;
  lastError?: Maybe<StringContent>;
  leaveOnServer?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pollingInterval?: Maybe<Scalars['Float']['output']>;
  port?: Maybe<Scalars['String']['output']>;
  replyToAddress?: Maybe<Scalars['String']['output']>;
  replyToDisplay?: Maybe<Scalars['String']['output']>;
  smtpPort?: Maybe<Scalars['String']['output']>;
  useAddressForForwardReply?: Maybe<Scalars['Boolean']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type DataSources = {
  __typename?: 'DataSources';
  cal?: Maybe<Array<Maybe<DataSource>>>;
  imap?: Maybe<Array<Maybe<DataSource>>>;
  pop3?: Maybe<Array<Maybe<DataSource>>>;
};

export type DateCondition = {
  __typename?: 'DateCondition';
  date?: Maybe<Scalars['Float']['output']>;
  dateComparison?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  negative?: Maybe<Scalars['Boolean']['output']>;
};

export type DateConditionInput = {
  date?: InputMaybe<Scalars['Float']['input']>;
  dateComparison?: InputMaybe<Scalars['String']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  negative?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DeleteAppointmentInput = {
  componentNum: Scalars['Int']['input'];
  instanceDate?: InputMaybe<InstanceDate>;
  inviteId: Scalars['String']['input'];
  message?: InputMaybe<CalendarItemMessageInput>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type DeleteIdentityInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Device = {
  __typename?: 'Device';
  firstReqReceived?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastPolicyUpdate?: Maybe<Scalars['Int']['output']>;
  lastUpdatedBy?: Maybe<Scalars['String']['output']>;
  lastUsedDate?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  protocol?: Maybe<Scalars['Float']['output']>;
  provisionable?: Maybe<Scalars['Boolean']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  ua?: Maybe<Scalars['String']['output']>;
};

export type DiscoverRightInput = {
  _content?: InputMaybe<Scalars['String']['input']>;
};

export type DiscoverRights = {
  __typename?: 'DiscoverRights';
  targets?: Maybe<Array<Maybe<Targets>>>;
};

export type DismissInput = {
  dismissedAt: Scalars['Float']['input'];
  id: Scalars['ID']['input'];
};

export type DistributionListActionInput = {
  action?: InputMaybe<DlActionInput>;
  dl?: InputMaybe<DlSelectorInput>;
};

export type DlAttrs = {
  __typename?: 'DlAttrs';
  commonName?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
};

export type DlGroupMember = {
  __typename?: 'DlGroupMember';
  attributes?: Maybe<DlAttrs>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Dlm = {
  __typename?: 'Dlm';
  _content?: Maybe<Scalars['String']['output']>;
};

export type Document = {
  __typename?: 'Document';
  acl?: Maybe<Acl>;
  changeDate?: Maybe<Scalars['Float']['output']>;
  contentType?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['Float']['output']>;
  descriptionEnabled?: Maybe<Scalars['Boolean']['output']>;
  docs?: Maybe<Array<Maybe<Document>>>;
  flags?: Maybe<Scalars['String']['output']>;
  folderId?: Maybe<Scalars['ID']['output']>;
  folderUuid?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastEditedAccount?: Maybe<Scalars['String']['output']>;
  lockOwnerId?: Maybe<Scalars['ID']['output']>;
  metadataVersion?: Maybe<Scalars['Float']['output']>;
  modifiedSequence?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  permission?: Maybe<Scalars['String']['output']>;
  revisedCreationDate?: Maybe<Scalars['Float']['output']>;
  revision?: Maybe<Scalars['Float']['output']>;
  revisonCreator?: Maybe<Scalars['String']['output']>;
  sfid?: Maybe<Scalars['ID']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  sortField?: Maybe<Scalars['String']['output']>;
  tagNames?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['ID']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

export type DocumentActionData = {
  __typename?: 'DocumentActionData';
  action?: Maybe<ActionData>;
};

export type DocumentInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  optional?: InputMaybe<Scalars['Int']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
};

export type DtTimeInfo = {
  __typename?: 'DtTimeInfo';
  date?: Maybe<Scalars['String']['output']>;
  timezone?: Maybe<Scalars['String']['output']>;
  utc?: Maybe<Scalars['Float']['output']>;
};

export type EmlInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type EmailAddress = {
  __typename?: 'EmailAddress';
  address?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  isGroup?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type EmailAddressInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
};

export type EnableTwoFactorAuthInput = {
  authToken?: InputMaybe<Scalars['String']['input']>;
  csrfTokenSecured: Scalars['Boolean']['input'];
  ignoreSameSite?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  twoFactorCode?: InputMaybe<Scalars['String']['input']>;
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
  rangeType?: Maybe<Scalars['Int']['output']>;
  recurId?: Maybe<Scalars['String']['output']>;
  ridZ?: Maybe<Scalars['String']['output']>;
  tz?: Maybe<Scalars['String']['output']>;
};

export type ExcludeRecurrenceInfo = {
  __typename?: 'ExcludeRecurrenceInfo';
  except?: Maybe<Array<Maybe<ExceptionRuleInfo>>>;
  exclude?: Maybe<Array<Maybe<ExcludeRecurrenceInfo>>>;
};

export type ExistingAttachmentInput = {
  messageId?: InputMaybe<Scalars['ID']['input']>;
  part?: InputMaybe<Scalars['String']['input']>;
};

export type ExternalAccount = {
  accountType?: InputMaybe<AccountType>;
  connectionType?: InputMaybe<ConnectionType>;
  host: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  isEnabled?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  port: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type ExternalAccountAddInput = {
  accountType?: InputMaybe<AccountType>;
  connectionType?: InputMaybe<ConnectionType>;
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  host: Scalars['String']['input'];
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  l: Scalars['ID']['input'];
  leaveOnServer?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  port: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type ExternalAccountImportInput = {
  accountType?: InputMaybe<AccountType>;
  id: Scalars['ID']['input'];
};

export type ExternalAccountModifyAttrsInput = {
  accountType?: InputMaybe<AccountType>;
  connectionType?: InputMaybe<ConnectionType>;
  defaultSignature?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  forwardReplySignature?: InputMaybe<Scalars['ID']['input']>;
  fromDisplay?: InputMaybe<Scalars['String']['input']>;
  host?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  importOnly?: InputMaybe<Scalars['Boolean']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  l: Scalars['ID']['input'];
  leaveOnServer?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  port?: InputMaybe<Scalars['String']['input']>;
  replyToAddress?: InputMaybe<Scalars['String']['input']>;
  replyToDisplay?: InputMaybe<Scalars['String']['input']>;
  replyToEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  signatureValue?: InputMaybe<Scalars['String']['input']>;
  smtpPort?: InputMaybe<Scalars['String']['input']>;
  storeAndForward?: InputMaybe<Scalars['String']['input']>;
  useAddressForForwardReply?: InputMaybe<Scalars['Boolean']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type ExternalAccountTestInput = {
  accountType?: InputMaybe<AccountType>;
  connectionType?: InputMaybe<ConnectionType>;
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  host: Scalars['String']['input'];
  leaveOnServer?: InputMaybe<Scalars['Boolean']['input']>;
  password: Scalars['String']['input'];
  port: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type ExternalAccountTestResponse = {
  __typename?: 'ExternalAccountTestResponse';
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum ExternalSendersType {
  All = 'ALL',
  Allnotinab = 'ALLNOTINAB',
  Inab = 'INAB',
  Insd = 'INSD'
}

export type FileIntoAction = {
  __typename?: 'FileIntoAction';
  copy?: Maybe<Scalars['Boolean']['output']>;
  folderPath?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
};

export type FileIntoActionInput = {
  copy?: InputMaybe<Scalars['Boolean']['input']>;
  folderPath?: InputMaybe<Scalars['String']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
};

export type Filter = {
  __typename?: 'Filter';
  actions?: Maybe<Array<Maybe<FilterAction>>>;
  active: Scalars['Boolean']['output'];
  conditions?: Maybe<Array<Maybe<FilterCondition>>>;
  name: Scalars['String']['output'];
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
  active: Scalars['Boolean']['input'];
  conditions?: InputMaybe<Array<InputMaybe<FilterConditionInput>>>;
  name: Scalars['String']['input'];
};

export enum FilterMatchCondition {
  Allof = 'allof',
  Anyof = 'anyof'
}

export type FilterRuleInput = {
  name: Scalars['String']['input'];
};

export type FlagAction = {
  __typename?: 'FlagAction';
  flagName?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
};

export type FlagActionInput = {
  flagName?: InputMaybe<Scalars['String']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
};

export type FlagCondition = {
  __typename?: 'FlagCondition';
  flagName: Scalars['String']['output'];
  index?: Maybe<Scalars['Int']['output']>;
  negative?: Maybe<Scalars['Boolean']['output']>;
};

export type FlagConditionInput = {
  flagName: Scalars['String']['input'];
  index?: InputMaybe<Scalars['Int']['input']>;
  negative?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Folder = {
  __typename?: 'Folder';
  absFolderPath?: Maybe<Scalars['String']['output']>;
  acl?: Maybe<Acl>;
  broken?: Maybe<Scalars['Boolean']['output']>;
  color?: Maybe<Scalars['Int']['output']>;
  deletable?: Maybe<Scalars['Boolean']['output']>;
  droppable?: Maybe<Scalars['Boolean']['output']>;
  flags?: Maybe<Scalars['String']['output']>;
  folders?: Maybe<Array<Maybe<Folder>>>;
  id?: Maybe<Scalars['ID']['output']>;
  linkedFolders?: Maybe<Array<Maybe<Folder>>>;
  local?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nonFolderItemCount?: Maybe<Scalars['Float']['output']>;
  nonFolderItemCountTotal?: Maybe<Scalars['Float']['output']>;
  oname?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<Scalars['String']['output']>;
  ownerZimbraId?: Maybe<Scalars['ID']['output']>;
  parentFolderId?: Maybe<Scalars['ID']['output']>;
  permissions?: Maybe<Scalars['String']['output']>;
  query?: Maybe<Scalars['String']['output']>;
  retentionPolicy?: Maybe<Array<Maybe<RetentionPolicy>>>;
  revision?: Maybe<Scalars['Float']['output']>;
  search?: Maybe<Array<Maybe<Folder>>>;
  sharedItemId?: Maybe<Scalars['ID']['output']>;
  types?: Maybe<Scalars['String']['output']>;
  unread?: Maybe<Scalars['Float']['output']>;
  unreadDescendent?: Maybe<Scalars['Boolean']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['ID']['output']>;
  uuid?: Maybe<Scalars['ID']['output']>;
  view?: Maybe<FolderView>;
};

export type FolderActionChangeColorInput = {
  color: Scalars['Int']['input'];
  id: Scalars['ID']['input'];
};

export type FolderActionCheckCalendarInput = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FolderActionInput = {
  color?: InputMaybe<Scalars['Int']['input']>;
  folderId?: InputMaybe<Scalars['ID']['input']>;
  grant?: InputMaybe<Array<InputMaybe<GrantInput>>>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  op: Scalars['String']['input'];
  retentionPolicy?: InputMaybe<Array<InputMaybe<RetentionPolicyInput>>>;
  zimbraId?: InputMaybe<Scalars['ID']['input']>;
};

export type FolderQueryInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  uuid?: InputMaybe<Scalars['ID']['input']>;
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
  id: Scalars['ID']['input'];
  message: ForwardMessageInput;
};

export type ForwardAppointmentInviteInput = {
  id: Scalars['ID']['input'];
  message: ForwardMessageInput;
};

export type ForwardExceptIdInput = {
  date: Scalars['String']['input'];
  timezone: Scalars['String']['input'];
};

export type ForwardMessageInput = {
  emailAddresses?: InputMaybe<Array<InputMaybe<MailItemEmailAddressInput>>>;
  mimeParts?: InputMaybe<Array<InputMaybe<MimePartInput>>>;
  subject?: InputMaybe<Scalars['String']['input']>;
};

export type FreeBusy = {
  __typename?: 'FreeBusy';
  busy?: Maybe<Array<Maybe<FreeBusyInstance>>>;
  free?: Maybe<Array<Maybe<FreeBusyInstance>>>;
  id: Scalars['String']['output'];
  nodata?: Maybe<Array<Maybe<FreeBusyInstance>>>;
  tentative?: Maybe<Array<Maybe<FreeBusyInstance>>>;
  unavailable?: Maybe<Array<Maybe<FreeBusyInstance>>>;
};

export type FreeBusyInstance = {
  __typename?: 'FreeBusyInstance';
  end?: Maybe<Scalars['Float']['output']>;
  start?: Maybe<Scalars['Float']['output']>;
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
  folderId?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
};

export type GetDocumentShareUrlResponse = {
  __typename?: 'GetDocumentShareURLResponse';
  content?: Maybe<Scalars['String']['output']>;
};

export type GetFolderFolderInput = {
  parentFolderId?: InputMaybe<Scalars['ID']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['ID']['input']>;
};

export type GetRightsInput = {
  access?: InputMaybe<Array<InputMaybe<Right>>>;
};

export type GetTrustedDevicesResponse = {
  __typename?: 'GetTrustedDevicesResponse';
  nOtherDevices?: Maybe<Scalars['Int']['output']>;
  thisDeviceTrusted?: Maybe<Scalars['Boolean']['output']>;
};

export type GrantInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  granteeType: GranteeType;
  key?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  permissions: Scalars['String']['input'];
  zimbraId?: InputMaybe<Scalars['ID']['input']>;
};

export type GrantRightsInput = {
  access?: InputMaybe<Array<InputMaybe<AccountAceInfoInput>>>;
};

export type Grantee = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
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
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentHabGroupId?: Maybe<Scalars['ID']['output']>;
  seniorityIndex?: Maybe<Scalars['Int']['output']>;
};

export type HabGroupAttrs = {
  __typename?: 'HabGroupAttrs';
  cn?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  mail?: Maybe<Scalars['String']['output']>;
  uid?: Maybe<Scalars['String']['output']>;
  zimbraCreateTimestamp?: Maybe<Scalars['String']['output']>;
  zimbraHABSeniorityIndex?: Maybe<Scalars['String']['output']>;
  zimbraId?: Maybe<Scalars['ID']['output']>;
  zimbraMailAlias?: Maybe<Scalars['String']['output']>;
  zimbraMailHost?: Maybe<Scalars['String']['output']>;
  zimbraMailStatus?: Maybe<Scalars['String']['output']>;
};

export type HabRoots = {
  __typename?: 'HabRoots';
  hab?: Maybe<Array<Maybe<HabRootId>>>;
};

export type HeaderCheckCondition = {
  __typename?: 'HeaderCheckCondition';
  header: Scalars['String']['output'];
  index?: Maybe<Scalars['Int']['output']>;
  negative?: Maybe<Scalars['Boolean']['output']>;
};

export type HeaderCheckConditionInput = {
  header: Scalars['String']['input'];
  index?: InputMaybe<Scalars['Int']['input']>;
  negative?: InputMaybe<Scalars['Boolean']['input']>;
};

export type HeaderCondition = {
  __typename?: 'HeaderCondition';
  caseSensitive?: Maybe<Scalars['Boolean']['output']>;
  countComparison?: Maybe<Scalars['String']['output']>;
  header?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  negative?: Maybe<Scalars['Boolean']['output']>;
  stringComparison?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
  valueComparison?: Maybe<Scalars['String']['output']>;
};

export type HeaderConditionInput = {
  caseSensitive?: InputMaybe<Scalars['Boolean']['input']>;
  countComparison?: InputMaybe<Scalars['String']['input']>;
  header?: InputMaybe<Scalars['String']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  negative?: InputMaybe<Scalars['Boolean']['input']>;
  stringComparison?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
  valueComparison?: InputMaybe<Scalars['String']['input']>;
};

export type Hit = {
  __typename?: 'Hit';
  id?: Maybe<Scalars['String']['output']>;
  sortField?: Maybe<Scalars['String']['output']>;
};

export type Identities = {
  __typename?: 'Identities';
  identity?: Maybe<Array<Maybe<Identity>>>;
};

export type Identity = {
  __typename?: 'Identity';
  _attrs?: Maybe<IdentityAttrs>;
  defaultSignature?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type IdentityAttrs = {
  __typename?: 'IdentityAttrs';
  zimbraPrefDefaultSignatureId?: Maybe<Scalars['ID']['output']>;
  zimbraPrefForwardReplyFormat?: Maybe<Scalars['String']['output']>;
  zimbraPrefForwardReplySignatureId?: Maybe<Scalars['ID']['output']>;
  zimbraPrefFromAddress?: Maybe<Scalars['String']['output']>;
  zimbraPrefFromAddressType?: Maybe<Scalars['String']['output']>;
  zimbraPrefFromDisplay?: Maybe<Scalars['String']['output']>;
  zimbraPrefIdentityId: Scalars['ID']['output'];
  zimbraPrefIdentityName?: Maybe<Scalars['String']['output']>;
  zimbraPrefMailSignatureStyle?: Maybe<Scalars['String']['output']>;
  zimbraPrefReplyToAddress?: Maybe<Scalars['String']['output']>;
  zimbraPrefReplyToDisplay?: Maybe<Scalars['String']['output']>;
  zimbraPrefReplyToEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefSentMailFolder?: Maybe<Scalars['String']['output']>;
  zimbraPrefWhenInFolderIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  zimbraPrefWhenInFoldersEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefWhenSentToAddresses?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  zimbraPrefWhenSentToEnabled?: Maybe<Scalars['Boolean']['output']>;
};

export type IdentityAttrsInput = {
  zimbraPrefDefaultSignatureId?: InputMaybe<Scalars['ID']['input']>;
  zimbraPrefForwardReplyFormat?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefForwardReplySignatureId?: InputMaybe<Scalars['ID']['input']>;
  zimbraPrefFromAddress?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefFromAddressType?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefFromDisplay?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefIdentityId?: InputMaybe<Scalars['ID']['input']>;
  zimbraPrefIdentityName?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefMailSignatureStyle?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefReplyToAddress?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefReplyToDisplay?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefReplyToEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefSentMailFolder?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefWhenInFolderIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  zimbraPrefWhenInFoldersEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefWhenSentToAddresses?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  zimbraPrefWhenSentToEnabled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ImportStatus = {
  __typename?: 'ImportStatus';
  error?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isRunning?: Maybe<Scalars['Boolean']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
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
  index?: Maybe<Scalars['Int']['output']>;
  negative?: Maybe<Scalars['Boolean']['output']>;
};

export type ImportanceConditionInput = {
  importance: Importance;
  index?: InputMaybe<Scalars['Int']['input']>;
  negative?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Instance = {
  __typename?: 'Instance';
  alarm?: Maybe<Scalars['Boolean']['output']>;
  allDay?: Maybe<Scalars['Boolean']['output']>;
  changeDate?: Maybe<Scalars['Float']['output']>;
  class?: Maybe<CalendarItemClass>;
  componentNum?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['Float']['output']>;
  dueDate?: Maybe<Scalars['Float']['output']>;
  duration?: Maybe<Scalars['Float']['output']>;
  exceptId?: Maybe<Array<Maybe<DtTimeInfo>>>;
  excerpt?: Maybe<Scalars['String']['output']>;
  flags?: Maybe<Scalars['String']['output']>;
  freeBusy?: Maybe<FreeBusyStatus>;
  freeBusyActual?: Maybe<FreeBusyStatus>;
  inviteId?: Maybe<Scalars['ID']['output']>;
  isException?: Maybe<Scalars['Boolean']['output']>;
  isOrganizer?: Maybe<Scalars['Boolean']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  modifiedSequence?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  organizer?: Maybe<CalOrganizer>;
  otherAttendees?: Maybe<Scalars['Boolean']['output']>;
  participationStatus?: Maybe<ParticipationStatus>;
  revision?: Maybe<Scalars['Float']['output']>;
  start?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<InviteCompletionStatus>;
  timezoneOffset?: Maybe<Scalars['Int']['output']>;
  tzoDue?: Maybe<Scalars['Int']['output']>;
  utcRecurrenceId?: Maybe<Scalars['String']['output']>;
};

export type InstanceDate = {
  date?: InputMaybe<Scalars['String']['input']>;
};

export type IntervalRule = {
  __typename?: 'IntervalRule';
  intervalCount?: Maybe<Scalars['Int']['output']>;
};

export type Invitation = {
  __typename?: 'Invitation';
  componentNum: Scalars['Int']['output'];
  components: Array<Maybe<InviteComponent>>;
  id: Scalars['Int']['output'];
  mimeParts?: Maybe<MimePart>;
  recurrenceId?: Maybe<Scalars['String']['output']>;
  replies?: Maybe<Array<Maybe<InviteReplies>>>;
  sequenceNumber: Scalars['Float']['output'];
  type: Scalars['String']['output'];
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
  aid?: Maybe<Scalars['String']['output']>;
  alarms?: Maybe<Array<Maybe<CalendarItemAlarm>>>;
  allDay?: Maybe<Scalars['Boolean']['output']>;
  attendees?: Maybe<Array<Maybe<CalendarItemAttendee>>>;
  calendarItemId?: Maybe<Scalars['ID']['output']>;
  ciFolder?: Maybe<Scalars['ID']['output']>;
  class?: Maybe<CalendarItemClass>;
  completedDateTime?: Maybe<Scalars['String']['output']>;
  componentNum?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Array<Maybe<StringContent>>>;
  draft?: Maybe<Scalars['Boolean']['output']>;
  end?: Maybe<Array<Maybe<DtTimeInfo>>>;
  exceptId?: Maybe<Array<Maybe<DtTimeInfo>>>;
  excerpt?: Maybe<Scalars['String']['output']>;
  freeBusy?: Maybe<FreeBusyStatus>;
  freeBusyActual?: Maybe<FreeBusyStatus>;
  htmlDescription?: Maybe<Array<Maybe<StringContent>>>;
  isException?: Maybe<Scalars['Boolean']['output']>;
  isOrganizer?: Maybe<Scalars['Boolean']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  method?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  neverSent?: Maybe<Scalars['Boolean']['output']>;
  noBlob?: Maybe<Scalars['Boolean']['output']>;
  organizer?: Maybe<CalOrganizer>;
  percentComplete?: Maybe<Scalars['String']['output']>;
  priority?: Maybe<Scalars['String']['output']>;
  recurrence?: Maybe<Array<Maybe<RecurrenceInfo>>>;
  rsvp?: Maybe<Scalars['Boolean']['output']>;
  sequence?: Maybe<Scalars['Float']['output']>;
  start?: Maybe<Array<Maybe<DtTimeInfo>>>;
  status?: Maybe<InviteCompletionStatus>;
  uid?: Maybe<Scalars['String']['output']>;
  utcRecurrenceId?: Maybe<Scalars['String']['output']>;
  x_uid?: Maybe<Scalars['String']['output']>;
};

export type InviteCondition = {
  __typename?: 'InviteCondition';
  index?: Maybe<Scalars['Int']['output']>;
  method?: Maybe<Array<Maybe<MethodCondition>>>;
  negative?: Maybe<Scalars['Boolean']['output']>;
};

export type InviteConditionInput = {
  index?: InputMaybe<Scalars['Int']['input']>;
  method?: InputMaybe<Array<InputMaybe<MethodInput>>>;
  negative?: InputMaybe<Scalars['Boolean']['input']>;
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
  componentNum: Scalars['Int']['input'];
  exceptId?: InputMaybe<InstanceDate>;
  id: Scalars['ID']['input'];
  message?: InputMaybe<CalendarItemMessageInput>;
  updateOrganizer?: InputMaybe<Scalars['Boolean']['input']>;
  verb: InviteReplyVerb;
};

export type InviteReplyResponse = {
  __typename?: 'InviteReplyResponse';
  calendarItemId?: Maybe<Scalars['ID']['output']>;
  inviteId?: Maybe<Scalars['ID']['output']>;
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
  _content: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
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
  id?: Maybe<Scalars['ID']['output']>;
  localName?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type MailItem = {
  changeDate?: Maybe<Scalars['Float']['output']>;
  conversationId?: Maybe<Scalars['ID']['output']>;
  date?: Maybe<Scalars['Float']['output']>;
  emailAddresses?: Maybe<Array<Maybe<EmailAddress>>>;
  excerpt?: Maybe<Scalars['String']['output']>;
  flags?: Maybe<Scalars['String']['output']>;
  folderId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  invitations?: Maybe<Array<Maybe<InviteInfo>>>;
  modifiedSequence?: Maybe<Scalars['Float']['output']>;
  replyType?: Maybe<Scalars['String']['output']>;
  revision?: Maybe<Scalars['Float']['output']>;
  senderDate?: Maybe<Scalars['Float']['output']>;
  share?: Maybe<Array<Maybe<ShareNotification>>>;
  size?: Maybe<Scalars['Float']['output']>;
  sortField?: Maybe<Scalars['String']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
  tagNames?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['String']['output']>;
};

export type MailItemEmailAddressInput = {
  address: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type: AddressType;
};

export type MailItemHeaderInput = {
  n: Scalars['String']['input'];
};

export type MailboxMetadata = {
  __typename?: 'MailboxMetadata';
  meta?: Maybe<Array<Maybe<MailboxMetadataMeta>>>;
};

export type MailboxMetadataAttrs = {
  __typename?: 'MailboxMetadataAttrs';
  archivedFolder?: Maybe<Scalars['String']['output']>;
  privacyOverlayPrefs_showOverlay?: Maybe<Scalars['Boolean']['output']>;
  privacyOverlayPrefs_timeOut?: Maybe<Scalars['Int']['output']>;
  zimbraPrefContactSourceFolderID?: Maybe<Scalars['String']['output']>;
  zimbraPrefCustomFolderTreeOpen?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefDateFormat?: Maybe<Scalars['String']['output']>;
  zimbraPrefFolderTreeSash?: Maybe<Scalars['Int']['output']>;
  zimbraPrefFoldersExpanded?: Maybe<Scalars['String']['output']>;
  zimbraPrefGenerateLinkPreviews?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefGroupByList?: Maybe<Scalars['String']['output']>;
  zimbraPrefMessageListDensity?: Maybe<Scalars['String']['output']>;
  zimbraPrefMultitasking?: Maybe<Scalars['String']['output']>;
  zimbraPrefReadingPaneSashHorizontal?: Maybe<Scalars['Int']['output']>;
  zimbraPrefReadingPaneSashVertical?: Maybe<Scalars['Int']['output']>;
  zimbraPrefSMIMEDefaultSetting?: Maybe<Scalars['String']['output']>;
  zimbraPrefSMIMELastOperation?: Maybe<Scalars['String']['output']>;
  zimbraPrefSharedFolderTreeOpen?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefSmartFolderTreeOpen?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefTimeFormat?: Maybe<Scalars['String']['output']>;
  zimbraPrefUndoSendEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefUndoSendTimeout?: Maybe<Scalars['Int']['output']>;
};

export type MailboxMetadataMeta = {
  __typename?: 'MailboxMetadataMeta';
  _attrs: MailboxMetadataAttrs;
  section: Scalars['String']['output'];
};

export type MailboxMetadataSectionAttrsInput = {
  archivedFolder?: InputMaybe<Scalars['String']['input']>;
  privacyOverlayPrefs_showOverlay?: InputMaybe<Scalars['Boolean']['input']>;
  privacyOverlayPrefs_timeOut?: InputMaybe<Scalars['Int']['input']>;
  zimbraPrefContactSourceFolderID?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefCustomFolderTreeOpen?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefDateFormat?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefFolderTreeSash?: InputMaybe<Scalars['Int']['input']>;
  zimbraPrefFoldersExpanded?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefGenerateLinkPreviews?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefGroupByList?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefMessageListDensity?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefMultitasking?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefReadingPaneSashHorizontal?: InputMaybe<Scalars['Int']['input']>;
  zimbraPrefReadingPaneSashVertical?: InputMaybe<Scalars['Int']['input']>;
  zimbraPrefSMIMEDefaultSetting?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefSMIMELastOperation?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefSharedFolderTreeOpen?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefSmartFolderTreeOpen?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefTimeFormat?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefUndoSendEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefUndoSendTimeout?: InputMaybe<Scalars['Int']['input']>;
};

export type MaxAppPasswords = {
  __typename?: 'MaxAppPasswords';
  _content?: Maybe<Scalars['Int']['output']>;
};

export type MessageAttributes = {
  __typename?: 'MessageAttributes';
  isEncrypted?: Maybe<Scalars['Boolean']['output']>;
  isSigned?: Maybe<Scalars['Boolean']['output']>;
};

export type MessageInfo = MailItem & {
  __typename?: 'MessageInfo';
  attachments?: Maybe<Array<Maybe<MimePart>>>;
  attributes?: Maybe<MessageAttributes>;
  autoSendTime?: Maybe<Scalars['Float']['output']>;
  bcc?: Maybe<Array<Maybe<EmailAddress>>>;
  cc?: Maybe<Array<Maybe<EmailAddress>>>;
  certificate?: Maybe<Array<Maybe<SmimeCert>>>;
  changeDate?: Maybe<Scalars['Float']['output']>;
  conversationId?: Maybe<Scalars['ID']['output']>;
  date?: Maybe<Scalars['Float']['output']>;
  decryptionErrorCode?: Maybe<Scalars['String']['output']>;
  emailAddresses?: Maybe<Array<Maybe<EmailAddress>>>;
  excerpt?: Maybe<Scalars['String']['output']>;
  flags?: Maybe<Scalars['String']['output']>;
  folderId?: Maybe<Scalars['ID']['output']>;
  from?: Maybe<Array<Maybe<EmailAddress>>>;
  html?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  inlineAttachments?: Maybe<Array<Maybe<MimePart>>>;
  invitations?: Maybe<Array<Maybe<InviteInfo>>>;
  isEncrypted?: Maybe<Scalars['Boolean']['output']>;
  isSigned?: Maybe<Scalars['Boolean']['output']>;
  local?: Maybe<Scalars['Boolean']['output']>;
  meta?: Maybe<Array<Maybe<CustomMetadataMeta>>>;
  mimeParts?: Maybe<Array<Maybe<MimePart>>>;
  modifiedSequence?: Maybe<Scalars['Float']['output']>;
  origId?: Maybe<Scalars['ID']['output']>;
  part?: Maybe<Scalars['String']['output']>;
  replyTo?: Maybe<Array<Maybe<EmailAddress>>>;
  replyType?: Maybe<Scalars['String']['output']>;
  revision?: Maybe<Scalars['Float']['output']>;
  sender?: Maybe<Array<Maybe<EmailAddress>>>;
  senderDate?: Maybe<Scalars['Float']['output']>;
  share?: Maybe<Array<Maybe<ShareNotification>>>;
  size?: Maybe<Scalars['Float']['output']>;
  sortField?: Maybe<Scalars['String']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
  tagNames?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Array<Maybe<EmailAddress>>>;
};

export type MethodCondition = {
  __typename?: 'MethodCondition';
  _content?: Maybe<Scalars['String']['output']>;
};

export type MethodInput = {
  _content?: InputMaybe<Scalars['String']['input']>;
};

export type MimeHeaderCondition = {
  __typename?: 'MimeHeaderCondition';
  caseSensitive?: Maybe<Scalars['Boolean']['output']>;
  header?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  negative?: Maybe<Scalars['Boolean']['output']>;
  stringComparison?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type MimeHeaderConditionInput = {
  caseSensitive?: InputMaybe<Scalars['Boolean']['input']>;
  header?: InputMaybe<Scalars['String']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  negative?: InputMaybe<Scalars['Boolean']['input']>;
  stringComparison?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type MimePart = {
  __typename?: 'MimePart';
  attach?: Maybe<AttachDoc>;
  base64?: Maybe<Scalars['String']['output']>;
  body?: Maybe<Scalars['Boolean']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  contentDisposition?: Maybe<Scalars['String']['output']>;
  contentId?: Maybe<Scalars['String']['output']>;
  contentLocation?: Maybe<Scalars['String']['output']>;
  contentType?: Maybe<Scalars['String']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  messageId?: Maybe<Scalars['ID']['output']>;
  mimeParts?: Maybe<Array<Maybe<MimePart>>>;
  part?: Maybe<Scalars['ID']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  truncated?: Maybe<Scalars['Boolean']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type MimePartInput = {
  attach?: InputMaybe<AttachDocInput>;
  attachments?: InputMaybe<Array<InputMaybe<AttachmentInput>>>;
  base64?: InputMaybe<Scalars['String']['input']>;
  body?: InputMaybe<Scalars['Boolean']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  contentDisposition?: InputMaybe<Scalars['String']['input']>;
  contentId?: InputMaybe<Scalars['String']['input']>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  messageId?: InputMaybe<Scalars['ID']['input']>;
  mimeParts?: InputMaybe<Array<InputMaybe<MimePartInput>>>;
  part?: InputMaybe<Scalars['ID']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  truncated?: InputMaybe<Scalars['Boolean']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export enum Mode {
  Html = 'html',
  Text = 'text'
}

export type ModifyAppointmentResponse = {
  __typename?: 'ModifyAppointmentResponse';
  appointmentId?: Maybe<Scalars['ID']['output']>;
  calendarItemId?: Maybe<Scalars['ID']['output']>;
  inviteId?: Maybe<Scalars['ID']['output']>;
  modifiedSequence?: Maybe<Scalars['Float']['output']>;
  revision?: Maybe<Scalars['Float']['output']>;
};

export type ModifyContactInput = {
  attributes: ContactAttrsInput;
  folderId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  memberOps?: InputMaybe<Array<InputMaybe<ContactListOps>>>;
  tagNames?: InputMaybe<Scalars['String']['input']>;
};

export type ModifyIdentityInput = {
  attrs?: InputMaybe<IdentityAttrsInput>;
  id: Scalars['ID']['input'];
};

export type ModifyZimletPrefsResponse = {
  __typename?: 'ModifyZimletPrefsResponse';
  zimlet?: Maybe<Array<Maybe<ZimletPref>>>;
};

export type MsgWithGroupInfo = MailItem & {
  __typename?: 'MsgWithGroupInfo';
  autoSendTime?: Maybe<Scalars['Float']['output']>;
  changeDate?: Maybe<Scalars['Float']['output']>;
  cif?: Maybe<Scalars['String']['output']>;
  conversationId?: Maybe<Scalars['ID']['output']>;
  date?: Maybe<Scalars['Float']['output']>;
  emailAddresses?: Maybe<Array<Maybe<EmailAddress>>>;
  entityId?: Maybe<Scalars['ID']['output']>;
  excerpt?: Maybe<Scalars['String']['output']>;
  flags?: Maybe<Scalars['String']['output']>;
  folderId?: Maybe<Scalars['ID']['output']>;
  forAcct?: Maybe<Scalars['String']['output']>;
  i4uid?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  invitations?: Maybe<Array<Maybe<InviteInfo>>>;
  modifiedSequence?: Maybe<Scalars['Float']['output']>;
  origid?: Maybe<Scalars['String']['output']>;
  replyType?: Maybe<Scalars['String']['output']>;
  revision?: Maybe<Scalars['Float']['output']>;
  senderDate?: Maybe<Scalars['Float']['output']>;
  share?: Maybe<Array<Maybe<ShareNotification>>>;
  size?: Maybe<Scalars['Float']['output']>;
  sortField?: Maybe<Scalars['String']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
  tagNames?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  accountOnlyRemoteWipeSync?: Maybe<Device>;
  action?: Maybe<Scalars['Boolean']['output']>;
  addExternalAccount?: Maybe<Scalars['ID']['output']>;
  addMessage?: Maybe<MessageInfo>;
  allowDeviceSync?: Maybe<Device>;
  applyFilterRules?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  blockDeviceSync?: Maybe<Device>;
  cancelPendingAccountOnlyRemoteWipeSync?: Maybe<Device>;
  cancelPendingRemoteWipeSync?: Maybe<Device>;
  cancelTask?: Maybe<Scalars['Boolean']['output']>;
  changeFolderColor?: Maybe<Scalars['Boolean']['output']>;
  changePassword?: Maybe<AuthResponse>;
  checkCalendar?: Maybe<Scalars['Boolean']['output']>;
  contactAction?: Maybe<ActionOpResponse>;
  conversationAction?: Maybe<Scalars['Boolean']['output']>;
  counterAppointment?: Maybe<Scalars['Boolean']['output']>;
  createAppSpecificPassword?: Maybe<CreateAppSpecificPasswordResponse>;
  createAppointment?: Maybe<Scalars['Boolean']['output']>;
  createAppointmentException?: Maybe<Scalars['Boolean']['output']>;
  createCalendar?: Maybe<Folder>;
  createContact?: Maybe<Contact>;
  createContactList?: Maybe<Contact>;
  createFolder?: Maybe<Folder>;
  createIdentity?: Maybe<Identities>;
  createMountpoint?: Maybe<Scalars['Boolean']['output']>;
  createSearchFolder?: Maybe<Folder>;
  createSharedCalendar?: Maybe<Scalars['Boolean']['output']>;
  createSignature?: Maybe<SignatureResponse>;
  createTag?: Maybe<Tag>;
  createTask?: Maybe<Scalars['Boolean']['output']>;
  declineCounterAppointment?: Maybe<Scalars['Boolean']['output']>;
  deleteAppointment?: Maybe<Scalars['Boolean']['output']>;
  deleteExternalAccount?: Maybe<Scalars['Boolean']['output']>;
  deleteIdentity?: Maybe<Scalars['Boolean']['output']>;
  deleteSignature?: Maybe<Scalars['Boolean']['output']>;
  disableTwoFactorAuth?: Maybe<Scalars['Boolean']['output']>;
  dismissCalendarItem?: Maybe<Scalars['Boolean']['output']>;
  distributionListAction?: Maybe<Scalars['Boolean']['output']>;
  documentAction?: Maybe<DocumentActionData>;
  enableTwoFactorAuth?: Maybe<EnableTwoFactorAuthResponse>;
  folderAction?: Maybe<Scalars['Boolean']['output']>;
  forwardAppointment?: Maybe<Scalars['Boolean']['output']>;
  forwardAppointmentInvite?: Maybe<Scalars['Boolean']['output']>;
  generateScratchCodes?: Maybe<ScratchCodes>;
  grantRights?: Maybe<RightsResponse>;
  importExternalAccount?: Maybe<Scalars['Boolean']['output']>;
  itemAction?: Maybe<Scalars['Boolean']['output']>;
  login?: Maybe<AuthResponse>;
  logout?: Maybe<Scalars['Boolean']['output']>;
  messageAction?: Maybe<Scalars['Boolean']['output']>;
  modifyAppointment?: Maybe<ModifyAppointmentResponse>;
  modifyContact?: Maybe<Contact>;
  modifyContactList?: Maybe<Contact>;
  modifyExternalAccount?: Maybe<Scalars['Boolean']['output']>;
  modifyFilterRules?: Maybe<Scalars['Boolean']['output']>;
  modifyIdentity?: Maybe<Scalars['Boolean']['output']>;
  modifyPrefs?: Maybe<Scalars['Boolean']['output']>;
  modifyProfileImage?: Maybe<ProfileImageChangeResponse>;
  modifyProps?: Maybe<Scalars['Boolean']['output']>;
  modifySearchFolder?: Maybe<Scalars['Boolean']['output']>;
  modifySignature?: Maybe<Scalars['Boolean']['output']>;
  modifyTask?: Maybe<Scalars['Boolean']['output']>;
  modifyWhiteBlackList?: Maybe<Scalars['Boolean']['output']>;
  modifyZimletPrefs?: Maybe<ModifyZimletPrefsResponse>;
  moveTask?: Maybe<Scalars['String']['output']>;
  prefEnableOutOfOfficeAlertOnLogin?: Maybe<Scalars['Boolean']['output']>;
  prefEnableOutOfOfficeReply?: Maybe<Scalars['Boolean']['output']>;
  prefOutOfOfficeFromDate?: Maybe<Scalars['String']['output']>;
  prefOutOfOfficeReply?: Maybe<Scalars['String']['output']>;
  prefOutOfOfficeUntilDate?: Maybe<Scalars['String']['output']>;
  purgeRevision?: Maybe<Scalars['Boolean']['output']>;
  quarantineDeviceSync?: Maybe<Device>;
  recoverAccount?: Maybe<RecoverAccount>;
  remoteWipeSync?: Maybe<Device>;
  removeDeviceSync?: Maybe<Scalars['Boolean']['output']>;
  resetPassword?: Maybe<ResetPasswordResponse>;
  revokeAppSpecificPassword?: Maybe<Scalars['Boolean']['output']>;
  revokeOtherTrustedDevices?: Maybe<Scalars['Boolean']['output']>;
  revokeRights?: Maybe<RightsResponse>;
  revokeTrustedDevice?: Maybe<Scalars['Boolean']['output']>;
  saveDocument?: Maybe<SaveDocumentResponse>;
  saveDraft?: Maybe<SaveDraftResponse>;
  saveSMimeCert?: Maybe<SmimeCertInfoResponse>;
  sendDeliveryReport?: Maybe<Scalars['Boolean']['output']>;
  sendInviteReply?: Maybe<InviteReplyResponse>;
  sendMessage?: Maybe<SendMessageResponse>;
  sendShareNotification?: Maybe<Scalars['Boolean']['output']>;
  setCustomMetadata?: Maybe<Scalars['Boolean']['output']>;
  setMailboxMetadata?: Maybe<Scalars['Boolean']['output']>;
  setRecoveryAccount?: Maybe<Scalars['Boolean']['output']>;
  snoozeCalendarItem?: Maybe<Scalars['Boolean']['output']>;
  subscribeDistributionList?: Maybe<Scalars['String']['output']>;
  tagAction?: Maybe<Scalars['Boolean']['output']>;
  testExternalAccount?: Maybe<ExternalAccountTestResponse>;
  uploadMessage?: Maybe<Scalars['String']['output']>;
};


export type MutationAccountOnlyRemoteWipeSyncArgs = {
  deviceId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationActionArgs = {
  color?: InputMaybe<Scalars['Int']['input']>;
  constraints?: InputMaybe<Scalars['String']['input']>;
  destFolderLocal?: InputMaybe<Scalars['Boolean']['input']>;
  flags?: InputMaybe<Scalars['String']['input']>;
  folderId?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  isLocal?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  op: Scalars['String']['input'];
  recursive?: InputMaybe<Scalars['Boolean']['input']>;
  rgb?: InputMaybe<Scalars['String']['input']>;
  tagNames?: InputMaybe<Scalars['String']['input']>;
  type: ActionTypeName;
};


export type MutationAddExternalAccountArgs = {
  externalAccount: ExternalAccountAddInput;
};


export type MutationAddMessageArgs = {
  message: AddMsgInput;
};


export type MutationAllowDeviceSyncArgs = {
  deviceId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationApplyFilterRulesArgs = {
  filterRules?: InputMaybe<Array<InputMaybe<FilterRuleInput>>>;
  ids: Scalars['String']['input'];
};


export type MutationBlockDeviceSyncArgs = {
  deviceId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCancelPendingAccountOnlyRemoteWipeSyncArgs = {
  deviceId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCancelPendingRemoteWipeSyncArgs = {
  deviceId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCancelTaskArgs = {
  inviteId: Scalars['ID']['input'];
};


export type MutationChangeFolderColorArgs = {
  color: Scalars['Int']['input'];
  id: Scalars['ID']['input'];
};


export type MutationChangePasswordArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']['input']>;
  loginNewPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationCheckCalendarArgs = {
  id: Scalars['ID']['input'];
  value: Scalars['Boolean']['input'];
};


export type MutationContactActionArgs = {
  folderId?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  op: Scalars['String']['input'];
  tagNames?: InputMaybe<Scalars['String']['input']>;
};


export type MutationConversationActionArgs = {
  ids: Array<Scalars['ID']['input']>;
  op: Scalars['String']['input'];
};


export type MutationCounterAppointmentArgs = {
  counterAppointmentInvite: CounterAppointmentInput;
};


export type MutationCreateAppSpecificPasswordArgs = {
  appName: Scalars['String']['input'];
};


export type MutationCreateAppointmentArgs = {
  accountName?: InputMaybe<Scalars['String']['input']>;
  appointment: CalendarItemInput;
};


export type MutationCreateAppointmentExceptionArgs = {
  accountName?: InputMaybe<Scalars['String']['input']>;
  appointment: CalendarItemInput;
};


export type MutationCreateCalendarArgs = {
  color: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  parentFolderId?: InputMaybe<Scalars['ID']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateContactArgs = {
  contact: CreateContactInput;
};


export type MutationCreateContactListArgs = {
  contact: CreateContactInput;
};


export type MutationCreateFolderArgs = {
  color?: InputMaybe<Scalars['Int']['input']>;
  fetchIfExists?: InputMaybe<Scalars['Boolean']['input']>;
  flags?: InputMaybe<Scalars['String']['input']>;
  isLocalFolder?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parentFolderId?: InputMaybe<Scalars['ID']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  view?: InputMaybe<FolderView>;
};


export type MutationCreateIdentityArgs = {
  attrs?: InputMaybe<IdentityAttrsInput>;
  name: Scalars['String']['input'];
};


export type MutationCreateMountpointArgs = {
  link: NewMountpointSpec;
};


export type MutationCreateSearchFolderArgs = {
  name: Scalars['String']['input'];
  parentFolderId?: InputMaybe<Scalars['ID']['input']>;
  query: Scalars['String']['input'];
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
  id: Scalars['ID']['input'];
};


export type MutationDeleteIdentityArgs = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteSignatureArgs = {
  signature: NameIdInput;
};


export type MutationDismissCalendarItemArgs = {
  appointment?: InputMaybe<Array<InputMaybe<DismissInput>>>;
  task?: InputMaybe<DismissInput>;
};


export type MutationDistributionListActionArgs = {
  dlActions: DistributionListActionInput;
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
  username: Scalars['String']['input'];
};


export type MutationGrantRightsArgs = {
  input: GrantRightsInput;
};


export type MutationImportExternalAccountArgs = {
  externalAccount: ExternalAccountImportInput;
};


export type MutationItemActionArgs = {
  folderId?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  op: Scalars['String']['input'];
  tagNames?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLoginArgs = {
  csrfTokenSecured: Scalars['Boolean']['input'];
  deviceTrusted?: InputMaybe<Scalars['Boolean']['input']>;
  ignoreSameSite?: InputMaybe<Scalars['Boolean']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  persistAuthTokenCookie?: InputMaybe<Scalars['Boolean']['input']>;
  recoveryCode?: InputMaybe<Scalars['String']['input']>;
  tokenType?: InputMaybe<Scalars['String']['input']>;
  twoFactorCode?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};


export type MutationMessageActionArgs = {
  ids: Array<Scalars['ID']['input']>;
  op: Scalars['String']['input'];
};


export type MutationModifyAppointmentArgs = {
  accountName?: InputMaybe<Scalars['String']['input']>;
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
  id: Scalars['ID']['input'];
  type?: InputMaybe<AccountType>;
};


export type MutationModifyFilterRulesArgs = {
  filters?: InputMaybe<Array<FilterInput>>;
};


export type MutationModifyIdentityArgs = {
  attrs?: InputMaybe<IdentityAttrsInput>;
  id: Scalars['ID']['input'];
};


export type MutationModifyPrefsArgs = {
  prefs: PreferencesInput;
};


export type MutationModifyProfileImageArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  contentType?: InputMaybe<Scalars['String']['input']>;
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
  destFolderId: Scalars['ID']['input'];
  inviteId: Scalars['ID']['input'];
};


export type MutationPrefEnableOutOfOfficeAlertOnLoginArgs = {
  value: Scalars['Boolean']['input'];
};


export type MutationPrefEnableOutOfOfficeReplyArgs = {
  value: Scalars['Boolean']['input'];
};


export type MutationPrefOutOfOfficeFromDateArgs = {
  value: Scalars['String']['input'];
};


export type MutationPrefOutOfOfficeReplyArgs = {
  value: Scalars['String']['input'];
};


export type MutationPrefOutOfOfficeUntilDateArgs = {
  value: Scalars['String']['input'];
};


export type MutationPurgeRevisionArgs = {
  id: Scalars['ID']['input'];
  includeOlderRevisions?: InputMaybe<Scalars['Int']['input']>;
  ver: Scalars['Int']['input'];
};


export type MutationQuarantineDeviceSyncArgs = {
  deviceId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRecoverAccountArgs = {
  channel: SetRecoveryAccountChannel;
  email: Scalars['String']['input'];
  op: RecoverAccountOp;
};


export type MutationRemoteWipeSyncArgs = {
  deviceId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRemoveDeviceSyncArgs = {
  deviceId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationResetPasswordArgs = {
  cancelResetPassword?: InputMaybe<Scalars['Boolean']['input']>;
  dryRun?: InputMaybe<Scalars['Boolean']['input']>;
  getPasswordRules?: InputMaybe<Scalars['Boolean']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRevokeAppSpecificPasswordArgs = {
  appName: Scalars['String']['input'];
};


export type MutationRevokeRightsArgs = {
  input: RevokeRightsInput;
};


export type MutationSaveDocumentArgs = {
  document?: InputMaybe<SaveDocumentInput>;
};


export type MutationSaveDraftArgs = {
  accountName?: InputMaybe<Scalars['String']['input']>;
  message: SendMessageInput;
};


export type MutationSaveSMimeCertArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  upload: SaveSMimeCertInputUpload;
};


export type MutationSendDeliveryReportArgs = {
  messageId: Scalars['ID']['input'];
};


export type MutationSendInviteReplyArgs = {
  inviteReply: InviteReplyInput;
};


export type MutationSendMessageArgs = {
  accountName?: InputMaybe<Scalars['String']['input']>;
  encrypt?: InputMaybe<Scalars['Boolean']['input']>;
  message: SendMessageInput;
  sign?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationSendShareNotificationArgs = {
  shareNotification: ShareNotificationInput;
};


export type MutationSetCustomMetadataArgs = {
  customMetaData: CustomMetadataInput;
};


export type MutationSetMailboxMetadataArgs = {
  attrs: MailboxMetadataSectionAttrsInput;
  section?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSetRecoveryAccountArgs = {
  channel: SetRecoveryAccountChannel;
  op: SetRecoveryAccountOp;
  recoveryAccount?: InputMaybe<Scalars['String']['input']>;
  recoveryAccountVerificationCode?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSnoozeCalendarItemArgs = {
  appointment?: InputMaybe<Array<InputMaybe<SnoozeInput>>>;
  task?: InputMaybe<SnoozeInput>;
};


export type MutationSubscribeDistributionListArgs = {
  by?: InputMaybe<Scalars['String']['input']>;
  dl: Scalars['String']['input'];
  op: Scalars['String']['input'];
};


export type MutationTagActionArgs = {
  action?: InputMaybe<FolderActionInput>;
};


export type MutationTestExternalAccountArgs = {
  externalAccount: ExternalAccountTestInput;
};


export type MutationUploadMessageArgs = {
  value: Scalars['String']['input'];
};

export type NameId = {
  __typename?: 'NameId';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type NameIdInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export enum NeedIsMemberType {
  All = 'all',
  DirectOnly = 'directOnly',
  None = 'none'
}

export type NewMountpointSpec = {
  color?: InputMaybe<Scalars['Int']['input']>;
  flags?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerZimbraId?: InputMaybe<Scalars['ID']['input']>;
  parentFolderId?: InputMaybe<Scalars['ID']['input']>;
  reminder?: InputMaybe<Scalars['Boolean']['input']>;
  sharedItemId?: InputMaybe<Scalars['ID']['input']>;
  view?: InputMaybe<SearchType>;
};

export type NoOpResponse = {
  __typename?: 'NoOpResponse';
  waitDisallowed?: Maybe<Scalars['Boolean']['output']>;
};

export type Notes = {
  _content?: InputMaybe<Scalars['String']['input']>;
};

export type NotifyAction = {
  __typename?: 'NotifyAction';
  address?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  index?: Maybe<Scalars['Int']['output']>;
  maxBodySize?: Maybe<Scalars['Int']['output']>;
  origHeaders?: Maybe<Scalars['String']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
};

export type NotifyActionInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  index?: InputMaybe<Scalars['Int']['input']>;
  maxBodySize?: InputMaybe<Scalars['Int']['input']>;
  origHeaders?: InputMaybe<Scalars['String']['input']>;
  subject?: InputMaybe<Scalars['String']['input']>;
};

export type OnlyEmailAddress = {
  __typename?: 'OnlyEmailAddress';
  emailAddress?: Maybe<Scalars['String']['output']>;
};

export type OtherContactAttribute = {
  __typename?: 'OtherContactAttribute';
  key?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type OtherContactAttributeInput = {
  key?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Owner = {
  _content?: InputMaybe<Scalars['String']['input']>;
  by?: InputMaybe<Scalars['String']['input']>;
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
  lifetime?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type PolicyAttrsInput = {
  lifetime?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
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
  zimbraPrefAppleIcalDelegationEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefAutoAddAppointmentsToCalendar?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefBriefcaseReadingPaneLocation?: Maybe<ReadingPaneLocation>;
  zimbraPrefCalendarAlwaysShowMiniCal?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefCalendarApptReminderWarningTime?: Maybe<Scalars['Int']['output']>;
  zimbraPrefCalendarAutoAddInvites?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefCalendarFirstDayOfWeek?: Maybe<Scalars['Int']['output']>;
  zimbraPrefCalendarInitialView?: Maybe<PrefCalendarInitialView>;
  zimbraPrefCalendarReminderEmail?: Maybe<Scalars['String']['output']>;
  zimbraPrefCalendarShowDeclinedMeetings?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefCalendarShowPastDueReminders?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefCalendarToasterEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefCalendarWorkingHours?: Maybe<Scalars['String']['output']>;
  zimbraPrefClientType?: Maybe<PrefClientType>;
  zimbraPrefComposeDirection?: Maybe<Scalars['String']['output']>;
  zimbraPrefComposeFormat?: Maybe<Mode>;
  zimbraPrefDefaultCalendarId?: Maybe<Scalars['ID']['output']>;
  zimbraPrefDelegatedSendSaveTarget?: Maybe<PrefDelegatedSendSaveTarget>;
  zimbraPrefDeleteInviteOnReply?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefDisplayExternalImages?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefDisplayTimeInMailList?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefExternalSendersType?: Maybe<ExternalSendersType>;
  zimbraPrefForwardReplyInOriginalFormat?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefGroupMailBy?: Maybe<Scalars['String']['output']>;
  zimbraPrefHtmlEditorDefaultFontColor?: Maybe<Scalars['String']['output']>;
  zimbraPrefHtmlEditorDefaultFontFamily?: Maybe<Scalars['String']['output']>;
  zimbraPrefHtmlEditorDefaultFontSize?: Maybe<Scalars['String']['output']>;
  zimbraPrefLocale?: Maybe<Scalars['String']['output']>;
  zimbraPrefMailForwardingAddress?: Maybe<Scalars['String']['output']>;
  zimbraPrefMailLocalDeliveryDisabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefMailPollingInterval?: Maybe<Scalars['String']['output']>;
  zimbraPrefMailRequestReadReceipts?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefMailSelectAfterDelete?: Maybe<PrefMailSelectAfterDelete>;
  zimbraPrefMailSendReadReceipts?: Maybe<PrefMailSendReadReceipts>;
  zimbraPrefMailToasterEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefMailTrustedSenderList?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  zimbraPrefMarkMsgRead?: Maybe<Scalars['Int']['output']>;
  zimbraPrefMessageViewHtmlPreferred?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefOutOfOfficeExternalReply?: Maybe<Scalars['String']['output']>;
  zimbraPrefOutOfOfficeExternalReplyEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefOutOfOfficeFromDate?: Maybe<Scalars['String']['output']>;
  zimbraPrefOutOfOfficeReply?: Maybe<Scalars['String']['output']>;
  zimbraPrefOutOfOfficeReplyEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefOutOfOfficeStatusAlertOnLogin?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefOutOfOfficeSuppressExternalReply?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefOutOfOfficeUntilDate?: Maybe<Scalars['String']['output']>;
  zimbraPrefPasswordRecoveryAddress?: Maybe<Scalars['String']['output']>;
  zimbraPrefPasswordRecoveryAddressStatus?: Maybe<PasswordRecoveryAddressStatus>;
  zimbraPrefPowerPasteEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefReadingPaneEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefReadingPaneLocation?: Maybe<ReadingPaneLocation>;
  zimbraPrefSaveToSent?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefSharedAddrBookAutoCompleteEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefShowAllNewMailNotifications?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefShowFragments?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefSlackCalendarReminderEnabled?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefSortOrder?: Maybe<Scalars['String']['output']>;
  zimbraPrefTagTreeOpen?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefTimeZoneId?: Maybe<Scalars['String']['output']>;
  zimbraPrefUseTimeZoneListInCalendar?: Maybe<Scalars['Boolean']['output']>;
  zimbraPrefWebClientOfflineBrowserKey?: Maybe<Scalars['String']['output']>;
};

export type PreferencesInput = {
  zimbraPrefAppleIcalDelegationEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefAutoAddAppointmentsToCalendar?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefBriefcaseReadingPaneLocation?: InputMaybe<ReadingPaneLocation>;
  zimbraPrefCalendarAlwaysShowMiniCal?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefCalendarApptReminderWarningTime?: InputMaybe<Scalars['Int']['input']>;
  zimbraPrefCalendarAutoAddInvites?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefCalendarFirstDayOfWeek?: InputMaybe<Scalars['Int']['input']>;
  zimbraPrefCalendarInitialView?: InputMaybe<PrefCalendarInitialView>;
  zimbraPrefCalendarReminderEmail?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefCalendarShowDeclinedMeetings?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefCalendarShowPastDueReminders?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefCalendarToasterEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefCalendarWorkingHours?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefClientType?: InputMaybe<PrefClientType>;
  zimbraPrefComposeDirection?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefComposeFormat?: InputMaybe<Mode>;
  zimbraPrefDefaultCalendarId?: InputMaybe<Scalars['ID']['input']>;
  zimbraPrefDelegatedSendSaveTarget?: InputMaybe<PrefDelegatedSendSaveTarget>;
  zimbraPrefDisplayExternalImages?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefDisplayTimeInMailList?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefExternalSendersType?: InputMaybe<ExternalSendersType>;
  zimbraPrefForwardReplyInOriginalFormat?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefGroupMailBy?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefHtmlEditorDefaultFontColor?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefHtmlEditorDefaultFontFamily?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefHtmlEditorDefaultFontSize?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefLocale?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefMailForwardingAddress?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefMailLocalDeliveryDisabled?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefMailPollingInterval?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefMailRequestReadReceipts?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefMailSelectAfterDelete?: InputMaybe<PrefMailSelectAfterDelete>;
  zimbraPrefMailSendReadReceipts?: InputMaybe<PrefMailSendReadReceipts>;
  zimbraPrefMailToasterEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefMailTrustedSenderList?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  zimbraPrefMarkMsgRead?: InputMaybe<Scalars['Int']['input']>;
  zimbraPrefMessageViewHtmlPreferred?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefOutOfOfficeExternalReply?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefOutOfOfficeExternalReplyEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefOutOfOfficeFromDate?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefOutOfOfficeReply?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefOutOfOfficeReplyEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefOutOfOfficeStatusAlertOnLogin?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefOutOfOfficeSuppressExternalReply?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefOutOfOfficeUntilDate?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefPowerPasteEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefReadingPaneEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefReadingPaneLocation?: InputMaybe<ReadingPaneLocation>;
  zimbraPrefSaveToSent?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefSharedAddrBookAutoCompleteEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefShowAllNewMailNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefShowFragments?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefSlackCalendarReminderEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefSortOrder?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefTagTreeOpen?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefTimeZoneId?: InputMaybe<Scalars['String']['input']>;
  zimbraPrefUseTimeZoneListInCalendar?: InputMaybe<Scalars['Boolean']['input']>;
  zimbraPrefWebClientOfflineBrowserKey?: InputMaybe<Scalars['String']['input']>;
};

export type ProfileImageChangeResponse = {
  __typename?: 'ProfileImageChangeResponse';
  itemId?: Maybe<Scalars['ID']['output']>;
};

export type Prop = {
  __typename?: 'Prop';
  _content?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  zimlet?: Maybe<Scalars['String']['output']>;
};

export type PropList = {
  __typename?: 'PropList';
  prop?: Maybe<Array<Maybe<Prop>>>;
};

export type PropertiesInput = {
  _content?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  zimlet: Scalars['String']['input'];
};

export type PurgetRevisionInput = {
  id: Scalars['ID']['input'];
  includeOlderRevisions?: InputMaybe<Scalars['Int']['input']>;
  ver: Scalars['Int']['input'];
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
  getAccountDistributionLists?: Maybe<DlsDetails>;
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
  getDistributionList?: Maybe<Dl>;
  getDistributionListMembers?: Maybe<DlMembersDetails>;
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
  folders?: InputMaybe<Scalars['String']['input']>;
  includeGal?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  needExp?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<GalSearchType>;
};


export type QueryAutoCompleteGalArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  needExp?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<GalSearchType>;
};


export type QueryClientInfoArgs = {
  by?: InputMaybe<Scalars['String']['input']>;
  domain?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDiscoverRightsArgs = {
  right: Array<DiscoverRightInput>;
};


export type QueryDownloadAttachmentArgs = {
  id: Scalars['ID']['input'];
  part: Scalars['ID']['input'];
};


export type QueryDownloadDocumentArgs = {
  id: Scalars['ID']['input'];
  url: Scalars['String']['input'];
};


export type QueryDownloadMessageArgs = {
  id: Scalars['ID']['input'];
  isLocal?: InputMaybe<Scalars['Boolean']['input']>;
  isSecure?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryFreeBusyArgs = {
  end?: InputMaybe<Scalars['Float']['input']>;
  names: Array<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetAccountDistributionListsArgs = {
  attrs?: InputMaybe<Scalars['String']['input']>;
  ownerOf?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAppointmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAppointmentsArgs = {
  calExpandInstEnd: Scalars['Float']['input'];
  calExpandInstStart: Scalars['Float']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  query: Scalars['String']['input'];
  types?: InputMaybe<SearchType>;
};


export type QueryGetContactArgs = {
  derefGroupMember?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  memberOf?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetContactFrequencyArgs = {
  by: Scalars['String']['input'];
  email: Scalars['String']['input'];
  offsetInMinutes?: InputMaybe<Scalars['String']['input']>;
  spec?: InputMaybe<Array<ContactFrequencySpec>>;
};


export type QueryGetConversationArgs = {
  fetch?: InputMaybe<Scalars['String']['input']>;
  header?: InputMaybe<Array<InputMaybe<MailItemHeaderInput>>>;
  html?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  max?: InputMaybe<Scalars['Int']['input']>;
  needExp?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetCustomMetadataArgs = {
  id: Scalars['ID']['input'];
  section?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetDistributionListArgs = {
  by?: InputMaybe<Scalars['String']['input']>;
  dl?: InputMaybe<Scalars['String']['input']>;
  needOwners?: InputMaybe<Scalars['Boolean']['input']>;
  needRights?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetDistributionListMembersArgs = {
  dl?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetDocumentShareUrlArgs = {
  item?: InputMaybe<GetDocumentShareUrlItemInput>;
};


export type QueryGetFolderArgs = {
  depth?: InputMaybe<Scalars['Int']['input']>;
  folder?: InputMaybe<GetFolderFolderInput>;
  local?: InputMaybe<Scalars['Boolean']['input']>;
  needGranteeName?: InputMaybe<Scalars['Boolean']['input']>;
  traverseMountpoints?: InputMaybe<Scalars['Boolean']['input']>;
  view?: InputMaybe<FolderView>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetHabArgs = {
  habRootGroupId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetMailboxMetadataArgs = {
  section?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetMessageArgs = {
  header?: InputMaybe<Array<InputMaybe<MailItemHeaderInput>>>;
  html?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  isLocal?: InputMaybe<Scalars['Boolean']['input']>;
  max?: InputMaybe<Scalars['Int']['input']>;
  needExp?: InputMaybe<Scalars['Boolean']['input']>;
  neuter?: InputMaybe<Scalars['Boolean']['input']>;
  part?: InputMaybe<Scalars['ID']['input']>;
  raw?: InputMaybe<Scalars['Boolean']['input']>;
  read?: InputMaybe<Scalars['Boolean']['input']>;
  ridZ?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetMessagesMetadataArgs = {
  ids: Array<Scalars['ID']['input']>;
  isLocal?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetRemindersArgs = {
  calExpandInstEnd: Scalars['Float']['input'];
  calExpandInstStart: Scalars['Float']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  query: Scalars['String']['input'];
  types?: InputMaybe<SearchType>;
};


export type QueryGetRightsArgs = {
  input: GetRightsInput;
};


export type QueryGetSMimeCertInfoArgs = {
  certId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetSMimePublicCertsArgs = {
  contactAddr: Scalars['String']['input'];
  store: Scalars['String']['input'];
};


export type QueryGetScratchCodesArgs = {
  username: Scalars['String']['input'];
};


export type QueryGetTasksArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  query: Scalars['String']['input'];
  types?: InputMaybe<SearchType>;
};


export type QueryGetWorkingHoursArgs = {
  end?: InputMaybe<Scalars['Float']['input']>;
  names: Array<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryListDocumentRevisionsArgs = {
  count: Scalars['Int']['input'];
  id: Scalars['ID']['input'];
  version: Scalars['Int']['input'];
};


export type QueryNoopArgs = {
  limitToOneBlocked?: InputMaybe<Scalars['Int']['input']>;
  wait?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRecoverAccountArgs = {
  channel: SetRecoveryAccountChannel;
  email: Scalars['String']['input'];
  op: RecoverAccountOp;
};


export type QueryRelatedContactsArgs = {
  email: Scalars['String']['input'];
};


export type QuerySearchArgs = {
  contact?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Cursor>;
  fetch?: InputMaybe<Scalars['String']['input']>;
  fullConversation?: InputMaybe<Scalars['Boolean']['input']>;
  inDumpster?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  memberOf?: InputMaybe<Scalars['Boolean']['input']>;
  needExp?: InputMaybe<Scalars['Boolean']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  recip?: InputMaybe<Scalars['Int']['input']>;
  resultMode?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<SortBy>;
  types?: InputMaybe<SearchType>;
};


export type QuerySearchCalendarResourcesArgs = {
  attrs?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  needExp?: InputMaybe<Scalars['Boolean']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchFilter?: InputMaybe<SearchConditionsInput>;
};


export type QuerySearchGalArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  needExp?: InputMaybe<Scalars['Boolean']['input']>;
  needIsMember?: InputMaybe<NeedIsMemberType>;
  needIsOwner?: InputMaybe<Scalars['Boolean']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<GalSearchType>;
};


export type QueryShareInfoArgs = {
  grantee?: InputMaybe<Grantee>;
  includeSelf?: InputMaybe<Scalars['Boolean']['input']>;
  internal?: InputMaybe<Scalars['Boolean']['input']>;
  owner?: InputMaybe<Owner>;
};

export enum ReadingPaneLocation {
  Bottom = 'bottom',
  Off = 'off',
  Right = 'right'
}

export type RecoverAccount = {
  __typename?: 'RecoverAccount';
  recoveryAccount?: Maybe<Scalars['String']['output']>;
  recoveryAttemptsLeft?: Maybe<Scalars['Int']['output']>;
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
  address?: Maybe<Scalars['String']['output']>;
  copy?: Maybe<Scalars['Boolean']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
};

export type RedirectActionInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  copy?: InputMaybe<Scalars['Boolean']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
};

export type RelatedContact = {
  __typename?: 'RelatedContact';
  email?: Maybe<Scalars['String']['output']>;
  p?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Scalars['Int']['output']>;
};

export type ReminderItemHitInfo = {
  __typename?: 'ReminderItemHitInfo';
  aid?: Maybe<Scalars['String']['output']>;
  alarm?: Maybe<Scalars['Boolean']['output']>;
  alarmData?: Maybe<Array<Maybe<Alarm>>>;
  allDay?: Maybe<Scalars['Boolean']['output']>;
  changeDate?: Maybe<Scalars['Float']['output']>;
  class: CalendarItemClass;
  componentNum?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['Float']['output']>;
  draft?: Maybe<Scalars['Boolean']['output']>;
  duration?: Maybe<Scalars['Float']['output']>;
  excerpt?: Maybe<Scalars['String']['output']>;
  flags?: Maybe<Scalars['String']['output']>;
  folderId: Scalars['ID']['output'];
  freeBusy?: Maybe<FreeBusyStatus>;
  freeBusyActual?: Maybe<FreeBusyStatus>;
  id: Scalars['ID']['output'];
  instances?: Maybe<Array<Maybe<Instance>>>;
  invitations?: Maybe<Array<Maybe<Invitation>>>;
  inviteId: Scalars['ID']['output'];
  isOrganizer?: Maybe<Scalars['Boolean']['output']>;
  isRecurring?: Maybe<Scalars['Boolean']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  modifiedSequence?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  neverSent?: Maybe<Scalars['Boolean']['output']>;
  organizer?: Maybe<CalOrganizer>;
  otherAttendees?: Maybe<Scalars['Boolean']['output']>;
  participationStatus?: Maybe<ParticipationStatus>;
  percentComplete?: Maybe<Scalars['String']['output']>;
  priority?: Maybe<Scalars['String']['output']>;
  revision?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  sortField?: Maybe<Scalars['String']['output']>;
  status?: Maybe<InviteCompletionStatus>;
  tagNames?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['String']['output']>;
  timezoneOffset?: Maybe<Scalars['Int']['output']>;
  uid?: Maybe<Scalars['String']['output']>;
  utcRecurrenceId?: Maybe<Scalars['String']['output']>;
  x_uid?: Maybe<Scalars['String']['output']>;
};

export type RemindersResponse = {
  __typename?: 'RemindersResponse';
  appointments?: Maybe<Array<Maybe<ReminderItemHitInfo>>>;
  tasks?: Maybe<Array<Maybe<ReminderItemHitInfo>>>;
};

export type ReplyAction = {
  __typename?: 'ReplyAction';
  content?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  index?: Maybe<Scalars['Int']['output']>;
};

export type ReplyActionInput = {
  content?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  index?: InputMaybe<Scalars['Int']['input']>;
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
  right: Scalars['String']['input'];
};

export type RightsResponse = {
  __typename?: 'RightsResponse';
  access?: Maybe<Array<Maybe<AccountAceInfo>>>;
};

export type SMimeMessage = {
  __typename?: 'SMimeMessage';
  content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isSecure?: Maybe<Scalars['Boolean']['output']>;
};

export type SMimePublicCert = {
  __typename?: 'SMimePublicCert';
  _content?: Maybe<Scalars['String']['output']>;
  field: Scalars['String']['output'];
  store: Scalars['String']['output'];
};

export type SMimePublicCerts = {
  __typename?: 'SMimePublicCerts';
  cert?: Maybe<Array<Maybe<SMimePublicCert>>>;
  email?: Maybe<Scalars['String']['output']>;
};

export type SMimePublicCertsResponse = {
  __typename?: 'SMimePublicCertsResponse';
  certs?: Maybe<Array<Maybe<SMimePublicCerts>>>;
};

export type SaveDocument = {
  __typename?: 'SaveDocument';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export enum SaveDocumentAction {
  Create = 'create'
}

export type SaveDocumentInput = {
  action?: InputMaybe<SaveDocumentAction>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  descriptionEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  document?: InputMaybe<SaveDocumentInput>;
  folderId?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  messageData?: InputMaybe<Array<InputMaybe<MessagePartForDocument>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<SaveDocumentType>;
  upload?: InputMaybe<UploadDocument>;
  version?: InputMaybe<Scalars['Float']['input']>;
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
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  meta: Scalars['String']['input'];
};

export type SaveSMimeCertInputUpload = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type ScratchCode = {
  __typename?: 'ScratchCode';
  scratchCode?: Maybe<Array<Maybe<ScratchCodeType>>>;
};

export type ScratchCodeType = {
  __typename?: 'ScratchCodeType';
  _content?: Maybe<Scalars['String']['output']>;
};

export type ScratchCodes = {
  __typename?: 'ScratchCodes';
  scratchCodes?: Maybe<ScratchCode>;
};

export type SearchCalendarResourcesResponse = {
  __typename?: 'SearchCalendarResourcesResponse';
  calresource?: Maybe<Array<Maybe<CalResource>>>;
  more?: Maybe<Scalars['Boolean']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  paginationSupported?: Maybe<Scalars['Boolean']['output']>;
  sortBy?: Maybe<Scalars['String']['output']>;
};

export type SearchConditionsInput = {
  conds?: InputMaybe<ConditionsInput>;
};

export type SearchFolderInput = {
  id: Scalars['ID']['input'];
  query: Scalars['String']['input'];
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
  more?: Maybe<Scalars['Boolean']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  paginationSupported?: Maybe<Scalars['Boolean']['output']>;
  sortBy?: Maybe<Scalars['String']['output']>;
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
  _content?: Maybe<Scalars['String']['output']>;
};

export type SendMessageInput = {
  attach?: InputMaybe<Array<InputMaybe<AttachmentInput>>>;
  attachmentId?: InputMaybe<Scalars['ID']['input']>;
  attachments?: InputMaybe<Array<InputMaybe<AttachmentInput>>>;
  autoSendTime?: InputMaybe<Scalars['Float']['input']>;
  draftId?: InputMaybe<Scalars['ID']['input']>;
  emailAddresses?: InputMaybe<Array<InputMaybe<MailItemEmailAddressInput>>>;
  entityId?: InputMaybe<Scalars['String']['input']>;
  flags?: InputMaybe<Scalars['String']['input']>;
  folderId?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  inReplyTo?: InputMaybe<Scalars['String']['input']>;
  inlineAttachments?: InputMaybe<Array<InputMaybe<MimePartInput>>>;
  mimeParts?: InputMaybe<Array<InputMaybe<MimePartInput>>>;
  origId?: InputMaybe<Scalars['ID']['input']>;
  replyType?: InputMaybe<Scalars['String']['input']>;
  subject?: InputMaybe<Scalars['String']['input']>;
};

export type SendMessageResponse = {
  __typename?: 'SendMessageResponse';
  message?: Maybe<Array<Maybe<MsgWithGroupInfo>>>;
};

export type Session = {
  __typename?: 'Session';
  _content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
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
  folderId: Scalars['ID']['output'];
  folderPath?: Maybe<Scalars['String']['output']>;
  folderUuid?: Maybe<Scalars['String']['output']>;
  granteeDisplayName?: Maybe<Scalars['String']['output']>;
  granteeId?: Maybe<Scalars['String']['output']>;
  granteeName?: Maybe<Scalars['String']['output']>;
  granteeType?: Maybe<Scalars['String']['output']>;
  mid?: Maybe<Scalars['ID']['output']>;
  ownerEmail?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['String']['output']>;
  ownerName?: Maybe<Scalars['String']['output']>;
  rights?: Maybe<Scalars['String']['output']>;
  view?: Maybe<FolderView>;
};

export enum ShareInputAction {
  Edit = 'edit',
  Expire = 'expire',
  Revoke = 'revoke'
}

export type ShareNotificaitonEmailAddressInput = {
  address: Scalars['String']['input'];
  personalName?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AddressType>;
};

export type ShareNotification = {
  __typename?: 'ShareNotification';
  content?: Maybe<Scalars['String']['output']>;
  truncated?: Maybe<Scalars['Boolean']['output']>;
};

export type ShareNotificationInput = {
  action?: InputMaybe<ShareInputAction>;
  address: ShareNotificaitonEmailAddressInput;
  item: ShareNotificationItemInput;
  notes?: InputMaybe<Notes>;
};

export type ShareNotificationItemInput = {
  id: Scalars['ID']['input'];
};

export type Signature = {
  __typename?: 'Signature';
  content?: Maybe<Array<Maybe<SignatureContent>>>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type SignatureContent = {
  __typename?: 'SignatureContent';
  _content?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type SignatureContentInput = {
  _content?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type SignatureInput = {
  content?: InputMaybe<Array<InputMaybe<SignatureContentInput>>>;
  contentId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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
  index?: Maybe<Scalars['Int']['output']>;
  negative?: Maybe<Scalars['Boolean']['output']>;
  numberComparison?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['String']['output']>;
};

export type SizeConditionInput = {
  index?: InputMaybe<Scalars['Int']['input']>;
  negative?: InputMaybe<Scalars['Boolean']['input']>;
  numberComparison?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
};

export type Skin = {
  __typename?: 'Skin';
  _content?: Maybe<Scalars['String']['output']>;
};

export type SmimeCert = {
  __typename?: 'SmimeCert';
  default?: Maybe<Scalars['Boolean']['output']>;
  emailAddress?: Maybe<Scalars['String']['output']>;
  errorCode?: Maybe<Scalars['String']['output']>;
  issuedBy?: Maybe<SmimeCertIssuedBy>;
  issuedTo?: Maybe<SmimeCertIssuedTo>;
  privateKeyId?: Maybe<Scalars['String']['output']>;
  publicCertificateId?: Maybe<Scalars['String']['output']>;
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
  commonName?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  emailAddress?: Maybe<Scalars['String']['output']>;
  locality?: Maybe<Scalars['String']['output']>;
  organizationName?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
};

export type SmimeCertIssuedTo = {
  __typename?: 'SmimeCertIssuedTo';
  commonName?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  emailAddress?: Maybe<Scalars['String']['output']>;
  organizationName?: Maybe<Scalars['String']['output']>;
  organizationUnit?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
};

export type SmimeCertSignature = {
  __typename?: 'SmimeCertSignature';
  algorithm?: Maybe<Scalars['String']['output']>;
  serialNo?: Maybe<Scalars['String']['output']>;
};

export type SmimeCertSubjectAltName = {
  __typename?: 'SmimeCertSubjectAltName';
  rfc822Name?: Maybe<Array<Maybe<SmimeCertSubjectRfc822Name>>>;
};

export type SmimeCertSubjectRfc822Name = {
  __typename?: 'SmimeCertSubjectRfc822Name';
  content?: Maybe<Scalars['String']['output']>;
};

export type SmimeCertValidity = {
  __typename?: 'SmimeCertValidity';
  endDate?: Maybe<Scalars['Float']['output']>;
  startDate?: Maybe<Scalars['Float']['output']>;
};

export type SnoozeInput = {
  id: Scalars['ID']['input'];
  until: Scalars['Float']['input'];
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
  _content?: Maybe<Scalars['String']['output']>;
};

export type SubscribeDistributionList = {
  __typename?: 'SubscribeDistributionList';
  status?: Maybe<Scalars['String']['output']>;
};

export type Tag = {
  __typename?: 'Tag';
  color?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rgb?: Maybe<Scalars['String']['output']>;
  unread?: Maybe<Scalars['Float']['output']>;
};

export type TagAction = {
  __typename?: 'TagAction';
  index?: Maybe<Scalars['Int']['output']>;
  tagName: Scalars['String']['output'];
};

export type TagActionInput = {
  index?: InputMaybe<Scalars['Int']['input']>;
  tagName: Scalars['String']['input'];
};

export type Target = {
  __typename?: 'Target';
  displayName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Array<Maybe<OnlyEmailAddress>>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Targets = {
  __typename?: 'Targets';
  right?: Maybe<Scalars['String']['output']>;
  target?: Maybe<Array<Maybe<Target>>>;
};

export type TrustedDevicesEnabled = {
  __typename?: 'TrustedDevicesEnabled';
  _content?: Maybe<Scalars['Boolean']['output']>;
};

export type TwoFactorAuthRequired = {
  __typename?: 'TwoFactorAuthRequired';
  _content?: Maybe<Scalars['Boolean']['output']>;
};

export type TzOnsetInfo = {
  __typename?: 'TzOnsetInfo';
  hour?: Maybe<Scalars['Int']['output']>;
  mday?: Maybe<Scalars['Int']['output']>;
  min?: Maybe<Scalars['Int']['output']>;
  mon?: Maybe<Scalars['Int']['output']>;
  sec?: Maybe<Scalars['Int']['output']>;
  week?: Maybe<Scalars['Int']['output']>;
  wkday?: Maybe<Scalars['Int']['output']>;
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
  _content: Scalars['String']['output'];
  op?: Maybe<Scalars['String']['output']>;
};

export type WhiteBlackAddressOpts = {
  _content: Scalars['String']['input'];
  op?: InputMaybe<Scalars['String']['input']>;
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
  ordwk?: Maybe<Scalars['Int']['output']>;
};

export type WkDayInput = {
  day: Weekday;
  ordwk?: InputMaybe<Scalars['Int']['input']>;
};

export type WorkingHours = {
  __typename?: 'WorkingHours';
  busy?: Maybe<Array<Maybe<WorkingHoursInstance>>>;
  free?: Maybe<Array<Maybe<WorkingHoursInstance>>>;
  id: Scalars['ID']['output'];
  nodata?: Maybe<Array<Maybe<WorkingHoursInstance>>>;
  tentative?: Maybe<Array<Maybe<WorkingHoursInstance>>>;
  unavailable?: Maybe<Array<Maybe<WorkingHoursInstance>>>;
};

export type WorkingHoursInstance = {
  __typename?: 'WorkingHoursInstance';
  end?: Maybe<Scalars['Float']['output']>;
  start?: Maybe<Scalars['Float']['output']>;
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
  content?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ZimletPref = {
  __typename?: 'ZimletPref';
  name?: Maybe<Scalars['String']['output']>;
  presence?: Maybe<Scalars['String']['output']>;
};

export type ZimletPreferenceInput = {
  name: Scalars['String']['input'];
  presence: Scalars['String']['input'];
};

export enum ZimletPresence {
  Disabled = 'disabled',
  Enabled = 'enabled',
  Mandatory = 'mandatory'
}

export type HabRootId = {
  __typename?: 'habRootId';
  _content?: Maybe<Scalars['String']['output']>;
};

export type MessagePartForDocument = {
  attachmentPart: Scalars['String']['input'];
  messageId: Scalars['ID']['input'];
};

export type UploadDocument = {
  id: Scalars['ID']['input'];
};
