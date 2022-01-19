/* eslint-disable no-unused-vars */
import { string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CourseContext } from '../../../context';
import TasksListItem from './TasksListItem';

const TasksList = ({ filterBy }) => {
  const { allCourses, selectedCourse } = useContext(CourseContext);
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
    const selectedTasks = [];

    const addTutorTasks = () => {
      selectedTasks.push({ _id: uuidv4(), taskFor: 'tutor' });
    };
    const addStudentTasks = () => {
      selectedTasks.push({ _id: uuidv4(), taskFor: 'student' });
    };
    const addMeetingTasks = () => {
      selectedTasks.push({ _id: uuidv4(), taskFor: 'meeting' });
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

    setDisplayedTasks(selectedTasks);
  }, [selectedCourse, allCourses, filterBy]);

  useEffect(() => {
    if (!displayedTasks.length) return setTasksListItems(<p>add a student to get started</p>);
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
