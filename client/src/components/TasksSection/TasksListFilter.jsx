import { arrayOf, func, string } from 'prop-types';
import React from 'react';
import ListFilterSelector from '../List/ListFilterSelector';

const TasksListFilter = ({
  // eslint-disable-next-line no-unused-vars
  className, sectionName, filterOptions, setFilterOptions, filterBy, setFilterBy,
}) => (
  <ListFilterSelector
    className={`has-text-centered ${className}`}
    sectionName={sectionName}
    filterOptions={filterOptions}
    filterBy={filterBy}
    setFilterBy={setFilterBy}
  />
);
export default TasksListFilter;

TasksListFilter.propTypes = {
  className: string,
  sectionName: string.isRequired,
  filterOptions: arrayOf(string).isRequired,
  setFilterOptions: func.isRequired,
  filterBy: string.isRequired,
  setFilterBy: func.isRequired,
};
TasksListFilter.defaultProps = {
  className: '',
};
