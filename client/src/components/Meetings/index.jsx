import React, { useContext, useState } from 'react';
import {
  Box, Button, Heading, Level,
} from 'react-bulma-components';
import { CourseContext, ModalContext } from '../../context';
import Meeting from './Meeting';

const MeetingsSection = () => {
  const { allCourses, selectedCourse } = useContext(CourseContext);
  const { setOpenModal } = useContext(ModalContext);
  const [selectedMeetingId, setSelectedMeetingId] = useState('');

  return (
    <Box className='has-background-white'>
      <Level renderAs='div' className='is-mobile'>
        <Level.Side>
          <Level.Item>
            <Heading>Meetings</Heading>
          </Level.Item>
        </Level.Side>
        <Level.Side>
          <Level.Item>
            <Button
              color='primary'
              size='small'
              onClick={() => setOpenModal('addMeeting')}
            >
              Add Meeting
            </Button>
          </Level.Item>
        </Level.Side>
      </Level>
      {
        allCourses[selectedCourse]
        && Object
          .values(allCourses[selectedCourse].meetings)
          .map((meeting) => (
            <Meeting
              key={meeting._id}
              meeting={meeting}
              selectedMeetingId={selectedMeetingId}
              setSelectedMeetingId={setSelectedMeetingId}
            />
          ))
      }
    </Box>
  );
};
export default MeetingsSection;
