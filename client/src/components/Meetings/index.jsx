import React, { useContext, useState } from 'react';
import {
  Box, Button, Columns, Heading,
} from 'react-bulma-components';
import { CourseContext, ModalContext } from '../../context';
import Meeting from './Meeting';

const MeetingsSection = () => {
  const { allCourses, selectedCourse } = useContext(CourseContext);
  const { setOpenModal } = useContext(ModalContext);
  const [selectedMeetingId, setSelectedMeetingId] = useState('');

  return (
    <Box className='has-background-white'>
      <Columns breakpoint='mobile'>
        <Columns.Column>
          <Heading>Meetings</Heading>
        </Columns.Column>
        <Columns.Column align='right'>
          <Button color='primary' onClick={() => setOpenModal('addMeeting')}>
            Add Meeting
          </Button>
        </Columns.Column>
      </Columns>
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
