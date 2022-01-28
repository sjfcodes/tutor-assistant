import React, { useEffect, useState } from 'react';
import {
  Button, Form, Heading, Modal,
} from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COURSE, SET_SELECTED_COURSE } from '../../../store/courses/actions';
import { ADD_COURSE_MODAL, CLOSE_MODAL } from '../../../store/view/actions';
import { createModel, missingFormInputs } from '../../../utils';

const AddCourseModal = () => {
  const {
    tutor: { _id },
    courses: { allCourses },
    view: { openModal },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [formInputs, setFormInputs] = useState({ courseName: '' });
  const { courseName } = formInputs;
  const [helpMessage, setHelpMessage] = useState(null);

  const [existingNames, setExistingNames] = useState(null);

  useEffect(() => {
    if (!allCourses) return;

    const arr = Object.values(allCourses).map(({ name }) => name?.toLowerCase());
    setExistingNames(arr);
  }, [allCourses]);

  const resetForm = () => setFormInputs({ courseName: '' });

  const handleInputChange = (e) => {
    const { target: { name, value } } = e;

    if (helpMessage) setHelpMessage(null);
    if (existingNames && existingNames.indexOf(value.toLowerCase()) !== -1) setHelpMessage('name already in use');
    setFormInputs({ ...formInputs, [name]: value });
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!courseName) {
      setHelpMessage('Please enter a name');
      return;
    }

    const body = { tutorId: _id, name: courseName };
    const course = await createModel({ model: 'course', body });
    // initialize meetings and students to empty objects

    resetForm();
    setHelpMessage('');

    dispatch({
      type: ADD_COURSE,
      payload: course,
    });

    dispatch({
      type: SET_SELECTED_COURSE,
      payload: course._id,
    });

    dispatch({ type: CLOSE_MODAL });
  };

  const handleCloseModal = () => {
    dispatch({ type: CLOSE_MODAL });
    resetForm();
  };

  return (
    <Modal
      className='background-blurred-light'
      show={openModal === ADD_COURSE_MODAL}
      onClose={handleCloseModal}
    >
      <Modal.Card>
        <Modal.Card.Header
          className='background-clear mx-2 pb-0'
          showClose={false}
        >
          <Heading className='has-text-grey-lighter mb-5'>
            Add Course
          </Heading>
        </Modal.Card.Header>

        <form onSubmit={handleAddCourse}>
          <Modal.Card.Body>
            <Form.Field>
              <Form.Control>
                <Form.Label>Name</Form.Label>
                <Form.Input
                  type='text'
                  name='courseName'
                  value={courseName}
                  onChange={handleInputChange}
                />
              </Form.Control>
              <Form.Help className='ml-5' color='danger'>
                {helpMessage}
              </Form.Help>
            </Form.Field>
          </Modal.Card.Body>
          <Modal.Card.Footer renderAs={Button.Group} align='right'>
            <Button
              disabled={helpMessage || missingFormInputs(formInputs)}
              color='primary'
            >
              Add Course
            </Button>
          </Modal.Card.Footer>
        </form>
      </Modal.Card>
    </Modal>
  );
};
export default AddCourseModal;
