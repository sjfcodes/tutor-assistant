import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TasksContext } from '../TasksProvider';
import TaskLayoutAddStudent from './TaskLayoutAddStudent';
import TasksListItem from './TasksListItem';

const TasksList = () => {
  const { selectedCourse } = useSelector((state) => state.courses);

  const {
    filterBy, studentTasks, displayedTasks, setDisplayedTasks,
  } = useContext(TasksContext);
  const [tasksListComponents, setTasksListComponents] = useState('');

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
            _id, firstName, lastName, email, timeZoneName,
          }) => {
            collectedTasks.push(
              {
                _id,
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
      setDisplayedTasks(tasks);
    },
    [
      studentTasks, setDisplayedTasks,
      filterBy, selectedCourse,
    ],
  );

  useEffect(() => {
    if (!displayedTasks.length) setTasksListComponents(<p className='has-text-centered'>all tasks completed</p>);
    else setTasksListComponents(
      displayedTasks
        .map((task) => (
          <TasksListItem
            key={task._id}
            task={task}
          />
        )),
    );
  }, [selectedCourse, displayedTasks]);

  return (tasksListComponents);
};
export default TasksList;
