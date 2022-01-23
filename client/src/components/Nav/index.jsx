/* eslint-disable no-console */
import React, {
  useContext, useEffect,
} from 'react';
import { Button, Navbar } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';

import { ModalContext } from '../../context';
import { LOGOUT_TUTOR } from '../../store/tutor/actions';
import { preventBodyScroll } from '../../utils';
import './style.css';

const Nav = () => {
  const {
    tutor,
    calendlyMeetings,
    courses: { allCourses, selectedCourse },
  } = useSelector((state) => state);

  const { loggedIn, firstName, lastName } = tutor;
  const { setOpenModal } = useContext(ModalContext);
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
    dispatch({ type: LOGOUT_TUTOR });
    window.location.href = '/';
  };

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

  return (
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
                        onClick={() => setOpenModal('Settings')}
                      >
                        Settings
                      </Button>
                      <Button
                        fullwidth
                        color='primary'
                        onClick={() => setOpenModal('EmailTemplates')}
                      >
                        Email Templates
                      </Button>
                    </Button.Group>
                  </Navbar.Item>
                  <Navbar.Divider />
                  <Navbar.Item
                    renderAs='a'
                    textColor='danger'
                    textAlign='right'
                    className='logout'
                    onClick={logoutTutor}
                  >
                    Logout
                  </Navbar.Item>
                </Navbar.Dropdown>
              </Navbar.Item>
            </Navbar.Container>
          )
          : '' }
      </Navbar.Menu>
    </Navbar>
  );
};

export default Nav;
