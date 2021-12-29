import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [allCourses, setAllCourses] = useState();
  const [selectedCourse, setSelectedCourse] = useState();

  useEffect(() => {
    if (!allCourses || !selectedCourse) return;
    console.log(allCourses[selectedCourse]);
  }, [selectedCourse, allCourses]);

  const memo = useMemo(() => ({
    allCourses,
    setAllCourses,
    selectedCourse,
    setSelectedCourse,
  }), [allCourses, selectedCourse]);

  return (
    <CourseContext.Provider value={memo}>{children}</CourseContext.Provider>
  );
};

CourseProvider.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node,
  ]).isRequired,
};
