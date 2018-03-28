import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';

const PARTIAL_SUPPORT = ['getContactFrequency', 'relatedContacts'];

const ZimbraErrorLink: ApolloLink = onError(
	({ operation, response, graphQLErrors }) => {
		if (
			graphQLErrors &&
			PARTIAL_SUPPORT.indexOf(operation.operationName) !== -1
		) {
			graphQLErrors.map(({ message, path }) =>
				console.log(`[Unsupported API]: ${message}, Path: ${path}`)
			);
			if (response) {
				response.errors = undefined;
			}
		}
	}
);

export { ZimbraErrorLink };
