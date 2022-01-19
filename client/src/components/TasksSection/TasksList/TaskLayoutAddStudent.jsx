import React, { useContext, useState } from 'react';
import { string } from 'prop-types';
import { Button, Form } from 'react-bulma-components';
import AddStudentForm from '../../Modals/AddStudentModal/AddStudentForm';
import { addStudentFormDefaults } from '../../Modals/AddStudentModal';
import {
  convertDatePickerToISO8601, createModel, handleError, missingFormInputs,
} from '../../../utils';
import { CourseContext } from '../../../context';

const TaskLayoutAddStudent = ({ studentName, email, timeZoneName }) => {
  const { allCourses, setAllCourses, selectedCourse } = useContext(CourseContext);
  const [helpText, setHelpText] = useState('help');
  const [formInputs, setFormInputs] = useState({
    ...addStudentFormDefaults,
    firstName: studentName.split(' ')[0] || '',
    lastName: studentName.split(' ')[1] || '',
    email: email || '',
    timeZoneName: timeZoneName || '',
  });

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const inputs = { ...formInputs };
      inputs.graduationDate = convertDatePickerToISO8601(formInputs.graduationDate);

      const { _id: newStudentId, createdAt } = await createModel({ model: 'student', body: inputs, _id: selectedCourse });
      if (!newStudentId) return handleError('createModel [student] did not return _id');

      const currentStudents = allCourses[selectedCourse].students;
      const updatedStudents = {
        ...currentStudents,
        [newStudentId]: {
          _id: newStudentId,
          ...inputs,
          createdAt,
        },
      };
      const updatedCourse = { ...allCourses[selectedCourse], students: updatedStudents };
      setAllCourses({ ...allCourses, [selectedCourse]: updatedCourse });
    } catch ({ message }) {
      if (message.includes('E11000 duplicate key error')) setHelpText('email already in use');
      else setHelpText(message);
    }

    return '';
  };

  return (
    <form onSubmit={handleAddStudent}>
      <AddStudentForm
        formInputs={formInputs}
        setFormInputs={setFormInputs}
      />
      <Form.Help size='small' color='danger'>{helpText}</Form.Help>
      <Button
        color='success'
        type='submit'
        disabled={missingFormInputs(formInputs)}
      >
        Add Student
      </Button>
    </form>
  );
};

TaskLayoutAddStudent.propTypes = {
  studentName: string,
  email: string,
  timeZoneName: string,
};
TaskLayoutAddStudent.defaultProps = {
  studentName: '',
  email: '',
  timeZoneName: '',
};

export default TaskLayoutAddStudent;
