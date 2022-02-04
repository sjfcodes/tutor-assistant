import { bool, func } from 'prop-types';
import React from 'react';
import { Icon } from 'react-bulma-components';

const DropDownIcon = ({ active, onClick }) => (
  <Icon
    className='mr-2'
    onClick={onClick}
  >
    <i className={`fas fa-chevron-${active ? 'up' : 'down'}`} />
  </Icon>
);

export default DropDownIcon;

DropDownIcon.propTypes = {
  active: bool.isRequired,
  onClick: func,
};
DropDownIcon.defaultProps = {
  onClick: () => null,
};
