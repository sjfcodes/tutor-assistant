import { bool } from 'prop-types';
import React from 'react';

const ListItemBooleanSpan = ({ value }) => (
  <span
    className={`has-text-${value ? 'success' : 'danger'}`}
  >
    {`${value}`}
  </span>
);

ListItemBooleanSpan.propTypes = {
  value: bool.isRequired,
};

export default ListItemBooleanSpan;
