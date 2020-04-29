import { BatchLink } from '@apollo/client/link/batch';
import { GraphQLSchema } from 'graphql/type';

export interface LocalBatchLinkOptions extends BatchLink.Options {
	context?: any;
	schema: GraphQLSchema;
}
