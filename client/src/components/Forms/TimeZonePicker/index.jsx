import { func, string } from 'prop-types';
import React from 'react';
import { Form, Icon } from 'react-bulma-components';
import { timeZonesNames } from '@vvo/tzdb';
import { v4 as uuidv4 } from 'uuid';
import { inputIsSelected } from '../../../utils';
import './style.css';

const TimeZonePicker = ({ name, value, onChange }) => (
  <>
    <Form.Label>Time Zone</Form.Label>
    <Form.Field kind='addons'>
      <Form.Control>
        <Form.Select
          className='time-zone-picker'
          name={name}
          value={value}
          onChange={onChange}
        >
          <option>-</option>
          {timeZonesNames.map(
            (tzName) => <option key={uuidv4()} value={tzName}>{tzName}</option>,
          )}
        </Form.Select>
      </Form.Control>
      <Form.Control>
        {inputIsSelected(value) && (
          <Icon className='ml-2 mt-2'>
            <i className='fas fa-check' />
          </Icon>
        )}
      </Form.Control>
    </Form.Field>
  </>
);
export default TimeZonePicker;

TimeZonePicker.propTypes = {
  name: string.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
};
