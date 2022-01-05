import { string } from 'prop-types';
import React from 'react';
import { getTimeZoneAbbreviation } from '../../utils';

const TimeZoneAbbreviation = ({ timeZoneName, className }) => (
  <span className={className}>{`(${getTimeZoneAbbreviation(timeZoneName)})`}</span>
);

export default TimeZoneAbbreviation;
TimeZoneAbbreviation.propTypes = {
  timeZoneName: string,
  className: string,
};

TimeZoneAbbreviation.defaultProps = {
  timeZoneName: 'loading…',
  className: '',

};
