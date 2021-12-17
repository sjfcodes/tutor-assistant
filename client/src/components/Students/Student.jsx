import React from 'react';
import { Box, Icon, Level } from 'react-bulma-components';
import {
  string, number, bool, func, shape,
} from 'prop-types';
import StudentList from './StudentList';

const Student = ({
  student,
  setSelectedStudentId,
  selectedStudentId,
}) => {
  const { _id, firstName, lastName } = student;

  const toggleViewStudent = () => (
    selectedStudentId === _id
      ? setSelectedStudentId('')
      : setSelectedStudentId(_id)
  );

  return (
    <Box
      className={`border rounded px-0 py-1 
      ${selectedStudentId !== _id && 'hover-large-item'}`}
    >
      <Level
        renderAs='div'
        breakpoint='mobile'
        className={`${selectedStudentId === _id && 'border-bottom pb-1 mb-0'}`}
        onClick={toggleViewStudent}
      >
        <Level.Side>
          <Level.Item className='ml-3'>{`${firstName} ${lastName}`}</Level.Item>
        </Level.Side>

        <Level.Side>
          <Level.Item>
            <Icon className='mr-2'>
              <i
                className={`fas fa-chevron-${
                  selectedStudentId === _id ? 'up' : 'down'
                }`}
              />
            </Icon>
          </Level.Item>
        </Level.Side>
      </Level>

      {
        selectedStudentId === _id
        && <StudentList _id={_id} student={student} />
      }
    </Box>
  );
};
export default Student;

Student.propTypes = {
  student: shape({
    firstName: string.isRequired,
    lastName: string.isRequired,
    email: string.isRequired,
    classId: string.isRequired,
    timeZoneOffset: string.isRequired,
    graduationDate: number.isRequired,
    fullTimeCourse: bool.isRequired,
    githubUsername: string.isRequired,
    meetingLink: string.isRequired,
    meetingsPerWeek: number.isRequired,
    reassignment: bool.isRequired,
    temporary: bool.isRequired,
    createdAt: number.isRequired,
  }).isRequired,
  setSelectedStudentId: func.isRequired,
  selectedStudentId: string.isRequired,
};
