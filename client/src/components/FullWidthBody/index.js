import React from 'react'
import {Hero } from "react-bulma-components";
const { Body: HeroBody } = Hero;
export const FullWidthBody = ({ children, imgUrl }) => {
	return (
		<Hero size="fullheight" className="is-background is-relative">
			{imgUrl ? (
				<div
					className="is-overlay"
					style={{
						backgroundImage: imgUrl,
						opacity: 0.35,
						backgroundSize: "cover",
						backgroundPosition: "center"
					}}></div>
			) : null}
			<HeroBody>{children}</HeroBody>
		</Hero>
	);
};
