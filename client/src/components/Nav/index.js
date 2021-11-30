import React, { useContext, useEffect } from 'react'
import { Button, Level, Navbar } from "react-bulma-components";

import { AppContext } from '../../context0';
import { logoutTutor } from '../../utils';
import { Settings } from '../Modals';
import './style.css'

const { Brand, Item: NavbarItem, Burger, Menu: NavbarMenu } = Navbar;


export const Nav = () => {

	const { tutorDetails, AppComponent, setOpenModal, openModal } = useContext(AppContext)
	const { loggedIn, firstName } = tutorDetails


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
	}, [AppComponent, openModal])

	return (
		<Navbar>
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
								onClick={() => console.log(tutorDetails)}
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

				{loggedIn &&
					<Level renderAs='div' >
						<Level.Side align='left'>

						</Level.Side>
						<Level.Side align='right'>
							<Button.Group>
								< Button
									size="small"
									color="warning"
									outlined
									className='is-light'
									onClick={logoutTutor}
								>
									Logout
								</Button>
								< Button
									size="small"
									color="info"
									outlined
									className='is-light'
									onClick={() => setOpenModal('settings')}
								>
									Settings
								</Button>
							</Button.Group>
						</Level.Side>
						<Settings />
					</Level>
				}
			</NavbarMenu>
		</Navbar>

	);
}