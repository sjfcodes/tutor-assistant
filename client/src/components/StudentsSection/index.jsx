import React, {
  useContext, useMemo, useState,
} from 'react';
import { Columns, Form } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_STUDENT_MODAL, COURSE_SECTION_STUDENTS, SET_ACTIVE_COMPONENT, SET_OPEN_MODAL,
} from '../../store/view/actions';
import { getCourseSectionListItemCount, getCurrentUnix } from '../../utils';
import { getUnixFromISO } from '../../utils/helpers/dateTime';
import SectionContainer from '../Section/Container';
import SectionHeading from '../Section/Heading';
import StudentsList from './StudentsList';
import StudentsListFilter from './StudentsListFilter';
import { StudentsContext } from './StudentsProvider';

const StudentsSection = () => {
  const dispatch = useDispatch();
  const {
    courses: { allCourses, selectedCourse },
    view: { activeComponent: { selectedComponent } },
  } = useSelector((state) => state);

  const { displayedStudents } = useContext(StudentsContext);
  const {
    filterBy, setFilterBy,
    isActive, sectionName, filterOptions,
  } = useContext(StudentsContext);

  const [checkBox, setCheckBox] = useState({ currentStudentsOnly: true });

  const { students: allStudents } = useMemo(
    () => {
      if (!allCourses || !selectedCourse || !allCourses[selectedCourse]) return { students: {} };

      return allCourses[selectedCourse];
    },
    [allCourses, selectedCourse],
  );

  const focusedStudents = useMemo(
    () => {
      const currentDateUnix = getCurrentUnix();
      const studentsArr = Object.values(allStudents) || [];

      if (!studentsArr.length) return studentsArr;

      return checkBox.currentStudentsOnly
        ? studentsArr
          .filter(({ graduationDate }) => getUnixFromISO(graduationDate) > currentDateUnix)
        : studentsArr;
    },
    [allStudents, checkBox.currentStudentsOnly],
  );

  const children = useMemo(() => {
    const toggleCheckbox = ({ target: { name, checked } }) => {
      setCheckBox({ ...checkBox, [name]: checked });
    };
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
  }, [isActive, checkBox, focusedStudents]);

  const heading = (
    <SectionHeading
      sectionName={sectionName}
      count={
        getCourseSectionListItemCount({
          displayed: displayedStudents.length,
          focused: focusedStudents.length,
        })
      }
    />
  );

  const openAddStudentModal = () => dispatch({ type: SET_OPEN_MODAL, payload: ADD_STUDENT_MODAL });
  return (
    <SectionContainer
      heading={heading}
      active={isActive}
      toggleDisplayedSection={() => dispatch({
        type: SET_ACTIVE_COMPONENT,
        payload: {
          selectedComponent: selectedComponent !== COURSE_SECTION_STUDENTS
            ? COURSE_SECTION_STUDENTS
            : '',
        },
      })}
      sectionName={sectionName}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      filterOptions={filterOptions}
      addListItemClick={openAddStudentModal}
    >
      {children}
    </SectionContainer>
  );
};
export default StudentsSection;
