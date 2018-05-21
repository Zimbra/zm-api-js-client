import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';

const ZimbraErrorLink: ApolloLink = onError(({ graphQLErrors }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message, path }) =>
			console.log(`[Unsupported API]: ${message}, Path: ${path}`)
		);
	}
});

export { ZimbraErrorLink };
