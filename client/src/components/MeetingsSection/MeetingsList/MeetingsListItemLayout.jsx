import { shape, string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Level } from 'react-bulma-components';
import { getCurrentUnix } from '../../../utils';
import { getUnixFromISO } from '../../../utils/helpers/dateTime';
import { DashboardContext, STUDENTS_SECTION } from '../../../views/Dashboard/DashboardProvider';
import { MeetingDateShort, MeetingTime } from '../../DateTime';

import './style.css';

const MEETING_PAST = 'meeting-past';
const MEETING_PRESENT = 'meeting-present';
const MEETING_FUTURE = 'meeting-future';

const getScheduleStatus = ({ currentTime, start, end }) => {
  if (currentTime > end) return MEETING_PAST;
  if (currentTime >= start && currentTime < end) return MEETING_PRESENT;
  if (currentTime < start) return MEETING_FUTURE;
  return null;
};

const MeetingsListItemLayout = (
  {
    student: { firstName, lastName },
    meeting: {
      startTime, endTime, firstName: calFirstName, lastName: calLastName, studentId,
    },
  },
) => {
  const { activeComponent, setActiveComponent } = useContext(DashboardContext);

  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState(() => {
    const currentTime = getCurrentUnix();
    const start = getUnixFromISO(startTime);
    const end = getUnixFromISO(endTime);

    return {
      className: getScheduleStatus({ currentTime, start, end }),
      currentTime,
      start,
      end,
    };
  });

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

  // setup a timer to run schedule update when current meeting ends or next meeting starts

  useEffect(() => {
    // determine when to run next check,
    let seconds = 10;
    // if currenly in a meeting, update when meeting ends
    if (status.className === MEETING_PRESENT) seconds = status.end - status.currentTime;
    // if not in a meeting & there is a future meeting, update when next meeting starts
    // how to check if theres a future meeting?
    const timer = setTimeout(() => {
      console.log(status.className);
    }, seconds * 1000);
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <Level className='ml-3 '>
      <Level.Item className={`px-2 meeting-time-details ${status.className}`}>

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

      </Level.Item>
      <Level.Item justifyContent='flex-start' className='mt-1'>
        {
          studentId
            ? (
              <Button
                className='tag p-1 meeting-student'
                size='small'
                color='info'
                onClick={showStudentDetails}
              >
                {getDisplayName()}
              </Button>
            ) : (
              <p className=''>
                {getDisplayName()}
              </p>
            )
        }
      </Level.Item>
    </Level>
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
