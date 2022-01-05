import React from 'react';
import { string, func } from 'prop-types';
import { Button, Form, Level } from 'react-bulma-components';
import { LevelSide } from '../../../../BulmaHelpers';

const EditCourseNameLayout = ({
  formInput,
  setFormInput,
  setCourseToEdit,
  handleUpdateClick,
}) => {
  const handleInputChange = ({ target: { value } }) => {
    setFormInput(value);
  };

  return (
    <>
      <LevelSide>
        <form onSubmit={handleUpdateClick}>
          <Form.Field>
            <Form.Control>
              <Form.Input value={formInput} onChange={handleInputChange} />
            </Form.Control>
          </Form.Field>
        </form>
      </LevelSide>
      <Level.Side>
        <Button.Group>
          <Button size='small' outlined color='info' onClick={() => setCourseToEdit('')}>
            cancel
          </Button>

          <Button size='small' color='success' onClick={handleUpdateClick}>
            save
          </Button>
        </Button.Group>
      </Level.Side>
    </>
  );
};
export default EditCourseNameLayout;

EditCourseNameLayout.propTypes = {
  formInput: string.isRequired,
  setFormInput: func.isRequired,
  setCourseToEdit: func.isRequired,
  handleUpdateClick: func.isRequired,
};
