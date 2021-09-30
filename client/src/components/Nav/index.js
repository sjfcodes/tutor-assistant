import React from 'react'
import { Navbar } from "react-bulma-components";
const { Brand,
        Item,
        Burger,
        Menu,
        Container,
        Link,
        Dropdown,
        Divider } = Navbar;

export const Nav = () => {
    return (
		<Navbar>
			<Brand>
				<Item href="#">
					<img
						alt="tutor app"
						height="50"
						src="https://rethink.vc/wp-content/uploads/2017/08/trilogy-logo.png"
						width="112"
					/>
				</Item>
				<Burger />
			</Brand>
			<Menu>
				<Container>
					<Item href="#">
						<Link>First</Link>
						<Dropdown>
							<Item href="#">Subitem 1</Item>
							<Item href="#">Subitem 2</Item>
							<Divider />
							<Item href="#">After divider</Item>
						</Dropdown>
					</Item>
					<Item href="#">Second</Item>
				</Container>
				<Container align="end">
					<Item href="#">At the end</Item>
				</Container>
			</Menu>
		</Navbar>
	);
}

