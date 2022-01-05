import React, { useState, useContext } from 'react';
import {
  Form, Button, Columns, Icon,
} from 'react-bulma-components';
import { tokenKey } from '../../config';
import { AppContext } from '../../context';
import {
  createModel,
  emailIsValid,
  inputIsSelected,
  missingFormInputs,
  passwordIsValid,
  getClientTimeZone,
} from '../../utils';
import InputPassword from './InputPassword';
import TimeZoneSelector from './TimeZoneSelector';

const {
  Label, Control, Input,
} = Form;
const { Column } = Columns;

const SignupForm = () => {
  const clientTimeZone = getClientTimeZone();

  const [formInputs, setFormInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    timeZoneName: clientTimeZone || '',
    githubUsername: '',
    scheduleLink: '',
    password: '',
    confirmPassword: '',
  });

  const {
    firstName,
    lastName,
    email,
    timeZoneName,
    githubUsername,
    scheduleLink,
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
      const { tutor, token } = await createModel({ model: 'tutor', body: formInputs });
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
          <Form.Label>Time Zone</Form.Label>
          <Form.Field kind='addons'>
            <Form.Control>
              <TimeZoneSelector
                name='timeZoneName'
                value={timeZoneName}
                onChange={handleInputChange}
              />

            </Form.Control>
            <Form.Control>
              {inputIsSelected(timeZoneName) && (
                <Icon className='ml-2 mt-2'>
                  <i className='fas fa-check' />
                </Icon>
              )}
            </Form.Control>
          </Form.Field>
        </Column>
        <Column>
          <Label>Email</Label>
          <Control>
            <Input
              type='text'
              name='email'
              value={email.toLowerCase()}
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
              name='scheduleLink'
              value={scheduleLink}
              onChange={handleInputChange}
            />
            <Icon align='left'>
              <i className='fas fa-link' />
            </Icon>
            {scheduleLink && (
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
            <InputPassword
              type='password'
              name='password'
              value={password}
              onChange={handleInputChange}
              validation={() => passwordIsValid(password)}

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
            <InputPassword
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleInputChange}
              validation={() => (password === confirmPassword)}
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
