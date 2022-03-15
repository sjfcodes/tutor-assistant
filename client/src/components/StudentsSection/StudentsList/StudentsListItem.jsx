import React, { useContext, useEffect, useState } from 'react';
import {
  bool, number, shape, string,
} from 'prop-types';
import { Level } from 'react-bulma-components';
import ListItemContainer from '../../List/ListItemContainer';
import StudentDetailList from '../StudentDetailList';
import { GraduationDate, TimeZoneAbbreviation } from '../../DateTime';
import { DashboardContext, STUDENTS_SECTION } from '../../../views/Dashboard/DashboardProvider';
import { StudentsContext } from '../StudentsProvider';

const StudentListItem = ({ student }) => {
  const [listItemDetails, setListItemDetails] = useState('listItemDetails');
  const {
    _id, firstName, lastName, timeZoneName, graduationDate,
  } = student;
  const { activeComponent, setActiveComponent } = useContext(DashboardContext);
  const { component, selectedItemId } = activeComponent;
  const { filterBy } = useContext(StudentsContext);

  const toggleViewStudent = () => (
    setActiveComponent({
      ...activeComponent,
      selectedItemId: selectedItemId === _id ? '' : _id,
    })
  );

  useEffect(() => {
    if (component !== STUDENTS_SECTION) return '';

    if (selectedItemId !== _id) return setListItemDetails('');
    return setListItemDetails(<StudentDetailList student={student} _id={_id} />);
  }, [student, _id, component, selectedItemId]);

  return (
    <ListItemContainer
      itemId={_id}
      selectedItemId={selectedItemId}
      toggleViewItem={toggleViewStudent}
      listItemDetails={listItemDetails}
    >
      {
        filterBy === 'graduation date'
          ? (
            <Level.Item className='ml-3 mr-1'>
              [
              <GraduationDate iso8601={graduationDate} />
              ]
            </Level.Item>
          )
          : ''
      }
      <Level.Item className='ml-3 mr-1'>
        {
          filterBy === 'first name'
            ? `${firstName} ${lastName}`
            : `${lastName}, ${firstName}`
        }
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
