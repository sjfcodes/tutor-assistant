import React, { useContext } from 'react';
import { AppContext } from '../../Context/AppProvider';


export const Landing = () => {

	const { AppComponent } = useContext(AppContext)

	return (
		<>
			{AppComponent}
		</>
	);
}