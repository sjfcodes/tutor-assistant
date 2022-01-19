import React, { useEffect, useState } from 'react';
import {
  bool, func, number, shape, string,
} from 'prop-types';
import ListItemContainer from '../../List/ListItemContainer';
import StudentsListItemLayout from './StudentsListItemLayout';
import StudentDetailList from '../StudentDetailList';

const StudentListItem = ({ student, selectedStudentId, setSelectedStudentId }) => {
  const [listItem, setListItem] = useState('');
  const [listItemDetails, setListItemDetails] = useState('listItemDetails');
  const { _id } = student;

  const toggleViewStudent = () => (
    selectedStudentId === _id
      ? setSelectedStudentId('')
      : setSelectedStudentId(_id)
  );

  useEffect(() => {
    setListItem(
      <StudentsListItemLayout
        firstName={student.firstName}
        lastName={student.lastName}
        timeZoneName={student.timeZoneName}
      />,
    );
  }, [student]);

  useEffect(() => {
    if (selectedStudentId !== _id) return setListItemDetails('');
    return setListItemDetails(<StudentDetailList student={student} _id={_id} />);
  }, [student, _id, selectedStudentId]);

  return (
    <ListItemContainer
      itemId={_id}
      selectedItemId={selectedStudentId}
      toggleViewItem={toggleViewStudent}
      listItem={listItem}
      listItemDetails={listItemDetails}
    />
  );
};
export default StudentListItem;

StudentListItem.propTypes = {
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
    recurringMeeting: bool.isRequired,
    createdAt: string.isRequired,
  }).isRequired,
  selectedStudentId: string.isRequired,
  setSelectedStudentId: func.isRequired,
};
