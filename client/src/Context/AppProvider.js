import React, { createContext, useEffect, useState } from 'react'
import { loginWithToken } from '../utils'

export const AppContext = createContext()

export default function AppProvider({ children }) {

    const [tutorDetails, setTutorDetails] = useState({ loggedIn: false })

    useEffect(() => {
        const token = localStorage.getItem('tutor-token')
        if (!token) return

        async function loginUser() {
            const tutor = await loginWithToken(token)
            if (!tutor) return
            setTutorDetails({ ...tutor, loggedIn: true })
            console.log(tutor)
        }

        try {
            loginUser()
        } catch (error) {
            console.error(error)
        }
    }, [])


    return (
        <AppContext.Provider value={{ tutorDetails, setTutorDetails }}>
            {children}
        </AppContext.Provider>
    )
}
