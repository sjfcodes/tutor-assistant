import React from 'react';
import { Container, Heading } from 'react-bulma-components';
import { Footer, FullWidthBody, Header, Nav } from "../../components"


const Landing = () => {
    return (
		<div>
			<Header>
				<Nav />
			</Header>
			<FullWidthBody imgUrl="url(/images/bg-image.jpg)">
				<Container className="has-text-centered">
					<Heading className="has-text-link-dark is-main-heading">
						The Tutor Helper
					</Heading>
					<Heading size={4} subtitle>
						A tool to helps tutors Manage emails.
					</Heading>
					<figure class="image is-one-fifth is-128x128 m-auto">
						<img
							alt="tutor app"
							className=""
							src="https://rethink.vc/wp-content/uploads/2017/08/trilogy-logo.png"
						/>
					</figure>
				</Container>
			</FullWidthBody>
			<Footer />
		</div>
	);
}

export default Landing;