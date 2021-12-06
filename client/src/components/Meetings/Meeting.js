import React, { useContext } from 'react'
import { Box, Icon, Level } from 'react-bulma-components'
import { CourseContext } from '../../context'
import { MeetingItem } from './MeetingItem'


export const Meeting = ({
    meeting,
    setSelectedMeetingId,
    selectedMeetingId
}) => {
    // {
    //     "_id": "61adc7db792988890c3a95ca",
    //     "tutorId": "61aad6de9d2aa1b146848d13",
    //     "studentId": "61aad9f260ee915ea21d1953",
    //     "duration": 1,
    //     "startDate": 1639386000,
    //     "status": "scheduled",
    //     "createdAt": 1638778843,
    //     "__v": 0
    // }
    const { allCourses, selectedCourse } = useContext(CourseContext)
    const { _id, studentId, duration, startDate, status } = meeting
    const { firstName, lastName, timeZone } = allCourses[selectedCourse].students[studentId]
    // {
    //     "_id": "61aad9f260ee915ea21d1953",
    //     "firstName": "Samuel",
    //     "lastName": "Fox",
    //     "email": "student0@email.com",
    //     "classCode": "ABC123",
    //     "timeZone": "Pacific",
    //     "graduationDate": 1641024000,
    //     "fullTimeCourse": false,
    //     "gitHubUsername": "student0",
    //     "zoomLink": "https://zoom.us/j/96314583232?pwd=K1ZsMGpjWEk1MDdQUStKNFlSd3VDZz09",
    //     "meetingsPerWeek": 1,
    //     "reassignment": false,
    //     "temporary": false,
    //     "createdAt": 1638586866,
    //     "__v": 0
    // }
    console.log()

    const toggleViewMeeting = () => {
        selectedMeetingId === _id
            ? setSelectedMeetingId()
            : setSelectedMeetingId(_id)
    }
    const date = new Date(startDate * 1000).toLocaleDateString()
    const time = new Date(startDate * 1000).toLocaleTimeString().split(':')

    return (
        <Box className={`border rounded pl-2 py-1 pr-1 ${selectedMeetingId !== _id && `hover-large-item`}`}>
            {`${firstName} ${lastName}`}
            <Level
                renderAs='div'
                breakpoint='mobile'
                className={`${selectedMeetingId === _id && 'border-bottom pb-3 mb-1'}`}
                onClick={toggleViewMeeting}
            >
                <Level.Side align='left'>
                    <Level.Item >
                        {`${date} @ ${time[0]}:${time[2]}`}
                    </Level.Item>
                </Level.Side>

                <Level.Side align='left'>
                    <Level.Item>
                        <Icon>
                            <i className={`fas fa-chevron-${selectedMeetingId === _id ? 'up' : 'down'}`}></i>
                        </Icon>
                    </Level.Item>

                </Level.Side>
            </Level>

            {
                selectedMeetingId === _id &&
                <ul>
                    {
                        Object.entries(meeting).map(([property, value], idx) => {
                            const doNotDisplay = ['_id', '__v', 'tutorId', 'studentId']
                            if (doNotDisplay.indexOf(property) !== -1) return null
                            return (
                                < MeetingItem
                                    key={idx}
                                    value={value}
                                    _id={_id}
                                    idx={idx}
                                    property={property}
                                />
                            )
                        })
                    }
                </ul>
            }

        </Box>
    )
}