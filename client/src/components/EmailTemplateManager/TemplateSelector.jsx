import React, { useEffect, useState } from 'react';
import {
  string, shape, func,
} from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Select from '../Forms/Select';

const TemplateSelector = ({
  className, templates, selected, handleSelectChange,
}) => {
  const [options, setOptions] = useState('');

  useEffect(() => {
    const arr = Object.values(templates)
      .map((template) => <option key={uuidv4()} value={template._id}>{template.name}</option>);
    setOptions(arr);
  }, [templates]);

  return (
    <Select
      className={className}
      name={selected?.name}
      options={options}
      onChange={handleSelectChange}
    />
  );
};

TemplateSelector.propTypes = {
  className: string,
  templates: shape({
    _id: string,
    name: string,
    tutorId: string,
    template: string,
  }),
  selected: shape({
    _id: string,
    name: string,
    template: string,
  }),
  handleSelectChange: func.isRequired,
};

TemplateSelector.defaultProps = {
  className: '',
  templates: shape({
    _id: '',
    name: '',
    tutorId: '',
    template: '',
  }),
  selected: shape({
    _id: '',
    name: '',
    template: '',
  }),
};

export default TemplateSelector;
