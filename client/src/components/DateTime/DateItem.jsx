import React from 'react';
import { string, number } from 'prop-types';

const DateItem = ({ str, size }) => <span className={`is-size-${size}`}>{str}</span>;
DateItem.propTypes = {
  str: string.isRequired,
  size: number,
};
DateItem.defaultProps = {
  size: 6,
};
export default DateItem;
