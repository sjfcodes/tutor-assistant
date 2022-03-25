import React, {
  createContext, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { COURSE_SECTION_MEETINGS } from '../../../store/view/actions';
import { getCourseSectionListItemCount } from '../../../utils';

export const MeetingsContext = createContext({});
let count = 0;

// eslint-disable-next-line react/prop-types
const MeetingsProvider = ({ children }) => {
  const {
    courses: { allCourses, selectedCourse },
    view: { activeComponent: { selectedComponent } },
  } = useSelector((state) => state);

  const [displayedMeetings, setDisplayedMeetings] = useState([]);
  const [filterOptions, setFilterOptions] = useState(['all', 'tutorly']);
  const [filterBy, setFilterBy] = useState(filterOptions[0]);

  const { meetings: allMeetings } = useMemo(() => {
    const noCourseSelected = () => (
      !allCourses
        || !selectedCourse
        || !allCourses[selectedCourse]
    );
    return (
      noCourseSelected()
        ? { meetings: {} }
        : allCourses[selectedCourse]
    );
  }, [allCourses, selectedCourse]);

  const focusedMeetings = useMemo(() => {
    const allMeetingsArr = Object.values(allMeetings);
    // will be used for updating focused meetings based on checkbox settings, see students section
    // currentMeetingsArr = ...
    return allMeetingsArr;
  }, [allMeetings]);

  const meetingCount = getCourseSectionListItemCount({
    displayed: displayedMeetings.length,
    focused: focusedMeetings.length,
  });

  const value = useMemo(() => (
    {
      filterBy,
      setFilterBy,
      filterOptions,
      setFilterOptions,
      allMeetings,
      displayedMeetings,
      focusedMeetings,
      meetingCount,
      setDisplayedMeetings,
      sectionName: 'Meetings',
      isActive: selectedComponent === COURSE_SECTION_MEETINGS,
    }
  ), [
    selectedComponent, filterBy, filterOptions,
    displayedMeetings, focusedMeetings,
    allMeetings, meetingCount,
  ]);
  count += 1;
  console.log('rendering meetingProvider', count);

  return (
    <MeetingsContext.Provider value={value}>
      {children}
    </MeetingsContext.Provider>
  );
};

export default MeetingsProvider;
