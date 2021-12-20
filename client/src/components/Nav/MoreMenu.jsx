import { func, string } from 'prop-types';
import React from 'react';
import { Navbar } from 'react-bulma-components';

// eslint-disable-next-line no-unused-vars
export const MoreMenu = ({ displayDropdown, setDisplayDropdown }) => (
  <Navbar.Item renderAs='div' className='has-dropdown is-hoverable'>
    <Navbar.Link>
      More
    </Navbar.Link>

    <Navbar.Dropdown>
      <Navbar.Item href='mailto:samueljasonfox@gmail.com?&subject=tutor.me' target='_blank' rel='noreferrer'>
        Contact
      </Navbar.Item>
      <hr className='navbar-divider' />
      <Navbar.Item className='issue' href='https://github.com/samuelfox1/tutor-assistant/issues' target='_blank' rel='noreferrer'>
        <span>
          Rep
          <i className='fab fa-github is-size-7' />
          rt an issue
        </span>
      </Navbar.Item>
    </Navbar.Dropdown>
  </Navbar.Item>

);
export default MoreMenu;

MoreMenu.propTypes = {
  displayDropdown: string.isRequired,
  setDisplayDropdown: func.isRequired,
};
