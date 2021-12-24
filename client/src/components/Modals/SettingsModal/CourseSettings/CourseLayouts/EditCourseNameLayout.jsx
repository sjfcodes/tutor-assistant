import React from 'react';
import { string, func } from 'prop-types';
import { Button, Form } from 'react-bulma-components';
import { LevelSide } from '../../../../BulmaHelpers';

const EditCourseNameLayout = ({
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
      <LevelSide>
        <form onSubmit={handleUpdateClick}>
          <Form.Field>
            <Form.Control>
              <Form.Input value={formInput} onChange={handleInputChange} />
            </Form.Control>
          </Form.Field>
        </form>
      </LevelSide>
      <LevelSide>
        <Button.Group className='mb-1'>
          <Button size='small' outlined color='info' onClick={() => setCourseToUpdate('')}>
            cancel
          </Button>

          <Button size='small' color='success' onClick={handleUpdateClick}>
            save
          </Button>
        </Button.Group>
      </LevelSide>
    </>
  );
};
export default EditCourseNameLayout;

EditCourseNameLayout.propTypes = {
  formInput: string.isRequired,
  setFormInput: func.isRequired,
  setCourseToUpdate: func.isRequired,
  handleUpdateClick: func.isRequired,
};
