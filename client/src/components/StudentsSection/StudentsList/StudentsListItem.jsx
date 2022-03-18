import React, { useEffect, useState } from 'react';
import {
  bool, number, shape, string,
} from 'prop-types';
import { Level } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';
import ListItemContainer from '../../List/ListItemContainer';
import StudentDetailList from '../StudentDetailList';
import { TimeZoneAbbreviation } from '../../DateTime';
import { COURSE_SECTION_STUDENTS, SET_ACTIVE_COMPONENT } from '../../../store/view/actions';

const StudentListItem = ({ student }) => {
  const [listItemDetails, setListItemDetails] = useState('listItemDetails');
  const {
    _id, firstName, lastName, timeZoneName,
  } = student;
  const dispatch = useDispatch();
  const {
    activeComponent: { selectedComponent, selectedComponentItemId },
  } = useSelector((state) => state.view);

  const toggleViewStudent = () => (
    dispatch({
      type: SET_ACTIVE_COMPONENT,
      payload: {
        selectedComponentItemId: selectedComponentItemId === _id ? '' : _id,
      },
    })
    // setactiveComponent({
    //   ...activeComponent,
    //   selectedComponentItemId: selectedComponentItemId === _id ? '' : _id,
    // })
  );

  useEffect(() => {
    if (selectedComponent !== COURSE_SECTION_STUDENTS) return '';

    if (selectedComponentItemId !== _id) return setListItemDetails('');
    return setListItemDetails(<StudentDetailList student={student} _id={_id} />);
  }, [student, _id, selectedComponent, selectedComponentItemId]);

  return (
    <ListItemContainer
      itemId={_id}
      selectedComponentItemId={selectedComponentItemId}
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
};
