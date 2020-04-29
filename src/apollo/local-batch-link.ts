import {
	ApolloLink,
	FetchResult,
	Observable,
	Operation
} from '@apollo/client/core';
import { BatchLink } from '@apollo/link-batch';
import { graphql } from 'graphql';
import { print } from 'graphql/language/printer';
import events from 'mitt';

import { LocalBatchLinkOptions } from './types';

export class LocalBatchLink extends ApolloLink {
	public off: any;
	public on: any;
	public schema: any;
	private batcher: BatchLink;

	constructor(options: LocalBatchLinkOptions) {
		super();
		this.schema = options.schema;
		const notifier: any = new (events as any)();
		this.on = notifier.on;
		this.off = notifier.off;

		const batchHandler = (operations: Operation[]) =>
			new Observable<FetchResult[]>(observer => {
				notifier.emit('req', operations);
				let emittedResponse = false;
				Promise.all(
					operations.map((operation: Operation) => {
						const query = print(operation.query);
						const { operationName, variables = {} } = operation;

						return graphql(
							this.schema,
							query,
							null,
							operation.getContext() || options.context || {},
							variables,
							operationName
						);
					})
				)
					.then((results: FetchResult[]) => {
						(emittedResponse = true) && notifier.emit('res', results);
						// we have data and can send it to back up the link chain
						observer.next(results);
						observer.complete();
						return results;
					})
					.catch(err => {
						emittedResponse || notifier.emit('res', err);
						observer.error(err);
					});
			});

		this.batcher = new BatchLink({
			batchInterval: options.batchInterval,
			batchHandler
		});
	}

	request(operation: Operation): Observable<FetchResult> | null {
		return this.batcher.request(operation);
	}
}
