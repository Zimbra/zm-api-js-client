import { Operation } from '@apollo/client';
import { OfflineOperationEntry, OperationEntry } from './types';

export function hasSensitiveVariables(operation: Operation) {
	return !!operation?.variables?.password;
}

export function isMutationOperation({ query }: Operation) {
	return (
		query &&
		query.definitions &&
		query.definitions.filter((e: any) => e.operation === 'mutation').length > 0
	);
}

export function deriveOfflineQueue(
	operationQueue: Array<OperationEntry>
): Array<OfflineOperationEntry> {
	return operationQueue.map(({ operation: { query, variables } }: OperationEntry) => ({
		[isMutationOperation(<Operation>{ query }) ? 'mutation' : 'query']: query,
		variables
	}));
}
