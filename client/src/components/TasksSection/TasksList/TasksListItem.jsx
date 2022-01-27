import React, { useEffect, useState } from 'react';
import {
  func,
  shape, string,
} from 'prop-types';
import { Level } from 'react-bulma-components';
import ListItemContainer from '../../List/ListItemContainer';

const TasksListItem = ({ task, selectedTaskId, setSelectedTaskId }) => {
  const [listItemDetails, setListItemDetails] = useState('listItemDetails');
  const { _id, taskComponent, taskFor } = task;

  const toggleViewStudent = () => (
    selectedTaskId === _id
      ? setSelectedTaskId('')
      : setSelectedTaskId(_id)
  );

  useEffect(() => {
    if (selectedTaskId !== _id) return setListItemDetails('');
    return setListItemDetails(taskComponent);
  }, [task, _id, selectedTaskId, taskComponent]);

  return (
    <ListItemContainer
      itemId={_id}
      selectedItemId={selectedTaskId}
      toggleViewItem={toggleViewStudent}
      listItemDetails={listItemDetails}
    >
      <Level.Item className='ml-3 mr-1'>{taskFor}</Level.Item>
    </ListItemContainer>
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
