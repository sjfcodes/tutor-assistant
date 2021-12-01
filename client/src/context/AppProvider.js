import React, { createContext, useContext, useEffect, useState } from 'react'
import { loginWithToken } from '../utils'
import { formatCourses, formatStudents } from '../utils/helpers'
import { CourseContext } from './CourseProvider'

export const AppContext = createContext()


export const AppProvider = ({ children }) => {

    const [tutorDetails, setTutorDetails] = useState({ loggedIn: false })
    const { setAllCourses } = useContext(CourseContext)

    useEffect(() => {
        const token = localStorage.getItem('tutor-token')
        if (!token) return

        async function loginUser() {
            const { tutor } = await loginWithToken(token)
            if (!tutor) return
            const formattedCourses = tutor.courses.map(course => {
                return { ...course, students: formatStudents(course.students) }
            })
            const courses = formatCourses(formattedCourses)
            setAllCourses(courses)
            setTutorDetails({ ...tutor, loggedIn: true })
        }

        try {
            loginUser()

        } catch (error) {
            console.error(error)
        }
    }, [setAllCourses])


    return (
        <AppContext.Provider value={{ tutorDetails, setTutorDetails }}>
            {children}
        </AppContext.Provider>
    )
}
