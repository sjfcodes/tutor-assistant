import React, { useContext, useEffect, useState } from 'react';
import { Box, Form } from 'react-bulma-components';
import { AppContext } from '../../../../context';
import { EmailTemplatesContext } from '../EmailTemplatesProvider';

const buildTemplatePreview = ({
  body, subject, student, tutor,
}) => {
  let updatedBody = body;
  let updatedSubject = subject;
  Object.entries(student).forEach(([key, value]) => {
    updatedBody = updatedBody.replace(`[student-${key}]`, value);
    updatedSubject = updatedSubject.replace(`[student-${key}]`, value);
  });
  Object.entries(tutor).forEach(([key, value]) => {
    updatedBody = updatedBody.replace(`[tutor-${key}]`, value);
    updatedSubject = updatedSubject.replace(`[tutor-${key}]`, value);
  });
  return { subject: updatedSubject, body: updatedBody };
};

const demoStudent = {
  firstName: 'Mo',
  lastName: 'Fox',
  email: 'demostudent@email.com',
  meetingLink: 'https://zoom.us/demo',
  githubUsername: 'demo',
};

const EditorPreview = () => {
  const { selectedTemplate } = useContext(EmailTemplatesContext);
  const { tutorDetails } = useContext(AppContext);
  const [preview, setPreview] = useState(
    buildTemplatePreview({
      subject: selectedTemplate.subject,
      body: selectedTemplate.body,
      student: demoStudent,
      tutor: tutorDetails,
    }),
  );
  useEffect(() => {
    if (!selectedTemplate) return;
    const data = {
      subject: selectedTemplate.subject,
      body: selectedTemplate.body,
      student: demoStudent,
      tutor: tutorDetails,
    };
    console.log('data', data);
    setPreview(buildTemplatePreview(data));
  }, [selectedTemplate, tutorDetails]);

  return (
    <Box className='px-3 py-1'>
      <h1 className='is-size-5 has-text-weight-bold'>Preview</h1>
      <Form.Field>
        <Form.Control>
          <Form.Input
            color='info'
            className='rounded p-2'
            value={preview.subject}
            onChange={() => null}
          />
        </Form.Control>
        <Form.Control>
          <Form.Textarea
            color='info'
            className='template-preview rounded p-2'
            value={preview.body}
            onChange={() => null}
          />
        </Form.Control>
      </Form.Field>
    </Box>
  );
};
export default EditorPreview;
