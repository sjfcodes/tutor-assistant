import { arrayOf, func, string } from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { CourseContext } from '../../context';
import ListFilterSelector from '../List/ListFilterSelector';

const MeetingsListFilter = ({
  sectionName, filterOptions, setFilterOptions, filterBy, setFilterBy,
}) => {
  const { calendlyMeetings } = useContext(CourseContext);

  useEffect(() => {
    let isMounted = true;
    const optionName = 'calendly';
    const hasItemsToFilter = (Object.keys(calendlyMeetings).length > 0);

    /**
         * if there are items to display
         *  if already an option, return
         * add option
         */
    if (hasItemsToFilter) {
      if (filterOptions.includes(optionName)) return '';
      if (!isMounted) return '';
      return setFilterOptions([...filterOptions, optionName]);
    }

    /*
        * if there are no items to display & option is included
        * remove option
        * update state
        */
    if (filterOptions.includes(optionName)) {
      const removeCalendlyOption = filterOptions.filter((option) => option !== optionName);
      if (!isMounted) return '';
      return setFilterOptions([...removeCalendlyOption]);
    }

    return () => { isMounted = false; };
  }, [calendlyMeetings, filterOptions, setFilterOptions]);

  return (
    <ListFilterSelector
      className='py-0 has-text-centered'
      sectionName={sectionName}
      filterOptions={filterOptions}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
    />
  );
};
export default MeetingsListFilter;

MeetingsListFilter.propTypes = {
  sectionName: string.isRequired,
  filterOptions: arrayOf(string).isRequired,
  setFilterOptions: func.isRequired,
  filterBy: string.isRequired,
  setFilterBy: func.isRequired,
};
