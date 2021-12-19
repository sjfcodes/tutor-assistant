import React, { useEffect, useContext } from 'react';
import {
  Routes, Route, useNavigate, useLocation,
} from 'react-router-dom';
import { Container, Section } from 'react-bulma-components';
import { Nav, Footer, BackgroundImage } from './components';
import { Home, Landing, EmailTemplateManager } from './pages';
import { AppContext } from './context';
import './App.sass';

const App = () => {
  const navigate = useNavigate();
  const { tutorDetails } = useContext(AppContext);
  const { loggedIn, githubUsername } = tutorDetails;
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/' && !loggedIn) return navigate('/');
    if (location.pathname === '/' && githubUsername) navigate(`/${githubUsername}`);

    // if (location.pathname === '/' && githubUsername) navigate('/email');
    return '';
  }, [loggedIn, githubUsername, navigate, tutorDetails, location.pathname]);

  return (
    <>
      <BackgroundImage url='./images/bg-image.jpg' />
      <Section renderAs='header' className='p-0'>
        <Nav />
      </Section>

      <Section renderAs='main'>
        <Container className='is max-desktop'>
          <Routes>
            <Route exact path='/email' element={<EmailTemplateManager />} />
            <Route path='/:tutor' element={<Home />} />
            <Route path='/' element={<Landing />} />
          </Routes>
        </Container>
      </Section>

      <Footer />
    </>
  );
};

export default App;
