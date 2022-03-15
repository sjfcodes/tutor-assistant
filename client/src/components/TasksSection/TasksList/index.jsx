import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { TasksContext } from '../TasksProvider';
import TaskLayoutAddStudent from './TaskLayoutAddStudent';
import TasksListItem from './TasksListItem';

const TasksList = () => {
  const { selectedCourse } = useSelector((state) => state.courses);

  const {
    filterBy, tutorTasks, studentTasks, meetingTasks, displayedTasks, setDisplayedTasks,
  } = useContext(TasksContext);
  const [tasksListComponents, setTasksListComponents] = useState('');

  const addTutorTasks = (arr) => {
    if (!arr || !arr.length) return [];
    return arr.map(() => ({
      _id: v4(),
      taskFor: 'tutorTaskFor',
      taskComponent: <p>tutorTaskComponent</p>,
    }));
  };

  const addStudentTasks = (arr) => {
    if (!arr || !arr.length) return [];
    return arr.map(({
      _id, firstName, lastName, email, timeZoneName,
    }) => ({
      _id,
      taskFor: `Add ${firstName} ${lastName} to Tutorly`,
      taskComponent: <TaskLayoutAddStudent
        firstName={firstName}
        lastName={lastName}
        email={email}
        timeZoneName={timeZoneName}
      />,
    }));
  };

  const addMeetingTasks = (arr) => {
    if (!arr || !arr.length) return [];
    return arr.map((meeting) => ({
      _id: meeting._id,
      taskFor: 'meetingTaskFor',
      taskComponent: <p>MeetingTaskComponent</p>,
    }));
  };

  useEffect(() => {
    if (selectedCourse) {
      const collectedTasks = [];

      switch (filterBy) {
      case 'tutor':
        collectedTasks.push(...addTutorTasks(tutorTasks));
        break;
      case 'student':
        collectedTasks.push(...addStudentTasks(studentTasks));
        break;
      case 'meeting':
        collectedTasks.push(...addMeetingTasks(meetingTasks));
        break;
      default:
        addTutorTasks();
        addStudentTasks();
        addMeetingTasks();
      }

      setDisplayedTasks(collectedTasks);
    } else setDisplayedTasks([]);
  }, [
    tutorTasks, studentTasks, meetingTasks,
    setDisplayedTasks, filterBy, selectedCourse,
  ]);

  useEffect(() => {
    if (!displayedTasks.length) setTasksListComponents(<p className='has-text-centered'>all tasks completed</p>);
    else setTasksListComponents(displayedTasks
      .map((task) => (
        <TasksListItem
          key={task._id}
          task={task}
        />
      )));
  }, [selectedCourse, displayedTasks]);

  return (tasksListComponents);
};
export default TasksList;
