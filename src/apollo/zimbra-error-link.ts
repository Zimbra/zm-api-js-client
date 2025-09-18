import { ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import get from 'lodash/get';

class ZimbraErrorLink extends ApolloLink {
	handlers: any[] = [];

	constructor() {
		super();
	}

	executeHandlers = (data: object) => {
		this.handlers.map(handler => {
			handler(data);
		});
	};

	registerHandler = (handler: any) => {
		this.handlers.push(handler);
	};

	request(operation: any, forward: any) {
		return onError((error: any) => {
			const { graphQLErrors, networkError } = error;
			graphQLErrors &&
				graphQLErrors.map(({ message, originalError, ...rest }: any) => {
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
		}).request(operation, forward);
	}

	unRegisterAllHandlers = () => {
		this.handlers = [];
	};

	unRegisterHandler = (handler: any) => {
		const index = this.handlers.findIndex(handler);
		index !== -1 && this.handlers.splice(index, 1);
	};
}

export { ZimbraErrorLink };
