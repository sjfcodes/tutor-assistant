import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Tabs } from 'react-bulma-components'
import { AppContext } from '../../context';
import { AddCourse } from '../Modals/AddCourse';

const { Tab } = Tabs


export const CourseTabs = ({ courses }) => {

    const [courseTabs, setCourseTabs] = useState(null)
    const { setOpenModal } = useContext(AppContext)

    const handleUpdate = useCallback((e) => {
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

    }, [courses])


    useEffect(() => {
        if (!courses || !courses.length) return

        setCourseTabs(
            courses.map(({ name, _id }, idx) => {
                return (
                    <Tab
                        key={_id}
                        id={_id}
                        active={idx === 0}
                        onClick={handleUpdate}
                    >
                        {name}
                    </Tab>
                )
            })
        )
    }, [courses, handleUpdate])

    return (
        <>
            <Tabs
                type='boxed'
                id='course-tabs'
            >
                {courseTabs}
                <Tab
                    onClick={() => setOpenModal('addCourse')}
                >
                    Add Course
                </Tab>
            </Tabs>
            <AddCourse />
        </>
    )
}
