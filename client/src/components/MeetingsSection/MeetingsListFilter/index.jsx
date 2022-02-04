import { string } from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ListFilterSelector from '../../List/ListFilterSelector';
import { MeetingsContext } from '../MeetingsProvider';

const MeetingsListFilter = ({ className }) => {
  const { calendlyMeetings } = useSelector((state) => state);

  const {
    sectionName,
    filterBy, setFilterBy,
    filterOptions, setFilterOptions,
  } = useContext(MeetingsContext);

  useEffect(() => {
    let isMounted = true;
    const optionName = 'calendly';
    const hasItemsToFilter = (Object.keys(calendlyMeetings).length > 0);

    if (hasItemsToFilter) {
    /**
         * if there are items to display
         *  if already an option, return
         * add option
         */
      if (isMounted
      && !filterOptions.includes(optionName)
      ) setFilterOptions([...filterOptions, optionName]);
    } else if (filterOptions.includes(optionName)) {
    /*
        * if there are no items to display & option is included
        * remove option
        * update state
        */
      const removeCalendlyOption = filterOptions.filter((option) => option !== optionName);
      if (isMounted) setFilterOptions([...removeCalendlyOption]);
    }

    return () => { isMounted = false; };
  }, [calendlyMeetings, filterOptions, setFilterOptions]);

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

MeetingsListFilter.propTypes = { className: string };
MeetingsListFilter.defaultProps = { className: '' };
