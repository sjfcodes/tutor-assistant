import { func, string } from 'prop-types';
import React from 'react';
import { Form } from 'react-bulma-components';
import { v4 as uuidv4 } from 'uuid';
import './style.css';
import { getSortedTimeZones } from '../../../utils';

const TimeZoneSelector = ({
  className, name, value, onChange,
}) => (
  <Form.Select
    className={`${className} time-zone-selector`}
    name={name}
    value={value}
    onChange={onChange}
  >
    <option>-</option>
    {
      getSortedTimeZones()
        .map(({ name: tzName, abbreviation }) => <option key={uuidv4()} value={tzName}>{`${abbreviation} - ${tzName}`}</option>)
    }
  </Form.Select>
);
export default TimeZoneSelector;

TimeZoneSelector.propTypes = {
  className: string,
  name: string.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
};

TimeZoneSelector.defaultProps = {
  className: '',
};
