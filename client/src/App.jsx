import React, { useEffect } from 'react';
import { Columns, Container, Section } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';

import Nav from './components/Nav';
import Footer from './components/Footer';
import BackgroundImage from './components/BackgroundImage';
import Dashboard from './views/Dashboard';
import Landing from './views/Landing';
import { loginWithToken } from './utils';
import { LOGIN_TUTOR, LOGOUT_TUTOR } from './store/tutor/actions';
import { SET_ALL_COURSES } from './store/courses/actions';
import './App.sass';
import { getLocalStorageValueFor, TUTOR_AUTH_TOKEN } from './store_local';

const App = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.tutor);
  const previousToken = getLocalStorageValueFor({ key: TUTOR_AUTH_TOKEN });

  useEffect(() => {
    document.title = 'The Tutor App';
    if (loggedIn || !previousToken) return;

    const loginUserWith = async (lsToken) => {
      try {
        const { tutor, token } = await loginWithToken(lsToken);
        if (!tutor || !token) return;

        dispatch({
          type: LOGIN_TUTOR,
          payload: { tutor, token },
        });

        dispatch({
          type: SET_ALL_COURSES,
          payload: tutor.courses,
        });
      } catch (error) {
        dispatch({ type: LOGOUT_TUTOR });
      }
    };

    loginUserWith(previousToken);
  }, [dispatch, loggedIn, previousToken]);

  return (
    <>
      <Section
        renderAs='header'
        className='border-bottom-light p-0'
      >
        <Nav />
      </Section>

      <BackgroundImage url='./images/bg-image.jpg' />
      <div id='app-wrapper'>
        <Section renderAs='main' className='p-0'>
          <Container className='is-max-desktop'>
            <Columns centered className='m-0'>
              <Columns.Column
                desktop={{ size: 10 }}
                tablet={{ size: 8 }}
              >
                {
                  loggedIn
                    ? <Dashboard />
                    : <Landing />
                }

              </Columns.Column>
            </Columns>
          </Container>
        </Section>
        <Footer className='border-top py-0' />
      </div>
    </>
  );
};

export default App;
