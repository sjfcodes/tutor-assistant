import { string } from 'prop-types';
import React, { useContext, useEffect } from 'react';
import ListFilterSelector from '../../List/ListFilterSelector';
import { MeetingsContext } from '../MeetingsProvider';

// eslint-disable-next-line react/prop-types
const MeetingsListFilter = ({ className, meetings }) => {
  const {
    sectionName, filterBy, setFilterBy,
    filterOptions, setFilterOptions,
  } = useContext(MeetingsContext);

  useEffect(() => {
    // scan meetings for missing meeting types
    // if a type is missing, add it to the filter options

    // eslint-disable-next-line react/prop-types
    meetings.forEach(
      ({ type }) => {
        if (!filterOptions.includes(type)) setFilterOptions([...filterOptions, type]);
      },
    );
  }, [meetings, filterOptions, setFilterOptions]);
  return (
    <ListFilterSelector
      className={`py-0 has-text-centered ${className}`}
      sectionName={sectionName}
      filterOptions={filterOptions}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
    />
  );
};
export default MeetingsListFilter;

MeetingsListFilter.propTypes = {
  className: string,
};
MeetingsListFilter.defaultProps = { className: '' };
