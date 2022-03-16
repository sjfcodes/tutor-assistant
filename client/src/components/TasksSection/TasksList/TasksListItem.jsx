import React, { useContext, useEffect, useState } from 'react';
import {
  shape, string,
} from 'prop-types';
import { Level } from 'react-bulma-components';
import ListItemContainer from '../../List/ListItemContainer';
import { DashboardContext, COURSE_SECTION_TASKS } from '../../../views/Dashboard/DashboardProvider';

const TasksListItem = ({ task }) => {
  const [listItemDetails, setListItemDetails] = useState('listItemDetails');
  const { _id, taskComponent, taskFor } = task;

  const { activeComponent, setActiveComponent } = useContext(DashboardContext);
  const { component, selectedItemId } = activeComponent;

  const toggleViewTask = () => (
    setActiveComponent({
      ...activeComponent,
      selectedItemId: selectedItemId === _id ? '' : _id,
    })
  );

  useEffect(() => {
    if (component !== COURSE_SECTION_TASKS) return '';

    if (selectedItemId !== _id) return setListItemDetails('');
    return setListItemDetails(taskComponent);
  }, [task, _id, selectedItemId, component, taskComponent]);

  return (
    <ListItemContainer
      itemId={_id}
      selectedItemId={selectedItemId}
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
