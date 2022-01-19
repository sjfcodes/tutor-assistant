import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';

import { readModel, formatCalendlyMeetings } from '../utils';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [allCourses, setAllCourses] = useState({});
  const [selectedCourse, setSelectedCourse] = useState('');
  const [calendlyMeetings, setCalendlyMeetings] = useState({});

  useEffect(() => {
    let isMounted = true;
    if (!selectedCourse || !allCourses) return '';
    const getCalendlyMeetings = async () => {
      const { calendlyMeetings: calMeetings } = await readModel({ model: 'calendly/meetings', _id: selectedCourse });
      if (!isMounted) return;
      setCalendlyMeetings({ ...formatCalendlyMeetings(calMeetings) });
    };
    if (allCourses[selectedCourse].calendly.data) getCalendlyMeetings();

    return () => { isMounted = false; };
  }, [selectedCourse, allCourses]);

  const memo = useMemo(() => ({
    allCourses,
    setAllCourses,
    selectedCourse,
    setSelectedCourse,
    calendlyMeetings,
  }), [allCourses, selectedCourse, calendlyMeetings]);

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
