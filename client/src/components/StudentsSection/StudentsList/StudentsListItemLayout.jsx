import { string } from 'prop-types';
import React from 'react';
import { Level } from 'react-bulma-components';
import { TimeZoneAbbreviation } from '../../DateTime';

const StudentsListItemLayout = ({ firstName, lastName, timeZoneName }) => (
  <>
    <Level.Item
      className='ml-3 mr-1'
    >
      {`${firstName} ${lastName}`}
    </Level.Item>
    <Level.Item>
      <p>
        <TimeZoneAbbreviation
          className='is-size-7 has-text-weight-bold has-text-primary'
          timeZoneName={timeZoneName}
        />
      </p>
    </Level.Item>
  </>
);

export default StudentsListItemLayout;

StudentsListItemLayout.propTypes = {
  firstName: string.isRequired,
  lastName: string.isRequired,
  timeZoneName: string.isRequired,
};
