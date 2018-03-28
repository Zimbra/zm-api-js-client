export * from './src/schema/generated-schema-types';
export { ActionType, ActionResultType } from './src/batch-client/types';

export const ReadingPaneSashHorizontalDefault = 50;

export enum MailFolderView {
	conversation = 'conversation',
	message = 'message'
}

export enum PrefMailSelectAfterDelete {
	next = 'next',
	previous = 'previous',
	adaptive = 'adaptive'
}

export enum ActionOps {
	delete = 'delete',
	read = 'read',
	unread = '!read',
	flag = 'flag',
	unflag = '!flag',
	tag = 'tag',
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
