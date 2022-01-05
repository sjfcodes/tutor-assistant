import { string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Box } from 'react-bulma-components';
import { CourseContext } from '../../../context';
import MeetingsListItem from './MeetingsListItem';

const MeetingsList = ({ filterBy }) => {
  const { allCourses, selectedCourse, calendlyMeetings } = useContext(CourseContext);
  const [selectedMeetingId, setSelectedMeetingId] = useState('');
  const [displayedMeetings, setDisplayedMeetings] = useState([]);
  const [meetingsListItems, setMeetingsListItems] = useState('');

  const filterMeetingsByStartTime = (arr) => (
    arr.length
      ? arr.sort(({ startTime: a }, { startTime: b }) => {
        const unixA = new Date(a).getTime() / 1000;
        const unixB = new Date(b).getTime() / 1000;
        // sort newest meetings first
        if (unixA > unixB) return 1;
        if (unixA === unixB) return 0;
        return -1;
      })
      : []
  );

  useEffect(() => {
    if (!selectedCourse) return;
    const selectedMeetings = [];

    const addCalendlyMeetings = () => {
      const arr = Object.values(calendlyMeetings);
      if (arr.length) selectedMeetings.push(...arr);
      return '';
    };
    const addTutorlyMeetings = () => {
      const arr = Object.values(allCourses[selectedCourse].meetings);
      if (arr.length) selectedMeetings.push(...arr);
    };

    switch (filterBy) {
    case 'all':
      addTutorlyMeetings();
      addCalendlyMeetings();
      break;
    case 'calendly':
      addCalendlyMeetings();
      break;
    default:
      addTutorlyMeetings();
      break;
    }

    setDisplayedMeetings(filterMeetingsByStartTime(selectedMeetings));
  }, [selectedCourse, allCourses, calendlyMeetings, filterBy]);

  useEffect(() => {
    if (!displayedMeetings.length) return setMeetingsListItems(<p>no scheduled meetings</p>);
    return setMeetingsListItems(displayedMeetings.map((meeting) => (
      <MeetingsListItem
        key={meeting._id}
        meeting={meeting}
        selectedMeetingId={selectedMeetingId}
        setSelectedMeetingId={setSelectedMeetingId}
      />
    )));
  }, [selectedCourse, allCourses, calendlyMeetings, displayedMeetings, selectedMeetingId]);

  return (
    <Box className=' list-container p-2'>{meetingsListItems}</Box>
  );
};
export default MeetingsList;

MeetingsList.propTypes = {
  filterBy: string.isRequired,
};
