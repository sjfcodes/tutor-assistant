import React, { useContext } from 'react';
import { Columns } from 'react-bulma-components';
import { useSelector } from 'react-redux';
import { ModalContext } from '../../context';
import { HomeContext, STUDENTS_SECTION } from '../../views/Home/HomeProvider';
import SectionContainer from '../Section/Container';
import SectionHeading from '../Section/Heading';
import StudentsList from './StudentsList';
import StudentsListFilter from './StudentsListFilter';
import { StudentsContext } from './StudentsProvider';

const StudentsSection = () => {
  const { allCourses, selectedCourse } = useSelector((state) => state.courses);
  const { setOpenModal } = useContext(ModalContext);
  const { handleToggle } = useContext(HomeContext);
  const {
    filterBy, setFilterBy,
    isActive, sectionName, filterOptions,
  } = useContext(StudentsContext);

  const toggleSection = () => handleToggle(STUDENTS_SECTION);
  const getStudentCount = () => {
    let count = 0;
    if (allCourses && selectedCourse) count += allCourses[selectedCourse].studentCount;
    return count > 0 ? count : '~';
  };

  const getChildren = () => {
    if (!isActive) return '';
    return (
      <>
        <Columns className='is-mobile ml-5'>
          <p className='mr-3'>sort</p>
          <StudentsListFilter />
        </Columns>
        <StudentsList />
      </>
    );
  };

  const heading = (
    <SectionHeading
      sectionName={sectionName}
      count={getStudentCount()}
    />
  );

  return (
    <SectionContainer
      heading={heading}
      active={isActive}
      handleToggle={toggleSection}
      sectionName={sectionName}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      filterOptions={filterOptions}
      addListItemClick={() => setOpenModal('AddStudent')}
    >
      {getChildren()}
    </SectionContainer>
  );
};
export default StudentsSection;
