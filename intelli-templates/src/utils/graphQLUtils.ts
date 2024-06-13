import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  ApolloLink,
} from "apollo-boost";
import { StrapiHeader } from "contexts/interfaces";

/**
 * Function to call graphQL queries
 * @param headersToPass {object} pass the headers in the query
 */

export const configApolloClient = (
  url: string | import("apollo-link-http-common").UriFunction | undefined,
  headertoPass: StrapiHeader,
  strapiClient?: boolean
) => {
  // const settings = getDefaultSettings();
  const httpLink = new HttpLink({
    uri: url,
  });
  const strapiHeader = {
    Authorization: headertoPass,
  };

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: headertoPass,
    });
    return forward(operation);
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });
};

/**
 * @summary The below function is just to make graphql Query
 * @param Query:actual gql Query consisting response field
 * @param variable: the variable is object i.e passed to query
 */
export const graphQlCall = (
  type: string,
  query: any,
  variable?: {},
  url?: string,
  header?: StrapiHeader,
  strapiClient?: boolean
) => {
  let client;
  if (header != undefined && header != null) {
    client = configApolloClient(url, header, true);
  }
  let queryPromise;
  switch (type) {
    case "query":
      queryPromise = client
        ? client.query({
            query: query,
            variables: { ...variable },
          })
        : new Promise((reject) => {
            reject("client is null");
          });
      return queryPromise;
  }
};

/*Below function processes the error occured  during Graphql calls */
export const onGqlError = (err: any) => {
  let snackBarMessage = "";
  if (err && err.graphQLErrors && err.graphQLErrors.length) {
    err.graphQLErrors.forEach((error: { message: string }, index: number) => {
      if (error.message) {
        let errorMessage = error.message.split(":");
        snackBarMessage = snackBarMessage
          ? `${snackBarMessage}, ${index + 1}. ${
              errorMessage.length > 1 ? errorMessage[1] : errorMessage[0]
            }`
          : `${index + 1}. ${
              errorMessage.length > 1 ? errorMessage[1] : errorMessage[0]
            }`;
      }
    });
  } else {
    snackBarMessage = "Please try again after some time.";
  }
  return snackBarMessage;
};

export const GQLConstants = {
  QUERY: "query",
};
