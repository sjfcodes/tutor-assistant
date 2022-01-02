import React, { useContext, useState } from 'react';
import {
  Box, Content, Form, Heading, Icon,
} from 'react-bulma-components';
import { AppContext } from '../../../../context/AppProvider';
import { passwordIsValid } from '../../../../utils';
import InputPassword from '../../../Forms/InputPassword';

import AccessToken from './AccessToken';
import DeleteAccessToken from './DeleteAccessToken';
import SyncCalendly from './SyncCalendly';

const CalendlyAccess = () => {
  const [password, setPassword] = useState('');
  const { tutorDetails: { accessTokens: { calendly } } } = useContext(AppContext);

  return (
    <>
      <Box className='p-3 border'>
        <Heading
          size={4}
        >
          Manage Calendly Access
        </Heading>
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
            <li>
              <a href='https://calendly.com/integrations/api_webhooks' target='_blank' rel='noreferrer'>create a calendly access token</a>
            </li>
            <li>
              add/update access token
              <AccessToken
                password={password}
                setPassword={setPassword}
              />
            </li>
            <li>
              sync with calendly
              <SyncCalendly password={password} />
            </li>
          </ol>
        </Content>
      </Box>
      {calendly && <DeleteAccessToken />}
    </>
  );
};
export default CalendlyAccess;
