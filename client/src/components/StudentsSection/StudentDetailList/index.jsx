import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
  bool, number, shape, string,
} from 'prop-types';
import StudentDetailListItem from './StudentDetailListItem';

const StudentDetailList = ({ student }) => {
  const [listItems, setListItems] = useState();
  const doNotDisplay = useMemo(
    () => ['_id', 'id', '__v', 'createdAt', 'studentId'],
    [],
  );

  useEffect(() => {
    let count = 0;
    if (student._id) setListItems(
      Object.entries(student)
        .map(([property, value]) => {
          if (doNotDisplay.indexOf(property) !== -1) return null;
          count += 1;
          return (
            <StudentDetailListItem
              key={uuid()}
              _id={student._id}
              count={count} // used for striped background
              value={value}
              property={property}
            />
          );
        }),
    );
  }, [student, doNotDisplay]);

  return (
    <ul className='rounded'>
      {listItems}
    </ul>
  );
};

export default StudentDetailList;

StudentDetailList.propTypes = {
  student: shape({
    _id: string.isRequired,
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
    createdAt: string.isRequired,
  }).isRequired,
};
