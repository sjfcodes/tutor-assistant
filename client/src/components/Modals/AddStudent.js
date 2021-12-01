import React, { useContext, useState } from 'react'
import { Button, Modal } from 'react-bulma-components'
import { CourseContext, ModalContext } from '../../context'
import { createModel, validateFormInputs } from '../../utils'
import { AddStudentForm } from '../Forms'

export const AddStudent = () => {

    const i = 0

    const { openModal, setOpenModal } = useContext(ModalContext)
    const { allCourses, setAllCourses, selectedCourse, setSelectedCourse } = useContext(CourseContext)
    const [formInputs, setFormInputs] = useState({
        firstName: `Student${i}`,
        lastName: `New${i}`,
        email: `student${i}@email.com`,
        classCode: 'ABC123',
        timeZone: 'Eastern',
        graduationDate: '2022-01-01',
        fullTimeCourse: "false",
        gitHubUsername: `student${i}`,
        zoomLink: 'https://zoom-link.com',
        meetingsPerWeek: 1,
        reassignment: "false",
        temporary: "false",
    })

    const getGradDateInUnix = (date) => {

        // UTC time zone - local time zone in seconds
        const timeZoneOffsetSeconds = new Date().getTimezoneOffset() * 60

        // time in seconds (unix time)
        const gradDateSeconds = new Date(date).getTime() / 1000

        // console.log(new Date(gradDateSeconds + timeZoneOffsetSeconds * 1000));

        return gradDateSeconds + timeZoneOffsetSeconds
    }


    const handleAddStudent = async (e) => {
        e.preventDefault()
        const inputs = { ...formInputs }
        inputs.graduationDate = getGradDateInUnix(formInputs.graduationDate)


        try {
            const { _id: newStudentId, createdAt } = await createModel('student', inputs, selectedCourse)
            if (!newStudentId) return

            const currentStudents = allCourses[selectedCourse].students
            const updatedStudents = {
                ...currentStudents,
                [newStudentId]: {
                    _id: newStudentId,
                    ...inputs,
                    createdAt
                }
            }
            const updatedCourse = {
                ...allCourses[selectedCourse],
                students: updatedStudents
            }
            setAllCourses({
                ...allCourses,
                [selectedCourse]: updatedCourse
            })
            setOpenModal()
        } catch (error) {
            // login failed
            console.error('login failed')
        }
    }

    return (
        <Modal
            showClose={false}
            show={openModal === 'addStudent'}
            onClose={() => setOpenModal()}
        >
            <Modal.Card >
                <Modal.Card.Header showClose={false}
                >
                    <Modal.Card.Title>Add Student</Modal.Card.Title>
                </Modal.Card.Header>
                <form onSubmit={handleAddStudent}>
                    <Modal.Card.Body>
                        <AddStudentForm formInputs={formInputs} setFormInputs={setFormInputs} />
                    </Modal.Card.Body>
                    <Modal.Card.Footer renderAs={Button.Group} align="right" hasAddons>
                        <Button type='button' onClick={() => setOpenModal()}>cancel</Button>
                        <Button
                            color="success"
                            type='submit'
                            disabled={validateFormInputs(formInputs)}
                        >
                            Add Student
                        </Button>
                    </Modal.Card.Footer>
                </form>
            </Modal.Card>
        </Modal>
    )
}