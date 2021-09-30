import React from 'react'
import { Container, Hero } from "react-bulma-components";
const { Header: HeroHeader, Footer: HeroFooter, Body: HeroBody } = Hero;
export const Header = ({children, header,footer}, props) => {
    console.log(Hero)
    return (
		<Hero size="small"{...props}>
			{header ? <HeroHeader>{header}</HeroHeader> : null}
			<HeroBody>
				<Container>{children}</Container>
			</HeroBody>
			{footer ? <HeroFooter>{footer}</HeroFooter> : null}
		</Hero>
	);
}


