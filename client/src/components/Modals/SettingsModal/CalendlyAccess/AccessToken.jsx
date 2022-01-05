import { string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Form, Icon,
} from 'react-bulma-components';
import { CourseContext } from '../../../../context';
import { createModel } from '../../../../utils';
import { syncCalendlyResource } from '../../../../utils/api';

const AccessToken = ({ courseId, password }) => {
  // eslint-disable-next-line no-unused-vars
  const { allCourses, setAllCourses } = useContext(CourseContext);

  const [formInputs, setFormInputs] = useState({ token: '' });
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('add/update access');
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

    let accessToken;
    let data;

    try {
      const { _id } = await createModel(
        {
          model: 'access-token',
          body: { ...formInputs, password },
          _id: courseId,
        },
      );
      accessToken = _id;
    } catch (error) {
      // expected case: bad password
      setHelpText('unauthorized');
    }

    if (accessToken) try {
      data = await syncCalendlyResource({ body: { password, courseId } });
    } catch (error) {
      // expected case: bad accessToken
      setHelpText('invalid token, try again');
    }

    if (accessToken && data) {
      setAllCourses({
        ...allCourses,
        [courseId]: {
          ...allCourses[courseId],
          calendly: { accessToken, data },
        },
      });
      setHelpText('');
      setButtonText('success!');
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
          <Form.Help color='danger'>{helpText}</Form.Help>
        </Form.Control>
      </Form.Field>
    </form>

  );
};
export default AccessToken;

AccessToken.propTypes = {
  courseId: string.isRequired,
  password: string.isRequired,
};
