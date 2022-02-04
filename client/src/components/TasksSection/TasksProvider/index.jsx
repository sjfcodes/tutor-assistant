import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { HomeContext, TASKS_SECTION } from '../../../views/Home/HomeProvider';

export const TasksContext = createContext({});

const checkCalendlyStudents = (students, calendlyMeetings) => {
  const studentEmails = {};
  Object
    .values(students)
    .forEach((student) => {
      studentEmails[student.email] = true;
    });

  const missing = [];
  Object
    .values(calendlyMeetings)
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
    calendlyMeetings,
  } = useSelector((state) => state);
  const { activeComponent } = useContext(HomeContext);
  const [filterOptions, setFilterOptions] = useState(['all', 'tutor', 'student', 'meeting']);
  const [filterBy, setFilterBy] = useState(filterOptions[0]);
  // eslint-disable-next-line no-unused-vars
  const [tutorTasks, setTutorTasks] = useState([]);
  const [studentTasks, setStudentTasks] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [meetingTasks, setMeetingTasks] = useState([]);
  const [count, setCount] = useState(0);

  const value = useMemo(
    () => (
      {
        count,
        tutorTasks,
        studentTasks,
        meetingTasks,
        setCount,
        filterBy,
        setFilterBy,
        filterOptions,
        setFilterOptions,
        sectionName: 'Tasks',
        isActive: activeComponent === TASKS_SECTION,
      }
    ),
    [
      count, tutorTasks, studentTasks, meetingTasks,
      activeComponent, filterBy, filterOptions,
    ],
  );

  useEffect(() => {
    const missingFromDB = checkCalendlyStudents(
      allCourses[selectedCourse].students,
      calendlyMeetings,
    );
    if (!missingFromDB.length) return;
    // console.log(missingFromDB);
    setCount(missingFromDB.length);
    setStudentTasks(missingFromDB);
  }, [allCourses, selectedCourse, calendlyMeetings, setCount]);

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
