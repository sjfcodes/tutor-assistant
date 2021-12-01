import React, { createContext, useEffect, useState } from 'react'

export const CourseContext = createContext();


export const CourseProvider = ({ children }) => {

    const [allCourses, setAllCourses] = useState();
    const [selectedCourse, setSelectedCourse] = useState();

    const updateSelectedCourse = (id) => {
        setSelectedCourse(allCourses[id])
    }

    useEffect(() => {
        if (!selectedCourse) return
        console.log(selectedCourse)
    }, [selectedCourse])


    return (
        <CourseContext.Provider value={{ allCourses, setAllCourses, selectedCourse, updateSelectedCourse }}>
            {children}
        </CourseContext.Provider>
    )
};