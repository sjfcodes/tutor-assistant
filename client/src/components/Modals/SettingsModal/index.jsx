import React, {
  useState, useEffect, useCallback,
} from 'react';
import {
  Heading, Modal, Tabs,
} from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, SETTINGS_MODAL } from '../../../store/view/actions';
import CourseSettings from './CourseSettings';
import EmailAccess from './EmailAccess';
import ProfileDetailList from './ProfileDetailList';

const SettingsModal = () => {
  const { openModal } = useSelector((state) => state.view);
  const dispatch = useDispatch();
  const [disableControls, setDisableControls] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [component, setComponent] = useState('');

  const handleUpdate = useCallback(
    (e, courseName) => {
      const {
        target: {
          parentNode: { parentNode: { classList } },
        },
      } = e;

      // if selected tab is already active, return
      if (classList.contains('is-active')) return '';

      // // toggle current active tab off
      document
        .querySelector('#settings-tabs ul li.is-active')
        .classList.toggle('is-active');

      // // toggle new tab on
      classList.toggle('is-active');
      setActiveTab(courseName);
      return '';
    },
    [],
  );

  useEffect(() => {
    const tabFor = {
      profile: <ProfileDetailList />,
      courses: <CourseSettings setDisableControls={setDisableControls} />,
      emailAccess: <EmailAccess />,
    };
    setComponent(tabFor[activeTab]);
  }, [activeTab]);

  return (
    <Modal
      className='background-blurred-light'
      showClose={!disableControls}
      show={openModal === SETTINGS_MODAL}
      onClose={() => dispatch({ type: CLOSE_MODAL })}
    >
      <Modal.Card>
        <Modal.Card.Header
          flexDirection='column'
          alignItems='start'
          className='background-clear mx-2 pb-0'
          showClose={false}
        >
          <Heading
            className='has-text-grey-lighter'
          >
            Settings
          </Heading>

          <Tabs
            align='left'
            type='boxed'
            id='settings-tabs'
          >
            <Tabs.Tab
              className='rounded-top'
              active={activeTab === 'profile'}
              onClick={(e) => handleUpdate(e, 'profile')}
            >
              <strong className={activeTab !== 'profile' ? 'has-text-grey-lighter' : ''}>
                Profile
              </strong>
            </Tabs.Tab>
            <Tabs.Tab
              className='rounded-top'
              active={activeTab === 'courses'}
              onClick={(e) => handleUpdate(e, 'courses')}
            >
              <strong
                className={activeTab !== 'courses' ? 'has-text-grey-lighter' : ''}
              >
                Courses
              </strong>
            </Tabs.Tab>
            <Tabs.Tab
              className='rounded-top'
              active={activeTab === 'emailAccess'}
              onClick={(e) => handleUpdate(e, 'emailAccess')}
            >
              <strong
                className={activeTab !== 'emailAccess' ? 'has-text-grey-lighter' : ''}
              >
                Email Access
              </strong>
            </Tabs.Tab>
          </Tabs>
        </Modal.Card.Header>
        <Modal.Card.Body className='rounded-top'>
          {component}
        </Modal.Card.Body>
      </Modal.Card>
    </Modal>
  );
};
export default SettingsModal;
