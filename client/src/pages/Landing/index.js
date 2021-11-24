import React, { useState } from 'react';
import { Box, Columns, Tabs } from 'react-bulma-components';
import { LoginForm, SignupForm } from '../../components';

const { Column } = Columns

export const Landing = () => {

	const [form, setForm] = useState('login')

	return (
		<Columns>
			<Column size={8} offset={2}>
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
			</Column>
		</Columns>

	);
}