import { string } from 'prop-types';
import React, { useContext, useEffect } from 'react';
import ListFilterSelector from '../../List/ListFilterSelector';
import { MeetingsContext } from '../MeetingsProvider';

// eslint-disable-next-line react/prop-types
const MeetingsListFilter = ({ className }) => {
  const {
    filterBy,
    setFilterBy,
    sectionName,
    setFilterOptions,
    allMeetings,
    filterOptions,
  } = useContext(MeetingsContext);

  useEffect(() => {
    // scan meetings for missing meeting types
    // if a type is missing, add it to the filter options

    // eslint-disable-next-line react/prop-types
    Object
      .values(allMeetings)
      .forEach(({ type }) => {
        if (!filterOptions.types.includes(type)) setFilterOptions({
          ...filterOptions,
          types: [...filterOptions.types, type],
        });
      });
  }, [allMeetings, filterOptions, setFilterOptions]);
  return (
    <ListFilterSelector
      className={`py-0 has-text-centered ${className}`}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      sectionName={sectionName}
      filterOptions={filterOptions.types}
    />
  );
};
export default MeetingsListFilter;

MeetingsListFilter.propTypes = {
  className: string,
};
MeetingsListFilter.defaultProps = { className: '' };
