import React from 'react';
import {
  bool, number, object, oneOfType, shape, string,
} from 'prop-types';

export const Input = ({
  // eslint-disable-next-line react/prop-types
  type, name, value, className, selected, setSelected,
}) => {
  const handleInputChange = ({ target }) => {
    setSelected(
      {
        ...selected,
        values: {
          ...selected.values,
          [target.name]: target.value,
        },
      },
    );
  };
  return (
    <input
      type={type}
      name={name}
      value={value}
      className={className}
      onChange={handleInputChange}
    />
  );
};
export default Input;

Input.propTypes = {
  type: string,
  name: string.isRequired,
  value: oneOfType([string, number, bool]).isRequired,
  className: string,
  selected: shape({
    // eslint-disable-next-line react/forbid-prop-types
    values: object,
  }).isRequired,
};

Input.defaultProps = {
  type: '',
  className: '',
};
