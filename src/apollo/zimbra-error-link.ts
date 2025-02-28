import { ErrorLink } from '@apollo/client/link/error';
import { GraphQLFormattedError } from 'graphql';
import get from 'lodash/get';

class ZimbraErrorLink extends ErrorLink {
	handlers: any[] = [];

	constructor() {
		super(({ graphQLErrors, networkError }) => {
			graphQLErrors &&
				graphQLErrors.map((error: GraphQLFormattedError) => {
					const { message, extensions, ...rest } = error;
					let errorCode = get(extensions, 'faults.0.Detail.Error.Code', '');

					this.executeHandlers({
						errorCode,
						message,
						extensions,
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
