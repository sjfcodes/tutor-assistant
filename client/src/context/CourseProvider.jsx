import React, {
  createContext, useEffect, useMemo, useState, useCallback,
} from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';

import { readModel, formatCalendlyMeetings } from '../utils';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [allCourses, setAllCourses] = useState();
  const [selectedCourse, setSelectedCourse] = useState();
  const [courseHasLoaded, setCourseHasLoaded] = useState(true);

  const readyToGetCalenlyMeetings = useCallback(() => (
    allCourses[selectedCourse].calendly.data && !courseHasLoaded
  ), [allCourses, selectedCourse, courseHasLoaded]);

  useEffect(() => {
    let isMounted = true;
    if (!selectedCourse || !allCourses) return '';
    const getCalendlyMeetings = async () => {
      try {
        const { calendlyMeetings } = await readModel({ model: 'calendly/meetings', _id: selectedCourse });
        const { meetings } = allCourses[selectedCourse];
        const formattedCalendlyMeetings = formatCalendlyMeetings(calendlyMeetings);
        if (!isMounted) return;
        setCourseHasLoaded(true);
        setAllCourses(
          {
            ...allCourses,
            [selectedCourse]: {
              ...allCourses[selectedCourse],
              meetings: {
                ...meetings,
                ...formattedCalendlyMeetings,
              },
            },
          },
        );
      } catch (error) {
        console.warn(error);
      }
    };
    if (readyToGetCalenlyMeetings()) getCalendlyMeetings();

    return () => { isMounted = false; };
  }, [selectedCourse, allCourses, courseHasLoaded, readyToGetCalenlyMeetings]);

  useEffect(
    () => {
      if (!selectedCourse) return;
      setCourseHasLoaded(false);
    },
    [selectedCourse],
  );

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
