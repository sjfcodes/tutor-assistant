import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
  shape, string,
} from 'prop-types';
import TaskDetailListItem from './TaskDetailListItem';

const TaskDetailList = ({ task }) => {
  const [listItems, setListItems] = useState();
  const doNotDisplay = useMemo(
    () => ['_id', '__v', 'createdAt', 'studentId'],
    [],
  );

  useEffect(() => {
    let count = 0;
    if (!task._id) return '';

    setListItems(
      Object.entries(task)
        .map(([property, value]) => {
          if (doNotDisplay.indexOf(property) !== -1) return null;
          count += 1;
          return (
            <TaskDetailListItem
              key={uuid()}
              _id={task._id}
              count={count} // used for striped background
              value={value}
              property={property}
            />
          );
        }),
    );

    return '';
  }, [task, doNotDisplay]);

  return (
    <ul className='rounded'>
      {listItems}
    </ul>
  );
};

export default TaskDetailList;

TaskDetailList.propTypes = {
  task: shape({
    _id: string.isRequired,
    taskFor: string.isRequired,
  }).isRequired,
};
