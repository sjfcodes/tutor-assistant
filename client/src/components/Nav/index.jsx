/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { Button, Navbar, Section } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';

import { SET_TUTOR_LOGOUT } from '../../store/tutor/actions';
import { EMAIL_TEMPLATES_MODAL, SETTINGS_MODAL, SET_OPEN_MODAL } from '../../store/view/actions';
import { collapseNavbar, preventBodyScroll } from '../../utils';
import './style.css';

const Nav = () => {
  const {
    tutor,
    calendlyMeetings,
    view: { openModal },
    courses: { allCourses, selectedCourse },
  } = useSelector((state) => state);

  const { loggedIn, firstName, lastName } = tutor;
  const dispatch = useDispatch();

  const displayState = () => {
    console.group('context');
    console.log('~ tutor ~');
    console.log(tutor);
    console.log('~ allCourses ~');
    console.log(allCourses);
    console.log('~ selectedCourse ~');
    console.log(allCourses[selectedCourse]);
    console.log('~ calendlyMeetings ~');
    console.log(calendlyMeetings);
    console.groupEnd('context');
  };

  const logoutTutor = () => {
    dispatch({ type: SET_TUTOR_LOGOUT });
    window.location.href = '/';
  };

  useEffect(() => {
    preventBodyScroll(!!openModal);
    if (openModal) collapseNavbar();
  }, [openModal]);

  useEffect(() => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
    // Add a click event on each of them
    if ($navbarBurgers.length > 0) $navbarBurgers.forEach((el) => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const { target } = el.dataset;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
        preventBodyScroll(el.classList.contains('is-active'));
      });
    });
  }, [loggedIn]);

  const openSettingsModal = () => dispatch(
    { type: SET_OPEN_MODAL, payload: SETTINGS_MODAL },
  );
  const openEmailTemplatesModal = () => dispatch(
    { type: SET_OPEN_MODAL, payload: EMAIL_TEMPLATES_MODAL },
  );

  return (
    <Section
      renderAs='header'
      className='border-bottom-light p-0'
    >
      <Navbar className='background-blurred is-transparent'>
        <Navbar.Brand>
          <Navbar.Item
            renderAs='h1'
            className='brand py-0'
            textColor='primary'
            onClick={displayState}
          >
            tutorly
          </Navbar.Item>
          <Navbar.Item
            renderAs='p'
            className='border-left has-text-white'
          >
            {loggedIn ? `${firstName} ${lastName}` : 'Welcome'}
          </Navbar.Item>
          {loggedIn
            ? (
              <Navbar.Burger
                className='has-text-white'
                data-target='navbar-toggle'
              />
            )
            : ''}
        </Navbar.Brand>

        <Navbar.Menu id='navbar-toggle' className='py-0'>
          {/* <Navbar.Container align='left' /> */}
          {loggedIn
            ? (
              <Navbar.Container
                align='right'
                className='background-clear'
              >
                <Navbar.Item
                  renderAs='div'
                  className='has-dropdown is-hoverable'
                  textAlign='right'
                >
                  <Navbar.Item className='navbar-link has-text-primary' />
                  <Navbar.Dropdown
                    right
                    boxed
                    renderAs='div'
                  >
                    <Navbar.Item renderAs='div'>
                      <Button.Group>
                        <Button
                          fullwidth
                          color='primary'
                          onClick={openSettingsModal}
                        >
                          Settings
                        </Button>
                        <Button
                          fullwidth
                          color='primary'
                          onClick={openEmailTemplatesModal}
                        >
                          Email Templates
                        </Button>
                      </Button.Group>
                    </Navbar.Item>
                    <Navbar.Divider />
                    <Navbar.Item renderAs='div'>
                      <Button
                        color='danger'
                        outlined
                        className='logout tag'
                        onClick={logoutTutor}

                      >
                        Logout
                      </Button>
                    </Navbar.Item>
                  </Navbar.Dropdown>
                </Navbar.Item>
              </Navbar.Container>
            )
            : '' }
        </Navbar.Menu>
      </Navbar>
    </Section>
  );
};

export default Nav;
