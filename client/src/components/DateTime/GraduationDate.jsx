/* eslint-disable no-unused-vars */
import React from 'react';
import { string, number } from 'prop-types';
import DateItem from './DateItem';

const GraduationDate = ({ iso8601, className }) => {
  const d = new Date(iso8601).toString().split(' ');
  //    d = [ "Sun", "Dec", "19", "2021", "20:00:00", "GMT-0800", "(Pacific", "Standard", "Time)"]

  return (
    <p className={className}>
      {/* <DateItem str={d[0]} size={7} />
      {' '} */}
      <DateItem str={d[1]} size={7} />
      {' '}
      <DateItem str={d[2]} />
      <DateItem str=' / ' size={7} />
      <DateItem str={d[3]} />
    </p>
  );
};

GraduationDate.propTypes = {
  iso8601: string.isRequired,
  className: string,
};
GraduationDate.defaultProps = {
  className: '',
};

export default GraduationDate;
