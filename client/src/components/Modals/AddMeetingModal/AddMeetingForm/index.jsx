import React from 'react';
import {
  Button, Form, Columns,
} from 'react-bulma-components';
import { LevelSide } from '../../../BulmaHelpers';
import MeetingTime, { addMeetingFormPropTypes } from './MeetingTime';
import { StudentSelector } from '../../../Forms';

const AddMeetingForm = ({ formInputs, setFormInputs }) => {
  const { studentId, startTime, duration } = formInputs;

  const handleInputChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setFormInputs({ ...formInputs, [name]: value });
  };

  // eslint-disable-next-line no-unused-vars
  const updateDuration = (val, startTimeISO = startTime) => {
    const newDuration = duration + val;
    // chek if meetings conflict?
    setFormInputs({ ...formInputs, duration: newDuration });
  };

  return (
    <Columns>
      <Columns.Column>
        <Form.Field kind='addons' justifyContent='center'>
          <StudentSelector
            studentId={studentId}
            onChange={handleInputChange}
          />
        </Form.Field>
      </Columns.Column>

      <Columns.Column>
        <MeetingTime
          formInputs={formInputs}
          setFormInputs={setFormInputs}
          updateDuration={updateDuration}
        />
      </Columns.Column>
      <Columns.Column>
        <LevelSide>
          <Form.Field kind='addons'>
            <Form.Control>
              <Form.Label>duration (hours)</Form.Label>

              <Form.Input
                disabled
                style={{
                  width: '50px',
                  backgroundColor: 'inherit',
                  borderColor: `${startTime && 'inherit'}`,
                  color: `${startTime && 'inherit'}`,
                }}
                value={duration}
              />

              <Button
                type='button'
                className='py-0'
                onClick={() => updateDuration(1)}
                disabled={!startTime}
              >
                +
              </Button>
              <Button
                disabled={!startTime || duration === 1}
                type='button'
                className='py-0'
                onClick={() => duration >= 1 && updateDuration(-1)}
              >
                -
              </Button>
            </Form.Control>
          </Form.Field>
        </LevelSide>
      </Columns.Column>
    </Columns>
  );
};
export default AddMeetingForm;

AddMeetingForm.propTypes = addMeetingFormPropTypes;
