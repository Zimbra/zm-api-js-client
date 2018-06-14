import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import get from 'lodash/get';

const ZimbraErrorLink: ApolloLink = onError(
	({ graphQLErrors, networkError }) => {
		graphQLErrors &&
			graphQLErrors.map(({ message, originalError, ...rest }) => {
				let errorCode = get(originalError, 'faults.0.Detail.Error.Code', '');

				console.error(errorCode ? `${errorCode} : ${message}` : message, rest);
			});

		networkError && console.error(`[Network error]: ${networkError}`);
	}
);

export { ZimbraErrorLink };
