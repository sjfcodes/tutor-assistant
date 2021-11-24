import React from 'react'
import { Content } from 'react-bulma-components';
import { Header } from '..';

export const Footer = () => {
    return (
		<Header className="has-background-white-bis">
			<Content className="has-text-centered p-3">
				<p>
					<a
						href="https://github.com/samuelfox1/tutor-assistant-api"
						className="has-text-weight-bold ">
						Tutor Helper
					</a>{" "}
					by{" "}
					<a
						className="has-text-black has-text-weight-bold"
						href="https://github.com/samuelfox1">
						Samuel Fox{" "}
					</a>{" "}
					and
					<a
						className="has-text-black has-text-weight-bold"
						href="https://github.com/Tuzosdaniel12">
						{" "}
						Daniel Soledad{" "}
					</a>
					. The source code is licensed under
					<a
						className="has-text-black has-text-weight-medium"
						href="http://opensource.org/licenses/mit-license.php">
						{" "}
						MIT
					</a>
					.
				</p>
			</Content>
		</Header>
	);
}
