import React, { useContext } from 'react';
import SectionHeading from '../../Section/Heading';
import { StudentsContext } from '../StudentsProvider';

const StudentHeading = () => {
  const { isActive, sectionName, studentCount } = useContext(StudentsContext);

  return (
    <SectionHeading
      active={isActive}
      sectionName={sectionName}
      count={studentCount}
    />
  );
};

export default StudentHeading;
