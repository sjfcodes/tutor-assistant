import { bool, func, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Form, Icon } from 'react-bulma-components';

const InputPassword = ({
  fullwidth, placeholder, value, name, handleFormUpdate,
}) => {
  const [color, setColor] = useState('');

  useEffect(() => {
    if (!value) return setColor('');
    if (value.length < 8) return setColor('danger');
    return setColor('success');
  }, [value, setColor]);

  return (
    <Form.Control fullwidth={fullwidth}>
      <Form.Input
        type='password'
        name={name}
        value={value}
        color={color}
        placeholder={placeholder}
        onChange={handleFormUpdate}
      />
      <Icon align='left' size='small'>
        <i className='fas fa-user-shield' />
      </Icon>
    </Form.Control>
  );
};
export default InputPassword;

InputPassword.propTypes = {
  fullwidth: bool,
  placeholder: string,
  value: string.isRequired,
  name: string.isRequired,
  handleFormUpdate: func.isRequired,
};

InputPassword.defaultProps = {
  fullwidth: false,
  placeholder: '',
};
