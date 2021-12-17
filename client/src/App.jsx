import React, { useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Container, Section } from 'react-bulma-components';
import { Nav, Footer, BackgroundImage } from './components';
import { Home, Landing } from './pages';
import { AppContext } from './context';
import './App.sass';

const App = () => {
  const navigate = useNavigate();
  const { tutorDetails } = useContext(AppContext);
  const { loggedIn, githubUsername } = tutorDetails;

  useEffect(() => {
    if (!loggedIn) return navigate('/');
    navigate(`/${githubUsername}`);
    return '';
  }, [loggedIn, githubUsername, navigate, tutorDetails]);

  return (
    <>
      <Section renderAs='header' className='p-0'>
        <Nav />
      </Section>

      <Section renderAs='main' className='p-0'>
        <BackgroundImage url='./images/bg-image.jpg' />
        <Container className='is-max-desktop'>
          <Routes>
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
