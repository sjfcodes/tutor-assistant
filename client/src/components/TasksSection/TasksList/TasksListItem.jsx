import React, { useEffect, useState } from 'react';
import {
  func,
  shape, string,
} from 'prop-types';
import ListItemContainer from '../../List/ListItemContainer';
import TasksListItemLayout from './TasksListItemLayout';
import TaskDetailList from '../TaskDetailList';

const TasksListItem = ({ task, selectedTaskId, setSelectedTaskId }) => {
  const [listItem, setListItem] = useState('');
  const [listItemDetails, setListItemDetails] = useState('listItemDetails');
  const { _id, taskFor } = task;

  const toggleViewStudent = () => (
    selectedTaskId === _id
      ? setSelectedTaskId('')
      : setSelectedTaskId(_id)
  );

  useEffect(() => {
    setListItem(
      <TasksListItemLayout
        taskFor={taskFor}
      />,
    );
  }, [taskFor]);

  useEffect(() => {
    if (selectedTaskId !== _id) return setListItemDetails('');
    return setListItemDetails(<TaskDetailList task={task} _id={_id} />);
  }, [task, _id, selectedTaskId]);

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
