import React, { useState } from 'react';
import { Form, Icon } from 'react-bulma-components';
import {
  string, number, func, shape,
} from 'prop-types';
import { getUnixFromFormInputs } from '../../../utils';

export const meetingFormPropTypes = {
  formInputs: shape({
    tutorId: string.isRequired,
    studentId: string.isRequired,
    duration: number.isRequired,
    startDate: string.isRequired,
    status: string.isRequired,
  }).isRequired,
  setFormInputs: func.isRequired,
};

const MeetingTime = ({ formInputs, setFormInputs }) => {
  const [date, setDate] = useState({
    day: '',
    time: '',
    amPm: '',
  });

  const { day, time, amPm } = date;
  const { studentId, startDate } = formInputs;

  const validateStartDate = (data) => !!(data.day && data.time && data.amPm);

  const handleInputChange = ({ target: { name, value } }) => {
    const copy = { ...date, [name]: value === '-' ? '' : value };

    if (validateStartDate(copy)) {
      // if we have all the data, get the unix time
      const unix = getUnixFromFormInputs(copy.day, copy.time, copy.amPm);
      setFormInputs({ ...formInputs, startDate: unix });
    } else if (startDate) setFormInputs({ ...formInputs, startDate: '' });

    setDate({ ...date, [name]: value === '-' ? '' : value });
  };

  return (
    <Form.Field kind='addons'>
      <Form.Control>
        <Form.Label>Day</Form.Label>
        <Form.Input
          type='date'
          name='day'
          value={day}
          onChange={handleInputChange}
          disabled={!studentId}
        />
      </Form.Control>
      <Form.Control>
        <Form.Label>Time</Form.Label>

        <Form.Select
          name='time'
          value={time}
          onChange={handleInputChange}
          disabled={!day}
        >
          <option>-</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
          <option value={11}>11</option>
          <option value={12}>12</option>
        </Form.Select>
      </Form.Control>
      <Form.Control>
        <Form.Label>AM/PM</Form.Label>
        <Form.Select
          name='amPm'
          value={amPm}
          onChange={handleInputChange}
          disabled={!time}
        >
          <option>-</option>
          <option value='AM'>AM</option>
          <option value='PM'>PM</option>
        </Form.Select>
        <Icon className='ml-2 mt-2'>
          <i
            className={`fas fa-check ${!validateStartDate(date) && 'has-text-white'
            }`}
          />
        </Icon>
      </Form.Control>
    </Form.Field>
  );
};
export default MeetingTime;

MeetingTime.propTypes = {
  formInputs: shape({
    tutorId: string.isRequired,
    studentId: string.isRequired,
    duration: number.isRequired,
    startDate: string.isRequired,
    status: string.isRequired,
  }).isRequired,
  setFormInputs: func.isRequired,
};
