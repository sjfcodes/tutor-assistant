import React, { useContext, useState } from 'react';
import {
  Box, Button, Heading, Level,
} from 'react-bulma-components';
import { CourseContext, ModalContext } from '../../context';
import Student from './Student';
import './style.css';

const StudentsSection = () => {
  const { allCourses, selectedCourse } = useContext(CourseContext);
  const { setOpenModal } = useContext(ModalContext);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  return (
    <Box className='has-background-white p-3'>
      <Level renderAs='div' className='is-mobile mb-1'>
        <Level.Side>
          <Level.Item>
            <Heading>Students</Heading>
          </Level.Item>
        </Level.Side>
        <Level.Side>
          <Level.Item>
            <Button
              color='primary'
              size='small'
              onClick={() => setOpenModal('addStudent')}
            >
              Add Student
            </Button>
          </Level.Item>
        </Level.Side>
      </Level>
      {
        allCourses[selectedCourse]
        && Object
          .values(allCourses[selectedCourse].students)
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
