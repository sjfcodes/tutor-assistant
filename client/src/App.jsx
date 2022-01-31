import React, { useEffect } from 'react';

import { Columns, Container, Section } from 'react-bulma-components';
import { useSelector } from 'react-redux';

import Nav from './components/Nav';
import Footer from './components/Footer';
import BackgroundImage from './components/BackgroundImage';
import Home from './views/Home';
import Landing from './views/Landing';
import './App.sass';
import ApolloProvider from './components/ApolloProvider';
import AuthToken from './components/AuthToken';

const App = () => {
  const { loggedIn } = useSelector((state) => state.tutor);
  useEffect(() => { document.title = 'The Tutor App'; }, []);

  return (
    <ApolloProvider>
      <AuthToken />
      <BackgroundImage url='./images/bg-image.jpg' />
      <Nav />

      <Section renderAs='main' className='p-0'>
        <Container className='is-max-desktop'>
          <Columns centered className='m-0'>
            <Columns.Column
              desktop={{ size: 10 }}
              tablet={{ size: 8 }}
            >
              {loggedIn ? <Home /> : <Landing />}

            </Columns.Column>
          </Columns>
        </Container>
      </Section>
      <Footer className='border-top py-0' />
    </ApolloProvider>
  );
};

export default App;
