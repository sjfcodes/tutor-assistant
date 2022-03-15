import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MeetingsContext } from '../MeetingsProvider';
import MeetingsListItem from './MeetingsListItem';

const MeetingsList = ({ focusedMeetings }) => {
  const {
    courses: { selectedCourse },
  } = useSelector((state) => state);
  const { filterBy, displayedMeetings, setDisplayedMeetings } = useContext(MeetingsContext);

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
    const getMeetingsFor = (filter) => focusedMeetings
      .filter(({ type }) => type === filter);

    if (selectedCourse && focusedMeetings.length) {
      let meetings;

      switch (filterBy) {
      case 'all':
        meetings = focusedMeetings;
        break;

      case 'calendly':
        meetings = getMeetingsFor('calendly');
        break;

      case 'tutorly':
        meetings = getMeetingsFor('tutorly');
        break;

      default:
        meetings = focusedMeetings;
        break;
      }

      setDisplayedMeetings(filterMeetingsByStartTime(meetings));
    }
  }, [selectedCourse, filterBy, focusedMeetings, setDisplayedMeetings]);

  useEffect(() => {
    if (!displayedMeetings.length) setMeetingsListItems(<p className='has-text-centered'>no scheduled meetings</p>);
    else setMeetingsListItems(
      displayedMeetings
        .map((meeting) => (
          <MeetingsListItem
            key={meeting._id}
            meeting={meeting}
          />
        )),
    );
  }, [selectedCourse, displayedMeetings]);

  return meetingsListItems;
};
export default MeetingsList;
