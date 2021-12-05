import React, { useContext, useState } from 'react'
import { Box, Heading } from 'react-bulma-components'
import { CourseContext } from '../../context'
import { Student } from './Student'
import './style.css'


export const StudentsSection = () => {

    const { allCourses, selectedCourse } = useContext(CourseContext)
    const [selectedStudentId, setSelectedStudentId] = useState('')


    return (
        <Box className='has-background-white'>
            <Heading>
                Students
            </Heading>
            {
                allCourses &&
                selectedCourse &&
                Object.values(allCourses[selectedCourse].students)
                    .map((student) =>
                        < Student
                            key={student._id}
                            student={student}
                            selectedStudentId={selectedStudentId}
                            setSelectedStudentId={setSelectedStudentId}
                        />
                    )
            }
        </Box>
    )
}
