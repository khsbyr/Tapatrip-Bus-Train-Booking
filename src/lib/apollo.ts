import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import AuthTokenStorageService from '@services/AuthTokenStorageService';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_HOST,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
    AuthTokenStorageService.getAccessToken() &&
    AuthTokenStorageService.getAccessToken() != 'false'
      ? AuthTokenStorageService.getAccessToken()
      : AuthTokenStorageService.getGuestToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      authorization:
        headers && headers.userToken
          ? `Bearer ${headers.userToken}`
          : token
          ? `Bearer ${token}`
          : '',
    },
  };
});

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.forEach(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
//       ),
//     );

//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
