import React from 'react';
import { string, number } from 'prop-types';

const DateItem = ({ str, size, className }) => <span className={`is-size-${size} ${className}`}>{str}</span>;
DateItem.propTypes = {
  className: string,
  str: string.isRequired,
  size: number,
};
DateItem.defaultProps = {
  className: '',
  size: 6,
};
export default DateItem;
