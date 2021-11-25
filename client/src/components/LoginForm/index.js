import React, { useContext, useState } from 'react'
import { Form, Icon, Button } from 'react-bulma-components'
import { AppContext } from '../../Context/AppProvider'
import { loginWithPassword } from '../../utils'

const { Field, Label, Control, Input } = Form


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

    const handleLogin = async (e) => {
        e.preventDefault()
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
        <form>
            <Field>
                <Label>Email</Label>
                <Control>
                    <Input
                        placeholder="Username"
                        type="text"
                        name="email"
                        value={inputs.email}
                        onChange={handleInputChange}
                    />
                    <Icon align="left">
                        <i className="fas fa-at"></i>
                    </Icon>
                </Control>
            </Field>
            <Field>
                <Label>Password</Label>
                <Control>
                    <Input placeholder="Password" name="password" type="password" value={inputs.password} onChange={handleInputChange} />
                    <Icon align="left">
                        <i className="fas fa-fingerprint"></i>
                    </Icon>
                </Control>
            </Field>
            <Button.Group>
                <Button
                    className='mt-5'
                    fullwidth
                    rounded
                    color="primary"
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </Button.Group>
        </form>
    )
}
