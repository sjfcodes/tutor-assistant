import {
  bool, func, number, oneOfType, string,
} from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Form, Icon } from 'react-bulma-components';
import { TimeZoneSelector } from '.';
import { getLocalDateString, convertStrToBool } from '../../utils';
import { GraduationDate, MeetingDateFull } from '../DateTime';
import './style.css';

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

  const handleInputChange = ({ target }) => {
    let val = target.value;
    if (property === 'duration') val = validateDuration(val);

    if (val === 'true' || val === 'false') val = convertStrToBool(val);
    return setInput(val);
  };

  const inputHasBeenModified = () => `${value}`.trim() !== `${input}`.trim();

  const getFormInputType = (propertyName) => {
    switch (propertyName) {
    case 'timeZoneName':
      return (
        <TimeZoneSelector
          name={property}
          value={input}
          className='li-input mr-2 my-2'
          onChange={handleInputChange}
        />
      );

    case 'duration':
      return (
        <Form.Input
          type='number'
          name={property}
          value={input}
          className='li-input mr-2 my-2'
          onChange={handleInputChange}
        />
      );

    case 'email':
      return (
        <Form.Input
          type='email'
          name={property}
          value={input.toLowerCase()}
          className='li-input mr-2 my-2'
          onChange={handleInputChange}
        />
      );

    case 'notes':
      return (
        <Form.Textarea
          name={property}
          value={input}
          className='li-input mr-2 my-2'
          onChange={handleInputChange}
        />
      );

    default:
      return (
        <Form.Input
          type='input'
          name={property}
          value={input}
          className='li-input mr-2 my-2'
          onChange={handleInputChange}
        />
      );
    }
  };

  useEffect(() => {
    const formatBooleanSpan = (boolean) => <span className={`has-text-${boolean ? 'success' : 'danger'}`}>{`${boolean}`}</span>;
    let isMounted = true;
    switch (property) {
    case 'scheduleLink':
      return isMounted && setElement(
        <a
          href={value}
          className='break'
          target='_blank'
          rel='noreferrer'
        >
          {value}
        </a>,
      );

    case 'createdAt':
      return isMounted && setElement(<span>{getLocalDateString(value)}</span>);

    case 'endTime':
      return isMounted && setElement(
        <p className='mb-3'><MeetingDateFull iso8601={value} /></p>,
      );

    case 'fullTimeCourse':
      return isMounted && setElement(formatBooleanSpan(value));

    case 'githubUsername':
      return isMounted && setElement(
        <a
          href={`https://github.com/${value}`}
          className='break'
          target='_blank'
          rel='noreferrer'
        >
          {`https://github.com/${value}`}
        </a>,
      );

    case 'graduationDate':
      return isMounted && setElement(<GraduationDate iso8601={value} />);

    case 'meetingLink':
      return isMounted && setElement(
        <a
          href={value}
          className='break'
          target='_blank'
          rel='noreferrer'
        >
          {value}
        </a>,
      );

    case 'reassignment':
      return isMounted && setElement(formatBooleanSpan(value));

    case 'recurringMeeting':
      return isMounted && setElement(formatBooleanSpan(value));

    case 'startTime':
      return isMounted && setElement(
        <p className='mb-3'><MeetingDateFull iso8601={value} /></p>,
      );

    default:
      if (isMounted) return setElement(
        <Form.Input
          disabled
          className='rounded'
          value={`${value}`}
          onChange={() => null}
        />,
      );
    }
    return () => { isMounted = false; };
  }, [property, value]);

  return (
    <Form.Control className='pl-3'>
      {property === itemToEdit
      && allowedToEdit
        ? (
          <>
            { getFormInputType(property) }
            {inputHasBeenModified() && (
              <Icon align='right' className='mt-2' onClick={handleSubmit}>
                <i className='far fa-save hover has-text-success' />
              </Icon>
            )}
          </>
        )
        : element}
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
