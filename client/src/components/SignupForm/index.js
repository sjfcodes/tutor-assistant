import React, { useState, useContext } from 'react'
import { AppContext } from '../../Context/AppProvider'
import { signup } from '../../hooks'
import './style.css'

export const SignupForm = () => {

    const [formInputs, setFormInputs] = useState({
        firstName: 'sam',
        lastName: 'fox',
        email: 'sam@email.com',
        timeZone: '',
        gitHubUsername: 'samuelfox1',
        calendlyLink: 'https://www.calendly.com',
        courses: '',
        password: 'password',
        confirmPassword: 'password'
    })
    const { firstName, lastName, email, timeZone, gitHubUsername, calendlyLink, courses, password, confirmPassword } = formInputs
    const { setTutorDetails, updateAppComponent } = useContext(AppContext)

    const handleInputChange = (e) => {
        const { target: { name, value } } = e
        setFormInputs({ ...formInputs, [name]: value })
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            const tutor = await signup(formInputs)
            if (!tutor) return
            setTutorDetails({ ...tutor, loggedIn: true })
            updateAppComponent(null)
        } catch (error) {
            // login failed
            console.error('login failed')
        }

    }

    return (
        <form onSubmit={handleSignup} >
            <div>
                <label htmlFor='firstName'>first name</label>
                <input
                    type='text'
                    name='firstName'
                    value={firstName}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor='lastName'>last name</label>
                <input
                    type='text'
                    name='lastName'
                    value={lastName}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor='firstName'>firstName</label>
                <input
                    type='text'
                    name='email'
                    value={email}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor='timeZone'>time zone</label>
                <select
                    type='text'
                    name='timeZone'
                    value={timeZone}
                    onInput={handleInputChange}
                >
                    <option>---</option>
                    <option>PST</option>
                    <option>MST</option>
                    <option>CST</option>
                    <option>EST</option>
                </select>
            </div>
            <div>
                <label htmlFor='gitHubUsername'>gitHub username</label>
                <input
                    type='text'
                    name='gitHubUsername'
                    value={gitHubUsername}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor='calendlyLink'>calendly link</label>
                <input
                    type='text'
                    name='calendlyLink'
                    value={calendlyLink}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor='courses'>courses</label>
                <select
                    name='courses'
                    value={courses}
                    onInput={handleInputChange}
                >
                    <option>---</option>
                    <option>Full Stack Web Development</option>
                    <option>Fin Tech</option>
                </select>
            </div>
            <div>
                <label htmlFor='password'>password</label>
                <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor='confirmPassword'>confirm password</label>
                <input
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleInputChange}
                />
            </div>
            <input type='submit' value='signup' />
        </form >
    )
}
