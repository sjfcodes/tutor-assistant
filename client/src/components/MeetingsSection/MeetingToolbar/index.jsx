import React from 'react';
import { Columns } from 'react-bulma-components';
import MeetingsListFilter from '../MeetingsListFilter';

// eslint-disable-next-line react/prop-types
const MeetingToolbar = () => (
  <Columns className='is-mobile ml-5 mt-2'>
    <p className='mr-3'>sort</p>
    <MeetingsListFilter />
  </Columns>
);

export default MeetingToolbar;
