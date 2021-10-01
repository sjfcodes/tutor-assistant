import React from 'react'
import {Hero } from "react-bulma-components";
const { Body: HeroBody } = Hero;
export const FullWidthBody = ({children}) => {
	return (
		<Hero size="fullheight" className="is-background is-relative">
			<HeroBody>{children}</HeroBody>
		</Hero>
	);
};
