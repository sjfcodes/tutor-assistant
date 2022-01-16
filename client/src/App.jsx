/* eslint-disable no-unused-vars */
import React, { useEffect, useContext } from 'react';
import {
  Routes, Route, useNavigate, useLocation,
} from 'react-router-dom';
import { Columns, Container, Section } from 'react-bulma-components';
import { Nav, Footer, BackgroundImage } from './components';
import { Home, Landing } from './pages';
import { AppContext } from './context';
import './App.sass';
import AllModals from './components/Modals';

const App = () => {
  const navigate = useNavigate();
  const { tutorDetails } = useContext(AppContext);
  const { loggedIn, githubUsername } = tutorDetails;
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/' && !loggedIn) return navigate('/');
    if (location.pathname === '/' && githubUsername) navigate(`/${githubUsername}`);
    return '';
  }, [loggedIn, githubUsername, navigate, tutorDetails, location.pathname]);

  return (
    <>
      <Section
        renderAs='header'
        className='background-dark border-bottom-light p-0'
      >
        <Nav />
      </Section>

      <BackgroundImage url='./images/bg-image.jpg' />

      {loggedIn && <AllModals />}

      <Section renderAs='main' className='background-blurred-dark p-0'>
        <Container className='is-max-desktop'>
          <Columns centered className='m-0'>
            <Columns.Column
              desktop={{ size: 10 }}
              tablet={{ size: 8 }}
            >
              <Routes>
                <Route path='/:tutor' element={<Home />} />
                <Route path='/' element={<Landing />} />
              </Routes>
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
      <Footer className='background-dark border-top py-0' />

    </>
  );
};

export default App;
