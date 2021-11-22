import React, { useEffect, useContext } from "react";
import { Home, Landing } from "./pages";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate
} from "react-router-dom";
import "./App.sass";
import { FullWidthBody, Header, Nav } from "./components";
import { AppContext } from "./Context/AppProvider";

const App = () => {

	const nav = useNavigate()
	const { tutorDetails } = useContext(AppContext)
	const { loggedIn, gitHubUsername } = tutorDetails

	useEffect(() => {
		if (!loggedIn) return
		nav(`/${gitHubUsername}`)

	}, [loggedIn, gitHubUsername, nav, tutorDetails])


	return (
		<>
			<Header>
				<Nav />
			</Header>

			<Routes>
				<Route path='/:tutor' element={<Home />} />
				<Route path='/' element={<Landing />} />
			</Routes>

		</>
	);
}

export default App;
