import React, { createContext, useContext, useEffect, useState } from 'react'
import { loginWithToken } from '../utils'
import { CourseContext } from './CourseProvider'

export const AppContext = createContext()


export const AppProvider = ({ children }) => {

    const [tutorDetails, setTutorDetails] = useState({ loggedIn: false })
    const { setCourseDetails } = useContext(CourseContext)

    useEffect(() => {
        const token = localStorage.getItem('tutor-token')
        if (!token) return

        async function loginUser() {
            const tutor = await loginWithToken(token)
            if (!tutor) return

            if (tutor.courses.length) {
                const courseObj = {}
                tutor.courses.forEach(course => {
                    const key = course._id
                    const values = { ...course }
                    delete values._id
                    delete values.tutor_id
                    courseObj[key] = values
                });
                setCourseDetails(courseObj)
            }

            setTutorDetails({ ...tutor, loggedIn: true })
        }

        try {
            loginUser()

        } catch (error) {
            console.error(error)
        }
    }, [setCourseDetails])


    return (
        <AppContext.Provider value={{ tutorDetails, setTutorDetails }}>
            {children}
        </AppContext.Provider>
    )
}
