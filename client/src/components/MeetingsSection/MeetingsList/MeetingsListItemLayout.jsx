import { shape, string } from 'prop-types';
import React from 'react';
import { MeetingDateShort, MeetingTime } from '../../DateTime';

const MeetingsListItemLayout = (
  {
    student: { firstName, lastName },
    meeting: { startTime, endTime, studentName },
  },
) => {
  const getDisplayName = () => {
    if (firstName && lastName) return `${firstName} ${lastName}`;
    if (studentName) return `${studentName}`;
    return 'work in progress';
  };
  return (
    <div className='ml-3'>
      <p>{getDisplayName()}</p>
      <p>
        <span className=''>[</span>
        <MeetingDateShort iso8601={startTime} />
        <span className=''>]</span>
        <span className=''>{' '}</span>
        <MeetingTime iso8601={startTime} />
        <span className='is-size-7'>{' - '}</span>
        <MeetingTime iso8601={endTime} />
      </p>
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
    studentName: string,
  }).isRequired,
};

MeetingsListItemLayout.defaultProps = {
  student: shape({
    firstName: '',
    lastName: '',
  }),
};
