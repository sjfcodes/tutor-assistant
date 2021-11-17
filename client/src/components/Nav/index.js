import React, { useContext } from 'react'
import { Navbar, Button } from "react-bulma-components";
import { AppContext } from '../../Context/AppProvider';
import { tokenKey } from '../../hooks/config';
const { Brand,
	Item,
	Container,
} = Navbar;

export const Nav = () => {
	const { tutorDetails, setTutorDetails, updateAppComponent } = useContext(AppContext)
	const { loggedIn } = tutorDetails

	const handleLogout = () => {
		setTutorDetails({ loggedIn: false })
		localStorage.removeItem(tokenKey)
		updateAppComponent(null)
	}

	return (
		<Navbar className="is-flex is-justify-content-space-between is-align-items-center">
			<Brand>
				<Item href="/">
					<img
						alt="tutor app"
						height="50"
						src="https://rethink.vc/wp-content/uploads/2017/08/trilogy-logo.png"
					/>
				</Item>
			</Brand>
			<Container align="end">
				{!loggedIn
					? <>
						< Button
							size="small"
							color="primary"
							onClick={() => updateAppComponent('login')}
						>
							Login
						</Button>
						<Button
							size="small"
							color="primary"
							onClick={() => updateAppComponent('signup')}
						>
							signup
						</Button>
					</>
					: < Button
						size="small"
						color="primary"
						onClick={handleLogout}
					>
						Logout
					</Button>
				}
			</Container>
		</Navbar >
	);
}

