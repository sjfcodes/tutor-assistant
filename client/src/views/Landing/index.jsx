import React, { useState } from 'react';
import { Box, Tabs } from 'react-bulma-components';
import { LoginForm, SignupForm } from '../../components/Forms';

const { Tab } = Tabs;

const Landing = () => {
  const LOGIN_TAB = 'login';
  const SIGNUP_TAB = 'signup';
  const [form, setForm] = useState(LOGIN_TAB);

  const getLabelClassName = (component) => ((component !== form) ? 'has-text-grey-lighter' : '');

  return (

    <>
      <Tabs type='boxed' align='left' className=' mb-0 pt-3 pl-2'>
        <Tab
          active={form === LOGIN_TAB}
          onClick={() => setForm(LOGIN_TAB)}
        >
          <strong className={getLabelClassName(LOGIN_TAB)}>Login</strong>
        </Tab>
        <Tab
          className='rounded-tr '
          active={form === SIGNUP_TAB}
          onClick={() => setForm(SIGNUP_TAB)}
        >
          <strong className={getLabelClassName(SIGNUP_TAB)}>Signup</strong>
        </Tab>
      </Tabs>
      <Box className='rounded'>
        {form === LOGIN_TAB && <LoginForm />}
        {form === SIGNUP_TAB && <SignupForm />}
      </Box>
    </>
  );
};
export default Landing;
