import React, { useEffect, useState } from 'react'
import { Tabs } from 'react-bulma-components'
import { v4 } from 'uuid';

const { Tab } = Tabs


export const CourseTabs = ({ courses }) => {

    const [courseTabs, setCourseTabs] = useState(null)

    const addNewCourse = () => {
        console.log('add course')
    }

    const handleUpdate = (e) => {
        if (!courses || !courses.length) return
        const { target: { parentNode: { classList } } } = e

        // if selected tab is already active, return
        if (classList.contains('is-active')) return

        // toggle current active tab off
        document
            .querySelector('#course-tabs ul li.is-active')
            .classList
            .toggle('is-active')

        // toggle new tab on
        classList.toggle('is-active')
    }

    useEffect(() => {
        if (!courses || !courses.length) return

        setCourseTabs(
            courses.map((courseName, idx) => {
                const id = v4()
                return (
                    <Tab
                        key={id}
                        id={id}
                        active={idx === 0}
                        onClick={handleUpdate}
                    >
                        {courseName}
                    </Tab>
                )
            })
        )
    }, [courses])

    return (
        <Tabs
            type='boxed'
            id='course-tabs'
        >
            {courseTabs}
            <Tab
                onClick={addNewCourse}
            >
                Add Course
            </Tab>
        </Tabs>
    )
}
