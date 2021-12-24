import React, { useCallback, useEffect, useState } from 'react';
import { Level } from 'react-bulma-components';
import { string, func } from 'prop-types';
import DeleteCourseLayout from './DeleteCourseLayout';
import EditCourseNameLayout from './EditCourseNameLayout';
import DefaultCourseLayout from './DefaultCourseLayout';

const CouseLayouts = ({
  courseName,
  courseId,
  courseToUpdate,
  setCourseToUpdate,
  courseToDelete,
  setCourseToDelete,
  handleDeleteCourse,
  handleUpdateCourse,
}) => {
  const [formInput, setFormInput] = useState('');
  const [layout, setLayout] = useState();

  const handleEditNameClick = useCallback(
    (name, id) => {
      setFormInput(name);
      setCourseToUpdate(id);
    },
    [setCourseToUpdate],
  );

  const handleUpdateClick = useCallback((e) => {
    e.preventDefault();
    handleUpdateCourse(courseId, formInput.trim());
    setFormInput('');
  }, [courseId, formInput, handleUpdateCourse]);

  const updateLayout = useCallback(() => {
    switch (courseId) {
    case courseToUpdate:
      setLayout(
        <EditCourseNameLayout
          formInput={formInput}
          setFormInput={setFormInput}
          setCourseToUpdate={setCourseToUpdate}
          handleUpdateClick={handleUpdateClick}
        />,
      );
      break;

    case courseToDelete:
      setLayout(
        <DeleteCourseLayout
          courseId={courseId}
          courseName={courseName}
          setCourseToDelete={setCourseToDelete}
          handleDeleteCourse={handleDeleteCourse}
        />,
      );
      break;

    default:
      setLayout(
        <DefaultCourseLayout
          courseId={courseId}
          courseName={courseName}
          handleEditNameClick={handleEditNameClick}
          setCourseToDelete={setCourseToDelete}
        />,
      );
      break;
    }
  }, [
    courseId,
    formInput,
    courseName,
    courseToDelete,
    courseToUpdate,
    setCourseToUpdate,
    handleUpdateClick,
    setCourseToDelete,
    handleDeleteCourse,
    handleEditNameClick,
  ]);

  useEffect(() => {
    updateLayout();
  }, [updateLayout, handleDeleteCourse, handleUpdateCourse]);

  return <Level className='is-mobile'>{layout}</Level>;
};
export default CouseLayouts;

CouseLayouts.propTypes = {
  courseName: string.isRequired,
  courseId: string.isRequired,

  courseToDelete: string.isRequired,
  setCourseToDelete: func.isRequired,

  courseToUpdate: string.isRequired,
  setCourseToUpdate: func.isRequired,

  handleUpdateCourse: func.isRequired,
  handleDeleteCourse: func.isRequired,
};
