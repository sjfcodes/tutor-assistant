import {
  func, number, shape, string,
} from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Box, Form } from 'react-bulma-components';
import { useSelector } from 'react-redux';
import { buildTemplatePreview } from '../../../../../utils';

const PreviewSubject = ({
  previewSubject, setPreviewSubject, selectedStudent, selectedMeeting, text,
}) => {
  const tutorDetails = useSelector((state) => state.tutor);
  const { allCourses, selectedCourse } = useSelector((state) => state.courses);
  const [errors, setErrors] = useState([]);
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

      setPreviewSubject(results.text);
    },
    [
      allCourses, errors.length, selectedCourse,
      selectedMeeting, selectedStudent,
      text, tutorDetails, setPreviewSubject,
    ],
  );

  useEffect(() => {
    if (!errors.length) return setHelpText('');
    return setHelpText(`'${errors.join(', ')}' not recognized`);
  }, [errors]);

  return (
    <Form.Field>
      <Form.Help color='danger' textSize={6}>{helpText}</Form.Help>
      <Form.Label className='mb-0'>details</Form.Label>
      <Box className='border-info py-1 px-3'>
        <p>{`To: ${selectedStudent.email}`}</p>
        <p>{`From: ${tutorDetails.email}`}</p>
        <p>{`Subject: ${previewSubject}`}</p>
      </Box>
    </Form.Field>

  );
};

export default PreviewSubject;

PreviewSubject.propTypes = {
  selectedStudent: shape({
    firstName: string.isRequired,
    lastName: string.isRequired,
    email: string.isRequired,
    meetingLink: string.isRequired,
    githubUsername: string.isRequired,
  }).isRequired,
  selectedMeeting: shape({
    status: string.isRequired,
    notes: string,
    startTime: string.isRequired,
    duration: number.isRequired,
  }).isRequired,
  text: string.isRequired,
  previewSubject: string.isRequired,
  setPreviewSubject: func.isRequired,
};
