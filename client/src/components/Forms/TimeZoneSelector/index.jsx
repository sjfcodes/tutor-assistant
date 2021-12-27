import { func, string } from 'prop-types';
import React from 'react';
import { Form } from 'react-bulma-components';
import { rawTimeZones } from '@vvo/tzdb';
import { v4 as uuidv4 } from 'uuid';
import './style.css';

const TimeZoneSelector = ({
  className, name, value, onChange,
}) => (
  <Form.Select
    className={`${className} time-zone-picker`}
    name={name}
    value={value}
    onChange={onChange}
  >
    <option>-</option>
    {
      rawTimeZones
        .sort(({ abbreviation: a }, { abbreviation: b }) => {
          if (a > b) return 1;
          if (a === b) return 0;
          return -1;
        })
        .map(
          ({ name: tzName, abbreviation }) => <option key={uuidv4()} value={tzName}>{`${abbreviation} - ${tzName}`}</option>,
        )
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
