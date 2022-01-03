import React, { useContext } from 'react';
import { Box, Icon, Level } from 'react-bulma-components';
import { func, shape, string } from 'prop-types';
import { CourseContext } from '../../context';
import MeetingList from './MeetingList';
import { MeetingDateShort, MeetingTime } from '../DateTime';
import { LevelSide } from '../BulmaHelpers';

const Meeting = ({ meeting, setSelectedMeetingId, selectedMeetingId }) => {
  const { allCourses, selectedCourse } = useContext(CourseContext);
  const {
    _id, studentId, startTime, endTime,
  } = meeting;
  const student = allCourses[selectedCourse].students[studentId];

  const getDisplayName = () => {
    if (student) return `${student.firstName} ${student.lastName}`;
    if (meeting.studentName) return `${meeting.studentName}`;
    return 'work in progress';
  };

  const toggleViewMeeting = () => (
    selectedMeetingId === _id
      ? setSelectedMeetingId('')
      : setSelectedMeetingId(_id)
  );

  return (
    <Box
      className={`border rounded px-0 py-1 mb-3
    ${selectedMeetingId !== _id && 'hover-large-item'}`}
    >

      <Level
        renderAs='div'
        breakpoint='mobile'
        className={`${selectedMeetingId === _id && 'border-bottom pb-1 mb-0'}`}
        onClick={toggleViewMeeting}
      >
        <LevelSide>
          <Level.Item>
            <div className='ml-3 has-text-left'>
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
          </Level.Item>
        </LevelSide>

        <Level.Side>
          <Icon className='mr-2'>
            <i className={`fas fa-chevron-${selectedMeetingId === _id ? 'up' : 'down'}`} />
          </Icon>
        </Level.Side>
      </Level>

      {
        selectedMeetingId === _id
        && <MeetingList meeting={meeting} _id={_id} />
      }
    </Box>
  );
};
export default Meeting;

Meeting.propTypes = {
  meeting: shape({
    _id: string.isRequired,
    endTime: string.isRequired,
    startTime: string.isRequired,
    status: string.isRequired,
    createdAt: string.isRequired,
  }).isRequired,
  selectedMeetingId: string.isRequired,
  setSelectedMeetingId: func.isRequired,
};
