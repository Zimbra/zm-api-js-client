import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';

const ZimbraErrorLink: ApolloLink = onError(({ graphQLErrors }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message, ...rest }) =>
			console.error(`[GraphQL]: ${message}:`, rest)
		);
	}
});

export { ZimbraErrorLink };
