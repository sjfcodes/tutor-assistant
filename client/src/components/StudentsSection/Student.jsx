import React from 'react';
import { Box, Icon, Level } from 'react-bulma-components';
import {
  string, number, bool, func, shape,
} from 'prop-types';
import StudentList from './StudentList';
import { LevelSide } from '../BulmaHelpers';
import { TimeZoneAbbreviation } from '../DateTime';

const Student = ({
  student,
  setSelectedStudentId,
  selectedStudentId,
}) => {
  const {
    _id, firstName, lastName, timeZoneName,
  } = student;

  const toggleViewStudent = () => (
    selectedStudentId === _id
      ? setSelectedStudentId('')
      : setSelectedStudentId(_id)
  );

  return (
    <Box
      className={`border rounded px-0 py-1 mb-3
      ${selectedStudentId !== _id && ' hover-large-item'}`}
    >
      <Level
        renderAs='div'
        breakpoint='mobile'
        className={`${selectedStudentId === _id && 'border-bottom pb-1 mb-0'}`}
        onClick={toggleViewStudent}
      >
        <Level.Side>
          <Level.Item className='ml-3 mr-1'>{`${firstName} ${lastName}`}</Level.Item>
          <Level.Item>
            <p>
              <TimeZoneAbbreviation timeZone={timeZoneName} className='is-size-7 has-text-weight-bold has-text-info' />
            </p>
          </Level.Item>
        </Level.Side>

        <LevelSide>
          <Icon className='mr-2'>
            <i
              className={`fas fa-chevron-${
                selectedStudentId === _id ? 'up' : 'down'
              }`}
            />
          </Icon>
        </LevelSide>
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
    timeZoneName: string.isRequired,
    graduationDate: string.isRequired,
    fullTimeCourse: bool.isRequired,
    githubUsername: string.isRequired,
    meetingLink: string.isRequired,
    meetingsPerWeek: number.isRequired,
    reassignment: bool.isRequired,
    recurringMeeting: bool.isRequired,
  }).isRequired,
  setSelectedStudentId: func.isRequired,
  selectedStudentId: string.isRequired,
};
