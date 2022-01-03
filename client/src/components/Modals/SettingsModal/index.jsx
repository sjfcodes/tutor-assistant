/* eslint-disable no-unused-vars */
import React, {
  useState, useContext, useEffect, useCallback,
} from 'react';
import { Button, Modal, Tabs } from 'react-bulma-components';
import { AppContext, ModalContext } from '../../../context';
import CalendlyAccess from './CalendlyAccess';
import CourseSettings from './CourseSettings';
import ProfileSettings from './ProfileSettings';

const SettingsModal = () => {
  const [disableControls, setDisableControls] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [component, setComponent] = useState('');

  const { tutorDetails: { firstName } } = useContext(AppContext);
  const { openModal, setOpenModal } = useContext(ModalContext);

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
    let isMounted = true;
    switch (activeTab) {
    case 'profile':
      if (isMounted) return setComponent(
        <ProfileSettings />,
      );
      break;
    case 'courses':
      if (isMounted) return setComponent(
        <CourseSettings setDisableControls={setDisableControls} />,
      );
      break;

    case 'students':
      if (isMounted) return setComponent(
        <h1>Students</h1>,
      );
      break;

    case 'meetings':
      if (isMounted) return setComponent(
        <h1>Meetings</h1>,
      );
      break;

    default:
      if (isMounted) return console.warn('no component selected');
      break;
    }

    return () => {
      isMounted = false;
    };
  }, [activeTab]);

  return (
    <Modal
      showClose={false}
      show={openModal === 'settings'}
      onClose={() => setOpenModal('')}
    >
      <Modal.Card>
        <Modal.Card.Header className='pb-0' showClose={false}>
          <Tabs
            align='left'
            type='boxed'
            id='settings-tabs'
          >
            <Tabs.Tab
              className='rounded'
              active={activeTab === 'profile'}
              onClick={(e) => handleUpdate(e, 'profile')}
            >
              <strong
                className={activeTab !== 'profile' ? 'has-text-grey-lighter' : ''}
              >
                Profile
              </strong>
            </Tabs.Tab>
            <Tabs.Tab
              className='rounded'
              active={activeTab === 'courses'}
              onClick={(e) => handleUpdate(e, 'courses')}
            >
              <strong
                className={activeTab !== 'courses' ? 'has-text-grey-lighter' : ''}
              >
                Courses
              </strong>
            </Tabs.Tab>
            {/* <Tabs.Tab
              className='rounded'
              active={activeTab === 'students'}
              onClick={(e) => handleUpdate(e, 'students')}
            >
              <strong
                className={activeTab !== 'students' ? 'has-text-grey-lighter' : ''}
              >
                Students
              </strong>
            </Tabs.Tab> */}
            {/* <Tabs.Tab
              className='rounded'
              active={activeTab === 'meetings'}
              onClick={(e) => handleUpdate(e, 'meetings')}
            >
              <strong
                className={activeTab !== 'meetings' ? 'has-text-grey-lighter' : ''}
              >
                Meetings
              </strong>
            </Tabs.Tab> */}
          </Tabs>
        </Modal.Card.Header>
        <Modal.Card.Body>
          {component}
        </Modal.Card.Body>
        <Modal.Card.Footer renderAs={Button.Group} align='right'>
          <Button
            disabled={disableControls}
            onClick={() => setOpenModal('')}
          >
            Done
          </Button>
        </Modal.Card.Footer>
      </Modal.Card>
    </Modal>
  );
};
export default SettingsModal;
