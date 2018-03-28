# zm-api-js-client
A GraphQL client for making requests against the Zimbra SOAP API.

### Install

```
npm install @zimbra/api-client
```

---

## Features

### Schema

A GraphQL Schema that maps Zimbra SOAP resources to GraphQL types is a core tenant of Zimbra GraphQL. This schema includes many of the common resources used in Zimbra SOAP commands such as `Search`, or `GetFolder`.

### Transparent Batching

**Zimbra GraphQL batches requests by default**. Using two complementary techniques, [Query Batching](https://www.apollographql.com/docs/react/basics/network-layer.html#query-batching) and [DataLoader](https://github.com/facebook/dataloader), batching happens automatically and is transparent to the API consumer. When combining this with Apollo's cache, this results in the minimal number of requests and very high network performance.

### Apollo Utilities

Zimbra GraphQL exposes utilities for use with [Apollo](https://www.apollographql.com/docs/react/) so that it's a breeze to connect an application to Zimbra GraphQL.

### Normalization and Attribute Mapping

Many of the attributes in Zimbra SOAP are tersely named. Zimbra GraphQL includes a minimal normalization layer that (a) renames some keys for more clarity, and (b) does some light lossless normalization for things like Booleans (which are strings in Zimbra SOAP).

### Session Header Notification Support (Realtime Updates)

Change notifications via [Session Headers](https://github.com/Zimbra/zm-mailbox/blob/aab51130f1ac3032d7b93863bd42c965d679091c/store/docs/soap.txt#L100) keeps the client in sync with changes made elsewhere. This is fully supported. The initial implementation handles a few common resource changes and inserts them into the cache.

### GraphiQL Support

When running the [`zm-x-web` app](https://github.com/Zimbra/zm-x-web), a GraphiQL server is exposed at `/graphiql`. This is incredibly powerful for exploring and debugging a schema. Documentation for queries, mutations, and fields all lives right within GraphiQL. This is powered internally by Zimbra GraphQL and Apollo. Visit `/graphql` and check it out!

### TypeScript Support

Zimbra GraphQL is written in TypeScript and **exposes types for the GraphQL queries and mutations**. This is a powerful tool when used in application code. It enables type checking for the complex API data types used in Zimbra. In addition, it's completely transparent to use Zimbra GraphQL with plain JavaScript — you just lose the benefits of typed queries.

### Better Error Handling

Batch and SOAP request `Fault` errors are now handled properly and exposed through GraphQL as you would expect.

## Design Goals

A few design goals outline how Zimbra GraphQL works:

#### There should be minimal GraphQL abstraction over Zimbra SOAP resources

Long-term the schema is evolving towards GraphQL queries and mutations mapping roughly 1-to-1 to SOAP commands. It's up to the application code to provide abstraction over the data itself. This is for a few reasons:

* Caching is more efficient because actual requests map well to cached data
* The [SOAP API Documentation](https://files.zimbra.com/docs/soap_api/8.7.11/api-reference/index.html). [SOAP Readme Document](https://github.com/Zimbra/zm-mailbox/blob/develop/store/docs/soap.txt), and other resources such as the [Search Tips](https://wiki.zimbra.com/wiki/Zimbra_Web_Client_Search_Tips) are all useful in the context of making a GraphQL request

**Provide a straight forward way to add new functionality**

Adding to the API is simplified and now involves only a few steps:

* Ensure the types you need are in the [schema](src/schema/schema.graphql)
* Design your query/mutation in application code
* Add the associated simplified resolving function for your query/mutation to [the resolvers](src/schema/schema.ts)
* Add any attribute mapping needed to the [entities declaration](src/normalize/entities.ts)

**Provide type safety if possible**

Aforementioned, type safety is a powerful tool when combined with GraphQL.

## Usage

### With Apollo

```javascript
import ApolloClient from 'apollo-client';
import { createZimbraSchema } from 'zimbra-graphql';
import { LocalBatchLink, ZimbraInMemoryCache } from 'zimbra-graphql/apollo';

// Create the Zimbra Apollo Cache
const cache = new ZimbraInMemoryCache();
// Pass a reference to the cache to the schema creation for session header (realtime) support
// Returns the schema and a reference to the underlying batch client
const { schema /*, client */ } = createZimbraSchema({ cache });
const link = new LocalBatchLink({ schema });
const apolloClient = new ApolloClient({ link, cache });
```

```javascript
<ApolloProvider client={apolloClient}>/* children */</ApolloProvider>
```

### Using the client directly

Under normal use with GraphQL, you should be using `createZimbraSchema`. However, you can also access the batch client directly.

```javascript
import { ZimbraBatchClient } from 'zimbra-graphql/client';

const client = new ZimbraBatchClient();

// Use a top-level API method

client.search(searchOptions).then(response => {
	console.log(response);
});

// Or use `jsonRequest` directly

client
	.jsonRequest({
		name: 'GetInfo',
		namespace: Namespace.Account
	})
	.then(response => {
		console.log(response);
	});
```

In addition, the request primitives are also available:

```javascript
import { jsonRequest, batchJsonRequest } from 'zimbra-graphql/request';
```
