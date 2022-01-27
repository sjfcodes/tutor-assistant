import React, { useEffect, useState } from 'react';
import {
  bool, func, number, shape, string,
} from 'prop-types';
import { Level } from 'react-bulma-components';
import ListItemContainer from '../../List/ListItemContainer';
import StudentDetailList from '../StudentDetailList';
import { TimeZoneAbbreviation } from '../../DateTime';

const StudentListItem = ({ student, selectedStudentId, setSelectedStudentId }) => {
  const [listItemDetails, setListItemDetails] = useState('listItemDetails');
  const {
    _id, firstName, lastName, timeZoneName,
  } = student;

  const toggleViewStudent = () => (
    selectedStudentId === _id
      ? setSelectedStudentId('')
      : setSelectedStudentId(_id)
  );

  useEffect(() => {
    if (selectedStudentId !== _id) return setListItemDetails('');
    return setListItemDetails(<StudentDetailList student={student} _id={_id} />);
  }, [student, _id, selectedStudentId]);

  return (
    <ListItemContainer
      itemId={_id}
      selectedItemId={selectedStudentId}
      toggleViewItem={toggleViewStudent}
      listItemDetails={listItemDetails}
    >
      <Level.Item className='ml-3 mr-1'>
        {`${firstName} ${lastName}`}
      </Level.Item>
      <Level.Item>
        <p>
          <TimeZoneAbbreviation
            className='is-size-7 has-text-weight-bold has-text-primary'
            timeZoneName={timeZoneName}
          />
        </p>
      </Level.Item>

    </ListItemContainer>
  );
};
export default StudentListItem;

StudentListItem.propTypes = {
  student: shape({
    _id: string.isRequired,
    firstName: string,
    lastName: string,
    email: string,
    classId: string,
    timeZoneName: string,
    graduationDate: string,
    fullTimeCourse: bool,
    githubUsername: string,
    meetingLink: string,
    meetingsPerWeek: number,
    reassignment: bool,
    recurringMeeting: bool,
    createdAt: string,
  }).isRequired,
  selectedStudentId: string.isRequired,
  setSelectedStudentId: func.isRequired,
};
