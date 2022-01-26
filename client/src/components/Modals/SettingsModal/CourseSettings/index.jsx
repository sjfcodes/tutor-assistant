import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_COURSE, UPDATE_COURSE_DETAIL } from '../../../../store/courses/actions';
import { deleteModel, updateModel } from '../../../../utils';
import CourseLayouts from './CourseLayouts';

// eslint-disable-next-line react/prop-types
const CourseSettings = ({ setDisableControls }) => {
  const { allCourses } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  const [courseToDelete, setCourseToDelete] = useState('');
  const [courseToEdit, setCourseToEdit] = useState('');

  const handleUpdateCourse = useCallback(
    async (_id, name) => {
      setCourseToEdit('');
      if (!_id || !name) return;

      const course = { _id, name };
      await updateModel({ model: 'course', body: course });

      dispatch({
        type: UPDATE_COURSE_DETAIL,
        payload: course,
      });
    },

    [dispatch],
  );

  const handleDeleteCourse = useCallback(async (_id) => {
    setCourseToDelete('');
    if (!_id) return;

    await deleteModel({ model: 'course', _id });

    dispatch({
      type: DELETE_COURSE,
      payload: _id,
    });
  }, [dispatch]);

  useEffect(() => {
    if (courseToEdit || courseToDelete) setDisableControls(true);
    else setDisableControls(false);
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
