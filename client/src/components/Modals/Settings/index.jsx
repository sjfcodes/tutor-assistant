/* eslint-disable no-unused-vars */
import React, {
  useState, useContext, useEffect, useCallback,
} from 'react';
import { Button, Modal, Tabs } from 'react-bulma-components';
import { AppContext, ModalContext } from '../../../context';
import { EditCourseForm } from '../../Forms';

const Settings = () => {
  const [disableControls, setDisableControls] = useState(false);
  const [activeTab, setActiveTab] = useState('courses');
  const [component, setComponent] = useState('');

  const { tutorDetails: { firstName } } = useContext(AppContext);
  const { openModal, setOpenModal } = useContext(ModalContext);

  const handleUpdate = useCallback(
    (e, courseName) => {
      const {
        target: {
          parentNode: { classList },
        },
      } = e;

      // if selected tab is already active, return
      if (classList.contains('is-active')) return '';
      // console.log(e.target.parentNode.classList);

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
    case 'courses':
      if (isMounted) return setComponent(
        <EditCourseForm setDisableControls={setDisableControls} />,
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
        <Modal.Card.Header showClose={false}>
          <Modal.Card.Title>{`${firstName}'s Settings`}</Modal.Card.Title>
        </Modal.Card.Header>
        <Modal.Card.Body>
          <Tabs type='boxed' id='settings-tabs' className='has-background-white'>
            <Tabs.Tab
              className='rounded'
              active={activeTab === 'courses'}
              onClick={(e) => handleUpdate(e, 'courses')}
            >
              Courses
            </Tabs.Tab>
            <Tabs.Tab
              className='rounded'
              active={activeTab === 'students'}
              onClick={(e) => handleUpdate(e, 'students')}
            >
              Students
            </Tabs.Tab>
            <Tabs.Tab
              className='rounded'
              active={activeTab === 'meetings'}
              onClick={(e) => handleUpdate(e, 'meetings')}
            >
              Meetings
            </Tabs.Tab>
          </Tabs>

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
export default Settings;
