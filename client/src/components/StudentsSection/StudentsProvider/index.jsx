import React, {
  createContext, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { COURSE_SECTION_STUDENTS } from '../../../store/view/actions';

export const StudentsContext = createContext({});

// eslint-disable-next-line react/prop-types
const StudentsProvider = ({ children }) => {
  const { activeComponent: { selectedComponent } } = useSelector((state) => state.view);

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
      isActive: selectedComponent === COURSE_SECTION_STUDENTS,
    }
  ), [selectedComponent, filterBy, filterOptions, displayedStudents]);

  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsProvider;
