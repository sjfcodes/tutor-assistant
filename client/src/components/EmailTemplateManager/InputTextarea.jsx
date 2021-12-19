import React from 'react';
import {
  bool, number, object, oneOfType, shape, string,
} from 'prop-types';

export const InputTextarea = ({
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
    <textarea
      type={type}
      name={name}
      value={value}
      className={className}
      onChange={handleInputChange}
    />
  );
};
export default InputTextarea;

InputTextarea.propTypes = {
  type: string,
  name: string.isRequired,
  value: oneOfType([string, number, bool]).isRequired,
  className: string,
  selected: shape({
    // eslint-disable-next-line react/forbid-prop-types
    values: object,
  }).isRequired,
};

InputTextarea.defaultProps = {
  type: '',
  className: '',
};
