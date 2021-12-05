import React, { useContext, useState } from 'react'
import { Box, Heading } from 'react-bulma-components'
import { CourseContext } from '../../context'


export const MeetingsSection = () => {

    const { allCourses, selectedCourse } = useContext(CourseContext)
    const [selectedMeetingId, setSelectedMeetingId] = useState('')


    return (
        <Box className='has-background-white'>
            <Heading>
                Meetings
            </Heading>
            {
                allCourses &&
                selectedCourse && 'hi'
                // Object.values(allCourses[selectedCourse].students)
                //     .map((student) =>
                //         < Student
                //             key={student._id}
                //             student={student}
                //             selectedMeetingId={selectedMeetingId}
                //             setSelectedMeetingId={setSelectedMeetingId}
                //         />
                //     )
            }
        </Box>
    )
}
