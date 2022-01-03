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
            <Box>
              <Content>
                <ol>
                  <li>
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
                  </li>
                  <li className='my-5'>
                    <a href='https://calendly.com/integrations/api_webhooks' target='_blank' rel='noreferrer'>create a calendly access token</a>
                  </li>
                  <li>
                    add/update access token
                    <AccessToken
                      courseId={courseId}
                      password={password}
                      setPassword={setPassword}
                    />
                  </li>
                  {/* <li>
              sync with calendly
              <SyncCalendly password={password} />
            </li> */}
                </ol>
              </Content>
            </Box>
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
