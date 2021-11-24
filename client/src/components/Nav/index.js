import React, { useContext, useEffect } from 'react'
import { Button, Navbar } from "react-bulma-components";

import { AppContext } from '../../Context/AppProvider';
import { logoutTutor } from '../../utils';

const { Brand, Item: NavbarItem, Burger, Menu: NavbarMenu, Container } = Navbar;


export const Nav = () => {

	const { tutorDetails: { loggedIn, firstName }, AppComponent } = useContext(AppContext)

	const toggleNavBurger = (forceClose = false) => {
		const navBurger = document.getElementById('nav-burger')
		const navMenu = document.getElementById('nav-menu')

		if (forceClose) {
			navBurger.classList.remove('is-active')
			navMenu.classList.remove('is-active')
			return
		}

		navBurger.classList.toggle('is-active')
		navMenu.classList.toggle('is-active')
	}

	useEffect(() => {
		toggleNavBurger(true)
	}, [AppComponent])

	return (
		<Navbar className='mb-4'>
			<Brand>
				<NavbarItem href="/">
					<img
						alt="tutor app"
						src="https://rethink.vc/wp-content/uploads/2017/08/trilogy-logo.png"
					/>
				</NavbarItem>
				{loggedIn &&
					<>
						<NavbarItem>
							<img
								className='avatar'
								alt="user avatar"
								// src="https://i.imgur.com/WGeUGOp.jpg"
								src="https://i.imgur.com/zEvf4P4.jpg"
							/>
						</NavbarItem>
						<NavbarItem className='pl-0'>
							{firstName}
						</NavbarItem>
					</>
				}
				<Burger id='nav-burger' onClick={() => toggleNavBurger()} />
			</Brand>
			<NavbarMenu id='nav-menu'>
				<Container align="right">
					<NavbarItem>

						{loggedIn &&
							< Button
								size="small"
								color="warning"
								outlined
								className='is-light'
								onClick={logoutTutor}
							>
								Logout
							</Button>}
					</NavbarItem>
				</Container>
			</NavbarMenu>
		</Navbar>

	);
}