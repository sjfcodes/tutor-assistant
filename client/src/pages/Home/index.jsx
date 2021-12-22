import React, { useContext } from 'react';
import { Box } from 'react-bulma-components';
import { MeetingsSection, StudentsSection, CourseTabs } from '../../components';
import { CourseContext } from '../../context';

const Home = () => {
  const { selectedCourse } = useContext(CourseContext);

  return (
    <Box className='background-dark-blurred py-1 px-3'>
      <CourseTabs className='mb-0 pt-3 pl-2' />
      {selectedCourse && (
        <>
          <StudentsSection />
          <MeetingsSection />
        </>
      )}
    </Box>
  );
};

export default Home;
