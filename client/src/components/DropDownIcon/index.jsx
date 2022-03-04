import { bool } from 'prop-types';
import React from 'react';
import { Icon } from 'react-bulma-components';

const DropDownIcon = ({ active }) => (
  <Icon
    className='mr-2'
  >
    <i className={`fas fa-chevron-${active ? 'up' : 'down'}`} />
  </Icon>
);

DropDownIcon.propTypes = {
  active: bool.isRequired,
};

export default DropDownIcon;
