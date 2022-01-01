import React, { useContext, useState } from 'react';
import { Form, Icon, Button } from 'react-bulma-components';
import { AppContext, CourseContext } from '../../context';
import {
  loginWithPassword, passwordIsValid,
  formatCourses, formatStudents,
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
        }));

      const courses = formatCourses(formattedCourses);
      setAllCourses(courses);

      setTutorDetails({ ...tutor, loggedIn: true });
    } catch (error) {
      setHelpText('** invalid login');
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
            value={inputs.email}
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
            value={inputs.password}
            onChange={handleInputChange}
            validation={() => passwordIsValid(inputs.password)}
          />
          <Icon align='left'>
            <i className='fas fa-fingerprint' />
          </Icon>
        </Control>
      </Field>
      {helpText && <h6 className='help-error rounded'>{helpText}</h6>}
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
