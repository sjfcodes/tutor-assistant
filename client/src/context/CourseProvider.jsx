import { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [allCourses, setAllCourses] = useState();
  const [selectedCourse, setSelectedCourse] = useState();

  useEffect(() => {
    if (!allCourses || !selectedCourse) return;
    console.log(allCourses[selectedCourse]);
  }, [selectedCourse, allCourses]);

  const test = useMemo(() => {
    return {
      allCourses,
      setAllCourses,
      selectedCourse,
      setSelectedCourse,
    };
  }, [allCourses, selectedCourse]);

  return (
    <CourseContext.Provider value={test}>{children}</CourseContext.Provider>
  );
};

CourseProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
