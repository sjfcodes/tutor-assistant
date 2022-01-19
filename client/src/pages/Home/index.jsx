import React, { useContext } from 'react';
import {
  MeetingsSection, StudentsSection, CourseTabs, TasksSection,
} from '../../components';
import MessageBoard from '../../components/MessageBoard';
import { CourseContext } from '../../context';

const Home = () => {
  const { selectedCourse } = useContext(CourseContext);

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
    </>
  );
};

export default Home;
