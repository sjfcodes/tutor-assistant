import React, { useState } from 'react';
import { string } from 'prop-types';
import { Button, Form } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';
import AddStudentForm from '../../Modals/AddStudentModal/AddStudentForm';
import { addStudentFormDefaults } from '../../Modals/AddStudentModal';
import {
  convertDatePickerToISO8601, createModel,
  handleError, missingFormInputs,
} from '../../../utils';
import { ADD_STUDENT_TO_COURSE } from '../../../store/courses/actions';

const TaskLayoutAddStudent = ({
  firstName, lastName, email, timeZoneName,
}) => {
  const { selectedCourse } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const [helpText, setHelpText] = useState('help');
  const [formInputs, setFormInputs] = useState({
    ...addStudentFormDefaults,
    firstName,
    lastName,
    email: email || '',
    timeZoneName: timeZoneName || '',
  });

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const inputs = { ...formInputs };
      inputs.graduationDate = convertDatePickerToISO8601(formInputs.graduationDate);

      const student = await createModel({ model: 'student', body: inputs, _id: selectedCourse });
      if (!student._id) return handleError('missing student id');

      dispatch({
        type: ADD_STUDENT_TO_COURSE,
        payload: student,
      });
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
  firstName: string,
  lastName: string,
  email: string,
  timeZoneName: string,
};
TaskLayoutAddStudent.defaultProps = {
  firstName: '',
  lastName: '',
  email: '',
  timeZoneName: '',
};

export default TaskLayoutAddStudent;
