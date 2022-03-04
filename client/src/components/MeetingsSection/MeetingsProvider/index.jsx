import React, {
  createContext, useContext, useMemo, useState,
} from 'react';
import { DashboardContext, MEETINGS_SECTION } from '../../../views/Dashboard/DashboardProvider';

export const MeetingsContext = createContext({});

// eslint-disable-next-line react/prop-types
const MeetingsProvider = ({ children }) => {
  const { activeComponent } = useContext(DashboardContext);
  const [filterOptions, setFilterOptions] = useState(['all', 'tutorly']);
  const [filterBy, setFilterBy] = useState(filterOptions[0]);

  const value = useMemo(() => (
    {
      filterBy,
      setFilterBy,
      filterOptions,
      setFilterOptions,
      sectionName: 'Meetings',
      isActive: activeComponent === MEETINGS_SECTION,
    }
  ), [activeComponent, filterBy, filterOptions]);

  return (
    <MeetingsContext.Provider value={value}>
      {children}
    </MeetingsContext.Provider>
  );
};

export default MeetingsProvider;
