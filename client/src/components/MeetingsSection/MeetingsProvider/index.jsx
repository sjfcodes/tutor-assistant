import React, {
  createContext, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { COURSE_SECTION_MEETINGS } from '../../../store/view/actions';

export const MeetingsContext = createContext({});

// eslint-disable-next-line react/prop-types
const MeetingsProvider = ({ children }) => {
  const { activeComponent: { selectedComponent } } = useSelector((state) => state.view);
  const [displayedMeetings, setDisplayedMeetings] = useState([]);
  const [filterOptions, setFilterOptions] = useState(['all', 'tutorly']);
  const [filterBy, setFilterBy] = useState(filterOptions[0]);

  const value = useMemo(() => (
    {
      filterBy,
      setFilterBy,
      filterOptions,
      setFilterOptions,
      displayedMeetings,
      setDisplayedMeetings,
      sectionName: 'Meetings',
      isActive: selectedComponent === COURSE_SECTION_MEETINGS,
    }
  ), [selectedComponent, filterBy, filterOptions, displayedMeetings]);

  return (
    <MeetingsContext.Provider value={value}>
      {children}
    </MeetingsContext.Provider>
  );
};

export default MeetingsProvider;
