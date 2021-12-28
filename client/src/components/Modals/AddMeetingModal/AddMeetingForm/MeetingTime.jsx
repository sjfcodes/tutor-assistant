import React, { useContext, useState } from 'react';
import { Form, Icon } from 'react-bulma-components';
import {
  string, func, shape,
} from 'prop-types';
import { convertAddMeetingFormToISO8601 } from '../../../../utils';
import { AppContext } from '../../../../context';

export const addMeetingFormPropTypes = {
  formInputs: shape({
    tutorId: string.isRequired,
    studentId: string.isRequired,
    endTime: string.isRequired,
    startTime: string.isRequired,
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
  const { tutorDetails: { timeZoneName } } = useContext(AppContext);

  const validatestartTime = (data) => !!(data.day && data.hour && data.amPm);

  const handleInputChange = ({ target: { name, value } }) => {
    const copy = { ...date, [name]: value === '-' ? '' : value };

    if (validatestartTime(copy)) {
      const utcIso8601 = convertAddMeetingFormToISO8601({ ...copy, timeZoneName });
      // if we have all the data, get the timestamp representation
      updateDuration(0, utcIso8601);
      setFormInputs((curr) => ({ ...curr, startTime: utcIso8601 }));
    } else if (startTime) setFormInputs({ ...formInputs, startTime: '', endTime: '' });

    setDate({ ...date, [name]: value === '-' ? '' : value });
  };

  return (
    <>
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
      </Form.Field>
      <Form.Field kind='addons'>
        <Form.Control>
          <Form.Label>Hour</Form.Label>
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
          <Form.Label>AM/PM</Form.Label>
          <Form.Select
            name='amPm'
            value={amPm}
            onChange={handleInputChange}
            disabled={!hour}
          >
            <option>-</option>
            <option value='AM'>AM</option>
            <option value='PM'>PM</option>
          </Form.Select>
          <Icon className='ml-2 mt-2'>
            <i
              className={`fas fa-check ${!validatestartTime(date) && 'has-text-white'
              }`}
            />
          </Icon>
        </Form.Control>
      </Form.Field>
    </>
  );
};
export default MeetingTime;

MeetingTime.propTypes = {
  ...addMeetingFormPropTypes,
  updateDuration: func.isRequired,
};
