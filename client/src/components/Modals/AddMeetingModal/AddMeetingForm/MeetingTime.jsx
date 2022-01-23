import React, { useState } from 'react';
import { Form } from 'react-bulma-components';
import {
  string, func, shape, number,
} from 'prop-types';
import { useSelector } from 'react-redux';
import { convertAddMeetingFormToISO8601 } from '../../../../utils';

export const addMeetingFormPropTypes = {
  formInputs: shape({
    duration: number.isRequired,
    startTime: string.isRequired,
    studentId: string.isRequired,
    status: string.isRequired,
  }).isRequired,
  setFormInputs: func.isRequired,
};

const MeetingTime = ({ formInputs, setFormInputs, updateDuration }) => {
  const [date, setDate] = useState({
    day: '',
    hour: '',
    amPm: '',
  });

  const { day, hour, amPm } = date;
  const { studentId, startTime } = formInputs;
  const { timeZoneName } = useSelector((state) => state.tutor);

  const validatestartTime = (data) => !!(data.day && data.hour && data.amPm);

  const handleInputChange = ({ target: { name, value } }) => {
    const copy = { ...date, [name]: value === '-' ? '' : value };

    if (validatestartTime(copy)) {
      const utcIso8601 = convertAddMeetingFormToISO8601({ ...copy, timeZoneName });
      // if we have all the data, get the timestamp representation
      updateDuration(0, utcIso8601);
      setFormInputs((curr) => ({ ...curr, startTime: utcIso8601 }));
    } else if (startTime) setFormInputs({ ...formInputs, startTime: '' });

    setDate({ ...date, [name]: value === '-' ? '' : value });
  };

  return (
    <Form.Field kind='addons' justifyContent='center'>
      <Form.Control className='mb-3'>
        <Form.Label>day</Form.Label>
        <Form.Input
          type='date'
          name='day'
          value={day}
          onChange={handleInputChange}
          disabled={!studentId}
        />
      </Form.Control>

      <Form.Control>
        <Form.Label>hour</Form.Label>
        <Form.Select
          name='hour'
          value={hour}
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
        <Form.Label>am/pm</Form.Label>
        <Form.Select
          name='amPm'
          value={amPm}
          onChange={handleInputChange}
          disabled={!hour}
        >
          <option>-</option>
          <option value='am'>am</option>
          <option value='pm'>pm</option>
        </Form.Select>
      </Form.Control>
    </Form.Field>
  );
};
export default MeetingTime;

MeetingTime.propTypes = {
  ...addMeetingFormPropTypes,
  updateDuration: func.isRequired,
};
