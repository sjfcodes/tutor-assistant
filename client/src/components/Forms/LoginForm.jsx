/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Form, Icon, Button } from 'react-bulma-components';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { SET_ALL_COURSES } from '../../store/courses/actions';
import { passwordIsValid } from '../../utils';
import InputPassword from './InputPassword';
import { MUTATION_LOGIN_TUTOR } from '../../utils/graphql/tutor/mutations';
import Auth from '../../utils/graphql/auth';
import { SET_TUTOR_LOGIN } from '../../store/tutor/actions';

const {
  Field, Label, Control, Input,
} = Form;

const LoginForm = () => {
  const [loginTutor] = useMutation(MUTATION_LOGIN_TUTOR);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    email: 'demo@email.com',
    password: 'password',
  });

  const { email, password } = inputs;
  const [helpText, setHelpText] = useState('');

  const handleInputChange = (e) => {
    const { target: { name, value } } = e;
    if (helpText) setHelpText('');
    setInputs({ ...inputs, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      try {
        const { data: { loginTutor: { token, tutor } } } = await loginTutor({
          variables: { ...inputs },
        });

        Auth.login(token);

        dispatch({
          type: SET_TUTOR_LOGIN,
          payload: tutor,
        });
        dispatch({
          type: SET_ALL_COURSES,
          payload: tutor.courses,
        });

        // eslint-disable-next-line no-shadow
      } catch (error) {
        console.error(error);
      }
    } catch ({ message }) {
      setHelpText(message);
    }
  };
  return (
    <form>
      <Field>
        <Label>Email</Label>
        <Control>
          <Input
            placeholder='Username'
            type='text'
            name='email'
            value={email.toLocaleLowerCase()}
            onChange={handleInputChange}
          />
          <Icon align='left'>
            <i className='fas fa-at' />
          </Icon>
        </Control>
      </Field>
      <Field>
        <Label>Password</Label>
        <Control>
          <InputPassword
            placeholder='Password'
            name='password'
            type='password'
            value={password}
            onChange={handleInputChange}
            validation={() => passwordIsValid(password)}
          />
          <Icon align='left'>
            <i className='fas fa-fingerprint' />
          </Icon>
        </Control>
      </Field>
      <Form.Help color='danger'>{helpText}</Form.Help>
      <Button.Group>
        <Button
          className='mt-5'
          fullwidth
          color='primary'
          onClick={handleLogin}
        >
          Login
        </Button>
      </Button.Group>
    </form>
  );
};
export default LoginForm;
