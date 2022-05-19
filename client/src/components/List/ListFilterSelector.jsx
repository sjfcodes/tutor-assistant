/* eslint-disable react/no-array-index-key */
import {
  arrayOf, func, string,
} from 'prop-types';
import React from 'react';
import { Form } from 'react-bulma-components';

const ListFilterSelector = ({
  className, filterBy, setFilterBy, filterOptions, sectionName,
}) => (
  <Form.Control>
    <select
      className={className}
      value={filterBy}
      onChange={({ target: { value } }) => setFilterBy(value)}
    >
      {filterOptions.map((option, i) => (
        <option
          key={`${sectionName}-${i}`}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  </Form.Control>

);
export default ListFilterSelector;
ListFilterSelector
  .propTypes = {
    className: string,
    filterBy: string.isRequired,
    setFilterBy: func.isRequired,
    sectionName: string.isRequired,
    filterOptions: arrayOf(string).isRequired,
  };

ListFilterSelector
  .defaultProps = {
    className: '',
  };
