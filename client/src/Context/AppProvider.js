import React, { createContext, useEffect, useState } from 'react'
import { LoginForm, SignupForm } from '../components'
import { loginWithToken } from '../hooks'

export const AppContext = createContext()

export default function AppProvider({ children }) {

    const [AppComponent, setAppComponent] = useState()
    const [tutorDetails, setTutorDetails] = useState({ loggedIn: false })

    useEffect(() => {
        const token = localStorage.getItem('tutor-token')
        if (!token) return

        async function loginUser() {
            const tutor = await loginWithToken(token)
            if (!tutor) return
            setTutorDetails({ ...tutor, loggedIn: true })
            // updateAppComponent('home')
            console.log(tutor)
        }

        try {
            loginUser()
        } catch (error) {
            console.error(error)
        }
    }, [])

    const updateAppComponent = (componentName) => {

        switch (componentName) {
            case null:
                setAppComponent('')
                break;
            case 'signup':
                // signup component
                setAppComponent(<SignupForm />)
                break;

            case 'login':
                // login component
                setAppComponent(<LoginForm />)
                break;

            case 'home':
                // home component
                setAppComponent('load home component')
                break;

            default:

                break;
        }

    }


    return (
        <AppContext.Provider value={{ AppComponent, updateAppComponent, tutorDetails, setTutorDetails }}>
            {children}
        </AppContext.Provider>
    )
}
