import gql from 'graphql-tag';
import get from 'lodash/get';
import { ZimbraInMemoryCache } from '../apollo/zimbra-in-memory-cache';
import { ZimbraSessionOptions } from './types';

const SESSIONID_GQL_FRAGMENT = gql`
	fragment sessionId on Session {
		id
	}
`;

export class SessionHandler {
	private cache: ZimbraInMemoryCache;
	private sessionIdKey: string = 'sessionId';

	constructor(options: ZimbraSessionOptions) {
		this.cache = options.cache;
	}

	public readSessionId = () => {
		const sessionIdFragment: any = this.cache.readFragment({
			id: this.sessionIdKey,
			fragment: SESSIONID_GQL_FRAGMENT
		});
		return get(sessionIdFragment, 'id') || '1';
	};

	public writeSessionId = (sessionId: string) => {
		this.cache.writeFragment({
			id: this.sessionIdKey,
			fragment: SESSIONID_GQL_FRAGMENT,
			data: {
				id: sessionId,
				__typename: 'Session'
			}
		});
	};
}
