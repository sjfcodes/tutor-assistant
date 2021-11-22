import React, { useContext } from 'react'
import { Navbar, Dropdown, Icon } from "react-bulma-components";
import { AppContext } from '../../Context/AppProvider';

import { NavButtons } from './NavButtons';

const { Brand, Item: NavbarItem, Burger, Menu: NavbarMenu, Container } = Navbar;
const { Item: DropdownItem } = Dropdown

export const Nav = () => {

	const { tutorDetails: { loggedIn, firstName } } = useContext(AppContext)

	const toggleMenu = () => {
		const el = document.getElementById('nav-burger')
		const el2 = document.getElementById('nav-menu')
		el.classList.toggle('is-active')
		el2.classList.toggle('is-active')
	}

	return (
		// <Navbar className="is-flex is-justify-content-space-between is-align-items-center">
		// 	<Brand>
		// 		<NavbarItem href="/">
		// <img
		// 	alt="tutor app"
		// 	height="50"
		// 	src="https://rethink.vc/wp-content/uploads/2017/08/trilogy-logo.png"
		// />
		// 		</NavbarItem>
		// 	</Brand>
		// 	<NavButtons />
		// </Navbar >
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
								src="https://i.imgur.com/WGeUGOp.jpg"
							/>
						</NavbarItem>
						<NavbarItem className='pl-0'>
							<p>{firstName}</p>
						</NavbarItem>
					</>
				}
				<Burger id='nav-burger' onClick={toggleMenu} />
			</Brand>
			<NavbarMenu id='nav-menu'>
				<Container align="right">
					{/* <NavbarItem>
						<Dropdown
							closeOnSelect={false}
							color=""
							icon={<Icon><i aria-hidden="true" className="fas fa-angle-down" /></Icon>}
							label="..."
						>
							<DropdownItem
								renderAs="a"
								value="item"
							>
								Dropdown item
							</DropdownItem>
							<DropdownItem
								renderAs="a"
								value="other"
							>
								Other Dropdown item
							</DropdownItem>
							<DropdownItem
								renderAs="a"
								value="active"
							>
								Active Dropdown item
							</DropdownItem>
							<DropdownItem
								renderAs="a"
								value="other 2"
							>
								Other Dropdown item
							</DropdownItem>
							<Dropdown.Divider />
							<DropdownItem
								renderAs="a"
								value="divider"
							>
								After divider
							</DropdownItem>
						</Dropdown>
					</NavbarItem> */}
					<NavbarItem>
						<NavButtons />
					</NavbarItem>
				</Container>
			</NavbarMenu>
		</Navbar>
	);
}