import React, { useContext } from 'react';
import { Section } from 'react-bulma-components';
import { MeetingsSection, StudentsSection, CourseTabs } from '../../components';
import { AddMeeting, AddStudent } from '../../components/Modals';
import { CourseContext } from '../../context';

const Home = () => {
  const { selectedCourse } = useContext(CourseContext);

  return (
    <Section className='p-3 rounded'>
      <CourseTabs />
      {selectedCourse && (
        <>
          <StudentsSection />
          <AddStudent />

          <MeetingsSection />
          <AddMeeting />
        </>
      )}
    </Section>
  );
};

export default Home;
