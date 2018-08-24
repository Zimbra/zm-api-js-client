
# offline-queue-link

This link expands on the work of [`apollo-link-queue`](https://github.com/helfer/apollo-link-queue) with added persistence and extended control over queued operations. Special thanks to all who contributed to the discussion going on at [`apollo-link-offline`](https://github.com/benseitz/apollo-link-offline).

**Open/Closed Gate**

As described by `apollo-link-queue`:

> An Apollo Link that acts as a gate and queues requests when the gate is closed. This can be used when there is no internet connection or when the user has explicitly set an app to offline mode.

**Persistence**

Whenever the queue is modified, a serialized copy is written to backing storage. The serialized operations can be consumed at a later time by a third party, see `sync-offline-mutation`.

**Queue Control**

New operations entering the queue have the ability to specify how they should affect the existing queue. This allows a newer operation to drop older operations from the queue. For example, creating and then deleting a resource while offline SHOULD result in zero network requests because they have cancelled each other out.

### Usage

Create the link and add it to your link chain. Then add an event listener for the `online` and `offline` events to trigger `open` and `close`:

```js
import { OfflineQueueLink } from '@zimbra/api-client';

const storeKey = '@offlineQueueKey';
const storage = window.localStorage;

// Create the queue and create a client with it
const offlineQueueLink = new OfflineQueueLink({
	storeKey, // optional
	storage // required
});

const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
	link: offlineQueueLink
});

// Add event listeners to open/close the link
['online', 'offline'].forEach((event) =>
	window.addEventListener(event, () => {
		if (navigator.onLine) {
			offlineQueueLink.open({ apolloClient });
		}
		else {
			offlineQueueLink.close();
		}
	})
);
```

Control over the queue is achieved using context arguments. Queued operations can be deduped such that only the **last** mutation is processed, or queued operations can be cancelled by newer operations, or the queue can be skipped entirely.


| Property | Type | Description |
| ------------- | ------------- | ------------- |
| `offlineQueueName?` | `string` | A unique name for deduplicating and cancelling operations. Only the final operation of any given name will be executed. Recommended value: `${operation.operationName}:${operation.variables.id}`. |
| `cancelQueues?` | `string \| string[]` | A list of `offlineQueueName` that should be cancelled by this operation. |
| `skipQueue?` | `boolean` | When true, the operation will not be queued. **Operations with sensitive data (passwords, personally identifiable information) MUST skip the queue because they are not safe to be persisted in plain text. Operations with a value set for `variables.password` will automatically skip the queue.** |


### Examples

**Deduplicating Operations**

Example of a mutation operation where only the most recent operation will be executed:

```js
/**
 * When saving drafts, only save the latest copy of the draft and drop all others.
 */
@graphql(SaveDraftMutation, {
	props: ({ mutate }) => ({
		saveDraft: (message) => mutate({
			context: {
				// This operation will cancel any previous operations with the same key.
				offlineQueueName: `saveDraft:${message.id}`
			},
			variables: {
				message
			}
		})
	})
});
```

**Cancelling Operations**

Example of a mutation operation that cancels outstanding operations.

```js
/**
 * When sending a message, cancel outstanding `saveDraft` operations for that message
 */
@graphql(SendMessageMutation, {
	props: ({ mutate }) => ({
		sendMessage: (message) => mutate({
			context: {
				// This operation will CANCEL the operation associated with `saveDraft:${message.id}`
				cancelQueue: `saveDraft:${message.id}`
			},
			variables: {
				message
			}
		})
	})
});
```

**Skipping the Queue**

Example of a request that skips the queue entirely. Skipping the queue is useful for operations that should be ignored while offline instead of replayed, e.g. a `logout` operation.

**Operations with passwords or personally identifiable information MUST skip the queue so that sensitive data is not written to storage in plaintext.**

```js
/**
 * When calling `resetPassword`, skip the queue to avoid storing password
 * variables in plaintext
 */
@graphql(ResetPasswordMutation, {
	props: ({ mutate }) => ({
		resetPassword: ({ password, newPassword, confirmNewPassword ) => mutate({
			context: {
				// This operation will skip the queue and never be replayed or persisted
				skipQueue: true
			},
			variables: {
				password,
				newPassword,
				confirmNewPassword
			}
		})
	})
});
```
