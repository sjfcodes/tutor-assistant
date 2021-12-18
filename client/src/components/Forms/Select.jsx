import React from 'react';

export const Select = ({
  // eslint-disable-next-line react/prop-types
  name, className, options, onChange,
}) => (
  <select
    className={className}
    name={name}
    onChange={onChange}
  >
    <option value='select'>select</option>
    {options}
  </select>
);
export default Select;
