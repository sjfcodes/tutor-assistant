import React, { useContext } from 'react';
import SectionHeading from '../../Section/Heading';
import { MeetingsContext } from '../MeetingsProvider';

const MeetingHeading = () => {
  const { isActive, sectionName, meetingCount } = useContext(MeetingsContext);
  return (
    <SectionHeading
      active={isActive}
      sectionName={sectionName}
      count={meetingCount}
    />
  );
};

export default MeetingHeading;
