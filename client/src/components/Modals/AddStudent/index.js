import React, { useContext, useState } from 'react'
import { Button, Modal } from 'react-bulma-components'
import { CourseContext, ModalContext } from '../../../context'
import { createModel, formIsComplete, getUnixFromFormInputs } from '../../../utils'
import { AddStudentForm } from './AddStudentForm'

export const AddStudent = () => {

    const i = 0

    const { openModal, setOpenModal } = useContext(ModalContext)
    const { allCourses, setAllCourses, selectedCourse } = useContext(CourseContext)
    const [formInputs, setFormInputs] = useState({
        firstName: `Student${i}`,
        lastName: `New${i}`,
        email: `student${i}@email.com`,
        classId: 'ABC123',
        timeZone: 'Eastern',
        graduationDate: '',
        fullTimeCourse: "false",
        gitHubUsername: `student${i}`,
        zoomLink: 'https://zoom.us/j/96314583232?pwd=K1ZsMGpjWEk1MDdQUStKNFlSd3VDZz09',
        meetingsPerWeek: 1,
        reassignment: "false",
        temporary: "false",
    })


    const handleAddStudent = async (e) => {
        e.preventDefault()
        const inputs = { ...formInputs }
        inputs.graduationDate = getUnixFromFormInputs(formInputs.graduationDate)


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
            className=''
            showClose={false}
            show={openModal === 'addStudent'}
            onClose={() => setOpenModal()}
        >
            <Modal.Card >
                <Modal.Card.Header showClose={true}>
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
                            disabled={!formIsComplete(formInputs)}
                        >
                            Add Student
                        </Button>
                    </Modal.Card.Footer>

                </form>
            </Modal.Card>
        </Modal>
    )
}