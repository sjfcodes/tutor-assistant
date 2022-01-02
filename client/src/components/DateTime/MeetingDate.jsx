/* eslint-disable no-unused-vars */
import React from 'react';
import { string } from 'prop-types';
import DateItem from './DateItem';

const MeetingDate = ({ iso8601, className }) => {
  const d = new Date(iso8601).toString().split(' ');
  //    d = [ "Sun", "Dec", "19", "2021", "20:00:00", "GMT-0800", "(Pacific", "Standard", "Time)"]

  const t = new Date(iso8601).toLocaleTimeString().split(':');
  if (t[0].length === 1) t[0] = `0${t[0]}`;
  t[2] = t[2].substring(3).toLowerCase();
  //    time = ["08","00","pm"]

  return (
    <span className={className}>
      <DateItem str={d[0]} size={7} />
      {' '}
      <DateItem str={d[1]} size={7} />
      {' '}
      <DateItem str={d[2]} />
      <DateItem str=' @ ' size={7} />
      <DateItem str={t[0]} />
      :
      <DateItem str={t[1]} />
      {' '}
      <DateItem str={t[2]} size={7} />
    </span>
  );
};
export default MeetingDate;

MeetingDate.propTypes = {
  iso8601: string.isRequired,
  className: string,
};
MeetingDate.defaultProps = {
  className: '',
};
