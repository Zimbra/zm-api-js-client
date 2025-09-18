import { gql } from '@apollo/client';
import get from 'lodash/get';
import { ZimbraInMemoryCache } from '../apollo/zimbra-in-memory-cache';
import { ZimbraSessionOptions } from './types';

const SESSION_GQL_FRAGMENT = gql`
	fragment session on Session {
		id
	}
`;

export class SessionHandler {
	private cache: ZimbraInMemoryCache;
	private cacheKeyForSession: string = 'Session';

	constructor(options: ZimbraSessionOptions) {
		this.cache = options.cache;
	}

	public readSessionId = () => {
		const sessionIdFragment: any = this.cache.readFragment({
			id: this.cacheKeyForSession,
			fragment: SESSION_GQL_FRAGMENT
		});
		return get(sessionIdFragment, 'id') || '1';
	};

	public writeSessionId = (sessionId: string) => {
		this.cache.writeFragment({
			id: this.cacheKeyForSession,
			fragment: SESSION_GQL_FRAGMENT,
			data: {
				id: sessionId,
				__typename: 'Session'
			}
		});
	};
}
