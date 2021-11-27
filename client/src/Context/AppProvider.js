import React, { createContext, useEffect, useState } from 'react'
import { loginWithToken } from '../utils'

export const AppContext = createContext()


export default function AppProvider({ children }) {

    const [tutorDetails, setTutorDetails] = useState({ loggedIn: false })
    const [openModal, setOpenModal] = useState();

    useEffect(() => {
        const token = localStorage.getItem('tutor-token')
        if (!token) return

        async function loginUser() {
            const tutor = await loginWithToken(token)
            if (!tutor) return
            setTutorDetails({ ...tutor, loggedIn: true })
        }

        try {
            loginUser()
        } catch (error) {
            console.error(error)
        }
    }, [])


    return (
        <AppContext.Provider value={{ tutorDetails, setTutorDetails, openModal, setOpenModal }}>
            {children}
        </AppContext.Provider>
    )
}
