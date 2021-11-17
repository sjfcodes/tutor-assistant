import React, { useContext } from 'react';
import { FullWidthBody, Header, Nav } from "../../components"
import { AppContext } from '../../Context/AppProvider';


const Landing = () => {

	const { AppComponent } = useContext(AppContext)

	return (
		<div>
			<Header>
				<Nav />
			</Header>
			<FullWidthBody>
				{AppComponent}
			</FullWidthBody>
		</div>
	);
}

export default Landing;