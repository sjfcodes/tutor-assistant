import React, { useContext, useEffect, useState } from 'react';
import { Box, Form } from 'react-bulma-components';
import { CourseContext } from '../../../../../context';
import { getISO8601TimeStamp } from '../../../../../utils';
import MeetingSelector from '../../../../Forms/MeetingSelector';
import StudentSelector from '../../../../Forms/StudentSelector';
import { EmailTemplatesContext } from '../../EmailTemplatesProvider';
import PreviewBody from './PreviewBody';
import PreviewSubject from './PreviewSubject';

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
  const { allCourses, selectedCourse } = useContext(CourseContext);
  const { selectedTemplate } = useContext(EmailTemplatesContext);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(demoStudent);
  const [selectedMeetingId, setSelectedMeetingId] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState(demoMeeting);

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
      <Form.Field>
        <MeetingSelector
          meetingId={selectedMeetingId}
          onChange={(e) => setSelectedMeetingId(e.target.value)}
        />
        <p>- or -</p>
        <StudentSelector
          studentId={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
        />
        <hr />
      </Form.Field>
      <PreviewSubject
        selectedStudent={selectedStudent}
        selectedMeeting={selectedMeeting}
        text={selectedTemplate.subject}
      />
      <PreviewBody
        selectedStudent={selectedStudent}
        selectedMeeting={selectedMeeting}
        text={selectedTemplate.body}
      />
    </Box>
  );
};
export default EditorPreview;
