import { string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Form, Icon,
} from 'react-bulma-components';
import { AppContext } from '../../../../context/AppProvider';
import { createModel } from '../../../../utils';

const AccessToken = ({ password }) => {
  const { tutorDetails, setTutorDetails } = useContext(AppContext);
  const [formInputs, setFormInputs] = useState({ name: 'calendly', token: '' });
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('add/update token');
  const [helpText, setHelpText] = useState('');
  const [color, setColor] = useState('');
  const { token } = formInputs;

  useEffect(() => {
    if (!token) return setColor('');
    return setColor('success');
  }, [token, setColor]);

  const handleFormUpdate = ({ target: { name, value } }) => {
    if (helpText) setHelpText('');
    setFormInputs({ ...formInputs, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log({ ...formInputs, password });
      const response = await createModel('access-token', { ...formInputs, password });
      if (response._id) setTutorDetails({
        ...tutorDetails,
        accessTokens: [
          ...tutorDetails.accessTokens,
          response._id,
        ],
      });
      setButtonText('success!');
    } catch (error) {
      console.warn(error);
      setHelpText('try again');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Form.Field>
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
          <Form.Help>{helpText}</Form.Help>
        </Form.Control>
      </Form.Field>
    </form>

  );
};
export default AccessToken;

AccessToken.propTypes = {
  password: string.isRequired,
};
