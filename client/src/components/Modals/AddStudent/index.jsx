import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bulma-components';
import { CourseContext, ModalContext } from '../../../context';
import {
  createModel,
  missingFormInputs,
  getUnixFromFormInputs,
} from '../../../utils';
import { handleError } from '../../../utils/helpers';
import AddStudentForm from './AddStudentForm';

const i = 0;

const formDefaults = {
  firstName: `Student${i}`,
  lastName: `New${i}`,
  email: `student${i}@email.com`,
  classId: 'ABC123',
  timeZoneOffset: 'Eastern',
  graduationDate: '',
  fullTimeCourse: true,
  githubUsername: `student${i}`,
  meetingLink:
    'https://zoom.us/j/96314583232?pwd=K1ZsMGpjWEk1MDdQUStKNFlSd3VDZz09',
  meetingsPerWeek: 1,
  reassignment: false,
  temporary: false,
};

const AddStudent = () => {
  const { openModal, setOpenModal } = useContext(ModalContext);
  const { allCourses, setAllCourses, selectedCourse } = useContext(CourseContext);
  const [formInputs, setFormInputs] = useState(formDefaults);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const inputs = { ...formInputs };
    inputs.graduationDate = getUnixFromFormInputs(formInputs.graduationDate);

    try {
      const { _id: newStudentId, createdAt } = await createModel('student', inputs, selectedCourse);
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
    } catch (error) {
      console.warn(error);
    }
    return '';
  };

  return (
    <Modal
      className=''
      showClose={false}
      show={openModal === 'addStudent'}
      onClose={() => setOpenModal('')}
    >
      <Modal.Card>
        <Modal.Card.Header showClose>
          <Modal.Card.Title>Add Student</Modal.Card.Title>
        </Modal.Card.Header>

        <form onSubmit={handleAddStudent}>
          <Modal.Card.Body>
            <AddStudentForm
              formInputs={formInputs}
              setFormInputs={setFormInputs}
            />
          </Modal.Card.Body>

          <Modal.Card.Footer renderAs={Button.Group} align='right' hasAddons>
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
export default AddStudent;
