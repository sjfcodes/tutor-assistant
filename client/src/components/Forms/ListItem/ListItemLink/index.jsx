import { string } from 'prop-types';
import React from 'react';

const ListItemLink = ({ value }) => (
  <a
    href={value}
    target='_blank'
    rel='noreferrer'
  >
    {value}
  </a>
);
ListItemLink.propTypes = {
  value: string,
};

ListItemLink.defaultProps = {
  value: '',
};
export default ListItemLink;
