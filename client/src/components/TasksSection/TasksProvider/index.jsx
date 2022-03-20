import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { COURSE_SECTION_TASKS } from '../../../store/view/actions';

export const TasksContext = createContext({});

const findMissingStudents = (courseMeetings) => {
  if (!courseMeetings) return [];
  const meetings = Object.values(courseMeetings);
  return meetings
    .filter(({ studentId }) => !studentId);
};

// eslint-disable-next-line react/prop-types
const TasksProvider = ({ children }) => {
  const {
    courses: { allCourses, selectedCourse },
    view: { activeComponent: { selectedComponent } },
  } = useSelector((state) => state);
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
        isActive: selectedComponent === COURSE_SECTION_TASKS,
      }
    ),
    [
      tutorTasks, studentTasks, meetingTasks,
      selectedComponent, filterBy, filterOptions, displayedTasks,
    ],
  );

  const { meetings: allMeetings } = useMemo(
    () => {
      if (!allCourses || !selectedCourse) return { meetings: {} };

      return allCourses[selectedCourse];
    },
    [allCourses, selectedCourse],
  );

  useEffect(() => {
    const missingStudents = findMissingStudents(allMeetings);
    setStudentTasks(missingStudents.length
      ? missingStudents
      : []);
  }, [allMeetings]);

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
