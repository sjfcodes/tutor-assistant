import React, {
  createContext, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { COURSE_SECTION_STUDENTS } from '../../../store/view/actions';
import { getCourseSectionListItemCount, getCurrentUnix } from '../../../utils';
import { getUnixFromISO } from '../../../utils/helpers/dateTime';

export const StudentsContext = createContext({});

// eslint-disable-next-line react/prop-types
const StudentsProvider = ({ children }) => {
  const {
    courses: { allCourses, selectedCourse },
    view: { activeComponent: { selectedComponent } },
  } = useSelector((state) => state);

  const [displayedStudents, setDisplayedStudents] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    currentStudentsOnly: true,
    types: ['first name', 'last name', 'graduation date'],
  });
  const [filterBy, setFilterBy] = useState(filterOptions.types[0]);

  const { students: allStudents } = useMemo(
    () => {
      if (!allCourses || !selectedCourse || !allCourses[selectedCourse]) return { students: {} };

      return allCourses[selectedCourse];
    },
    [allCourses, selectedCourse],
  );

  const focusedStudents = useMemo(
    () => {
      const currentDateUnix = getCurrentUnix();
      const studentsArr = Object.values(allStudents) || [];

      if (!studentsArr.length) return studentsArr;

      return filterOptions.currentStudentsOnly
        ? studentsArr
          .filter(({ graduationDate }) => getUnixFromISO(graduationDate) > currentDateUnix)
        : studentsArr;
    },
    [allStudents, filterOptions],
  );

  const studentCount = getCourseSectionListItemCount({
    displayed: displayedStudents.length,
    focused: focusedStudents.length,
  });

  const value = useMemo(() => (
    {
      filterBy,
      setFilterBy,
      filterOptions,
      setFilterOptions,
      // allStudents,
      displayedStudents,
      focusedStudents,
      studentCount,
      setDisplayedStudents,
      sectionName: 'Students',
      isActive: selectedComponent === COURSE_SECTION_STUDENTS,
    }
  ), [selectedComponent, filterBy, filterOptions,
    displayedStudents, focusedStudents,
    studentCount,
  ]);

  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsProvider;
