import { func, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bulma-components';

const InputPassword = ({
  placeholder, value, name, onChange, validation,
}) => {
  const [color, setColor] = useState('');
  const [helpText, setHelpText] = useState('');

  useEffect(() => {
    if (!value) return setColor('');
    if (!validation()) return setColor('danger');
    return setColor('success');
  }, [value, setColor, validation]);

  const checkCapsLock = (e) => {
    if (e.getModifierState('CapsLock')) setHelpText('capslock is on');
    else if (helpText) setHelpText('');
  };

  return (
    <>
      <Form.Input
        type='password'
        name={name}
        value={value}
        color={color}
        placeholder={placeholder}
        onKeyUp={checkCapsLock}
        onChange={onChange}
      />

      <Form.Help size={7} color='danger'>
        {helpText}
      </Form.Help>
    </>
  );
};
export default InputPassword;

InputPassword.propTypes = {
  placeholder: string,
  value: string.isRequired,
  name: string.isRequired,
  onChange: func.isRequired,
  validation: func.isRequired,
};

InputPassword.defaultProps = {
  placeholder: '',
};
