import React from 'react';
import {
  Button, Form, Columns,
} from 'react-bulma-components';
import { LevelSide } from '../../../BulmaHelpers';
import MeetingTime, { addMeetingFormPropTypes } from './MeetingTime';
import { StudentSelector } from '../../../Forms';

const AddMeetingForm = ({ formInputs, setFormInputs }) => {
  const {
    studentId, startTime, duration, recurringMeeting,
  } = formInputs;

  const handleInputChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (value === 'true' || value === 'false') return setFormInputs((currState) => ({ ...currState, [name]: !currState[name] }));

    return setFormInputs({ ...formInputs, [name]: value });
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
      <Columns.Column>
        <Form.Label>Recurring Meeting?</Form.Label>
        <Form.Control>
          <Form.Radio
            value='true'
            name='recurringMeeting'
            checked={recurringMeeting}
            onChange={() => null}
            onClick={handleInputChange}
          >
            Yes
          </Form.Radio>
          <Form.Radio
            value='false'
            name='recurringMeeting'
            checked={!recurringMeeting}
            onChange={() => null}
            onClick={handleInputChange}
          >
            No
          </Form.Radio>
        </Form.Control>
      </Columns.Column>
    </Columns>
  );
};
export default AddMeetingForm;

AddMeetingForm.propTypes = addMeetingFormPropTypes;
