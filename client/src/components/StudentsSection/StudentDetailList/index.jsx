import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
  bool, number, shape, string,
} from 'prop-types';
import { Button } from 'react-bulma-components';
import StudentDetailListItem from './StudentDetailListItem';
import DropDownIcon from '../../DropDownIcon';
import PreviewItem from './PreviewItem';

const StudentDetailList = ({ student }) => {
  const [listItems, setListItems] = useState();
  // eslint-disable-next-line no-unused-vars
  const [displayList, setDisplayList] = useState({ isActive: false });
  const doNotDisplay = useMemo(
    () => ['_id', 'id', '__v', 'createdAt', 'studentId'],
    [],
  );

  const toggleIsActive = () => {
    setDisplayList((curr) => ({ ...curr, isActive: !curr.isActive }));
  };

  useEffect(() => {
    let count = 0;
    if (student._id) setListItems(Object
      .entries(student)
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
      }));
  }, [student, doNotDisplay]);

  return (
    <div className='pt-3'>
      <PreviewItem property='sessionReview' value={student.sessionReview} />
      <PreviewItem property='clockOutNotes' value={student.clockOutNotes} />
      <PreviewItem property='classId' value={student.classId} />
      <PreviewItem property='fullName' value={student.fullName} />
      <PreviewItem property='email' value={student.email} />

      <Button.Group
        align='right'
        className='m-2'
      >

        <Button
          className='px-1 tag'
          color='info'
          onClick={toggleIsActive}
        >
          edit
          <DropDownIcon active={displayList.isActive} className='ml-5' />
        </Button>
      </Button.Group>
      {
        displayList.isActive
          ? <ul className='rounded'>{listItems}</ul>
          : ''
      }
    </div>
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
