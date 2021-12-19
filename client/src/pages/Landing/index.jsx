import React, { useState } from 'react';
import { Box, Section, Tabs } from 'react-bulma-components';
import { LoginForm, SignupForm } from '../../components/Forms';

const { Tab } = Tabs;

const Landing = () => {
  const [form, setForm] = useState('login');

  return (
    <Section className='p-3'>
      <Box className='background-clear mb-0 p-0'>
        <Tabs type='boxed' align='right' className='mb-0'>
          <Tab
            className={form !== 'login' && 'has-text-white'}
            active={form === 'login'}
            onClick={() => setForm('login')}
          >
            login
          </Tab>
          <Tab
            className={form !== 'signup' && 'has-text-white'}
            active={form === 'signup'}
            onClick={() => setForm('signup')}
          >
            signup
          </Tab>
        </Tabs>
      </Box>
      <Box className='rounded'>
        {form === 'login' && <LoginForm />}
        {form === 'signup' && <SignupForm />}
      </Box>
    </Section>
  );
};
export default Landing;
