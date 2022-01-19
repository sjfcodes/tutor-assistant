import {
  func, number, shape, string,
} from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bulma-components';
import { AppContext, CourseContext } from '../../../../../context';
import { buildTemplatePreview, getTextareaRows } from '../../../../../utils';

const PreviewBody = ({
  previewBody, setPreviewBody, selectedStudent, selectedMeeting, text,
}) => {
  const { tutorDetails } = useContext(AppContext);
  const { allCourses, selectedCourse } = useContext(CourseContext);
  const [errors, setErrors] = useState([]);
  const [rows, setRows] = useState(getTextareaRows(previewBody));
  // eslint-disable-next-line no-unused-vars
  const [helpText, setHelpText] = useState('testing');

  useEffect(
    () => {
      const data = {
        tutor: tutorDetails,
        course: allCourses[selectedCourse],
        student: selectedStudent,
        meeting: selectedMeeting,
      };

      const results = buildTemplatePreview({ text, data });
      if (results.errors.length) setErrors(results.errors);
      else if (errors.length) setErrors([]);

      setPreviewBody(results.text);
    },
    [
      allCourses, errors.length, selectedCourse,
      selectedMeeting, selectedStudent,
      text, tutorDetails, setPreviewBody,
    ],
  );

  useEffect(() => {
    setRows(getTextareaRows(previewBody));
  }, [previewBody]);

  useEffect(() => {
    if (!errors.length) return setHelpText('');
    return setHelpText(`'${errors.join(', ')}' not recognized`);
  }, [errors]);

  return (
    <Form.Field>
      <Form.Control>
        <Form.Help color='danger' textSize={6}>{helpText}</Form.Help>
        <Form.Label className='mb-0'>body</Form.Label>
        <Form.Textarea
          className='template-previewBody rounded p-2'
          color='info'
          value={previewBody}
          rows={rows}
          onChange={() => null}
        />
      </Form.Control>
    </Form.Field>

  );
};

export default PreviewBody;
PreviewBody
  .propTypes = {
    selectedStudent: shape({
      firstName: string.isRequired,
      lastName: string.isRequired,
      email: string.isRequired,
      meetingLink: string.isRequired,
      githubUsername: string.isRequired,
    }).isRequired,
    selectedMeeting: shape({
      status: string.isRequired,
      notes: string.isRequired,
      startTime: string.isRequired,
      duration: number.isRequired,
    }).isRequired,
    text: string.isRequired,
    previewBody: string.isRequired,
    setPreviewBody: func.isRequired,
  };
