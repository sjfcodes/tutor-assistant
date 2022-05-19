import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StudentsContext } from '../StudentsProvider';
import StudentsListItem from './StudentsListItem';

const StudentsList = ({ focusedStudents }) => {
  const { selectedCourse } = useSelector((state) => state.courses);

  const { filterBy, displayedStudents, setDisplayedStudents } = useContext(StudentsContext);
  const [studentsListItems, setStudentsListItems] = useState('');

  const filterStudentsByGraduationDate = (arr) => (
    arr.length
      ? arr.sort(({ graduationDate: a }, { graduationDate: b }) => {
        const unixA = new Date(a).getTime() / 1000;
        const unixB = new Date(b).getTime() / 1000;
        // sort newest Students first
        if (unixA > unixB) return 1;
        if (unixA === unixB) return 0;
        return -1;
      })
      : []
  );
  const filterStudentsByFirstName = (arr) => (
    arr.length
      ? arr.sort(({ firstName: a }, { firstName: b }) => {
        const charA = a.charAt(0);
        const charB = b.charAt(0);
        // sort newest Students first
        if (charA > charB) return 1;
        if (charA === charB) return 0;
        return -1;
      })
      : []
  );
  const filterStudentsByLastName = (arr) => (
    arr.length
      ? arr.sort(({ lastName: a }, { lastName: b }) => {
        const charA = a.charAt(0);
        const charB = b.charAt(0);
        // sort newest Students first
        if (charA > charB) return 1;
        if (charA === charB) return 0;
        return -1;
      })
      : []
  );
  useEffect(() => {
    if (selectedCourse && focusedStudents.length) {
      let students;
      switch (filterBy) {
      case 'graduation date':
        students = filterStudentsByGraduationDate(focusedStudents);
        break;

      case 'first name':
        students = filterStudentsByFirstName(focusedStudents);

        break;

      case 'last name':
        students = filterStudentsByLastName(focusedStudents);

        break;

      default:
        students = filterStudentsByFirstName(focusedStudents);
        break;
      }
      setDisplayedStudents(students);
    } else setDisplayedStudents([]);
  }, [selectedCourse, filterBy, focusedStudents, setDisplayedStudents]);

  useEffect(() => {
    if (!displayedStudents.length) setStudentsListItems(<p className='has-text-centered'>add a student to get started</p>);
    else setStudentsListItems(displayedStudents
      .map((student) => (
        <StudentsListItem
          key={student._id}
          student={student}
        />
      )));
  }, [selectedCourse, displayedStudents, filterBy]);

  return studentsListItems;
};
export default StudentsList;
