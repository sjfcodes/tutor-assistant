import {
  bool, func, number, oneOfType, string,
} from 'prop-types';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Form, Icon } from 'react-bulma-components';
import ListItemBooleanSpan from './ListItemBooleanSpan';
import ListItemTextArea from './ListItemTextArea';
import ListItemLink from './ListItemLink';
import { TimeZoneSelector } from '..';
import { LitsItemInput } from '../../BulmaHelpers';
import { GraduationDate } from '../../DateTime';
import { getLocalDateString, convertStrToBool } from '../../../utils';
import ListITemGitHub from './ListItemGitHub';
import ListItemTime from './ListITemTime';

export const getElementFor = ({ property, value }) => {
  const elementFor = {
    createdAt: () => <span>{getLocalDateString(value)}</span>,
    cancelUrl: () => <ListItemLink value={value} />,
    clockOutNotes: () => <ListItemTextArea value={value} />,
    default: () => (<p className='rounded'>{`${value}`}</p>),
    endTime: () => <ListItemTime value={value} />,
    fullTimeCourse: () => <ListItemBooleanSpan value={value} />,
    githubUsername: () => <ListITemGitHub value={value} />,
    graduationDate: () => <GraduationDate iso8601={value} />,
    meetingLink: () => <ListItemLink value={value} />,
    notes: () => <ListItemTextArea value={value} />,
    reassignment: () => <ListItemBooleanSpan value={value} />,
    rescheduleUrl: () => <ListItemLink value={value} />,
    recurringMeeting: () => <ListItemBooleanSpan value={value} />,
    sessionReview: () => <ListItemTextArea value={value} />,
    scheduleLink: () => <ListItemLink value={value} />,
    startTime: () => <ListItemTime value={value} />,
    updatedAt: () => <ListItemTime value={value} />,
  };

  return elementFor[property]
    ? elementFor[property]()
    : elementFor.default();
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
    sessionReview: <Form.Textarea {...args} />,
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

ListItem.propTypes = {
  input: string.isRequired,
  setInput: func.isRequired,
  property: string.isRequired,
  itemToEdit: string.isRequired,
  value: oneOfType([string, number, bool]).isRequired,
  allowedToEdit: bool.isRequired,
  handleSubmit: func.isRequired,
};

export default ListItem;
