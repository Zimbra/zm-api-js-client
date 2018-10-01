
# sync-offline-operations

Execute a list of serialized GraphQL operations as created by `offline-queue-link`.

### Usage

```js
const storeKey = '@offlineQueueKey';
const storage = window.localStorage;

const syncOfflineOperations = new SyncOfflineOperations({
	apolloClient: apolloClient, // required
	storeKey // optional
	storage // required
});

syncOfflineOperations
	// Init will load data: storage.getItem(storeKey)
	.init()
	// Sync will execute all operations found in storage
	.then(syncOfflineOperations.sync);
```
