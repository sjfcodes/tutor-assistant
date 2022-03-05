import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { TasksContext } from '../TasksProvider';
import TaskLayoutAddStudent from './TaskLayoutAddStudent';
import TasksListItem from './TasksListItem';

const TasksList = () => {
  const { selectedCourse } = useSelector((state) => state.courses);

  const { filterBy, setCount, studentTasks } = useContext(TasksContext);
  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [tasksListItems, setTasksListItems] = useState('');

  useEffect(
    () => {
      if (!selectedCourse) return;

      const collectTasks = (filter) => {
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
          if (!studentTasks.length) return;
          studentTasks.forEach(({
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

        switch (filter) {
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
        }
        return collectedTasks;
      };

      const tasks = collectTasks(filterBy);
      setCount(tasks.length);
      setDisplayedTasks(tasks);
    },
    [
      filterBy, setCount,
      selectedCourse, studentTasks,
    ],
  );

  useEffect(() => {
    if (!displayedTasks.length) setTasksListItems(<p className='has-text-centered'>all tasks completed</p>);
    else setTasksListItems(
      displayedTasks
        .map((task) => (
          <TasksListItem
            key={task._id}
            task={task}
          />
        )),
    );
  }, [selectedCourse, displayedTasks]);

  return (tasksListItems);
};
export default TasksList;
