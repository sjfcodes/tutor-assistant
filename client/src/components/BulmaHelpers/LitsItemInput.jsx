import { bool, func, string } from 'prop-types';
import React from 'react';
import { Form } from 'react-bulma-components';

const LitsItemInput = ({
  className, disabled, name, onChange, type, value,
}) => (
  <Form.Input
    disabled={disabled}
    type={type}
    name={name}
    value={
      type === 'email'
        ? value.toLowerCase()
        : value
    }
    className={className}
    onChange={onChange}
  />
);

export default LitsItemInput;

LitsItemInput.propTypes = {
  className: string,
  disabled: bool,
  name: string.isRequired,
  onChange: func.isRequired,
  type: string.isRequired,
  value: string.isRequired,
};
LitsItemInput.defaultProps = {
  className: '',
  disabled: false,
};
