import { bool, string } from 'prop-types';
import React from 'react';
import { Icon } from 'react-bulma-components';

const DropDownIcon = ({ active, className }) => (
  <Icon
    className='mr-2'
  >
    <i className={`fas fa-chevron-${active ? 'up' : 'down'} ${className}`} />
  </Icon>
);

DropDownIcon.propTypes = {
  active: bool.isRequired,
  className: string,
};
DropDownIcon.defaultProps = {
  className: '',
};

export default DropDownIcon;
