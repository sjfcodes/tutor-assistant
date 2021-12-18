import React, { useState, useContext } from 'react';
import {
  Form, Button, Columns, Icon,
} from 'react-bulma-components';
import { tokenKey } from '../../config';
import { AppContext } from '../../context';
import {
  createModel,
  emailIsValid,
  missingFormInputs,
  passwordIsValid,
  inputIsSelected,
} from '../../utils';

const {
  Field, Label, Control, Input, Select,
} = Form;
const { Column } = Columns;

const SignupForm = () => {
  const [formInputs, setFormInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    timeZoneOffset: '',
    githubUsername: '',
    calendlyLink: '',
    password: '',
    confirmPassword: '',
  });

  const {
    firstName,
    lastName,
    email,
    timeZoneOffset,
    githubUsername,
    calendlyLink,
    password,
    confirmPassword,
  } = formInputs;
  const { setTutorDetails } = useContext(AppContext);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormInputs({ ...formInputs, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { tutor, token } = await createModel('tutor', formInputs);
      if (!tutor) return;
      localStorage.setItem(tokenKey, token);
      setTutorDetails({ ...tutor, loggedIn: true });
    } catch (error) {
      // login failed
      console.warn('login failed');
    }
  };

  return (
    <form>
      <Columns centered vCentered>
        <Column>
          <Label>First Name</Label>
          <Control>
            <Input
              type='text'
              name='firstName'
              value={firstName}
              onChange={handleInputChange}
            />
            <Icon align='left'>
              <i className='far fa-address-card' />
            </Icon>
            {firstName && (
              <Icon align='right'>
                <i className='fas fa-check' />
              </Icon>
            )}
          </Control>
        </Column>

        <Column>
          <Label>Last Name</Label>
          <Control>
            <Input
              type='text'
              name='lastName'
              value={lastName}
              onChange={handleInputChange}
            />
            <Icon align='left'>
              <i className='fas fa-address-card' />
            </Icon>
            {lastName && (
              <Icon align='right'>
                <i className='fas fa-check' />
              </Icon>
            )}
          </Control>
        </Column>
        <Column>
          <Label>Github Username</Label>
          <Control>
            <Input
              type='text'
              name='githubUsername'
              value={githubUsername}
              onChange={handleInputChange}
            />
            <Icon align='left'>
              <i className='fab fa-github' />
            </Icon>
            {githubUsername && (
              <Icon align='right'>
                <i className='fas fa-check' />
              </Icon>
            )}
          </Control>
        </Column>
      </Columns>

      <Columns>
        <Column narrow>
          <Label>Time Zone</Label>
          <Field kind='addons'>
            <Control>
              <Select
                type='text'
                name='timeZoneOffset'
                value={timeZoneOffset}
                onInput={handleInputChange}
              >
                <option>-</option>
                <option value='pacific'>Pacific</option>
                <option value='mountain'>Mountain</option>
                <option value='central'>Central</option>
                <option>Eastern</option>
              </Select>
            </Control>
            <Control>
              {inputIsSelected(timeZoneOffset) && (
                <Icon className='ml-2 mt-2'>
                  <i className='fas fa-check' />
                </Icon>
              )}
            </Control>
          </Field>
        </Column>
        <Column>
          <Label>Email</Label>
          <Control>
            <Input
              type='text'
              name='email'
              value={email}
              onChange={handleInputChange}
            />
            <Icon align='left'>
              <i className='far fa-envelope' />
            </Icon>
            {emailIsValid(email) && (
              <Icon align='right'>
                <i className='fas fa-check' />
              </Icon>
            )}
          </Control>
        </Column>
      </Columns>

      <Columns>
        <Column>
          <Label>Calendly Link</Label>
          <Control>
            <Input
              type='text'
              name='calendlyLink'
              value={calendlyLink}
              onChange={handleInputChange}
            />
            <Icon align='left'>
              <i className='fas fa-link' />
            </Icon>
            {calendlyLink && (
              <Icon align='right'>
                <i className='fas fa-check' />
              </Icon>
            )}
          </Control>
        </Column>
      </Columns>

      <Columns>
        <Column>
          <Label>Password</Label>
          <Control>
            <Input
              type='password'
              name='password'
              value={password}
              onChange={handleInputChange}
            />
            <Icon align='left'>
              <i className='fas fa-lock' />
            </Icon>
            {passwordIsValid(password) && (
              <Icon align='right'>
                <i className='fas fa-check' />
              </Icon>
            )}
          </Control>
        </Column>

        <Column>
          <Label>Confirm Password</Label>
          <Control>
            <Input
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <Icon align='left'>
              <i className='fas fa-lock' />
            </Icon>
            {password === confirmPassword && (
              <Icon align='right'>
                <i className='fas fa-check' />
              </Icon>
            )}
          </Control>
        </Column>
      </Columns>

      <Button
        fullwidth
        color='primary'
        className='mt-5'
        disabled={missingFormInputs(formInputs)}
        onClick={handleSignup}
      >
        Signup
      </Button>
    </form>
  );
};
export default SignupForm;
