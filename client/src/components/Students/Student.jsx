import React from 'react';
import { Box, Icon, Level } from 'react-bulma-components';
import { v4 as uuid } from 'uuid';
import {
  string, number, bool, func, shape,
} from 'prop-types';
import StudentItem from './StudentItem';

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
      className={`border rounded pl-2 py-1 pr-1 ${
        selectedStudentId !== _id && 'hover-large-item'
      }`}
    >
      <Level
        renderAs='div'
        breakpoint='mobile'
        className={`${selectedStudentId === _id && 'border-bottom pb-3 mb-1'}`}
        onClick={toggleViewStudent}
      >
        <Level.Side align='left'>
          <Level.Item>{`${firstName} ${lastName}`}</Level.Item>
        </Level.Side>

        <Level.Side align='left'>
          <Level.Item>
            <Icon>
              <i
                className={`fas fa-chevron-${
                  selectedStudentId === _id ? 'up' : 'down'
                }`}
              />
            </Icon>
          </Level.Item>
        </Level.Side>
      </Level>

      {selectedStudentId === _id && (
        <ul>
          {Object.entries(student).map(([property, value], idx) => {
            const doNotDisplay = ['_id', '__v'];
            if (doNotDisplay.indexOf(property) !== -1) return null;
            return (
              <StudentItem
                key={uuid()}
                value={value}
                _id={_id}
                idx={idx}
                property={property}
              />
            );
          })}
        </ul>
      )}
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
    timeZone: string.isRequired,
    graduationDate: number.isRequired,
    fullTimeCourse: bool.isRequired,
    gitHubUsername: string.isRequired,
    zoomLink: string.isRequired,
    meetingsPerWeek: number.isRequired,
    reassignment: bool.isRequired,
    temporary: bool.isRequired,
    createdAt: number.isRequired,
  }).isRequired,
  setSelectedStudentId: func.isRequired,
  selectedStudentId: string.isRequired,
};
