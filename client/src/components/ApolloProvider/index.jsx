import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { LOCAL_STORAGE_KEY } from '../../config';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({ uri: '/graphql' });

// Construct request middleware that will attach the
// JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(LOCAL_STORAGE_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// eslint-disable-next-line react/prop-types
const ApolloProvider = ({ children }) => (
  <Provider client={client}>
    {children}
  </Provider>
);

export default ApolloProvider;
