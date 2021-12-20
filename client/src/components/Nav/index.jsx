/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
import { Button, Level, Navbar } from 'react-bulma-components';

import { AppContext, ModalContext } from '../../context';
import { logoutTutor } from '../../utils';
import { LevelSide } from '../BulmaHelpers';
import MoreMenu from './MoreMenu';
import SettingsMenu from './SettingsMenu';
import './style.css';

const {
  Brand, Item: NavbarItem, Burger, Menu: NavbarMenu,
} = Navbar;

const Nav = () => {
  const { tutorDetails } = useContext(AppContext);
  const { loggedIn, firstName } = tutorDetails;
  const { openModal, setOpenModal } = useContext(ModalContext);
  const [displayNavMenu, setDisplayNavMenu] = useState(false);
  const [displayDropdown, setDisplayDropdown] = useState('');

  const toggleNavBurger = (_, forceClose = false) => {
    if (forceClose) return setDisplayNavMenu(false);
    return setDisplayNavMenu((curr) => !curr);
  };

  useEffect(() => {
    if (openModal) toggleNavBurger(null, true);
  }, [openModal]);
  return (
    <Navbar fixed='top'>
      <Navbar.Brand>
        <Navbar.Item className='py-0' onClick={() => console.log(tutorDetails)}>
          <h1 className='brand'>tutor.me</h1>
          {/* <img src='https://bulma.io/images/bulma-logo.png' width='112' height='28' alt='bulma logo' /> */}
        </Navbar.Item>

        <Navbar.Burger onClick={toggleNavBurger} />
      </Navbar.Brand>

      <Navbar.Menu id='navMenu' className={displayNavMenu ? 'is-active' : ''}>
        <div className='navbar-start'>
          <Navbar.Item href='/'>
            Home
          </Navbar.Item>
          <Navbar.Item href='https://github.com/samuelfox1/tutor-assistant/blob/dev/README.md' target='_blank' rel='noreferrer'>
            <span>
              D
              <i className='fab fa-github is-size-7 ' />
              cumentation
            </span>
          </Navbar.Item>
          <MoreMenu
            displayDropdown={displayDropdown}
            setDisplayDropdown={setDisplayDropdown}
          />

          {
            loggedIn && (
              <SettingsMenu
                toggleNavBurger={toggleNavBurger}
                displayDropdown={displayDropdown}
                setDisplayDropdown={setDisplayDropdown}
              />
            )
          }
        </div>

        {
          loggedIn && (
            <div className='navbar-end'>
              <Navbar.Item
                renderAs='div'
                justifyContent='end'
                className='is-flex '
              >
                <Button
                  color='warning'
                  outlined
                  className='is-light'
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
