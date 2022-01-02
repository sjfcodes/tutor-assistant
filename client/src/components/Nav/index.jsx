/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useCallback,
  useContext, useEffect, useState,
} from 'react';
import { Button, Navbar } from 'react-bulma-components';

import { AppContext, ModalContext } from '../../context';
import { logoutTutor } from '../../utils';
// import SettingsMenu from './SettingsMenu';
import './style.css';

const Nav = () => {
  const { tutorDetails } = useContext(AppContext);
  const { loggedIn, firstName, lastName } = tutorDetails;
  const { openModal, setOpenModal } = useContext(ModalContext);
  const [displayNavMenu, setDisplayNavMenu] = useState(false);

  const toggleNavBurger = useCallback((e, forceClose = false) => {
    if (!loggedIn) return '';
    if (forceClose) return setDisplayNavMenu(false);
    return setDisplayNavMenu((curr) => !curr);
  }, [loggedIn]);

  useEffect(() => {
    if (openModal) toggleNavBurger(null, true);
  }, [openModal, toggleNavBurger]);

  return (
    <Navbar className='my-0 border-bottom'>
      <Navbar.Brand>
        <Navbar.Item
          className='pl-3 p-0 pr-0'
          onClick={() => console.log(tutorDetails)}
        >
          <h1 className='brand'>tutorly</h1>
        </Navbar.Item>
        <Navbar.Item
          renderAs='div'
          className='pl-2'
        >
          <p className='pl-2 py-1 border-left'>{loggedIn ? `${firstName} ${lastName}` : 'Welcome'}</p>
        </Navbar.Item>
        <Navbar.Burger onClick={toggleNavBurger} />
      </Navbar.Brand>

      <Navbar.Menu id='navMenu' className={`border-top ${displayNavMenu ? 'is-active' : ''}`}>

        {
          loggedIn && (
            <div className='navbar-end is-flex is-justify-content-space-evenly'>
              {/* <img src='https://bulma.io/images/bulma-logo.png' width='112' height='28' alt='bulma logo' /> */}
              {/* <SettingsMenu toggleNavBurger={toggleNavBurger} /> */}
              <Navbar.Item
                renderAs='div'
                className=''
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
          )
        }
      </Navbar.Menu>
    </Navbar>
  );
};

export default Nav;
