import React, { useContext, useEffect } from 'react';
import { Button, Level, Navbar } from 'react-bulma-components';

import { AppContext, ModalContext } from '../../context';
import { logoutTutor } from '../../utils';
import { Settings } from '../Modals';
import './style.css';

const {
  Brand, Item: NavbarItem, Burger, Menu: NavbarMenu,
} = Navbar;

const Nav = () => {
  const { tutorDetails } = useContext(AppContext);
  const { loggedIn, firstName } = tutorDetails;
  const { openModal, setOpenModal } = useContext(ModalContext);

  const toggleNavBurger = (forceClose = false) => {
    const navBurger = document.getElementById('nav-burger');
    const navMenu = document.getElementById('nav-menu');

    if (forceClose) {
      navBurger.classList.remove('is-active');
      navMenu.classList.remove('is-active');
      return;
    }

    navBurger.classList.toggle('is-active');
    navMenu.classList.toggle('is-active');
  };

  const handleAvatarClick = () => {
    console.warn(tutorDetails);
  };

  useEffect(() => {
    toggleNavBurger(true);
  }, [openModal]);

  return (
    <Navbar>
      <Brand>
        <NavbarItem href='/' className=' py-0'>
          <h1 className='brand'>tutor.me</h1>
        </NavbarItem>
        {loggedIn && (
          <>
            <NavbarItem className='pl-0'>
              Welcome,
              {' '}
              {firstName}
            </NavbarItem>
            <NavbarItem>
              <button
                type='button'
                className='avatar'
                onClick={handleAvatarClick}
              >
                <img
                  alt='user avatar'
                  src='https://i.imgur.com/zEvf4P4.jpg'
                />
              </button>
            </NavbarItem>
          </>
        )}
        <Burger
          id='nav-burger'
          className=''
          onClick={() => toggleNavBurger()}
        />
      </Brand>
      <NavbarMenu id='nav-menu'>
        {loggedIn && (
          <Level renderAs='div'>
            <Level.Side align='left' />
            <Level.Side align='right'>
              <Button.Group>
                <Button
                  size='small'
                  color='warning'
                  outlined
                  className='is-light'
                  onClick={logoutTutor}
                >
                  Logout
                </Button>
                <Button
                  size='small'
                  color='info'
                  outlined
                  className='is-light'
                  onClick={() => setOpenModal('settings')}
                >
                  Settings
                </Button>
              </Button.Group>
            </Level.Side>
            <Settings />
          </Level>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default Nav;
