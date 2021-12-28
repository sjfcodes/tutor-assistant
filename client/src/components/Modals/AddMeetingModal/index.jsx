import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bulma-components';
import { AppContext, CourseContext, ModalContext } from '../../../context';
import { createModel, missingFormInputs } from '../../../utils';
import AddMeetingForm from './AddMeetingForm';

const AddMeetingModal = () => {
  const { openModal, setOpenModal } = useContext(ModalContext);
  const { allCourses, setAllCourses, selectedCourse } = useContext(CourseContext);
  const {
    tutorDetails: { _id: tutorId },
  } = useContext(AppContext);
  const [formInputs, setFormInputs] = useState({
    tutorId,
    studentId: '',
    duration: 1,
    startDate: '',
    status: 'scheduled',
  });

  const handleAddMeeting = async (e) => {
    e.preventDefault();

    try {
      const { _id: newMeetingId, createdAt } = await createModel(
        'meeting',
        formInputs,
        selectedCourse,
      );
      if (!newMeetingId) return console.warn('failed');

      const currentMeetings = allCourses[selectedCourse].meetings;
      const updatedMeetings = {
        ...currentMeetings,
        [newMeetingId]: {
          _id: newMeetingId,
          ...formInputs,
          createdAt,
        },
      };
      const updatedCourse = {
        ...allCourses[selectedCourse],
        meetings: updatedMeetings,
      };
      setAllCourses({
        ...allCourses,
        [selectedCourse]: updatedCourse,
      });
      setOpenModal('');
    } catch (error) {
      // handleAddMeeting failed
      console.warn('handleAddMeeting failed');
    }
    return '';
  };

  return (
    <Modal
      showClose={false}
      show={openModal === 'addMeeting'}
      onClose={() => setOpenModal('')}
    >
      <Modal.Card>
        <Modal.Card.Header showClose>
          <Modal.Card.Title>Add Meeting</Modal.Card.Title>
        </Modal.Card.Header>

        <form onSubmit={handleAddMeeting}>
          <Modal.Card.Body>
            <AddMeetingForm
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
              Add Meeting
            </Button>
          </Modal.Card.Footer>
        </form>
      </Modal.Card>
    </Modal>
  );
};
export default AddMeetingModal;
