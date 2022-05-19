import React, { useState } from 'react';
import { Button, Heading, Modal } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_MEETING_TO_COURSE } from '../../../store/courses/actions';
import { ADD_MEETING_MODAL, CLOSE_MODAL } from '../../../store/view/actions';
import { createModel, missingFormInputs } from '../../../utils';
import AddMeetingForm from './AddMeetingForm';

const AddMeetingModal = () => {
  const {
    courses: { selectedCourse },
    view: { openModal },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [formInputs, setFormInputs] = useState({
    duration: 1,
    startTime: '',
    status: 'scheduled',
    studentId: '',
    recurringMeeting: false,
  });

  const handleAddMeeting = async (e) => {
    e.preventDefault();

    const meeting = await createModel({
      model: 'meeting',
      body: formInputs,
      _id: selectedCourse,
    });

    dispatch({
      type: ADD_MEETING_TO_COURSE,
      payload: { ...meeting, type: 'tutorly' },
    });
    dispatch({ type: CLOSE_MODAL });

    return '';
  };

  return (
    <Modal
      className='background-blurred-light'
      show={openModal === ADD_MEETING_MODAL}
      onClose={() => dispatch({ type: CLOSE_MODAL })}
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
            <Button type='button' onClick={() => dispatch({ type: CLOSE_MODAL })}>
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
