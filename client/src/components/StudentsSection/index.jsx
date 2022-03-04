import React, { useContext } from 'react';
import { Columns } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_STUDENT_MODAL, SET_OPEN_MODAL } from '../../store/view/actions';
import { DashboardContext, STUDENTS_SECTION } from '../../views/Dashboard/DashboardProvider';
import SectionContainer from '../Section/Container';
import SectionHeading from '../Section/Heading';
import StudentsList from './StudentsList';
import StudentsListFilter from './StudentsListFilter';
import { StudentsContext } from './StudentsProvider';

const StudentsSection = () => {
  const { allCourses, selectedCourse } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  const { handleToggle } = useContext(DashboardContext);
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
        <Columns className='is-mobile ml-5 mt-2'>
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

  const openAddStudentModal = () => dispatch({ type: SET_OPEN_MODAL, payload: ADD_STUDENT_MODAL });
  return (
    <SectionContainer
      heading={heading}
      active={isActive}
      handleToggle={toggleSection}
      sectionName={sectionName}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      filterOptions={filterOptions}
      addListItemClick={openAddStudentModal}
    >
      {getChildren()}
    </SectionContainer>
  );
};
export default StudentsSection;
