import { string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Form, Icon,
} from 'react-bulma-components';
import { AppContext, CourseContext } from '../../../../context';
import { createModel } from '../../../../utils';

const AccessToken = ({ password }) => {
  const { tutorDetails, setTutorDetails } = useContext(AppContext);
  // eslint-disable-next-line no-unused-vars
  const { allCourses, selectedCourse } = useContext(CourseContext);

  const [formInputs, setFormInputs] = useState({ token: '' });
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
      const response = await createModel(
        {
          model: 'access-token',
          body: { ...formInputs, password },
          _id: selectedCourse,
        },
      );
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
