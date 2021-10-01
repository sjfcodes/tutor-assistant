import React from 'react';
import { Button, Container, Heading } from 'react-bulma-components';
import { Footer, FullWidthBody, Header, Nav } from "../../components"


const Landing = () => {
    return (
		<div className="is-relative">
			<div
				className="is-overlay"
				style={{
					backgroundImage: "url(/images/bg-image.jpg)",
					opacity: 0.35,
					backgroundSize: "cover",
					backgroundPosition: "center"
				}}></div>

			<Header>
				<Nav />
			</Header>
			<FullWidthBody>
				<Container className="has-text-centered">
					<Heading className="has-text-link-dark is-main-heading">
						Tutor Helper
					</Heading>
					<Heading size={4} subtitle>
						A tool to help tutors manage emails.
					</Heading>
					<figure class="image is-one-fifth is-135x135 m-auto">
						<img
							alt="tutor app"
							className=""
							src="https://rethink.vc/wp-content/uploads/2017/08/trilogy-logo.png"
						/>
						<span>
							<Button className="button is-small is-Heading-links">
								Login
							</Button>
							<Button className="button is-small is-Heading-links">
								Sign up
							</Button>
						</span>
					</figure>
				</Container>
			</FullWidthBody>
			<Footer />
		</div>
	);
}

export default Landing;