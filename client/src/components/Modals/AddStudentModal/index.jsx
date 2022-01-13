/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Form, Heading, Modal,
} from 'react-bulma-components';
import { CourseContext, ModalContext } from '../../../context';
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

const formDefaults = {
  firstName: '',
  lastName: '',
  email: '',
  classId: '',
  timeZoneName: clientTimeZone || '',
  graduationDate: getCurrentDatePicker() || '',
  fullTimeCourse: false,
  githubUsername: '',
  meetingLink:
    '',
  meetingsPerWeek: 1,
  reassignment: false,
  recurringMeeting: true,
};

const AddStudentModal = () => {
  const { openModal, setOpenModal } = useContext(ModalContext);
  const { allCourses, setAllCourses, selectedCourse } = useContext(CourseContext);
  const [formInputs, setFormInputs] = useState(formDefaults);
  const [helpText, setHelpText] = useState('');

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
      setOpenModal('');
    } catch ({ message }) {
      if (message.includes('E11000 duplicate key error')) setHelpText('email already in use');
      else setHelpText(message);
    }

    return '';
  };

  return (
    <Modal
      className='background-blurred-light'
      show={openModal === 'AddStudent'}
      onClose={() => setOpenModal('')}
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
            <Button type='button' onClick={() => setOpenModal('')}>
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
