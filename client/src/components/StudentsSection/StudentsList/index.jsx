import React, {
  useContext,
  useEffect, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { StudentsContext } from '../StudentsProvider';
import StudentsListItem from './StudentsListItem';

const StudentsList = () => {
  const { allCourses, selectedCourse } = useSelector((state) => state.courses);

  const { filterBy } = useContext(StudentsContext);
  const [displayedStudents, setDisplayedStudents] = useState([]);
  const [studentsListItems, setStudentsListItems] = useState('');

  const allStudents = useMemo(
    () => Object
      .values(allCourses[selectedCourse].students),
    [allCourses, selectedCourse],
  );

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
    if (selectedCourse && allStudents) {
      let students;
      switch (filterBy) {
      case 'graduation date':
        students = filterStudentsByGraduationDate(allStudents);
        break;

      case 'first name':
        students = filterStudentsByFirstName(allStudents);
        break;

      case 'last name':
        students = filterStudentsByLastName(allStudents);
        break;

      default:
        students = filterStudentsByFirstName(allStudents);
        break;
      }
      setDisplayedStudents(students);
    }
  }, [selectedCourse, allStudents, filterBy]);

  useEffect(() => {
    if (!displayedStudents.length) setStudentsListItems(<p className='has-text-centered'>add a student to get started</p>);
    else setStudentsListItems(
      displayedStudents
        .map((student) => (
          <StudentsListItem
            key={student._id}
            student={student}
          />
        )),
    );
  }, [selectedCourse, allCourses, displayedStudents, filterBy]);

  return studentsListItems;
};
export default StudentsList;
