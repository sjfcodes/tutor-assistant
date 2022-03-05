import { shape, string } from 'prop-types';
import React, { useContext } from 'react';
import { Button } from 'react-bulma-components';
import { DashboardContext, STUDENTS_SECTION } from '../../../views/Dashboard/DashboardProvider';
import { MeetingDateShort, MeetingTime } from '../../DateTime';

const MeetingsListItemLayout = (
  {
    student: { firstName, lastName },
    meeting: {
      startTime, endTime, firstName: calFirstName, lastName: calLastName, studentId,
    },
  },
) => {
  const { activeComponent, setActiveComponent } = useContext(DashboardContext);
  const getDisplayName = () => {
    if (calFirstName || calLastName) return `${calFirstName} ${calLastName}`;
    if (firstName || lastName) return `${firstName} ${lastName}`;
    return 'work in progress';
  };
  const showStudentDetails = (e) => {
    e.stopPropagation();
    setActiveComponent({
      ...activeComponent,
      component: STUDENTS_SECTION,
      selectedItemId: studentId,
    });
  };

  return (
    <div className='ml-3' style={{ display: 'flex' }}>
      <p style={{
        width: '6em',
        display: 'flex',
        justifyContent: 'space-between',
        // border: 'solid red 1px',
      }}
      >
        <span className=''>[</span>
        <MeetingDateShort iso8601={startTime} />
        <span className=''>]</span>
      </p>
      <p className='ml-2'>
        <span className=''>{' '}</span>
        <MeetingTime iso8601={startTime} />
        <span className='is-size-7'>{' - '}</span>
        <MeetingTime iso8601={endTime} />
      </p>
      <p className='ml-2'>
        {getDisplayName()}
      </p>
      {
        studentId && (
          <Button
            size='small'
            onClick={showStudentDetails}
          >
            {studentId}
          </Button>
        )
      }
    </div>
  );
};

export default MeetingsListItemLayout;

MeetingsListItemLayout.propTypes = {
  student: shape({
    firstName: string,
    lastName: string,
  }),
  meeting: shape({
    startTime: string.isRequired,
    endTime: string.isRequired,
    firstName: string,
    lastName: string,
  }),
};

MeetingsListItemLayout.defaultProps = {
  student: shape({
    firstName: '',
    lastName: '',
  }),
  meeting: shape({
    firstName: '',
    lastName: '',
  }),
};
