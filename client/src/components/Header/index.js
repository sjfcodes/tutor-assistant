import React from 'react'
import { Container, Hero } from "react-bulma-components";
const { Body: HeroBody } = Hero;
export const Header = ({ children, className }) => {
	return (
		<Hero size="small" className={className}>
			<HeroBody>
				<Container>{children}</Container>
			</HeroBody>
		</Hero>
	);
};


