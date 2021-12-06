import React, { useContext } from 'react'
import { Section } from 'react-bulma-components'
import { MeetingsSection, StudentsSection } from '../../components'
import { CourseTabs } from '../../components/CourseTabs'
import { AddMeeting, AddStudent } from '../../components/Modals'
import { CourseContext } from '../../context'
import './style.css'


export const Home = () => {

    const { selectedCourse } = useContext(CourseContext)


    return (
        <Section className='p-3 background-dark-blurred rounded'>
            <CourseTabs />
            {selectedCourse &&
                <>
                    <StudentsSection />
                    <AddStudent />

                    <MeetingsSection />
                    <AddMeeting />
                </>
            }
        </Section >
    )
}
