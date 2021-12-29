import React, { useContext, useState } from 'react';
import {
  Box, Heading, Icon, Level,
} from 'react-bulma-components';
import { CourseContext, ModalContext } from '../../context';
import { LevelSide } from '../BulmaHelpers';
import Meeting from './Meeting';

const MeetingsSection = () => {
  const { allCourses, selectedCourse } = useContext(CourseContext);
  const { setOpenModal } = useContext(ModalContext);
  const [selectedMeetingId, setSelectedMeetingId] = useState('');

  return (
    <Box className='has-background-white py-1 px-3 mb-3'>
      <Level renderAs='div' className='is-mobile mt-2 mb-3'>
        <LevelSide>
          <Heading size={4}>Meetings</Heading>
        </LevelSide>
        <LevelSide>
          <Icon
            className='p-4 mr-1 hover'
            color='primary'
            onClick={() => setOpenModal('addMeeting')}
          >
            <i className='fas fa-plus' />
          </Icon>
        </LevelSide>
      </Level>
      {
        allCourses[selectedCourse]
        && Object
          .values(allCourses[selectedCourse].meetings)
          .sort(({ startTime: a }, { startTime: b }) => {
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
