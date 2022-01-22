import { arrayOf, func, string } from 'prop-types';
import React from 'react';
import ListFilterSelector from '../List/ListFilterSelector';

const StudentsListFilter = ({
  // eslint-disable-next-line no-unused-vars
  className, sectionName, filterOptions, filterBy, setFilterBy,
}) => (
  <ListFilterSelector
    className={`has-text-centered ${className}`}
    sectionName={sectionName}
    filterOptions={filterOptions}
    filterBy={filterBy}
    setFilterBy={setFilterBy}
  />
);
export default StudentsListFilter;

StudentsListFilter.propTypes = {
  className: string,
  sectionName: string.isRequired,
  filterOptions: arrayOf(string).isRequired,
  filterBy: string.isRequired,
  setFilterBy: func.isRequired,
};
StudentsListFilter.defaultProps = {
  className: '',
};
