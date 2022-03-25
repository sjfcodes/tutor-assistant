import { string } from 'prop-types';
import React, { useContext, useEffect } from 'react';
import ListFilterSelector from '../../List/ListFilterSelector';
import { MeetingsContext } from '../MeetingsProvider';

// eslint-disable-next-line react/prop-types
const MeetingsListFilter = ({ className }) => {
  const {
    sectionName, filterBy, setFilterBy,
    filterOptions, setFilterOptions, allMeetings,
  } = useContext(MeetingsContext);

  useEffect(() => {
    // scan meetings for missing meeting types
    // if a type is missing, add it to the filter options

    // eslint-disable-next-line react/prop-types
    Object
      .values(allMeetings)
      .forEach(({ type }) => {
        if (!filterOptions.includes(type)) setFilterOptions([...filterOptions, type]);
      });
  }, [allMeetings, filterOptions, setFilterOptions]);
  return (
    <ListFilterSelector
      className={`py-0 has-text-centered ${className}`}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      sectionName={sectionName}
      filterOptions={filterOptions}
    />
  );
};
export default MeetingsListFilter;

MeetingsListFilter.propTypes = {
  className: string,
};
MeetingsListFilter.defaultProps = { className: '' };
