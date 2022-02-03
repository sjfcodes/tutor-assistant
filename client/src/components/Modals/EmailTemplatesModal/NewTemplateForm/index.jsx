import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bulma-components';
import { createModel, loadTemplateEditorApp } from '../../../../utils';
import { EmailTemplatesContext, NEW_TEMPLATE_FORM } from '../EmailTemplatesProvider';

const NewTemplateForm = () => {
  const { displayComponent } = useContext(EmailTemplatesContext);
  // eslint-disable-next-line no-unused-vars
  const [formState, setFormState] = useState({ includeMeeting: false });

  if (displayComponent !== NEW_TEMPLATE_FORM) return '';

  const handleFormChange = ({ target: { name, value } }) => {
    if (value === 'true' || value === 'false') setFormState((currState) => ({ ...currState, [name]: !currState[name] }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { _id } = await createModel(
      {
        model: 'email-template',
        body: { includePropertiesFor: { meeting: formState.includeMeeting } },
      },
    );
    if (!_id) return;
    loadTemplateEditorApp(_id);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Form.Field kind='addons'>

        <Form.Label className='mr-3'>include meeting details?</Form.Label>
        <Form.Control>
          <Form.Radio
            className='border rounded px-3 mr-3'
            value={formState.includeMeeting}
            name='includeMeeting'
            checked={formState.includeMeeting}
            onChange={() => null}
            onClick={handleFormChange}
          >
            Yes
          </Form.Radio>
          <Form.Radio
            className='border rounded px-3'
            value={!formState.includeMeeting}
            name='includeMeeting'
            checked={!formState.includeMeeting}
            onChange={() => null}
            onClick={handleFormChange}
          >
            No
          </Form.Radio>
        </Form.Control>
      </Form.Field>
      <Button
        color='primary'
        fullwidth
      >
        Create New Template
      </Button>
    </form>
  );
};

export default NewTemplateForm;
