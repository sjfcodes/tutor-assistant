import React, { useContext, useMemo, useState } from 'react';
import { Columns, Form } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_STUDENT_MODAL, SET_OPEN_MODAL } from '../../store/view/actions';
import { getCurrentUnix } from '../../utils';
import { getUnixFromISO } from '../../utils/helpers/dateTime';
import { DashboardContext, STUDENTS_SECTION } from '../../views/Dashboard/DashboardProvider';
import SectionContainer from '../Section/Container';
import SectionHeading from '../Section/Heading';
import StudentsList from './StudentsList';
import StudentsListFilter from './StudentsListFilter';
import { StudentsContext } from './StudentsProvider';

const StudentsSection = () => {
  const { allCourses, selectedCourse } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  const { toggleDisplayedSection } = useContext(DashboardContext);
  const { displayedStudents } = useContext(StudentsContext);
  const [checkBox, setCheckBox] = useState({ currentStudentsOnly: true });

  const focusedStudents = useMemo(
    () => {
      const allStudents = Object
        .values(allCourses[selectedCourse].students);

      const currentDateUnix = getCurrentUnix();

      return checkBox.currentStudentsOnly
        ? allStudents
          .filter(({ graduationDate }) => getUnixFromISO(graduationDate) > currentDateUnix)
        : allStudents;
    },
    [allCourses, selectedCourse, checkBox.currentStudentsOnly],
  );

  const {
    filterBy, setFilterBy,
    isActive, sectionName, filterOptions,
  } = useContext(StudentsContext);

  const toggleCheckbox = ({ target: { name, checked } }) => {
    setCheckBox({ ...checkBox, [name]: checked });
  };

  const getChildren = () => {
    if (!isActive) return '';
    return (
      <>
        <Columns className='is-mobile ml-5 mt-2'>
          <Columns.Column>
            <Form.Field kind='addons'>
              <Form.Label className='mr-3 mb-0'>
                sort
              </Form.Label>
              <StudentsListFilter />
            </Form.Field>
          </Columns.Column>
          <Columns.Column>
            <Form.Field kind='addons'>
              <Form.Label className='mr-3 mb-0'>
                Current Students
              </Form.Label>
              <Form.Checkbox name='currentStudentsOnly' checked={checkBox.currentStudentsOnly} onChange={toggleCheckbox} />
            </Form.Field>
          </Columns.Column>
        </Columns>
        <StudentsList focusedStudents={focusedStudents} />
      </>
    );
  };

  const heading = (
    <SectionHeading
      sectionName={sectionName}
      count={displayedStudents.length || focusedStudents.length}
    />
  );

  const openAddStudentModal = () => dispatch({ type: SET_OPEN_MODAL, payload: ADD_STUDENT_MODAL });
  return (
    <SectionContainer
      heading={heading}
      active={isActive}
      toggleDisplayedSection={() => toggleDisplayedSection(STUDENTS_SECTION)}
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
