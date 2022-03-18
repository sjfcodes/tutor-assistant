import { string } from 'prop-types';
import React, { useState } from 'react';
import { Button, Form, Icon } from 'react-bulma-components';
import { useDispatch } from 'react-redux';
import { UPDATE_TUTOR_DETAIL } from '../../../../../store/tutor/actions';
import { createModel } from '../../../../../utils';

const AddAccessToken = ({ password }) => {
  const dispatch = useDispatch();

  const [formInputs, setFormInputs] = useState({ token: '' });
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('add/update access');
  const [helpText, setHelpText] = useState('');
  const [color, setColor] = useState('');
  const { token } = formInputs;

  const handleFormUpdate = ({ target: { name, value } }) => {
    if (helpText) setHelpText('');
    setFormInputs({ ...formInputs, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { _id: accessToken } = await createModel({
        model: 'sendgrid/add-token',
        body: { ...formInputs, password },
      });
      setHelpText('');
      setColor('');
      setButtonText('success!');
      dispatch({
        type: UPDATE_TUTOR_DETAIL,
        payload: {
          sendGrid: { accessToken },
        },
      });
    } catch (error) {
      // expected case: bad password
      dispatch({
        type: UPDATE_TUTOR_DETAIL,
        payload: {
          sendGrid: { accessToken: null },
        },
      });

      setHelpText('unauthorized');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Form.Field>
        <Form.Label size='small'>
          follow the steps to signup and create a SendGrid API key
          {' '}
          <a className='my-5' href='https://docs.sendgrid.com/for-developers/sending-email/quickstart-nodejs' target='_blank' rel='noreferrer'>here</a>
          {' '}
          and paste it below. Note - Tutorly encrypts all access keys for your security.
        </Form.Label>
        <Form.Control fullwidth className>
          <Form.Input
            name='token'
            type='password'
            value={token}
            color={color}
            onChange={handleFormUpdate}
          />
          <Icon align='left' size='small'>
            <i className='fas fa-key' />
          </Icon>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Control>
          <Button
            fullwidth
            color='primary'
            loading={loading}
            disabled={password?.length < 8 || !token}
          >
            {buttonText}
          </Button>
          <Form.Help color='danger'>{helpText}</Form.Help>
        </Form.Control>
      </Form.Field>
    </form>
  );
};
export default AddAccessToken;

AddAccessToken.propTypes = {
  password: string.isRequired,
};
