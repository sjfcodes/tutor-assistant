/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Columns, Container, Section } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';

import Nav from './components/Nav';
import Footer from './components/Footer';
import BackgroundImage from './components/BackgroundImage';
import Home from './views/Home';
import Landing from './views/Landing';
import { loginWithToken } from './utils';
import { LOGIN_TUTOR } from './store/tutor/actions';
import { SET_ALL_COURSES } from './store/courses/actions';
import { LOCAL_STORAGE_KEY } from './config';
import './App.sass';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the
// JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(LOCAL_STORAGE_KEY);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink`
  // middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.tutor);
  const prevToken = localStorage.getItem(LOCAL_STORAGE_KEY);

  // useEffect(() => {
  //   document.title = 'The Tutor App';
  //   if (loggedIn || !prevToken) return;

  //   const loginUser = async (lsToken) => {
  //     try {
  //       const { tutor, token } = await loginWithToken(lsToken);
  //       if (!tutor || !token) return;

  //       dispatch({
  //         type: LOGIN_TUTOR,
  //         payload: { tutor, token },
  //       });

  //       dispatch({
  //         type: SET_ALL_COURSES,
  //         payload: tutor.courses,
  //       });
  //     } catch (error) {
  //       localStorage.removeItem(LOCAL_STORAGE_KEY);
  //     }
  //   };

  //   loginUser(prevToken);
  // }, [dispatch, loggedIn, prevToken]);

  return (
    <ApolloProvider client={client}>
      <Section
        renderAs='header'
        className='border-bottom-light p-0'
      >
        <Nav />
      </Section>

      <BackgroundImage url='./images/bg-image.jpg' />
      <Section renderAs='main' className='p-0'>
        <Container className='is-max-desktop'>
          <Columns centered className='m-0'>
            <Columns.Column
              desktop={{ size: 10 }}
              tablet={{ size: 8 }}
            >
              {
                loggedIn
                  ? <Home />
                  : <Landing />
              }

            </Columns.Column>
          </Columns>
        </Container>
      </Section>
      <Footer className='border-top py-0' />
    </ApolloProvider>
  );
};

export default App;
