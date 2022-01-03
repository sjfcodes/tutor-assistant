import { string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { CourseContext } from '../../context';
import Meeting from './Meeting';

const AllMeetings = ({ filterBy }) => {
  const { allCourses, selectedCourse, calendlyMeetings } = useContext(CourseContext);
  const [selectedMeetingId, setSelectedMeetingId] = useState('');
  const [displayedMeetings, setDisplayedMeetings] = useState([]);

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
    const addManualEntries = () => {
      const arr = Object.values(allCourses[selectedCourse].meetings);
      if (arr.length) selectedMeetings.push(...arr);
    };

    switch (filterBy) {
    case 'all':
      addManualEntries();
      addCalendlyMeetings();
      break;
    case 'calendly':
      addCalendlyMeetings();
      break;
    default:
      addManualEntries();
      break;
    }

    setDisplayedMeetings(filterMeetingsByStartTime(selectedMeetings));
  }, [selectedCourse, allCourses, calendlyMeetings, filterBy]);

  return displayedMeetings.length
    ? displayedMeetings.map((meeting) => (
      <Meeting
        key={meeting._id}
        meeting={meeting}
        selectedMeetingId={selectedMeetingId}
        setSelectedMeetingId={setSelectedMeetingId}
      />
    ))
    : <p>no scheduled meetings</p>;
};
export default AllMeetings;

AllMeetings.propTypes = {
  filterBy: string.isRequired,
};
