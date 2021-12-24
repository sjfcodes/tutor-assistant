import React, { useState } from 'react';
import {
  Box, Content, Form, Heading,
} from 'react-bulma-components';
import InputPassword from '../../../Forms/InputPassword';

import AccessToken from './AccessToken';
import SyncCalendly from './SyncCalendly';

const CalendlySettings = () => {
  const [password, setPassword] = useState('');

  return (
    <Box className='p-3'>
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
                <InputPassword
                  fullwidth
                  name='password'
                  value={password}
                  handleFormUpdate={(e) => setPassword(e.target.value)}
                />
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
  );
};
export default CalendlySettings;
