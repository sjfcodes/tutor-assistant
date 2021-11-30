import React, { useEffect, useContext } from "react";
import { Home, Landing } from "./pages";
import {
	Routes,
	Route,
	useNavigate
} from "react-router-dom";
import "./App.sass";
import { Nav } from "./components";
import { AppContext } from "./context";
import { Footer } from "./components/Footer";
import { Section } from "react-bulma-components";
import { BackgroundImage } from "./components/BackgroundImage";

const App = () => {

	const navigate = useNavigate()
	const { tutorDetails } = useContext(AppContext)
	const { loggedIn, gitHubUsername } = tutorDetails

	useEffect(() => {
		if (!loggedIn) return navigate('/')
		navigate(`/${gitHubUsername}`)

	}, [loggedIn, gitHubUsername, navigate, tutorDetails])



	return (
		<>
			<Section renderAs='header' className='p-0'>
				<Nav />
			</Section>

			<Section renderAs='main' className='p-0'>
				<BackgroundImage url='./images/bg-image.jpg' />
				<Routes>
					<Route path='/:tutor' element={<Home />} />
					<Route path='/' element={<Landing />} />
				</Routes>
			</Section>

			<Footer />
		</>
	);
}

export default App;
