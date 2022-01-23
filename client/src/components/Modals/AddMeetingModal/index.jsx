import React, { useContext, useState } from 'react';
import { Button, Heading, Modal } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContext } from '../../../context';
import { ADD_MEETING_TO_COURSE } from '../../../store/courses/actions';
import { createModel, missingFormInputs } from '../../../utils';
import AddMeetingForm from './AddMeetingForm';

const AddMeetingModal = () => {
  const { selectedCourse } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  const { openModal, setOpenModal } = useContext(ModalContext);
  const [formInputs, setFormInputs] = useState({
    duration: 1,
    startTime: '',
    status: 'scheduled',
    studentId: '',
  });

  const handleAddMeeting = async (e) => {
    e.preventDefault();

    const meeting = await createModel(
      {
        model: 'meeting',
        body: formInputs,
        _id: selectedCourse,
      },
    );

    dispatch({
      type: ADD_MEETING_TO_COURSE,
      payload: { ...meeting, type: 'tutorly' },
    });
    setOpenModal('');

    return '';
  };

  return (
    <Modal
      className='background-blurred-light'
      show={openModal === 'AddMeeting'}
      onClose={() => setOpenModal('')}
    >
      <Modal.Card>
        <Modal.Card.Header
          className='background-clear mx-2 pb-0'
          showClose={false}
        >
          <Heading className='has-text-grey-lighter mb-5'>
            Add Meeting
          </Heading>
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
