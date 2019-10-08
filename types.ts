export * from './src/schema/generated-schema-types';
export { ActionType, ActionResultType } from './src/batch-client/types';

export enum MailFolderView {
	conversation = 'conversation',
	message = 'message'
}

export enum MessageFlags {
	unread = 'u',
	flagged = 'f',
	hasAttachment = 'a',
	replied = 'r',
	sentByMe = 's',
	forwarded = 'w',
	calendarInvite = 'v',
	draft = 'd',
	imapDeleted = 'x',
	notificationSent = 'n',
	urgent = '!',
	lowPriority = '?',
	priority = '+'
}

export enum ActionOps {
	update = 'update',
	delete = 'delete',
	read = 'read',
	unread = '!read',
	flag = 'flag',
	unflag = '!flag',
	tag = 'tag',
	untag = '!tag',
	move = 'move',
	spam = 'spam',
	unspam = '!spam',
	trash = 'trash'
}

export enum _MessageActionOps {
	update = 'update'
}

export type MessageActionOps = ActionOps | _MessageActionOps;

export enum _ConversationActionOps {
	priority = 'priority'
}

export type ConversationActionOps = ActionOps | _ConversationActionOps;
