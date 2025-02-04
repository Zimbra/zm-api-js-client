import { ErrorLink } from '@apollo/client/link/error';
import { GraphQLFormattedError } from 'graphql';
import get from 'lodash/get';

interface CustomGraphQLError extends GraphQLFormattedError {
	originalError?: any;
}
class ZimbraErrorLink extends ErrorLink {
	handlers: any[] = [];

	constructor() {
		super(({ graphQLErrors, networkError }) => {
			graphQLErrors &&
				graphQLErrors.map(({ message, originalError, ...rest }: CustomGraphQLError) => {
					let errorCode = get(originalError, 'faults.0.Detail.Error.Code', '');

					this.executeHandlers({
						errorCode,
						message,
						originalError,
						...rest
					});
				});

			networkError &&
				this.executeHandlers({
					message: `[Network error]: ${networkError}`
				});
		});
	}

	executeHandlers = (data: object) => {
		this.handlers.map(handler => {
			handler(data);
		});
	};

	registerHandler = (handler: any) => {
		this.handlers.push(handler);
	};

	unRegisterAllHandlers = () => {
		this.handlers = [];
	};

	unRegisterHandler = (handler: any) => {
		const index = this.handlers.findIndex(handler);
		index !== -1 && this.handlers.splice(index, 1);
	};
}

export { ZimbraErrorLink };
