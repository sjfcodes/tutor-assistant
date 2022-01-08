import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Level } from 'react-bulma-components';
import { string, func } from 'prop-types';
import DeleteCourseLayout from './DeleteCourseLayout';
import EditCourseNameLayout from './EditCourseNameLayout';
import DefaultCourseLayout from './DefaultCourseLayout';
import CalendlyAccess from '../../CalendlyAccess';

const CouseLayouts = ({
  courseName, courseId,
  courseToEdit, setCourseToEdit,
  courseToDelete, setCourseToDelete,
  handleDeleteCourse, handleUpdateCourse,
  selectedCalendlyAccess, setSelectedCalendlyAccess,
}) => {
  const [formInput, setFormInput] = useState('');
  const [layout, setLayout] = useState();

  const handleEditNameClick = useCallback(
    (name, id) => {
      setFormInput(name);
      setCourseToEdit(id);
    },
    [setCourseToEdit],
  );

  const handleUpdateClick = useCallback((e) => {
    e.preventDefault();
    handleUpdateCourse(courseId, formInput.trim());
    setFormInput('');
  }, [courseId, formInput, handleUpdateCourse]);

  const props = useMemo(() => ({
    courseId,
    courseName,
    formInput,
    setFormInput,
    setCourseToEdit,
    setCourseToDelete,
    handleUpdateClick,
    handleEditNameClick,
    handleDeleteCourse,
    courseToEdit,
  }), [
    courseId, courseName, formInput, setFormInput,
    courseToEdit, setCourseToDelete, setCourseToEdit,
    handleUpdateClick, handleEditNameClick, handleDeleteCourse,
  ]);

  const updateLayout = useCallback(() => {
    switch (courseId) {
    case courseToEdit:
      return setLayout(<EditCourseNameLayout {...props} />);

    case courseToDelete:
      return setLayout(<DeleteCourseLayout {...props} />);

    default:
      return setLayout(<DefaultCourseLayout {...props} />);
    }
  }, [courseId, courseToEdit, courseToDelete, props]);

  useEffect(
    updateLayout,
    [updateLayout, handleDeleteCourse, handleUpdateCourse],
  );

  return (
    <div className='border-bottom-light pb-3'>
      <Level
        renderAs='div'
        className='is-mobile'
      >
        {layout}
      </Level>
      <CalendlyAccess
        courseId={courseId}
        selectedCalendlyAccess={selectedCalendlyAccess}
        setSelectedCalendlyAccess={setSelectedCalendlyAccess}
      />
    </div>
  );
};
export default CouseLayouts;

CouseLayouts.propTypes = {
  courseName: string.isRequired,
  courseId: string.isRequired,
  courseToDelete: string.isRequired,
  setCourseToDelete: func.isRequired,
  courseToEdit: string.isRequired,
  setCourseToEdit: func.isRequired,
  handleUpdateCourse: func.isRequired,
  handleDeleteCourse: func.isRequired,
  selectedCalendlyAccess: string.isRequired,
  setSelectedCalendlyAccess: func.isRequired,
};
