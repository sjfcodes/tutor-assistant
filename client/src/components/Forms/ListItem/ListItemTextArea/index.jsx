import { string } from 'prop-types';
import React from 'react';
import './style.css';

const ListItemTextArea = ({ value }) => (
  <textarea
    className='list-item p-1'
    value={value}
    onChange={() => null}
    disabled
  />
);
ListItemTextArea.propTypes = {
  value: string,
};

ListItemTextArea.defaultProps = {
  value: '',
};

export default ListItemTextArea;
