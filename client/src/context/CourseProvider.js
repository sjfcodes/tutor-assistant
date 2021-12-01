import React, { createContext, useEffect, useState } from 'react'

export const CourseContext = createContext();


export const CourseProvider = ({ children }) => {

    const [allCourses, setAllCourses] = useState();
    const [selectedCourse, setSelectedCourse] = useState();

    useEffect(() => {
        if (!allCourses || !selectedCourse) return

        console.log(allCourses[selectedCourse])
    }, [selectedCourse, allCourses])

    return (
        <CourseContext.Provider value={{ allCourses, setAllCourses, selectedCourse, setSelectedCourse }}>
            {children}
        </CourseContext.Provider>
    )
};