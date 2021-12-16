import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { node } from 'prop-types';
import { loginWithToken } from '../utils';
import {
  formatCourses,
  formatMeetings,
  formatStudents,
} from '../utils/helpers';
import { CourseContext } from './CourseProvider';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tutorDetails, setTutorDetails] = useState({ loggedIn: false });
  const { setAllCourses } = useContext(CourseContext);

  const tutorMemo = useMemo(
    () => (
      {
        tutorDetails,
        setTutorDetails,
      }),
    [tutorDetails, setTutorDetails],
  );

  useEffect(() => {
    const token = localStorage.getItem('tutor-token');
    if (!token) return;

    async function loginUser() {
      const { tutor } = await loginWithToken(token);
      if (!tutor) return;
      const formattedCourses = tutor.courses.map((course) => ({
        ...course,
        students: formatStudents(course.students),
        meetings: formatMeetings(course.meetings),
      }));

      setAllCourses(formatCourses(formattedCourses));
      setTutorDetails({ ...tutor, loggedIn: true });
    }

    try {
      loginUser();
    } catch (error) {
      console.warn(error);
    }
  }, [setAllCourses]);

  return (
    <AppContext.Provider value={tutorMemo}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: node.isRequired,
};
