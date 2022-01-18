import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { CourseContext } from '../../../../context';
import { deleteModel, updateModel } from '../../../../utils';
import CourseLayouts from './CourseLayouts';

// eslint-disable-next-line react/prop-types
const CourseSettings = ({ setDisableControls }) => {
  const [courseToDelete, setCourseToDelete] = useState('');
  const [courseToEdit, setCourseToEdit] = useState('');

  const {
    allCourses,
    setAllCourses,
    selectedCourse,
    setSelectedCourse,
  } = useContext(CourseContext);

  const handleUpdateCourse = useCallback(
    async (_id, name) => {
      setCourseToEdit('');
      if (!_id || !name) return;

      const body = { _id, name };
      await updateModel({ model: 'course', body });

      const updatedCourses = { ...allCourses };
      updatedCourses[_id].name = name;
      setAllCourses({ ...updatedCourses });
    },
    [allCourses, setAllCourses],
  );

  const handleDeleteCourse = useCallback(async (_id) => {
    const idToDelete = _id;
    setCourseToDelete('');
    if (!_id) return;

    await deleteModel({ model: 'course', _id });

    const updatedCourses = { ...allCourses };
    delete updatedCourses[_id];

    if (idToDelete === selectedCourse) {
      const keys = Object.keys(updatedCourses);
      setSelectedCourse(keys.length ? keys[0] : null);
    }

    setAllCourses({ ...updatedCourses });
  }, [allCourses, setAllCourses, selectedCourse, setSelectedCourse]);

  useEffect(() => {
    if (courseToEdit || courseToDelete) setDisableControls(true);
    else setDisableControls(false);
    return '';
  }, [allCourses, courseToDelete, courseToEdit, setDisableControls]);

  return (
    Object.values(allCourses).map(({ name: courseName, _id: courseId }) => (
      <CourseLayouts
        key={courseId}
        courseId={courseId}
        courseName={courseName}
        courseToEdit={courseToEdit}
        setCourseToEdit={setCourseToEdit}
        courseToDelete={courseToDelete}
        setCourseToDelete={setCourseToDelete}
        handleDeleteCourse={handleDeleteCourse}
        handleUpdateCourse={handleUpdateCourse}
      />
    ))
  );
};
export default CourseSettings;
