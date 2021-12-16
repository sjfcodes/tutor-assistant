import React, { useContext } from 'react';
import { Box, Icon, Level } from 'react-bulma-components';
import { v4 as uuid } from 'uuid';
import {
  func, number, shape, string,
} from 'prop-types';
import { CourseContext } from '../../context';
import MeetingItem from './MeetingItem';

const Meeting = ({ meeting, setSelectedMeetingId, selectedMeetingId }) => {
  const { allCourses, selectedCourse } = useContext(CourseContext);
  const { _id, studentId, startDate } = meeting;
  const { firstName, lastName } = allCourses[selectedCourse].students[studentId];

  const toggleViewMeeting = () => (selectedMeetingId === _id
    ? setSelectedMeetingId('')
    : setSelectedMeetingId(_id));

  const date = new Date(startDate * 1000).toLocaleDateString();
  const time = new Date(startDate * 1000).toLocaleTimeString().split(':');

  return (
    <Box
      className={`border rounded pl-2 py-1 pr-1 ${selectedMeetingId !== _id && 'hover-large-item'
      }`}
    >
      {`${firstName} ${lastName}`}
      <Level
        renderAs='div'
        breakpoint='mobile'
        className={`${selectedMeetingId === _id && 'border-bottom pb-3 mb-1'}`}
        onClick={toggleViewMeeting}
      >
        <Level.Side align='left'>
          <Level.Item>{`${date} @ ${time[0]}:${time[2]}`}</Level.Item>
        </Level.Side>

        <Level.Side align='left'>
          <Level.Item>
            <Icon>
              <i
                className={`fas fa-chevron-${selectedMeetingId === _id ? 'up' : 'down'
                }`}
              />
            </Icon>
          </Level.Item>
        </Level.Side>
      </Level>

      {selectedMeetingId === _id && (
        <ul>
          {
            Object
              .entries(meeting)
              .map(([property, value], idx) => {
                const doNotDisplay = ['_id', '__v', 'tutorId', 'studentId'];
                if (doNotDisplay.indexOf(property) !== -1) return null;
                return (
                  <MeetingItem
                    key={uuid()}
                    _id={_id}
                    // idx is used for striped background, +1 adjusts first items color
                    idx={idx + 1}
                    value={value}
                    property={property}
                  />
                );
              })
          }
        </ul>
      )}
    </Box>
  );
};
export default Meeting;

Meeting.propTypes = {
  meeting: shape({
    _id: string.isRequired,
    duration: number.isRequired,
    startDate: number.isRequired,
    status: string.isRequired,
    createdAt: number.isRequired,
  }).isRequired,
  selectedMeetingId: string.isRequired,
  setSelectedMeetingId: func.isRequired,
};
