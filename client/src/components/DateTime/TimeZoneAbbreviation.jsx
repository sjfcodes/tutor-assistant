import { string } from 'prop-types';
import React from 'react';
import { getTimeZoneAbbreviation } from '../../utils';

const TimeZoneAbbreviation = ({ timeZone, className }) => (
  <span className={className}>{`(${getTimeZoneAbbreviation(timeZone)})`}</span>
);

export default TimeZoneAbbreviation;
TimeZoneAbbreviation.propTypes = {
  timeZone: string,
  className: string,
};

TimeZoneAbbreviation.defaultProps = {
  timeZone: 'loading…',
  className: '',

};
