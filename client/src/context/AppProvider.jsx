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
import { tokenKey } from '../config';

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
    const prevToken = localStorage.getItem(tokenKey);
    if (!prevToken) return;

    const loginUser = async () => {
      try {
        const data = await loginWithToken(prevToken);
        const { tutor, token } = data;
        if (!tutor || !token) return;
        // console.log(data.calendlyMeetings);

        const formattedCourses = tutor.courses.map((course) => ({
          ...course,
          students: formatStudents(course.students),
          meetings: formatMeetings(
            data.calendlyMeetings
              ? [...course.meetings, ...data.calendlyMeetings]
              : course.meetings,
          ),
        }));

        setAllCourses(formatCourses(formattedCourses));
        setTutorDetails({ ...tutor, loggedIn: true });
      } catch (error) {
        console.warn(error);
        localStorage.removeItem(tokenKey);
      }
    };

    loginUser();
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
