import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bulma-components';
import { createModel, loadTemplateEditorApp } from '../../../../utils';
import { EmailTemplatesContext, NEW_TEMPLATE_FORM } from '../EmailTemplatesProvider';

const NewTemplateForm = () => {
  const { displayComponent } = useContext(EmailTemplatesContext);

  // formState matches EmailTemplate's 'propertiesFor' property
  const [formState, setFormState] = useState({
    meeting: { isIncluded: false, options: null },
    tutor: { isIncluded: true, options: null },
    student: { isIncluded: true, options: null },
  });

  if (displayComponent !== NEW_TEMPLATE_FORM) return '';

  const handleFormChange = ({ target: { name, value } }) => {
    const [model, property] = name.split('.');

    if (value === 'true' || value === 'false') setFormState((currState) => ({
      ...currState,
      [model]: {
        [property]: !(currState[model][property]),
      },
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { _id } = await createModel({
      model: 'email-template',
      body: { propertiesFor: formState },
    });
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
            value={formState.meeting.isIncluded}
            name='meeting.isIncluded'
            checked={formState.meeting.isIncluded}
            onChange={() => null}
            onClick={handleFormChange}
          >
            Yes
          </Form.Radio>
          <Form.Radio
            className='border rounded px-3'
            value={!(formState.meeting.isIncluded)}
            name='meeting.isIncluded'
            checked={!(formState.meeting.isIncluded)}
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
