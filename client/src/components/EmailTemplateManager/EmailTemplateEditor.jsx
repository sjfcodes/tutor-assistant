/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Form } from 'react-bulma-components';
import { AppContext } from '../../context/AppProvider';
import { updateModel } from '../../utils';
import createModel from '../../utils/api/modelCRUD/create';

const demoStudent = {
  firstName: '',
  lastName: 'Student',
  email: 'semostudent@email.com',
  meetingLink: 'https://zoom.us/demo',
  githubUsername: 'demo',
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

const EmailTemplateEditor = ({
  selected, setSelected, allTemplates, setAllTemplates,
  setViewHelp, setHelpMessage, setDisplayEditor, setPreview,
}) => {
  const { tutorDetails } = useContext(AppContext);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setSelected({ ...selected, [name]: value });
  };

  const handleSaveTemplate = async () => {
    try {
      if (selected._id) {
        await updateModel({ model: 'email-template', body: selected });
        setAllTemplates({ ...allTemplates, [selected._id]: selected });
        setHelpMessage(`updated ${selected.name}`);
      } else {
        const { name, template } = selected;
        const newTemplate = { name, template, authorId: tutorDetails._id };
        const { _id } = await createModel({ model: 'email-template', body: newTemplate });
        setAllTemplates({ ...allTemplates, [_id]: { ...newTemplate, _id } });
        setHelpMessage(`created ${newTemplate.name}`);
      }
      setViewHelp(false);
      setDisplayEditor(false);
      setSelected({});
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
  }, [selected, tutorDetails, setPreview]);

  return (
    <Box className='px-3 pt-1 pb-3'>
      <h1 className='is-size-5 has-text-weight-bold'>Editor</h1>
      <Form.Field>
        <Form.Control>
          <Form.Input
            color={selected.name ? 'success' : 'danger'}
            placeholder='enter a template name'
            name='name'
            value={selected.name}
            onChange={handleInputChange}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Control>
          <Form.Textarea
            color={selected.template ? 'success' : 'danger'}
            name='template'
            className='template-editor rounded p-1'
            value={selected.template}
            onChange={handleInputChange}
          />
        </Form.Control>
      </Form.Field>
      <Button
        disabled={!selected.name || !selected.template}
        fullwidth
        color='primary'
        onClick={handleSaveTemplate}
      >
        Save
      </Button>
    </Box>
  );
};

export default EmailTemplateEditor;
