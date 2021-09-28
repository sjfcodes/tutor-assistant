import React from 'react';
import { Form } from "react-bulma-components"
import Icon from "react-bulma-components";

const Landing = () => {
    return (
		<div>
			<Form.Field>
				<Form.Label>Username</Form.Label>
				<Form.Control>
					<Form.Input
						color="success"
					/>
					<Icon align="left" size="small">
						<i className="fas fa-user" />
					</Icon>
					<Icon align="right" size="small">
						<i className="fas fa-check" />
					</Icon>
				</Form.Control>
				<Form.Help color="success">
					This username is available
				</Form.Help>
			</Form.Field>
		</div>
	);
}

export default Landing;