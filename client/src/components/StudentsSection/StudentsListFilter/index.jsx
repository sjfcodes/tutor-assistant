import { string } from 'prop-types';
import React, { useContext } from 'react';
import ListFilterSelector from '../../List/ListFilterSelector';
import { StudentsContext } from '../StudentsProvider';

const StudentsListFilter = ({ className }) => {
  const {
    filterBy, setFilterBy,
    sectionName, filterOptions,
  } = useContext(StudentsContext);

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
export default StudentsListFilter;

StudentsListFilter.propTypes = { className: string };
StudentsListFilter.defaultProps = { className: '' };
