import React from "react";
import { Icon, Button, Form as BulmaForm, Box } from "react-bulma-components";


const { Input, Field, Control, Label, Help } = BulmaForm;

export const Form = () => {
	return (
		<Box style={{ width: "50%", margin: "auto" }}>
			<form>
				<Field>
					<Label>Name</Label>
					<Control>
						<Input placeholder="Username" />
						<Icon align="left">
							<i className="github" />
						</Icon>
					</Control>
				</Field>
				<Field>
					<Label>Password</Label>
					<Control>
						<Input placeholder="Password" name="password" />
						<Icon align="left">
							<i className="github" />
						</Icon>
					</Control>
				</Field>
				<Button
					rounded
					color="primary"
					size="medium"
					className="is-small"
					onClick={() => console.log("hello")}>
					Login
				</Button>
			</form>
		</Box>
	);
};


