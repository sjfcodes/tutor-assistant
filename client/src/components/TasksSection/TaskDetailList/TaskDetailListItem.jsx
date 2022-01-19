import React from 'react';
import {
  string, number, oneOfType, bool,
} from 'prop-types';

const TaskListItemDetail = ({
  _id, property, value,
}) => (
  <div>
    <p>{_id}</p>
    <p>{property}</p>
    <p>{value}</p>
  </div>
);
export default TaskListItemDetail;

TaskListItemDetail.propTypes = {
  _id: string.isRequired,
  property: string.isRequired,
  value: oneOfType([number, string, bool]).isRequired,
};
