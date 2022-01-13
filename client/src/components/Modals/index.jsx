import React from 'react';
import AddCourseModal from './AddCourseModal';
import AddMeetingModal from './AddMeetingModal';
import AddStudentModal from './AddStudentModal';
import EmailTemplatesModal from './EmailTemplatesModal';
import SettingsModal from './SettingsModal';

export const AllModals = () => (
  <>
    <AddCourseModal />
    <AddMeetingModal />
    <AddStudentModal />
    <SettingsModal />
    <EmailTemplatesModal />
  </>
);
export default AllModals;
