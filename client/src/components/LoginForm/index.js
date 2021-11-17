import React, { useContext, useState } from 'react'
import { Form, Icon, Button, Container } from 'react-bulma-components'
import { AppContext } from '../../Context/AppProvider'
import { loginWithPassword } from '../../hooks'

export const LoginForm = () => {

    const [inputs, setInputs] = useState({
        email: 'sam@email.com',
        password: 'password'
    })

    const { setTutorDetails, updateAppComponent } = useContext(AppContext)

    const handleInputChange = (e) => {
        const { target: { name, value } } = e
        setInputs({ ...inputs, [name]: value })
    }

    const handleLogin = async () => {
        try {
            const tutor = await loginWithPassword(inputs)
            if (!tutor) return
            setTutorDetails({ ...tutor, loggedIn: true })
            updateAppComponent('home')
        } catch (error) {
            // login failed
            console.error('login failed')
        }
    }
    return (
        <Container>
            <Form.Field>
                <Form.Label>Name</Form.Label>
                <Form.Control>
                    <Form.Input placeholder="Username" name="email" value={inputs.email} onChange={handleInputChange} />
                    <Icon align="left">
                        <i className="github" />
                    </Icon>
                </Form.Control>
            </Form.Field>
            <Form.Field>
                <Form.Label>Password</Form.Label>
                <Form.Control>
                    <Form.Input placeholder="Password" name="password" type="password" value={inputs.password} onChange={handleInputChange} />
                    <Icon align="left">
                        <i className="github" />
                    </Icon>
                </Form.Control>
            </Form.Field>
            <Button.Group>
                <Button fullwidth rounded color="primary" onClick={handleLogin}>Login</Button>
            </Button.Group>
        </Container>
    )
}
