import React from 'react';
import { v4 as uuid } from 'uuid';
import {
  string, number, bool, shape,
} from 'prop-types';
import StudentListItem from './StudentListItem';

const StudentList = ({ _id, student }) => {
  let count = 0;
  return (
    <ul className='student-list'>
      {Object.entries(student).map(([property, value]) => {
        const doNotDisplay = ['_id', '__v'];
        if (doNotDisplay.indexOf(property) !== -1) return null;
        count += 1;
        return (
          <StudentListItem
            key={uuid()}
            value={value}
            _id={_id}
            count={count}
            property={property}
          />
        );
      })}
    </ul>
  );
};

export default StudentList;

StudentList.propTypes = {
  _id: string.isRequired,
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
};
