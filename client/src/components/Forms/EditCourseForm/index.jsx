import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { CourseContext } from '../../../context';
import { deleteModel, updateModel } from '../../../utils';
import CouseLayouts from './CourseLayouts';

// eslint-disable-next-line react/prop-types
const EditCourseForm = ({ setDisableControls }) => {
  const [courseItems, setCourseItems] = useState();
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
        await updateModel('course', body);

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
        await deleteModel('course', _id);

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

  const update = useCallback(() => {
    setCourseItems(
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
      )),
    );
  }, [
    allCourses,
    courseToDelete,
    courseToUpdate,
    handleDeleteCourse,
    handleUpdateCourse,
    setCourseToDelete,
    setCourseToUpdate,
  ]);

  useEffect(() => {
    if (!Object.keys(allCourses).length) return setCourseItems(null);
    update();
    if (courseToUpdate || courseToDelete) setDisableControls(true);
    else setDisableControls(false);
    return '';
  }, [allCourses, courseToDelete, courseToUpdate, update, setDisableControls]);

  return (
    <div>
      { courseItems }
    </div>
  );
};
export default EditCourseForm;
