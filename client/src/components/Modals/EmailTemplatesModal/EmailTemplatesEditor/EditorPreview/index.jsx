import React, { useContext, useEffect, useState } from 'react';
import { Box, Form } from 'react-bulma-components';
import { AppContext, CourseContext } from '../../../../../context';
import { getISO8601TimeStamp } from '../../../../../utils';
import MeetingSelector from '../../../../Forms/MeetingSelector';
import StudentSelector from '../../../../Forms/StudentSelector';
import { EmailTemplatesContext } from '../../EmailTemplatesProvider';
import PreviewBody from './PreviewBody';
import PreviewSubject from './PreviewSubject';
import SendTestEmailButton from './SendTestEmailButton';

const demoStudent = {
  firstName: '(student`s first name)',
  lastName: '(student`s last name)',
  email: '(student`s email)',
  meetingLink: '(student`s meeting url)',
  githubUsername: '(student`s github)',
};

const demoMeeting = {
  status: 'scheduled',
  notes: 'React',
  startTime: getISO8601TimeStamp(),
  duration: 1,
};

const EditorPreview = () => {
  const { tutorDetails: { email: tutorEmail, sendGrid: { accessToken } } } = useContext(AppContext);
  const { allCourses, selectedCourse } = useContext(CourseContext);
  const { selectedTemplate } = useContext(EmailTemplatesContext);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(demoStudent);
  const [selectedMeetingId, setSelectedMeetingId] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState(demoMeeting);
  const [previewSubject, setPreviewSubject] = useState(selectedTemplate.Subject || '');
  const [previewBody, setPreviewBody] = useState(selectedTemplate.body || '');

  const convertTextToBasicHtml = (text = '') => text
    .split('\n')
    .map((line) => `<p>${line}</p>`)
    .join('');

  // useEffect(() => {
  //   console.log(convertTextToBasicHtml(previewBody));
  // }, [previewBody]);

  useEffect(
    () => {
      setSelectedStudent(allCourses[selectedCourse].students[selectedStudentId] || demoStudent);
      setSelectedMeeting(allCourses[selectedCourse].meetings[selectedMeetingId] || demoMeeting);
    },
    [allCourses, selectedCourse, selectedStudentId, selectedMeetingId],
  );

  useEffect(() => {
    if (!selectedMeeting.studentId) return;
    setSelectedStudentId(selectedMeeting.studentId);
  }, [selectedMeeting]);

  return (
    <Box className='px-3 py-1'>
      <Form.Field
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        <StudentSelector
          studentId={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
        />
        <p>- or -</p>
        <MeetingSelector
          meetingId={selectedMeetingId}
          onChange={(e) => setSelectedMeetingId(e.target.value)}
        />
      </Form.Field>
      <PreviewSubject
        previewSubject={previewSubject}
        setPreviewSubject={setPreviewSubject}
        selectedStudent={selectedStudent}
        selectedMeeting={selectedMeeting}
        text={selectedTemplate.subject}
      />
      <PreviewBody
        previewBody={previewBody}
        setPreviewBody={setPreviewBody}
        selectedStudent={selectedStudent}
        selectedMeeting={selectedMeeting}
        text={selectedTemplate.body}
      />
      {accessToken
        ? (
          <SendTestEmailButton
            className='my-5'
            studentEmail={tutorEmail}
            subject={previewSubject}
            text={previewBody}
            html={convertTextToBasicHtml(previewBody)}
          />
        )
        : <p>add an email acces token to test it out</p>}
    </Box>
  );
};
export default EditorPreview;
