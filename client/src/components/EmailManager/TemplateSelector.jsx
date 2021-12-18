import React, { useEffect, useState } from 'react';
import {
  string, shape, func, object,
} from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Select from '../Forms/Select';

const TemplateSelector = ({ templates, selected, handleSelectChange }) => {
  // eslint-disable-next-line no-console
  const [options, setOptions] = useState();

  useEffect(() => {
    const arr = Object.values(templates)
      .map((template) => <option key={uuidv4()} value={template._id}>{template.name}</option>);
    setOptions(arr);
  }, [templates]);

  return (
    <Select
      className='ml-5 p-1'
      name={selected?.name}
      options={options}
      onChange={handleSelectChange}
    />
  );
};

TemplateSelector.propTypes = {
  templates: shape({
    _id: string,
    name: string,
    tutorId: string,
    values: string,
    template: string,
  }),
  selected: shape({
    _id: string,
    name: string,
    // eslint-disable-next-line react/forbid-prop-types
    values: object,
    template: string,
  }),
  handleSelectChange: func.isRequired,
};

TemplateSelector.defaultProps = {
  templates: shape({
    _id: '',
    name: '',
    tutorId: '',
    values: {},
    template: '',
  }),
  selected: shape({
    _id: '',
    name: '',
    values: '',
    template: '',
  }),
};

export default TemplateSelector;
