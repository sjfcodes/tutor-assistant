/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { Button, Navbar } from 'react-bulma-components';

import { AppContext, ModalContext } from '../../context';
import { logoutTutor } from '../../utils';
import { MeetingDate, TimeZoneAbbreviation } from '../DateTime';
// import SettingsMenu from './SettingsMenu';
import './style.css';

const Nav = () => {
  const { tutorDetails } = useContext(AppContext);
  const { loggedIn, timeZoneName } = tutorDetails;
  const { openModal, setOpenModal } = useContext(ModalContext);
  const [displayNavMenu, setDisplayNavMenu] = useState(false);

  const getCurrentTime = useCallback(() => (
    <MeetingDate
      iso8601={new Date().toISOString()}
    />
  ), []);

  const [date, setDate] = useState(getCurrentTime());

  const toggleNavBurger = (e, forceClose = false) => {
    if (forceClose) return setDisplayNavMenu(false);
    return setDisplayNavMenu((curr) => !curr);
  };

  useEffect(() => {
    if (openModal) toggleNavBurger(null, true);
  }, [openModal]);

  useEffect(() => {
    let isMounted = true;

    setTimeout(() => {
      if (isMounted) setDate(getCurrentTime());
    }, 1000);

    return () => {
      isMounted = false;
    };
  }, [date, getCurrentTime]);

  return (
    <Navbar className='my-0'>
      <Navbar.Brand>
        <Navbar.Item
          className='py-0'
          onClick={() => console.log(tutorDetails)}
        >
          <h1 className='brand'>tutorly</h1>
        </Navbar.Item>
        <Navbar.Item
          renderAs='h1'
          className='px-0'
        >
          {date}
        </Navbar.Item>
        <Navbar.Item
          className='pl-1'
        >
          <TimeZoneAbbreviation timeZone={timeZoneName} className='is-size-7 has-text-grey' />
        </Navbar.Item>
        <Navbar.Burger onClick={toggleNavBurger} />
      </Navbar.Brand>

      <Navbar.Menu id='navMenu' className={displayNavMenu ? 'is-active' : ''}>

        {
          loggedIn ? (
            <div className='navbar-end is-flex is-justify-content-flex-end'>
              {/* <img src='https://bulma.io/images/bulma-logo.png' width='112' height='28' alt='bulma logo' /> */}
              {/* <SettingsMenu toggleNavBurger={toggleNavBurger} /> */}
              <Navbar.Item
                renderAs='div'
              >
                <Button
                  color='primary'
                  className='tag is-rounded'
                  onClick={() => setOpenModal('settings')}
                >
                  Settings
                </Button>
              </Navbar.Item>
              <Navbar.Item
                renderAs='div'
              >
                <Button
                  color='danger'
                  className='tag is-rounded'
                  onClick={logoutTutor}
                >
                  Logout
                </Button>
              </Navbar.Item>
            </div>
          ) : (
            <Navbar.Item>
              <h1>~</h1>
            </Navbar.Item>
          )
        }
      </Navbar.Menu>
    </Navbar>
  );
};

export default Nav;
