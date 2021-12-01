import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button, Modal, Tabs } from 'react-bulma-components'
import { AppContext, CourseContext, ModalContext } from '../../../context'
import { deleteModel, updateModel } from '../../../utils'
import { CourseLineItem } from './Course'

const { Tab } = Tabs

export const Settings = () => {

    const { tutorDetails: { firstName } } = useContext(AppContext)
    const { openModal, setOpenModal } = useContext(ModalContext)
    const { allCourses, setAllCourses } = useContext(CourseContext)
    const [courseItems, setCourseItems] = useState(null)
    const [courseToDelete, setCourseToDelete] = useState(null)
    const [courseToUpdate, setCourseToUpdate] = useState(null)


    const handleUpdateCourse = useCallback(async (_id, name) => {
        setCourseToUpdate()
        if (!_id || !name) return

        try {
            const body = { _id, name }
            await updateModel('course', body)

            const updatedCourses = { ...allCourses }
            updatedCourses[_id].name = name
            setAllCourses({ ...updatedCourses })
        } catch (error) {
            console.error(error);
        }

    }, [allCourses, setAllCourses])


    const handleDeleteCourse = useCallback(async (_id) => {
        setCourseToDelete()
        if (!_id) return

        try {
            await deleteModel('course', _id)
            const updatedCourses = { ...allCourses }
            delete updatedCourses[_id]
            setAllCourses({ ...updatedCourses })

        } catch (error) {
            console.error(error);
        }
    }, [allCourses, setAllCourses])


    const update = useCallback(() => {

        setCourseItems(
            Object.values(allCourses).map(({ name: courseName, _id: courseId }) => (
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
    }, [allCourses, courseToDelete, courseToUpdate, handleDeleteCourse, handleUpdateCourse])


    useEffect(() => {
        if (!allCourses) return setCourseItems(null)
        update()
    }, [allCourses, courseToDelete, courseToUpdate, update])


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