import React from 'react';
import { Form, Icon } from 'react-bulma-components';
import {
  string, number, bool, func, oneOfType,
} from 'prop-types';

const FormInput = ({
  label, name, type, value, icon, onChange, validate,
}) => (
  <>
    <Form.Label>{label}</Form.Label>
    <Form.Control>
      <Form.Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      <Icon align='left'>
        <i className={icon} />
      </Icon>
      {(validate ? validate(value) : value) && (
        <Icon align='right'>
          <i className='fas fa-check' />
        </Icon>
      )}
    </Form.Control>
  </>
);
export default FormInput;

FormInput.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  type: string,
  value: oneOfType([string, number, bool]).isRequired,
  icon: string.isRequired,
  onChange: func.isRequired,
  validate: func,
};

FormInput.defaultProps = {
  validate: null,
  type: 'text',
};
