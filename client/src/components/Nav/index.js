import React from 'react'
import { Navbar } from "react-bulma-components";
const { Brand, Item, Container, Burger, Menu } = Navbar;

export const Nav = () => {
    return (
		<Navbar>
			<Brand>
				<Item href="/">
					<img
						alt="tutor app"
						height="50"
						src="https://rethink.vc/wp-content/uploads/2017/08/trilogy-logo.png"
					/>
				</Item>
				<Burger />
			</Brand>
			<Menu className="navbar-end is-flex-grow-0" align="end">
				<Container>
					<Item size="small" className="is-Nav-links">
						Login
					</Item>
					<Item size="small" className="is-Nav-links">
						Signup
					</Item>
				</Container>
			</Menu>
		</Navbar>
	);
}

