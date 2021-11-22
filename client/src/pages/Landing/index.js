import React, { useContext } from 'react';
import { FullWidthBody } from "../../components"
import { AppContext } from '../../Context/AppProvider';


export const Landing = () => {

	const { AppComponent } = useContext(AppContext)

	return (
		<FullWidthBody>
			{AppComponent}
		</FullWidthBody>
	);
}