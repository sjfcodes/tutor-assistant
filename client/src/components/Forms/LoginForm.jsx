import React, { useContext, useState } from 'react';
import { Form, Icon, Button } from 'react-bulma-components';
import { AppContext, CourseContext } from '../../context';
import {
  loginWithPassword, passwordIsValid,
  formatCourses, formatStudents, formatMeetings,
} from '../../utils';
import InputPassword from './InputPassword';

const {
  Field, Label, Control, Input,
} = Form;

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    email: 'demo@email.com',
    password: 'password',
  });
  const { email, password } = inputs;

  const [helpText, setHelpText] = useState('');

  const { setTutorDetails } = useContext(AppContext);
  const { setAllCourses } = useContext(CourseContext);

  const handleInputChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (helpText) setHelpText('');
    setInputs({ ...inputs, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { tutor } = await loginWithPassword(inputs);
      if (!tutor) return;
      const formattedCourses = tutor.courses
        .map((course) => ({
          ...course,
          students: formatStudents(course.students),
          meetings: formatMeetings(course.meetings),
        }));

      setAllCourses(formatCourses(formattedCourses));

      setTutorDetails({ ...tutor, loggedIn: true });
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
