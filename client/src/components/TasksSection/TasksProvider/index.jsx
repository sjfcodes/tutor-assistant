import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { DashboardContext, TASKS_SECTION } from '../../../views/Dashboard/DashboardProvider';

export const TasksContext = createContext({});

const checkCalendlyStudentsByEmail = (selectedCourse) => {
  // collect emails for existing students
  const studentEmails = {};
  Object
    .values(selectedCourse.students)
    .forEach((student) => {
      studentEmails[student.email] = true;
    });

  const missing = [];
  Object
    .values(selectedCourse.meetings)
    .filter(({ type }) => type === 'calendly')
    .forEach((meeting) => {
      if (!studentEmails[meeting.email]) {
        studentEmails[meeting.email] = true;
        missing.push(meeting);
      }
    });

  // console.log('found', studentEmails);
  // console.log('missing', missing);
  return missing;
};

// eslint-disable-next-line react/prop-types
const TasksProvider = ({ children }) => {
  const {
    courses: { allCourses, selectedCourse },
  } = useSelector((state) => state);
  const { activeComponent: { component } } = useContext(DashboardContext);
  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [filterOptions, setFilterOptions] = useState(['all', 'tutor', 'student', 'meeting']);
  const [filterBy, setFilterBy] = useState(filterOptions[0]);
  // eslint-disable-next-line no-unused-vars
  const [tutorTasks, setTutorTasks] = useState([]);
  const [studentTasks, setStudentTasks] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [meetingTasks, setMeetingTasks] = useState([]);

  const value = useMemo(
    () => (
      {
        tutorTasks,
        studentTasks,
        meetingTasks,
        filterBy,
        setFilterBy,
        filterOptions,
        setFilterOptions,
        displayedTasks,
        setDisplayedTasks,
        sectionName: 'Tasks',
        isActive: component === TASKS_SECTION,
      }
    ),
    [
      tutorTasks, studentTasks, meetingTasks,
      component, filterBy, filterOptions, displayedTasks,
    ],
  );

  useEffect(() => {
    const missingFromDB = checkCalendlyStudentsByEmail(allCourses[selectedCourse]);
    if (!missingFromDB.length) return;
    // console.log(missingFromDB);
    setStudentTasks(missingFromDB);
  }, [allCourses, selectedCourse]);

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
