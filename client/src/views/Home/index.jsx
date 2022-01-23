import React from 'react';
import { useSelector } from 'react-redux';
import {
  MeetingsSection, StudentsSection, CourseTabs, TasksSection,
} from '../../components';
import MessageBoard from '../../components/MessageBoard';
import AllModals from '../../components/Modals';

const Home = () => {
  const {
    tutor: { loggedIn },
    courses: { selectedCourse },
  } = useSelector((state) => state);

  return (
    <>
      <CourseTabs className='mb-0 pt-3 pl-2' />
      <MessageBoard />
      {selectedCourse && (
        <>
          <TasksSection />
          <StudentsSection />
          <MeetingsSection />
        </>
      )}
      {loggedIn && <AllModals />}

    </>
  );
};

export default Home;
