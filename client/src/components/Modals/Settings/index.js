import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button, Modal, Tabs } from 'react-bulma-components'
import { AppContext } from '../../../Context/AppProvider'
import { deleteCourse, updateCourse } from '../../../utils'
import { CourseLineItem } from './Course'

const { Tab } = Tabs

export const Settings = () => {

    const { openModal, setOpenModal, tutorDetails, setTutorDetails } = useContext(AppContext)
    const { firstName, courses } = tutorDetails
    const [courseItems, setCourseItems] = useState()
    const [courseToDelete, setCourseToDelete] = useState()
    const [courseToUpdate, setCourseToUpdate] = useState()


    const handleUpdateCourse = useCallback(async (_id, name) => {
        setCourseToUpdate()
        if (!_id || !name) return

        try {
            await updateCourse(_id, name)

            const updatedCourses = courses.map(course => course._id === _id ? { ...course, name } : course)
            setTutorDetails({ ...tutorDetails, courses: updatedCourses })
        } catch (error) {
            console.error(error);
        }

    }, [courses, tutorDetails, setTutorDetails])


    const handleDeleteCourse = useCallback(async (_id) => {
        setCourseToDelete()
        if (!_id) return

        try {
            await deleteCourse(_id)
            const updatedCourses = courses.filter((course) => course._id !== _id)
            setTutorDetails({ ...tutorDetails, courses: updatedCourses })

        } catch (error) {
            console.error(error);
        }
    }, [courses, tutorDetails, setTutorDetails])


    const update = useCallback(() => {

        setCourseItems(
            courses.map(({ name: courseName, _id: courseId }) => (
                <CourseLineItem
                    key={courseId}
                    courseId={courseId}
                    courseName={courseName}
                    courseToUpdate={courseToUpdate}
                    setCourseToUpdate={setCourseToUpdate}
                    courseToDelete={courseToDelete}
                    setCourseToDelete={setCourseToDelete}
                    handleDeleteCourse={handleDeleteCourse}
                    handleUpdateCourse={handleUpdateCourse}
                />
            ))
        )
    }, [courses, courseToDelete, courseToUpdate, handleDeleteCourse, handleUpdateCourse])


    useEffect(() => {
        if (!courses || !courses?.length) return setCourseItems(null)
        update()
    }, [courses, courseToDelete, courseToUpdate, update])


    return (
        <Modal
            showClose={false}
            show={openModal === 'settings'}
            onClose={() => setOpenModal()}
        >
            <Modal.Card >
                <Modal.Card.Header showClose={false}
                >
                    <Modal.Card.Title>{firstName}'s Settings</Modal.Card.Title>
                </Modal.Card.Header>
                <Modal.Card.Body>

                    <Tabs>
                        <Tab active >Courses</Tab>
                        <Tab >Students</Tab>
                        <Tab >Meetings</Tab>
                    </Tabs>

                    {courseItems}

                </Modal.Card.Body>
                <Modal.Card.Footer
                    renderAs={Button.Group}
                    align="right"
                >
                    <Button
                        onClick={() => setOpenModal()}
                    >
                        Done</Button>
                </Modal.Card.Footer>
            </Modal.Card>
        </Modal>
    )
}