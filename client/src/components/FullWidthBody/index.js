import React from 'react'
import {Hero } from "react-bulma-components";
const { Header: HeroHeader, Footer: HeroFooter, Body: HeroBody } = Hero;
export const FullWidthBody = ({ children }) => {
	return (
		<Hero size="fullheight" className="is-background">
            <div className="is-overlay" style={{ backgroundImage: "url(/images/bg-image.jpg)", opacity: .35, backgroundSize: "cover", backgroundPosition: "center" }}>
                <HeroBody>
                    {children}
                </HeroBody>
            </div>
		</Hero>
	);
};
