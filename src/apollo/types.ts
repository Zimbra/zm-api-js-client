import { BatchLink } from '@apollo/link-batch';
import { GraphQLSchema } from 'graphql/type';

export interface LocalBatchLinkOptions extends BatchLink.Options {
	context?: any;
	schema: GraphQLSchema;
}
