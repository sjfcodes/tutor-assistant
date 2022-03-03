import {
  bool, func, number, oneOfType, string,
} from 'prop-types';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Form, Icon } from 'react-bulma-components';
import { TimeZoneSelector } from '.';
import { getLocalDateString, convertStrToBool } from '../../utils';
import { LitsItemInput } from '../BulmaHelpers';
import { GraduationDate, MeetingDateFull } from '../DateTime';
import './style.css';

const getBooleanSpan = (boolean) => <span className={`has-text-${boolean ? 'success' : 'danger'}`}>{`${boolean}`}</span>;
const getElementFor = ({ property, value }) => {
  const elementFor = {
    createdAt: () => <span>{getLocalDateString(value)}</span>,
    clockOutNotes: () => <textarea className='list-item p-1' value={value} onChange={() => null} disabled />,
    default: () => (
      <p className='rounded'>{`${value}`}</p>
    ),
    endTime: () => <p className='mb-3'><MeetingDateFull iso8601={value} /></p>,
    fullTimeCourse: () => getBooleanSpan(value),
    githubUsername: () => (
      <a
        href={`https://github.com/${value}`}
        target='_blank'
        rel='noreferrer'
      >
        {`https://github.com/${value}`}
      </a>
    ),
    graduationDate: () => <GraduationDate iso8601={value} />,
    meetingLink: () => <a href={value} target='_blank' rel='noreferrer'>{value}</a>,
    notes: () => <textarea className='list-item p-1' value={value} onChange={() => null} disabled />,
    reassignment: () => getBooleanSpan(value),
    recurringMeeting: () => getBooleanSpan(value),
    scheduleLink: () => <a href={value} target='_blank' rel='noreferrer'>{value}</a>,
    startTime: () => <p className='mb-3'><MeetingDateFull iso8601={value} /></p>,

  };
  return elementFor[property] || elementFor.default;
};

const ListItem = ({
  property, value, input, setInput,
  handleSubmit, itemToEdit, allowedToEdit,
}) => {
  const [element, setElement] = useState('');

  const validateDuration = (dur) => {
    const num = parseInt(dur, 10);
    if (Number.isNaN(num)) return '';
    return `${num}`;
  };

  const handleInputChange = useCallback(({ target }) => {
    let val = target.value;
    if (property === 'duration') val = validateDuration(val);
    if (val === 'true' || val === 'false') val = convertStrToBool(val);
    return setInput(val);
  }, [property, setInput]);

  const inputHasBeenModified = () => `${value}`.trim() !== `${input}`.trim();

  const args = useMemo(() => ({
    value: input,
    name: property,
    className: 'mr-2 my-2 input-slim',
    onChange: (e) => handleInputChange(e),
  }), [handleInputChange, input, property]);

  const formInputFor = {
    default: <LitsItemInput type='text' {...args} />,
    duration: <LitsItemInput type='number' {...args} />,
    email: <LitsItemInput type='email' {...args} />,
    meetingsPerWeek: <LitsItemInput type='number' {...args} />,
    notes: <Form.Textarea {...args} />,
    timeZoneName: <TimeZoneSelector {...args} />,
    clockOutNotes: <Form.Textarea {...args} />,
  };

  useEffect(() => {
    setElement(getElementFor({ property, value }));
  }, [property, value]);

  return (
    <Form.Control className='pl-3'>
      {
        property === itemToEdit && allowedToEdit
          ? (
            <>
              { formInputFor[property] || formInputFor.default }
              {inputHasBeenModified() && (
                <Icon align='right' className='mt-2' onClick={handleSubmit}>
                  <i className='far fa-save hover has-text-success' />
                </Icon>
              )}
            </>
          )
          : element
      }
    </Form.Control>
  );
};
export default ListItem;

ListItem.propTypes = {
  input: string.isRequired,
  setInput: func.isRequired,
  property: string.isRequired,
  itemToEdit: string.isRequired,
  value: oneOfType([string, number, bool]).isRequired,
  allowedToEdit: bool.isRequired,
  handleSubmit: func.isRequired,
};
