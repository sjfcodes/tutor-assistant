import React from 'react'
import { Navbar, Button } from "react-bulma-components";
const { Brand,
        Item,
        Container,
	} = Navbar;

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
			<Container align="end">
				<Button size="small" color="primary">Login</Button>
			</Container>
		</Navbar>
	);
}

