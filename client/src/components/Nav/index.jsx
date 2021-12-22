/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
import { Button, Navbar } from 'react-bulma-components';

import { AppContext, ModalContext } from '../../context';
import { logoutTutor } from '../../utils';
// import SettingsMenu from './SettingsMenu';
import './style.css';

const Nav = () => {
  const { tutorDetails } = useContext(AppContext);
  const { loggedIn } = tutorDetails;
  const { openModal, setOpenModal } = useContext(ModalContext);
  const [displayNavMenu, setDisplayNavMenu] = useState(false);

  const toggleNavBurger = (e, forceClose = false) => {
    if (forceClose) return setDisplayNavMenu(false);
    return setDisplayNavMenu((curr) => !curr);
  };

  useEffect(() => {
    if (openModal) toggleNavBurger(null, true);
  }, [openModal]);

  return (
    <Navbar className='my-0'>
      <Navbar.Brand>
        <Navbar.Item className='py-0' onClick={() => console.log(tutorDetails)}>
          <h1 className='brand'>tutor-me.io</h1>
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
                  className='tag is-rounded pt-0'
                  onClick={() => setOpenModal('settings')}
                >
                  . . .
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
