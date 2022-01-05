import React, { useState } from 'react';
import { Box, Tabs } from 'react-bulma-components';
import { LoginForm, SignupForm } from '../../components/Forms';

const { Tab } = Tabs;

const Landing = () => {
  const [form, setForm] = useState('login');

  return (

    <Box className='background-blurred-dark pt-1'>
      <Tabs type='boxed' align='left' className=' mb-0 pt-3 pl-2'>
        <Tab
          className={form !== 'login' ? 'has-text-white' : ''}
          active={form === 'login'}
          onClick={() => setForm('login')}
        >
          <strong className={`py-2 ${form !== 'login' ? 'has-text-grey-lighter' : ''}`}>Login</strong>
        </Tab>
        <Tab
          className='rounded-tr'
          active={form === 'signup'}
          onClick={() => setForm('signup')}
        >
          <strong className={`py-2 ${form !== 'signup' ? 'has-text-grey-lighter' : ''}`}>Signup</strong>
        </Tab>
      </Tabs>
      <Box className='rounded'>
        {form === 'login' && <LoginForm />}
        {form === 'signup' && <SignupForm />}
      </Box>
    </Box>
  );
};
export default Landing;
