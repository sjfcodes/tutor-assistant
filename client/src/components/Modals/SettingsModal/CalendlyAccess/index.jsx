import { func, string } from 'prop-types';
import React, { useContext, useState } from 'react';
import {
  Box, Content, Form, Heading, Icon, Level,
} from 'react-bulma-components';
import { CourseContext } from '../../../../context';
import { passwordIsValid } from '../../../../utils';
import InputPassword from '../../../Forms/InputPassword';

import AccessToken from './AccessToken';
import DeleteAccessToken from './DeleteAccessToken';
// import SyncCalendly from './SyncCalendly';

const CalendlyAccess = ({ courseId, selectedCalendlyAccess, setSelectedCalendlyAccess }) => {
  const [password, setPassword] = useState('');
  const { allCourses } = useContext(CourseContext);
  const { calendly: { accessToken } } = allCourses[courseId];

  const toggleViewAccess = () => (
    selectedCalendlyAccess === courseId
      ? setSelectedCalendlyAccess('')
      : setSelectedCalendlyAccess(courseId)
  );

  return (
    <Box className='p-3 border'>
      <Level
        className='is-mobile'
        onClick={toggleViewAccess}

      >
        <Level.Side>
          <Heading
            size={5}
          >
            Calendly Access
          </Heading>
        </Level.Side>
        <Level.Side>
          <Icon className='mr-2'>
            <i className={`fas fa-chevron-${selectedCalendlyAccess === courseId ? 'up' : 'down'}`} />
          </Icon>
        </Level.Side>
      </Level>
      {
        selectedCalendlyAccess === courseId
        && (
          <>
            <Content className='border-bottom pb-3 mb-4'>
              enter tutorly password
              <form onSubmit={(e) => e.preventDefault()}>
                <Form.Field>
                  <Form.Control fullwidth>
                    <InputPassword
                      fullwidth
                      name='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      validation={() => passwordIsValid(password)}
                    />
                    <Icon align='left' size='small'>
                      <i className='fas fa-user-shield' />
                    </Icon>
                  </Form.Control>
                </Form.Field>
              </form>
              <a className='my-5' href='https://calendly.com/integrations/api_webhooks' target='_blank' rel='noreferrer'>create a calendly access token</a>
              <p>add/update access token</p>
              <AccessToken
                courseId={courseId}
                password={password}
                setPassword={setPassword}
              />
              {/*
                <p>sync with calendly</p>
                <SyncCalendly password={password} /> */}
            </Content>
            {accessToken && <DeleteAccessToken />}
          </>
        )
      }
    </Box>
  );
};
export default CalendlyAccess;

CalendlyAccess.propTypes = {
  courseId: string.isRequired,
  selectedCalendlyAccess: string.isRequired,
  setSelectedCalendlyAccess: func.isRequired,
};
