import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { DashboardContext, TASKS_SECTION } from '../../../views/Dashboard/DashboardProvider';

export const TasksContext = createContext({});

const findMissingStudents = (courseMeetings) => {
  const meetings = Object.values(courseMeetings);
  return meetings
    .filter(({ studentId }) => !studentId);
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

  const { meetings: allMeetings } = allCourses[selectedCourse];

  useEffect(() => {
    const missingStudents = findMissingStudents(allMeetings);
    if (!missingStudents.length) return;
    setStudentTasks(missingStudents);
  }, [allMeetings]);

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
