import { string } from 'prop-types';
import React, { useContext, useState } from 'react';
import {
  Box, Button, Content, Form, Heading, Icon, Level,
} from 'react-bulma-components';
import { CourseContext } from '../../../../context';
import { passwordIsValid } from '../../../../utils';
import InputPassword from '../../../Forms/InputPassword';

import AddAccessToken from './AddAccessToken';
import DeleteAccessToken from './DeleteAccessToken';
import SyncCalendlyDetails from './SyncCalendlyDetails';
// import SyncCalendly from './SyncCalendly';

const CalendlyAccess = ({ courseId }) => {
  const { allCourses } = useContext(CourseContext);
  const { calendly: { accessToken } } = allCourses[courseId];

  const [password, setPassword] = useState('');
  const [display, setDisplay] = useState(!accessToken ? 'addNew' : 'makeDecision');
  const [displayCalendly, setDisplayCalendly] = useState(false);

  const toggleViewAccess = () => (
    setDisplayCalendly((curr) => !curr)
  );

  const getDeleteButton = () => {
    if (!accessToken) return '';
    return <DeleteAccessToken />;
  };

  const getFieldToDisplay = () => {
    const layoutTo = {
      addNew: (
        <AddAccessToken
          courseId={courseId}
          password={password}
          setPassword={setPassword}
        />
      ),
      makeDecision: (
        <>
          <Button
            fullwidth
            className='mb-3'
            color='success'
            onClick={() => setDisplay('addNew')}
          >
            create new connection
          </Button>
          <Button
            fullwidth
            color='primary'
            onClick={() => setDisplay('syncExisting')}
          >
            re-sync current connection
          </Button>
        </>
      ),
      syncExisting: (
        <SyncCalendlyDetails
          password={password}
          courseId={courseId}
        />
      ),
    };
    return layoutTo[display] || '';
  };

  if (!displayCalendly) return (
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
            <i className={`fas fa-chevron-${displayCalendly ? 'up' : 'down'}`} />
          </Icon>
        </Level.Side>
      </Level>
    </Box>
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
            <i className={`fas fa-chevron-${displayCalendly ? 'up' : 'down'}`} />
          </Icon>
        </Level.Side>
      </Level>
      <Content className='border-bottom pb-3 mb-4'>
        <Form.Field>
          {display === 'makeDecision'
            ? ''
            : (
              <>
                <Form.Label size='small'>enter tutorly password</Form.Label>
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
              </>
            )}
          {getFieldToDisplay()}
        </Form.Field>
      </Content>
      {getDeleteButton()}
    </Box>
  );
};
export default CalendlyAccess;

CalendlyAccess.propTypes = {
  courseId: string.isRequired,
};
