import React, {
  createContext, useContext, useMemo, useState,
} from 'react';
import { DashboardContext, COURSE_SECTION_STUDENTS } from '../../../views/Dashboard/DashboardProvider';

export const StudentsContext = createContext({});

// eslint-disable-next-line react/prop-types
const StudentsProvider = ({ children }) => {
  const { activeComponent: { component } } = useContext(DashboardContext);
  const [displayedStudents, setDisplayedStudents] = useState([]);
  const [filterOptions, setFilterOptions] = useState(['first name', 'last name', 'graduation date']);
  const [filterBy, setFilterBy] = useState(filterOptions[0]);

  const value = useMemo(() => (
    {
      filterBy,
      setFilterBy,
      filterOptions,
      setFilterOptions,
      displayedStudents,
      setDisplayedStudents,
      sectionName: 'Students',
      isActive: component === COURSE_SECTION_STUDENTS,
    }
  ), [component, filterBy, filterOptions, displayedStudents]);

  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsProvider;
