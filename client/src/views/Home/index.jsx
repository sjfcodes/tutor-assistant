import React from 'react';
import { useSelector } from 'react-redux';
import HomeProvider from './HomeProvider';
import TasksSection from '../../components/TasksSection';

import MessageBoard from '../../components/MessageBoard';
import AllModals from '../../components/Modals';
import TasksProvider from '../../components/TasksSection/TasksProvider';
import StudentsProvider from '../../components/StudentsSection/StudentsProvider';
import MeetingsProvider from '../../components/MeetingsSection/MeetingsProvider';
import StudentsSection from '../../components/StudentsSection';
import MeetingsSection from '../../components/MeetingsSection';
import CourseTabs from '../../components/CourseTabs';

const Home = () => {
  const {
    tutor: { loggedIn },
    courses: { selectedCourse },
  } = useSelector((state) => state);

  const getComponents = () => {
    if (!selectedCourse) return '';
    return (
      <HomeProvider>
        <TasksProvider>
          <TasksSection />
        </TasksProvider>
        <StudentsProvider>
          <StudentsSection />
        </StudentsProvider>
        <MeetingsProvider>
          <MeetingsSection />
        </MeetingsProvider>
      </HomeProvider>
    );
  };

  return (
    <>
      <CourseTabs className='mb-0 pt-3 pl-2' />
      <MessageBoard />
      {getComponents()}
      {loggedIn && <AllModals />}
    </>
  );
};

export default Home;
