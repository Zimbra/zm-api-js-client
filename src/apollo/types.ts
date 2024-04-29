import { BatchLink } from '@apollo/client/link/batch';
import { GraphQLSchema } from 'graphql';

export interface LocalBatchLinkOptions extends BatchLink.Options {
	context?: any;
	schema: GraphQLSchema;
}

export interface EmailAddress {
	__typename?: 'EmailAddress';
	address?: string;
	displayName?: string;
	isGroup?: boolean | null;
	name?: string;
	type?: string;
}
