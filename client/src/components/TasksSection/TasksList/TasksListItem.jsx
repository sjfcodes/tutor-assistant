import React, { useEffect, useState } from 'react';
import {
  func,
  shape, string,
} from 'prop-types';
import ListItemContainer from '../../List/ListItemContainer';
import TasksListItemLayout from './TasksListItemLayout';

const TasksListItem = ({ task, selectedTaskId, setSelectedTaskId }) => {
  const [listItem, setListItem] = useState('');
  const [listItemDetails, setListItemDetails] = useState('listItemDetails');
  const { _id, taskComponent } = task;

  const toggleViewStudent = () => (
    selectedTaskId === _id
      ? setSelectedTaskId('')
      : setSelectedTaskId(_id)
  );

  useEffect(() => {
    setListItem(
      <TasksListItemLayout
        taskFor={task.taskFor}
      />,
    );
  }, [task]);

  useEffect(() => {
    if (selectedTaskId !== _id) return setListItemDetails('');
    return setListItemDetails(taskComponent);
  }, [task, _id, selectedTaskId, taskComponent]);

  return (
    <ListItemContainer
      itemId={_id}
      selectedItemId={selectedTaskId}
      toggleViewItem={toggleViewStudent}
      listItem={listItem}
      listItemDetails={listItemDetails}
    />
  );
};
export default TasksListItem;

TasksListItem.propTypes = {
  task: shape({
    _id: string.isRequired,
  }).isRequired,
  selectedTaskId: string.isRequired,
  setSelectedTaskId: func.isRequired,
};
