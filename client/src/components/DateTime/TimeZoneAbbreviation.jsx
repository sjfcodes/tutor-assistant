import { rawTimeZones } from '@vvo/tzdb';
import { string } from 'prop-types';
import React from 'react';

const TimeZoneAbbreviation = ({ timeZone, className }) => {
  if (!timeZone) return <span className={`${className} is-size-7`}>loading…</span>;
  const { abbreviation } = rawTimeZones.find((tz) => tz.name === timeZone) || {};

  return (
    <span className={className}>
      (
      {abbreviation}
      )
    </span>
  );
};

export default TimeZoneAbbreviation;
TimeZoneAbbreviation.propTypes = {
  timeZone: string,
  className: string,
};

TimeZoneAbbreviation.defaultProps = {
  timeZone: 'loading…',
  className: '',

};
