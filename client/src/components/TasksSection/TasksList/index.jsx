import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import TaskLayoutAddStudent from './TaskLayoutAddStudent';
import TasksListItem from './TasksListItem';

const checkCalendlyStudents = (students, calendlyMeetings) => {
  const studentEmails = {};
  Object
    .values(students)
    .forEach((student) => {
      studentEmails[student.email] = student;
    });

  const found = [];
  const missing = Object
    .values(calendlyMeetings)
    .filter((meeting) => {
      if (!studentEmails[meeting.email]) return true;
      found.push(meeting);
      return false;
    });

  // console.log('found', found);
  // console.log('missing', missing);
  return missing;
};

const TasksList = ({ filterBy }) => {
  const {
    courses: {
      allCourses, selectedCourse,
    },
    calendlyMeetings,
  } = useSelector((state) => state);

  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [tasksListItems, setTasksListItems] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [tutorTasks, setTutorTasks] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [studentTasks, setStudentTasks] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [meetingTasks, setMeetingTasks] = useState([]);

  useEffect(() => {
    if (!selectedCourse) return;
    const collectedTasks = [];

    const addTutorTasks = () => {
      // collectedTasks.push(
      //   {
      //     _id: uuidv4(),
      //     taskFor: 'tutorTaskFor',
      //     taskComponent: <p>tutorTaskComponent</p>,
      //   },
      // );
    };

    const addStudentTasks = () => {
      const missingFromDB = checkCalendlyStudents(
        allCourses[selectedCourse].students,
        calendlyMeetings,
      );
      if (!missingFromDB.length) return;
      // console.log(missingFromDB);
      missingFromDB.forEach(({
        firstName, lastName, email, timeZoneName,
      }) => {
        collectedTasks.push(
          {
            _id: uuidv4(),
            taskFor: `Add ${firstName} ${lastName} to Tutorly`,
            taskComponent: <TaskLayoutAddStudent
              firstName={firstName}
              lastName={lastName}
              email={email}
              timeZoneName={timeZoneName}
            />,
          },
        );
      });
    };

    const addMeetingTasks = () => {
      // collectedTasks.push(
      //   {
      //     _id: uuidv4(),
      //     taskFor: 'meetingTaskFor',
      //     taskComponent: <p>MeetingTaskComponent</p>,
      //   },
      // );
    };

    switch (filterBy) {
    case 'tutor':
      addTutorTasks();
      break;

    case 'student':
      addStudentTasks();
      break;

    case 'meeting':
      addMeetingTasks();
      break;

    default:
      addTutorTasks();
      addStudentTasks();
      addMeetingTasks();
      break;
    }

    setDisplayedTasks(collectedTasks);
  }, [selectedCourse, allCourses, calendlyMeetings, filterBy]);

  useEffect(() => {
    if (!displayedTasks.length) return setTasksListItems(<p className='has-text-centered'>all tasks completed</p>);
    return setTasksListItems(displayedTasks.map((task) => (
      <TasksListItem
        key={task._id}
        task={task}
        selectedTaskId={selectedTaskId}
        setSelectedTaskId={setSelectedTaskId}
      />
    )));
  }, [selectedCourse, allCourses, displayedTasks, selectedTaskId]);

  return (tasksListItems);
};
export default TasksList;

TasksList.propTypes = {
  filterBy: string.isRequired,
};
