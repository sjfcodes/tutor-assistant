import { func } from 'prop-types';
import React, { useContext } from 'react';
import { Navbar } from 'react-bulma-components';
import { ModalContext } from '../../context';
import { SettingsModal } from '../Modals';

// eslint-disable-next-line no-unused-vars
export const SettingsMenu = ({ toggleNavBurger }) => {
  const { setOpenModal } = useContext(ModalContext);

  return (
    <>
      <Navbar.Item renderAs='div' className='has-dropdown is-hoverable'>
        <Navbar.Link>
          Settings
        </Navbar.Link>
        <Navbar.Dropdown>
          <Navbar.Item
            onClick={() => setOpenModal('settings')}
          >
            All
          </Navbar.Item>
          {/* <Navbar.Item
            onClick={() => setOpenModal('settings')}
          >
            Courses
          </Navbar.Item>
          <Navbar.Item
            onClick={() => setOpenModal('settings')}
          >
            Students
          </Navbar.Item>
          <Navbar.Item
            onClick={() => setOpenModal('settings')}
          >
            Meetings
          </Navbar.Item> */}
        </Navbar.Dropdown>
      </Navbar.Item>
      <SettingsModal />
    </>
  );
};
export default SettingsMenu;

SettingsMenu.propTypes = {
  toggleNavBurger: func.isRequired,

};
