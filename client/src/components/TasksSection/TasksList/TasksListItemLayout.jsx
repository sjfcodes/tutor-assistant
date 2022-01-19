import { string } from 'prop-types';
import React from 'react';
import { Level } from 'react-bulma-components';

const TaksksListItemLayout = ({ taskFor }) => (
  <Level.Item
    className='ml-3 mr-1'
  >
    {`${taskFor}`}
  </Level.Item>
);

export default TaksksListItemLayout;

TaksksListItemLayout.propTypes = {
  taskFor: string.isRequired,
};
