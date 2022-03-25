import React, { useContext } from 'react';
import { Columns, Form } from 'react-bulma-components';
import StudentsListFilter from '../StudentsListFilter';
import { StudentsContext } from '../StudentsProvider';

const StudentToolbar = () => {
  const { filterOptions, setFilterOptions } = useContext(StudentsContext);
  const toggleCheckbox = ({ target: { name, checked } }) => {
    setFilterOptions({
      ...filterOptions,
      [name]: checked,
    });
  };

  return (
    <Columns className='is-mobile ml-5 mt-2'>
      <Columns.Column>
        <Form.Field kind='addons'>
          <Form.Label className='mr-3 mb-0'>
            sort
          </Form.Label>
          <StudentsListFilter />
        </Form.Field>
      </Columns.Column>
      <Columns.Column>
        <Form.Field kind='addons'>
          <Form.Label className='mr-3 mb-0'>
            Current Students
          </Form.Label>
          <Form.Checkbox
            name='currentStudentsOnly'
            checked={filterOptions.currentStudentsOnly}
            onChange={toggleCheckbox}
          />
        </Form.Field>
      </Columns.Column>
    </Columns>
  );
};

export default StudentToolbar;
