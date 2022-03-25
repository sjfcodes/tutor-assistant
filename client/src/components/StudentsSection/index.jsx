import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_STUDENT_MODAL, COURSE_SECTION_STUDENTS, SET_ACTIVE_COMPONENT, SET_OPEN_MODAL,
} from '../../store/view/actions';
import SectionContainer from '../Section/Container';
import StudentHeading from './StudentHeading';
import StudentsList from './StudentsList';
import { StudentsContext } from './StudentsProvider';
import StudentToolbar from './StudentToolbar';

const StudentsSection = () => {
  const dispatch = useDispatch();
  const {
    view: { activeComponent: { selectedComponent } },
  } = useSelector((state) => state);

  const {
    isActive,
    filterBy,
    sectionName,
    setFilterBy,
    filterOptions,
    // setFilterOptions,
    focusedStudents,
    // displayedStudents,
  } = useContext(StudentsContext);

  const openAddStudentModal = () => dispatch({ type: SET_OPEN_MODAL, payload: ADD_STUDENT_MODAL });

  const toggleDisplayedSection = () => {
    dispatch({
      type: SET_ACTIVE_COMPONENT,
      payload: {
        selectedComponent: selectedComponent !== COURSE_SECTION_STUDENTS
          ? COURSE_SECTION_STUDENTS
          : '',
      },
    });
  };

  return (
    <SectionContainer
      active={isActive}
      heading={<StudentHeading />}
      toolbar={isActive && <StudentToolbar />}
      toggleDisplayedSection={toggleDisplayedSection}
      sectionName={sectionName}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      filterOptions={filterOptions}
      addListItemClick={openAddStudentModal}
    >
      {isActive ? <StudentsList focusedStudents={focusedStudents} /> : ''}
    </SectionContainer>
  );
};
export default StudentsSection;
