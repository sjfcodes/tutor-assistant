import React, { useState } from 'react';
import {
  Button, Form, Heading, Modal,
} from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_STUDENT_TO_COURSE } from '../../../store/courses/actions';
import { ADD_STUDENT_MODAL, CLOSE_MODAL } from '../../../store/view/actions';
import {
  createModel,
  missingFormInputs,
  convertDatePickerToISO8601,
  getCurrentDatePicker,
  handleError,
  getClientTimeZone,
} from '../../../utils';

import AddStudentForm from './AddStudentForm';

const clientTimeZone = getClientTimeZone();

export const addStudentFormDefaults = {
  classId: '',
  email: '',
  firstName: '',
  fullTimeCourse: false,
  githubUsername: '',
  graduationDate: getCurrentDatePicker() || '',
  lastName: '',
  meetingLink: '',
  meetingsPerWeek: 1,
  reassignment: false,
  recurringMeeting: true,
  timeZoneName: clientTimeZone || '',
};

const AddStudentModal = () => {
  const {
    courses: { selectedCourse },
    view: { openModal },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [formInputs, setFormInputs] = useState(addStudentFormDefaults);
  const [helpText, setHelpText] = useState('');

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const inputs = { ...formInputs };
      inputs.graduationDate = convertDatePickerToISO8601(formInputs.graduationDate);

      const { _id: newStudentId, createdAt } = await createModel({ model: 'student', body: inputs, _id: selectedCourse });
      if (!newStudentId) return handleError('createModel [student] did not return _id');

      const newStudent = {
        _id: newStudentId,
        ...inputs,
        createdAt,
      };

      dispatch({
        type: ADD_STUDENT_TO_COURSE,
        payload: newStudent,
      });

      dispatch({ type: CLOSE_MODAL });
    } catch ({ message }) {
      if (message.includes('E11000 duplicate key error')) setHelpText('email already in use');
      else setHelpText(message);
    }

    return '';
  };

  return (
    <Modal
      className='background-blurred-light'
      show={openModal === ADD_STUDENT_MODAL}
      onClose={() => dispatch({ type: CLOSE_MODAL })}
    >
      <Modal.Card>
        <Modal.Card.Header
          className='background-clear mx-2 pb-0'
          showClose={false}
        >
          <Heading className='has-text-grey-lighter mb-5'>
            Add Student
          </Heading>
        </Modal.Card.Header>

        <form onSubmit={handleAddStudent}>
          <Modal.Card.Body>
            <AddStudentForm
              formInputs={formInputs}
              setFormInputs={setFormInputs}
            />
          </Modal.Card.Body>

          <Modal.Card.Footer renderAs={Button.Group} align='right' hasAddons>
            <Form.Help size='small' color='danger'>{helpText}</Form.Help>
            <Button type='button' onClick={() => dispatch({ type: CLOSE_MODAL })}>
              cancel
            </Button>
            <Button
              color='success'
              type='submit'
              disabled={missingFormInputs(formInputs)}
            >
              Add Student
            </Button>
          </Modal.Card.Footer>
        </form>
      </Modal.Card>
    </Modal>
  );
};
export default AddStudentModal;
