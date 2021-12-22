import React from 'react';
import AddCourseModal from './AddCourseModal';
import AddMeetingModal from './AddMeetingModal';
import AddStudentModal from './AddStudentModal';
import SettingsModal from './SettingsModal';

export const AllModals = () => (
  <>
    <AddCourseModal />
    <AddMeetingModal />
    <AddStudentModal />
    <SettingsModal />
  </>
);
export default AllModals;
