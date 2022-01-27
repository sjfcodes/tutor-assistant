import { string } from 'prop-types';
import React, { useContext } from 'react';
import ListFilterSelector from '../../List/ListFilterSelector';
import { TasksContext } from '../TasksProvider';

const TasksListFilter = ({ className }) => {
  const {
    filterBy, setFilterBy,
    sectionName, filterOptions,
  } = useContext(TasksContext);
  return (
    <ListFilterSelector
      className={`has-text-centered ${className}`}
      sectionName={sectionName}
      filterOptions={filterOptions}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
    />
  );
};
export default TasksListFilter;

TasksListFilter.propTypes = { className: string };
TasksListFilter.defaultProps = { className: '' };
