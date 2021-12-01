import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Tabs } from 'react-bulma-components'
import { CourseContext, ModalContext } from '../../context';
import { AddCourse } from '../Modals/AddCourse';
import './style.css'

const { Tab } = Tabs


export const CourseTabs = () => {

    const [courseTabs, setCourseTabs] = useState(null)
    const { allCourses, selectedCourse, setSelectedCourse } = useContext(CourseContext)
    const { setOpenModal } = useContext(ModalContext)

    const handleUpdate = useCallback((e, _id) => {
        if (!allCourses) return
        const { target: { parentNode: { classList } } } = e
        setSelectedCourse(_id)

        // if selected tab is already active, return
        if (classList.contains('is-active')) return

        // toggle current active tab off
        document
            .querySelector('#course-tabs ul li.is-active')
            .classList
            .toggle('is-active')

        // toggle new tab on
        classList.toggle('is-active')

    }, [allCourses, setSelectedCourse])


    useEffect(() => {
        if (!allCourses) return
        let i = 0
        const arr = []
        for (let [key, { name, _id }] of Object.entries(allCourses)) {
            arr.push(
                <Tab
                    key={key}
                    id={key}
                    active={!selectedCourse || selectedCourse === _id ? true : false}
                    className='has-text-white'
                    onClick={(e) => handleUpdate(e, _id)}
                >
                    {name}
                </Tab>
            )
            if (!selectedCourse && i === 0) setSelectedCourse(_id)

            i++
        }

        setCourseTabs(arr)

    }, [allCourses, handleUpdate, selectedCourse, setSelectedCourse])

    return (
        <>
            <Tabs
                type='boxed'
                id='course-tabs'
            >
                {courseTabs}
                <Tab
                    className='has-text-white add-course-tab'
                    onClick={() => setOpenModal('addCourse')}
                >
                    Add Course
                </Tab>
            </Tabs>
            <AddCourse />
        </>
    )
}
