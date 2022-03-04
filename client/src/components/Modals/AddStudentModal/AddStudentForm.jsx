import React, { useEffect, useState } from 'react';
import {
  Columns, Form, Icon, Level,
} from 'react-bulma-components';
import {
  string, number, bool, func, shape,
} from 'prop-types';
import {
  emailIsValid,
  getCurrentUnix,
  getUnixFromFormInputs,
  inputIsSelected,
} from '../../../utils';
import { FormInput } from '../../Forms';
import TimeZoneSelector from '../../Forms/TimeZoneSelector';

const { Column } = Columns;

const AddStudentForm = ({ formInputs, setFormInputs }) => {
  const {
    firstName, lastName, email, classId, timeZoneName,
    graduationDate, fullTimeCourse, githubUsername, meetingLink,
    meetingsPerWeek, reassignment,
  } = formInputs;

  const [displayHelpText, setDisplayHelpText] = useState();
  const [helpText, setHelpText] = useState(() => {
    const object = {};
    Object.keys(formInputs).forEach((property) => {
      object[property] = '';
    });
    return object;
  });

  const updateHelpText = (name, message) => setHelpText({
    ...helpText,
    [name]: message || `missing ${name}`,
  });

  const handleInputChange = ({ target: { name, value } }) => {
    if (value === 'true' || value === 'false') return setFormInputs((currState) => ({ ...currState, [name]: !currState[name] }));

    switch (name) {
    case 'graduationDate': {
      const selectedDate = getUnixFromFormInputs(value);
      const today = getCurrentUnix();
      if (selectedDate < today) updateHelpText(name, 'graduation date must be in the future');
    }
      break;

    case 'meetingsPerWeek':
      if (!parseInt(value, 10)) return '';
      break;

    case 'timeZoneName':
      if (!inputIsSelected(value)) updateHelpText(name);
      break;

    default:
      if (helpText[name]) updateHelpText(name, '');
    }
    return setFormInputs({ ...formInputs, [name]: value });
  };

  useEffect(() => {
    setDisplayHelpText(
      Object.entries(helpText).map(([key, value]) => (value ? <p key={key}>{value}</p> : '')),
    );
  }, [helpText]);

  return (
    <>
      <Columns centered vCentered>
        <Column>
          <FormInput
            label='First Name'
            name='firstName'
            value={firstName}
            icon='far fa-address-card'
            onChange={handleInputChange}
          />
        </Column>

        <Column>
          <FormInput
            label='Last Name'
            name='lastName'
            value={lastName}
            icon='far fa-address-card'
            onChange={handleInputChange}
          />
        </Column>
      </Columns>
      <Columns>
        <Column>
          <FormInput
            label='Class Id'
            name='classId'
            value={classId}
            icon='far fa-address-card'
            onChange={handleInputChange}
          />
        </Column>
        <Column>
          <FormInput
            label='Github Username'
            name='githubUsername'
            value={githubUsername}
            icon='fab fa-github'
            onChange={handleInputChange}
          />
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
          <FormInput
            label='Email'
            type='email'
            name='email'
            value={email.toLowerCase()}
            icon='far fa-envelope'
            onChange={handleInputChange}
            validate={emailIsValid}
          />
        </Column>
      </Columns>

      <Columns>
        <Column narrow>
          <FormInput
            label='Graduation Date'
            type='date'
            name='graduationDate'
            value={graduationDate}
            icon='fa-calendar-alt'
            onChange={handleInputChange}
          />
        </Column>

        <Column>
          <FormInput
            label='Zoom Link'
            name='meetingLink'
            value={meetingLink}
            onChange={handleInputChange}
            icon='fas fa-link'
          />
        </Column>
      </Columns>

      <Columns>
        <Level renderAs='div'>
          <Column>
            <FormInput
              label='Meetings Per Week'
              type='number'
              name='meetingsPerWeek'
              value={meetingsPerWeek}
              onChange={handleInputChange}
              icon='fas fa-lock'
            />
          </Column>

          <Column>
            <Form.Label>Full Time Student?</Form.Label>
            <Form.Control>
              <Form.Radio
                value='true'
                name='fullTimeCourse'
                checked={fullTimeCourse}
                onChange={() => null}
                onClick={handleInputChange}
              >
                Yes
              </Form.Radio>
              <Form.Radio
                value='false'
                name='fullTimeCourse'
                checked={!fullTimeCourse}
                onChange={() => null}
                onClick={handleInputChange}
              >
                No
              </Form.Radio>
            </Form.Control>
          </Column>

          <Column>
            <Form.Label>Reassignment From Another Tutor?</Form.Label>
            <Form.Control>
              <Form.Radio
                value='true'
                name='reassignment'
                checked={reassignment}
                onChange={() => null}
                onClick={handleInputChange}
              >
                Yes
              </Form.Radio>
              <Form.Radio
                value='false'
                name='reassignment'
                checked={!reassignment}
                onChange={() => null}
                onClick={handleInputChange}
              >
                No
              </Form.Radio>
            </Form.Control>
          </Column>
        </Level>
      </Columns>
      {displayHelpText}
    </>
  );
};
export default AddStudentForm;

AddStudentForm.propTypes = {
  formInputs: shape({
    firstName: string.isRequired,
    lastName: string.isRequired,
    email: string.isRequired,
    classId: string.isRequired,
    timeZoneName: string.isRequired,
    graduationDate: string.isRequired,
    fullTimeCourse: bool.isRequired,
    githubUsername: string.isRequired,
    meetingLink: string.isRequired,
    meetingsPerWeek: number.isRequired,
    reassignment: bool.isRequired,
  }).isRequired,
  setFormInputs: func.isRequired,
};
