import React from 'react';
import { string, func } from 'prop-types';
import { Button, Form, Level } from 'react-bulma-components';

const EditNameLayout = ({
  formInput,
  setFormInput,
  setCourseToUpdate,
  handleUpdateClick,
}) => {
  const handleInputChange = ({ target: { value } }) => {
    setFormInput(value);
  };

  return (
    <>
      <Level.Side align='left'>
        <Level.Item>
          <Form.Field>
            <Form.Control>
              <Form.Input value={formInput} onChange={handleInputChange} />
            </Form.Control>
          </Form.Field>
        </Level.Item>
      </Level.Side>
      <Level.Side align='right'>
        <Level.Item>
          <Button.Group>
            <Button outlined color='info' onClick={() => setCourseToUpdate('')}>
              cancel
            </Button>

            <Button color='success' onClick={handleUpdateClick}>
              save
            </Button>
          </Button.Group>
        </Level.Item>
      </Level.Side>
    </>
  );
};
export default EditNameLayout;

EditNameLayout.propTypes = {
  formInput: string.isRequired,
  setFormInput: func.isRequired,
  setCourseToUpdate: func.isRequired,
  handleUpdateClick: func.isRequired,
};