import React, { useState } from 'react';
import {
  Box, Content, Form, Heading, Icon, Level,
} from 'react-bulma-components';
import { useSelector } from 'react-redux';
import { passwordIsValid } from '../../../../../utils';
import InputPassword from '../../../../Forms/InputPassword';
import AddAccessToken from './AddAccessToken';
import DeleteAccessToken from './DeleteAccessToken';

const SendGridAccess = () => {
  const { sendGrid: { accessToken } } = useSelector((state) => state.tutor);
  const [displaySendGrid, setDisplaySendGrid] = useState(false);
  const [password, setPassword] = useState('');

  const toggleViewSendGrid = () => (
    setDisplaySendGrid((curr) => !curr)
  );

  const getDeleteButton = () => {
    if (!accessToken) return '';
    return <DeleteAccessToken />;
  };

  if (!displaySendGrid) return (
    <Box className='p-3 border'>
      <Level
        className='is-mobile'
        onClick={toggleViewSendGrid}
      >
        <Level.Side>
          <Heading
            size={5}
          >
            SendGrid Access
          </Heading>
        </Level.Side>
        <Level.Side>
          <Icon className='mr-2'>
            <i className={`fas fa-chevron-${displaySendGrid ? 'up' : 'down'}`} />
          </Icon>
        </Level.Side>
      </Level>
    </Box>
  );
  return (
    <Box className='p-3 border'>
      <Level
        className='is-mobile'
        onClick={toggleViewSendGrid}
      >
        <Level.Side>
          <Heading
            size={5}
          >
            SendGrid Access
          </Heading>
        </Level.Side>
        <Level.Side>
          <Icon className='mr-2'>
            <i className={`fas fa-chevron-${displaySendGrid ? 'up' : 'down'}`} />
          </Icon>
        </Level.Side>
      </Level>
      <Content className='border-bottom pb-3 mb-4'>
        <Form.Field>
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
          <AddAccessToken
            courseId=''
            password={password}
            setPassword={setPassword}
          />
        </Form.Field>
      </Content>
      {getDeleteButton()}
    </Box>
  );
};

export default SendGridAccess;
