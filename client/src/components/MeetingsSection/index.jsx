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
    <Box className='has-background-white py-1 px-3 mb-3'>
      <Level renderAs='div' className='is-mobile mt-2 mb-4'>
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
          .sort(({ startDate: a }, { startDate: b }) => {
            const unixA = new Date(a).getTime() / 1000;
            const unixB = new Date(b).getTime() / 1000;
            // sort newest meetings first
            if (unixA === unixB) return 0;
            if (unixA < unixB) return -1;
            return 1;
          })
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
