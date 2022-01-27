import React, {
  createContext, useContext, useMemo, useState,
} from 'react';
import { HomeContext, MEETINGS_SECTION } from '../../../views/Home/HomeProvider';

export const MeetingsContext = createContext({});

// eslint-disable-next-line react/prop-types
const MeetingsProvider = ({ children }) => {
  const { activeComponent } = useContext(HomeContext);
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
