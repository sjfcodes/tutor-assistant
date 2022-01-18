import { string } from 'prop-types';
import React, { useContext, useState } from 'react';
import { Button, Form, Icon } from 'react-bulma-components';
import { AppContext, CourseContext } from '../../../../context';
import { createModel } from '../../../../utils';
import { syncCalendlyResource } from '../../../../utils/api';

const AddAccessToken = ({ courseId, password }) => {
  const { allCourses, setAllCourses } = useContext(CourseContext);
  const { tutorDetails, setTutorDetails } = useContext(AppContext);

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

    let accessToken;
    let data;

    try {
      const { _id } = await createModel(
        {
          model: 'calendly/token',
          body: { ...formInputs, password },
          _id: courseId,
        },
      );
      accessToken = _id;
    } catch (error) {
      // expected case: bad password
      setTutorDetails({
        ...tutorDetails,
        calendly: {
          accessToken: null,
          data: null,
        },
      });
      setHelpText('unauthorized');
      return;
    }

    if (accessToken) try {
      data = await syncCalendlyResource({ body: { password, courseId } });
    } catch (error) {
      // expected case: bad accessToken
      setHelpText('invalid token, try again');
      setColor('danger');
      return;
    }

    setHelpText('');
    setColor('');
    setButtonText('success!');
    setLoading(false);
    setAllCourses({
      ...allCourses,
      [courseId]: {
        ...allCourses[courseId],
        calendly: { accessToken, data },
      },
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Form.Field>
        <Form.Label size='small'>
          create an access token
          {' '}
          <a className='my-5' href='https://calendly.com/integrations/api_webhooks' target='_blank' rel='noreferrer'>here</a>
          {' '}
          and paste it below
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
  courseId: string.isRequired,
  password: string.isRequired,
};
