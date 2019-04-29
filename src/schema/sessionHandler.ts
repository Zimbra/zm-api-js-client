import gql from 'graphql-tag';
import get from 'lodash/get';
import { ZimbraInMemoryCache } from '../apollo/zimbra-in-memory-cache';
import { ZimbraSessionOptions } from './types';

export class SessionHandler {
	private cache: ZimbraInMemoryCache;

	constructor(options: ZimbraSessionOptions) {
		this.cache = options.cache;
	}

	public readSession = () => {
		const sessionIdFragment: any = this.cache.readFragment({
			id: 'sessionId',
			fragment: gql`
				fragment sessionId on Session {
					id
				}
			`
		});
		return get(sessionIdFragment, 'id');
	};

	public writeSession = (sessionId: any) => {
		this.cache.writeFragment({
			id: `sessionId`,
			fragment: gql`
				fragment sessionId on Session {
					id
				}
			`,
			data: {
				id: sessionId,
				__typename: 'Session'
			}
		});
	};
}
