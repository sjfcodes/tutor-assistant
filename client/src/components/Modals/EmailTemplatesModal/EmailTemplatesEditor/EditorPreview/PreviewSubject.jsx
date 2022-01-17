import { number, shape, string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Box, Form } from 'react-bulma-components';
import { AppContext, CourseContext } from '../../../../../context';
import { buildTemplatePreview } from '../../../../../utils';

const PreviewSubject = ({ selectedStudent, selectedMeeting, text }) => {
  const { tutorDetails } = useContext(AppContext);
  const { allCourses, selectedCourse } = useContext(CourseContext);
  const [errors, setErrors] = useState([]);
  const [preview, setPreview] = useState(text);
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

      setPreview(results.text);
    },
    [allCourses, errors.length, selectedCourse,
      selectedMeeting, selectedStudent, text, tutorDetails],
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
        <p>{`Subject: ${preview}`}</p>
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
    notes: string.isRequired,
    startTime: string.isRequired,
    duration: number.isRequired,
  }).isRequired,
  text: string.isRequired,
};
