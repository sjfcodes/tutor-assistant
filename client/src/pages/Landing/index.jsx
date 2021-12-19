import React, { useState } from 'react';
import { Box, Tabs } from 'react-bulma-components';
import { LoginForm, SignupForm } from '../../components/Forms';

const { Tab } = Tabs;

const Landing = () => {
  const [form, setForm] = useState('login');

  return (

    <Box className='background-dark-blurred pt-1'>
      <Tabs type='boxed' align='right' className=' mb-0 pt-3 pr-2'>
        <Tab
          className={form !== 'login' && 'has-text-white'}
          active={form === 'login'}
          onClick={() => setForm('login')}
        >
          login
        </Tab>
        <Tab
          className={`rounded-tr ${form !== 'signup' && 'has-text-white'}`}
          active={form === 'signup'}
          onClick={() => setForm('signup')}
        >
          signup
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
