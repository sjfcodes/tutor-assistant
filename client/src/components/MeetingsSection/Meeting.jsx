import React, { useContext } from 'react';
import { Box, Icon, Level } from 'react-bulma-components';
import {
  func, number, shape, string,
} from 'prop-types';
import { CourseContext } from '../../context';
import MeetingList from './MeetingList';
import { MeetingDate } from '../DateTime';
import { LevelSide } from '../BulmaHelpers';

const Meeting = ({ meeting, setSelectedMeetingId, selectedMeetingId }) => {
  const { allCourses, selectedCourse } = useContext(CourseContext);
  const { _id, studentId, startDate } = meeting;
  const { firstName, lastName } = allCourses[selectedCourse].students[studentId];

  const toggleViewMeeting = () => (selectedMeetingId === _id
    ? setSelectedMeetingId('')
    : setSelectedMeetingId(_id));

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
          <MeetingDate
            className='ml-3'
            iso8601={startDate}
          />
        </LevelSide>

        <Level.Side>
          <Level.Item className='ml-3'>{`${firstName} ${lastName}`}</Level.Item>
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
    duration: number.isRequired,
    startDate: string.isRequired,
    status: string.isRequired,
    createdAt: string.isRequired,
  }).isRequired,
  selectedMeetingId: string.isRequired,
  setSelectedMeetingId: func.isRequired,
};
