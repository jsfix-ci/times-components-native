import { NativeModules } from "react-native";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { fragmentMatcher } from "@times-components-native/schema";

const {
  NativeFetch,
  ReactConfig: { graphqlEndPoint },
} = NativeModules;

const link = NativeFetch
  ? createHttpLink({
      fetch: (uri, opts) =>
        NativeFetch.fetch(uri, opts).then(
          // eslint-disable-next-line no-undef
          responseBody => new Response(responseBody),
        ),
      uri: graphqlEndPoint,
    })
  : createHttpLink({
      uri: graphqlEndPoint,
    });

export default new ApolloClient({
  cache: new InMemoryCache({
    fragmentMatcher,
  }),
  link,
});
