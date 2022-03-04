import { string } from 'prop-types';
import React from 'react';
import { MeetingDateFull } from '../../../DateTime';

const ListItemTime = ({ value }) => (
  <p className='mb-3'><MeetingDateFull iso8601={value} /></p>
);

ListItemTime.propTypes = {
  value: string,
};

ListItemTime.defaultProps = {
  value: '',
};

export default ListItemTime;
