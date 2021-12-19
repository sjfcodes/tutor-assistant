/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Form } from 'react-bulma-components';
import { AppContext } from '../../context/AppProvider';
import { updateModel } from '../../utils';
import createModel from '../../utils/api/modelCRUD/create';

const demoStudent = {
  firstName: 'Mo',
  lastName: 'Jito',
  email: 'mo@email.com',
  meetingLink: 'https://zoom.us/mo',
  githubUsername: 'mo',
};

const buildTemplatePreview = ({ template, student, tutor }) => {
  let updatedTemplate = template;
  Object.entries(student).forEach(([key, value]) => {
    updatedTemplate = updatedTemplate.replace(`[student-${key}]`, value);
  });
  Object.entries(tutor).forEach(([key, value]) => {
    updatedTemplate = updatedTemplate.replace(`[tutor-${key}]`, value);
  });
  return updatedTemplate;
};

const EmailTemplateEditor = ({ selected, setSelected, setTemplates }) => {
  const [preview, setPreview] = useState('');
  const { tutorDetails } = useContext(AppContext);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setSelected({ ...selected, [name]: value });
  };

  const handleSaveTemplate = async () => {
    console.log(selected);

    try {
      let data;
      if (selected._id) data = await updateModel('email-template', selected);
      else {
        const { name, template } = selected;
        const body = { name, template, tutorId: tutorDetails._id };
        data = await createModel('email-template', body);
      }

      console.log(data);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    if (!selected) return;
    const data = {
      template: selected.template,
      student: demoStudent,
      tutor: tutorDetails,
    };
    setPreview(buildTemplatePreview(data));
  }, [selected, tutorDetails]);

  return (
    <>
      <Box className='mb-1 py-1'>
        <h1 className='is-size-5 has-text-centered has-text-weight-bold'>Editor</h1>

        <form>
          <Form.Field>
            <Form.Label className='mb-0'>name</Form.Label>
            <Form.Control>
              <Form.Input
                name='name'
                value={selected.name}
                onChange={handleInputChange}
              />
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <Form.Label className='my-0'>template</Form.Label>
            <Form.Control>
              <textarea
                name='template'
                className='template-editor rounded p-2'
                value={selected.template}
                onChange={handleInputChange}
              />
            </Form.Control>
          </Form.Field>
        </form>
      </Box>
      <Box className='mb-1 pt-1'>
        <h1 className='is-size-5 has-text-centered has-text-weight-bold'>Preview</h1>
        <textarea
          className='template-preview rounded p-2'
          value={preview}
          onChange={() => null}
        />
        <Button
          fullwidth
          color='primary'
          className='mt-5'
          onClick={handleSaveTemplate}
        >
          Save
        </Button>
      </Box>
    </>
  );
};

export default EmailTemplateEditor;
