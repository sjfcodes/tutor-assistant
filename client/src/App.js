import React, { useEffect, useContext } from "react";
import { Home, Landing } from "./pages";
import {
	Routes,
	Route,
	useNavigate
} from "react-router-dom";
import "./App.sass";
import { Nav } from "./components";
import { AppContext } from "./Context/AppProvider";

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
			<Nav />

			<Routes>
				<Route path='/:tutor' element={<Home />} />
				<Route path='/' element={<Landing />} />
			</Routes>

		</>
	);
}

export default App;
