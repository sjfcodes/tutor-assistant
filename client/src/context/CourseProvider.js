import React, { createContext, useState } from 'react'

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {

    const [courseDetails, setCourseDetails] = useState();

    return (
        <CourseContext.Provider value={{ courseDetails, setCourseDetails }}>
            {children}
        </CourseContext.Provider>
    )
};