import { useState } from 'react';
import { Box, Section, Tabs } from 'react-bulma-components';
import { LoginForm, SignupForm } from '../../components/Forms';

const { Tab } = Tabs;

const Landing = () => {
  const [form, setForm] = useState('login');

  return (
    <Section className="mx-3 py-5 ">
      <Box className="background-dark-blurred">
        <Tabs type="boxed">
          <Tab active={form === 'login'} onClick={() => setForm('login')}>
            login
          </Tab>
          <Tab active={form === 'signup'} onClick={() => setForm('signup')}>
            signup
          </Tab>
        </Tabs>
        {form === 'login' && <LoginForm />}
        {form === 'signup' && <SignupForm />}
      </Box>
    </Section>
  );
};
export default Landing;
