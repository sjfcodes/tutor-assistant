import React from 'react'
import { Navbar } from "react-bulma-components";

import { NavButtons } from './NavButtons';

const { Brand, Item } = Navbar;

export const Nav = () => {

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
			<NavButtons />
		</Navbar >
	);
}