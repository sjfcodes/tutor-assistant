import React, { useContext } from 'react';
import {
  Button, Form, Icon, Level,
} from 'react-bulma-components';
import {
  string, number, func, shape,
} from 'prop-types';
import { CourseContext } from '../../../context';
import { inputIsSelected } from '../../../utils';
import MeetingTime from './MeetingTime';

const AddMeetingForm = ({ formInputs, setFormInputs }) => {
  const { allCourses, selectedCourse } = useContext(CourseContext);
  const { studentId, startDate, duration } = formInputs;

  const handleInputChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const updateDuration = (value) => {
    const updatedDuration = duration + value;
    if (updatedDuration <= 0) return;
    setFormInputs({ ...formInputs, duration: duration + value });
  };

  return (
    <Level renderAs='div'>
      <Level.Side align='left'>
        <Level.Item>
          <Form.Field kind='addons'>
            <Form.Control>
              <Form.Label>Student</Form.Label>
              <Form.Select
                name='studentId'
                value={studentId}
                placeholder='student'
                onInput={handleInputChange}
              >
                <option value=''>-</option>
                {Object.entries(allCourses[selectedCourse].students).map(
                  ([key, { firstName, lastName }]) => (
                    <option
                      key={key}
                      value={key}
                    >
                      {`${firstName} ${lastName}`}

                    </option>
                  ),
                )}
              </Form.Select>
              <Icon className='ml-2 mt-2'>
                <i
                  className={`fas fa-check ${!inputIsSelected(studentId) && 'has-text-white'
                  }`}
                />
              </Icon>
            </Form.Control>
          </Form.Field>
        </Level.Item>
      </Level.Side>
      <Level.Item>
        <MeetingTime formInputs setFormInputs />
      </Level.Item>
      <Level.Side align='right'>
        <Level.Item>
          <Form.Field kind='addons'>
            <Form.Control>
              <Form.Label>Duration (hours)</Form.Label>

              <Form.Input
                disabled
                style={{
                  width: '50px',
                  backgroundColor: 'inherit',
                  borderColor: `${startDate && 'inherit'}`,
                  color: `${startDate && 'inherit'}`,
                }}
                value={duration}
              />

              <Button
                type='button'
                className='py-0'
                onClick={() => updateDuration(1)}
                disabled={!startDate}
              >
                +
              </Button>
              <Button
                disabled={!startDate || duration === 1}
                type='button'
                className='py-0'
                onClick={() => updateDuration(-1)}
              >
                -
              </Button>
            </Form.Control>
          </Form.Field>
        </Level.Item>
      </Level.Side>
    </Level>
  );
};
export default AddMeetingForm;

AddMeetingForm.propTypes = {
  formInputs: shape({
    tutorId: string.isRequired,
    studentId: string.isRequired,
    duration: number.isRequired,
    startDate: string.isRequired,
    status: string.isRequired,
  }).isRequired,
  setFormInputs: func.isRequired,
};
