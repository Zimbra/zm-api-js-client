import { ErrorLink } from '@apollo/client/link/error';

class ZimbraErrorLink extends ErrorLink {
	handlers: any[] = [];

	constructor() {
		super(error => {
			const { graphQLErrors, networkError } = error;
			// Handle GraphQL errors
			const errorList = graphQLErrors || (networkError as any)?.errors || [];
			if (errorList && errorList.length > 0) {
				errorList.map((graphQLError: any) => {
					const { message, ...rest } = graphQLError;
					const originalError = graphQLError.originalError;
					const errorCode = (originalError as any)?.faults?.[0]?.Detail?.Error?.Code || '';

					this.executeHandlers({
						errorCode,
						message,
						originalError,
						...rest
					});
				});
			} else if (networkError) {
				// Handle network error
				this.executeHandlers({
					message: `[Network error]: ${networkError}`
				});
			}
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
