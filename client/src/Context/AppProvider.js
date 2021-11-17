import React, { createContext, useEffect, useState } from 'react'
import { SignupForm } from '../components/Signup'
import { loginWithToken } from '../hooks/loginWithToken'

export const AppContext = createContext()

export default function AppProvider({ children }) {

    const [AppComponent, setAppComponent] = useState()
    const [tutorDetails, setTutorDetails] = useState({ loggedIn: false })

    useEffect(() => {
        const token = localStorage.getItem('tutor-token')
        if (!token) return
        try {
            const tutor = async () => await loginWithToken(token)
            if (!tutor) return
            setTutorDetails({ ...tutor, loggedIn: true })
            updateAppComponent('home')
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
                setAppComponent('load login component')
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
