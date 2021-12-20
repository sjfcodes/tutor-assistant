import React, { useContext, useState } from 'react';
import {
  Box, Heading, Icon, Level,
} from 'react-bulma-components';
import { CourseContext, ModalContext } from '../../context';
import { LevelSide } from '../BulmaHelpers';
import Student from './Student';
import './style.css';

const StudentsSection = () => {
  const { allCourses, selectedCourse } = useContext(CourseContext);
  const { setOpenModal } = useContext(ModalContext);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  return (
    <Box className='has-background-white py-1 px-3 mb-3'>
      <Level renderAs='div' className='is-mobile mt-2 mb-3'>
        <LevelSide>
          <Heading size={4}>Students</Heading>
        </LevelSide>
        <LevelSide>
          <Icon
            className='p-4 mr-1 hover'
            color='primary'
            onClick={() => setOpenModal('addStudent')}
          >
            <i className='fas fa-plus' />
          </Icon>
        </LevelSide>
      </Level>
      {
        allCourses[selectedCourse]
        && Object
          .values(allCourses[selectedCourse].students)
          .sort(({ createdAt: a }, { createdAt: b }) => {
            const unixA = new Date(a).getTime();
            // sort newest students first
            const unixB = new Date(b).getTime();
            if (unixA === unixB) return 0;
            if (unixA > unixB) return -1;
            return 1;
          })
          .map((student) => (
            <Student
              key={student._id}
              student={student}
              selectedStudentId={selectedStudentId}
              setSelectedStudentId={setSelectedStudentId}
            />
          ))
      }
    </Box>
  );
};
export default StudentsSection;
