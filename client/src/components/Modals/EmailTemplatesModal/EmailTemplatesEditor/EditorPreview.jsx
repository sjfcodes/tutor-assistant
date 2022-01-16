import React, { useContext, useEffect, useState } from 'react';
import { Box, Form } from 'react-bulma-components';
import { AppContext, CourseContext } from '../../../../context';
import { getTextareaRows } from '../../../../utils';
import StudentSelector from '../../../Forms/StudentSelector';
import { EmailTemplatesContext } from '../EmailTemplatesProvider';

const buildTemplatePreview = ({
  body, subject, student, tutor,
}) => {
  let updatedBody = body;
  let updatedSubject = subject;
  Object
    .entries(student)
    .forEach(([key, value]) => {
      updatedBody = updatedBody.replace(`[student-${key}]`, value);
      updatedSubject = updatedSubject.replace(`[student-${key}]`, value);
    });
  Object
    .entries(tutor)
    .forEach(([key, value]) => {
      updatedBody = updatedBody.replace(`[tutor-${key}]`, value);
      updatedSubject = updatedSubject.replace(`[tutor-${key}]`, value);
    });
  return { subject: updatedSubject, body: updatedBody };
};

const demoStudent = {
  firstName: '(student`s first name)',
  lastName: '(student`s last name)',
  email: '(student`s email)',
  meetingLink: '(student`s meeting url)',
  githubUsername: '(student`s github)',
};

const EditorPreview = () => {
  const { selectedTemplate } = useContext(EmailTemplatesContext);
  const { allCourses, selectedCourse } = useContext(CourseContext);
  const { tutorDetails } = useContext(AppContext);
  // eslint-disable-next-line no-unused-vars
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(demoStudent);
  const [preview, setPreview] = useState(
    buildTemplatePreview({
      subject: selectedTemplate.subject,
      body: selectedTemplate.body,
      student: selectedStudent,
      tutor: tutorDetails,
    }),
  );
  const [rows, setRows] = useState(getTextareaRows(preview.body));

  useEffect(
    () => {
      if (!selectedTemplate) return;
      const data = {
        subject: selectedTemplate.subject,
        body: selectedTemplate.body,
        // student: allCourses[selectedCourse].students[selectedStudentId] || demoStudent,
        student: selectedStudent,
        tutor: tutorDetails,
      };
      setPreview(buildTemplatePreview(data));
    },
    [selectedTemplate, tutorDetails, selectedStudent],
  );

  useEffect(() => {
    setRows(getTextareaRows(preview.body));
  }, [preview.body]);

  useEffect(
    () => {
      setSelectedStudent(allCourses[selectedCourse].students[selectedStudentId] || demoStudent);
    },
    [allCourses, selectedCourse, selectedStudentId],
  );

  return (
    <Box className='px-3 py-1'>
      <Form.Field>
        <StudentSelector
          studentId={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <Box className='border-info py-1 px-3'>
          <p>{`To: ${selectedStudent.email}`}</p>
          <p>{`From: ${tutorDetails.email}`}</p>
          <p>{`Subject: ${preview.subject}`}</p>
        </Box>
      </Form.Field>
      <Form.Field>
        <Form.Control>
          <Form.Textarea
            className='template-preview rounded p-2'
            color='info'
            value={preview.body}
            rows={rows}
            onChange={() => null}
          />
        </Form.Control>
      </Form.Field>
    </Box>
  );
};
export default EditorPreview;
