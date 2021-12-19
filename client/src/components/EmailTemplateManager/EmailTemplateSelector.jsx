import React, { useContext, useEffect, useState } from 'react';
import {
  string, shape, func,
} from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Box, Icon, Level } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import Select from '../Forms/Select';
import { AppContext } from '../../context';

export const defaultEmailTemplate = {
  name: 'new-template',
  template: 'Hi [student-firstName]\n\nMy name is [tutor-firstName]',
};

const EmailTemplateSelector = ({
  className, allTemplates, helpMessage,
  selected, setSelected, setDisplayEditor,
}) => {
  const [options, setOptions] = useState('');
  const { tutorDetails: { githubUsername } } = useContext(AppContext);

  const handleSelectChange = ({ target }) => {
    if (target.value === 'select') {
      setDisplayEditor(false);
      setSelected({});
      return;
    }
    setDisplayEditor(true);
    setSelected(allTemplates[target.value]);
  };

  useEffect(() => {
    const arr = Object.values(allTemplates)
      .map((template) => <option key={uuidv4()} value={template._id}>{template.name}</option>);
    setOptions(arr);
  }, [allTemplates]);

  return (

    <Box className='mb-1 p-3'>
      <Level renderAs='div' className='is-mobile'>
        <Level.Side>
          <Link to={`/${githubUsername}`} className='mt-0 pl-0'>
            <Icon className='fas fa-chevron-left is-small' />
            home
          </Link>
        </Level.Side>
        <Level.Item>
          <p className='has-text-success'>{helpMessage}</p>

        </Level.Item>
        <Level.Side>
          <Level.Item>
            <Select
              className={className}
              name={selected?.name}
              options={options}
              onChange={handleSelectChange}
            />
          </Level.Item>
        </Level.Side>
      </Level>
    </Box>
  );
};

EmailTemplateSelector.propTypes = {
  className: string,
  allTemplates: shape({
    _id: string,
    name: string,
    authorId: string,
    template: string,
  }),
  selected: shape({
    _id: string,
    name: string,
    template: string,
  }),
  helpMessage: string,
  setSelected: func.isRequired,
  setDisplayEditor: func.isRequired,
};

EmailTemplateSelector.defaultProps = {
  className: '',
  helpMessage: '',
  allTemplates: shape({
    _id: '',
    name: '',
    authorId: '',
    template: '',
  }),
  selected: shape({
    _id: '',
    name: '',
    template: '',
  }),
};

export default EmailTemplateSelector;
