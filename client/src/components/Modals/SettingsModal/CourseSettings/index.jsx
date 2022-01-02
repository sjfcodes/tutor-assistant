import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { CourseContext } from '../../../../context';
import { deleteModel, updateModel } from '../../../../utils';
import CouseLayouts from './CourseLayouts';

// eslint-disable-next-line react/prop-types
const CourseSettings = ({ setDisableControls }) => {
  const [courseToDelete, setCourseToDelete] = useState('');
  const [courseToUpdate, setCourseToUpdate] = useState('');

  const {
    allCourses,
    setAllCourses,
    selectedCourse,
    setSelectedCourse,
  } = useContext(CourseContext);

  const handleUpdateCourse = useCallback(
    async (_id, name) => {
      setCourseToUpdate('');
      if (!_id || !name) return;

      try {
        const body = { _id, name };
        await updateModel({ model: 'course', body });

        const updatedCourses = { ...allCourses };
        updatedCourses[_id].name = name;
        setAllCourses({ ...updatedCourses });
      } catch (error) {
        console.warn(error);
      }
    },
    [allCourses, setAllCourses],
  );

  const handleDeleteCourse = useCallback(
    async (_id) => {
      const idToDelete = _id;
      setCourseToDelete('');
      if (!_id) return;

      try {
        console.log(_id);
        await deleteModel({ model: 'course', _id });

        const updatedCourses = { ...allCourses };
        delete updatedCourses[_id];

        if (idToDelete === selectedCourse) {
          const keys = Object.keys(updatedCourses);
          setSelectedCourse(keys.length ? keys[0] : null);
        }

        setAllCourses({ ...updatedCourses });
      } catch (error) {
        console.warn(error);
      }
    },
    [allCourses, setAllCourses, selectedCourse, setSelectedCourse],
  );

  useEffect(() => {
    if (courseToUpdate || courseToDelete) setDisableControls(true);
    else setDisableControls(false);
    return '';
  }, [allCourses, courseToDelete, courseToUpdate, setDisableControls]);

  return (
    Object.values(allCourses).map(({ name: courseName, _id: courseId }) => (
      <CouseLayouts
        key={courseId}
        courseId={courseId}
        courseName={courseName}
        courseToUpdate={courseToUpdate}
        setCourseToUpdate={setCourseToUpdate}
        courseToDelete={courseToDelete}
        setCourseToDelete={setCourseToDelete}
        handleDeleteCourse={handleDeleteCourse}
        handleUpdateCourse={handleUpdateCourse}
      />
    ))
  );
};
export default CourseSettings;
