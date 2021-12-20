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
    <Box className='has-background-white py-1 px-3 mb-3'>
      <Level renderAs='div' className='is-mobile mt-2 mb-4'>
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
          .sort(({ createdAt: a }, { createdAt: b }) => {
            const unixA = new Date(a).getTime() / 1000;
            // sort newest students first
            const unixB = new Date(b).getTime() / 1000;
            if (unixA === unixB) return 0;
            if (unixA < unixB) return -1;
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
