import React, { useState } from 'react';
import { Box, Section, Tabs } from 'react-bulma-components';
import { LoginForm, SignupForm } from '../../components';


export const Landing = () => {

	const [form, setForm] = useState('login')

	return (
		<Section className=''>
			<Box className='has-background-grey-lighter m-3'>
				<Tabs>
					<Tabs.Tab
						active={form === 'login'}
						onClick={() => setForm('login')}
					>
						login
					</Tabs.Tab>
					<Tabs.Tab
						active={form === 'signup'}
						onClick={() => setForm('signup')}
					>
						signup
					</Tabs.Tab>
				</Tabs>
				{form === 'login' && <LoginForm />}
				{form === 'signup' && <SignupForm />}
			</Box>
		</Section>
	);
}