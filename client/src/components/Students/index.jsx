import React, { useContext, useState } from 'react';
import {
  Box, Button, Columns, Heading,
} from 'react-bulma-components';
import { CourseContext, ModalContext } from '../../context';
import Student from './Student';
import './style.css';

const StudentsSection = () => {
  const { allCourses, selectedCourse } = useContext(CourseContext);
  const { setOpenModal } = useContext(ModalContext);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  return (
    <Box className='has-background-white'>
      <Columns breakpoint='mobile'>
        <Columns.Column>
          <Heading>Students</Heading>
        </Columns.Column>
        <Columns.Column align='right'>
          <Button color='primary' onClick={() => setOpenModal('addStudent')}>
            Add Student
          </Button>
        </Columns.Column>
      </Columns>
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
