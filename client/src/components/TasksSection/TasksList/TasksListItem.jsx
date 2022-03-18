import React, { useEffect, useState } from 'react';
import {
  shape, string,
} from 'prop-types';
import { Level } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';
import ListItemContainer from '../../List/ListItemContainer';
import { COURSE_SECTION_TASKS, SET_ACTIVE_COMPONENT } from '../../../store/view/actions';

const TasksListItem = ({ task }) => {
  const dispatch = useDispatch();
  const {
    activeComponent: { selectedComponent, selectedComponentItemId },
  } = useSelector((state) => state.view);
  const [listItemDetails, setListItemDetails] = useState('listItemDetails');
  const { _id, taskComponent, taskFor } = task;

  const toggleViewTask = () => (
    dispatch({
      type: SET_ACTIVE_COMPONENT,
      payload: {
        selectedComponentItemId: selectedComponentItemId === _id ? '' : _id,
      },
    })
  );

  useEffect(() => {
    if (selectedComponent !== COURSE_SECTION_TASKS) return '';

    if (selectedComponentItemId !== _id) return setListItemDetails('');
    return setListItemDetails(taskComponent);
  }, [task, _id, selectedComponentItemId, selectedComponent, taskComponent]);

  return (
    <ListItemContainer
      itemId={_id}
      selectedComponentItemId={selectedComponentItemId}
      toggleViewItem={toggleViewTask}
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
};
