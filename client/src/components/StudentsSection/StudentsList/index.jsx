import { string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { CourseContext } from '../../../context';
import StudentsListItem from './StudentsListItem';

const StudentsList = ({ filterBy }) => {
  const { allCourses, selectedCourse } = useContext(CourseContext);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [displayedStudents, setDisplayedStudents] = useState([]);
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

  useEffect(() => {
    if (!selectedCourse) return;
    const selectedStudents = [];

    const addTutorlyStudents = () => {
      const arr = Object.values(allCourses[selectedCourse].students);
      if (arr.length) selectedStudents.push(...arr);
    };

    switch (filterBy) {
    case 'all':
      addTutorlyStudents();
      break;

    default:
      addTutorlyStudents();
      break;
    }

    setDisplayedStudents(filterStudentsByGraduationDate(selectedStudents));
  }, [selectedCourse, allCourses, filterBy]);

  useEffect(() => {
    if (!displayedStudents.length) return setStudentsListItems(<p className='has-text-centered'>add a student to get started</p>);
    return setStudentsListItems(displayedStudents.map((student) => (
      <StudentsListItem
        key={student._id}
        student={student}
        selectedStudentId={selectedStudentId}
        setSelectedStudentId={setSelectedStudentId}
      />
    )));
  }, [selectedCourse, allCourses, displayedStudents, selectedStudentId]);

  return (studentsListItems);
};
export default StudentsList;

StudentsList.propTypes = {
  filterBy: string.isRequired,
};
