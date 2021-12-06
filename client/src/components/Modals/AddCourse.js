import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal, } from 'react-bulma-components'
import { AppContext, CourseContext, ModalContext } from '../../context'
import { createModel, formIsComplete } from '../../utils'
import { formatCourses } from '../../utils/helpers'


export const AddCourse = () => {

    const { openModal, setOpenModal } = useContext(ModalContext)
    const [formInputs, setFormInputs] = useState({ courseName: '' })
    const { courseName } = formInputs
    const [helpMessage, setHelpMessage] = useState(null)

    const { tutorDetails: { _id } } = useContext(AppContext)
    const { allCourses, setAllCourses, setSelectedCourse } = useContext(CourseContext)
    const [existingNames, setExistingNames] = useState(null)

    useEffect(() => {
        if (!allCourses) return

        const arr = Object.values(allCourses).map(({ name }) => name?.toLowerCase())
        setExistingNames(arr)

    }, [allCourses])

    const resetForm = () => setFormInputs({ courseName: '' })

    const handleInputChange = (e) => {
        const { target: { name, value } } = e

        if (helpMessage) setHelpMessage(null)
        if (existingNames && existingNames.indexOf(value.toLowerCase()) !== -1) setHelpMessage('name already in use')
        setFormInputs({ ...formInputs, [name]: value })

    }

    const handleAddCourse = async (e) => {
        e.preventDefault()
        if (!courseName) {
            setHelpMessage('Please enter a name')
            return
        }
        try {
            const body = { tutor_id: _id, name: courseName }
            const newCourse = await createModel('course', body)
            // initialize meetings and students to empty objects
            newCourse.meetings = {}
            newCourse.students = {}

            setAllCourses({ ...allCourses, [newCourse._id]: newCourse })

            resetForm()
            setHelpMessage()
            setSelectedCourse(newCourse._id)
            setOpenModal()
        } catch (error) {
            console.error(error)
        }
    }

    const handleCloseModal = () => {
        setOpenModal()
        resetForm()
    }


    return (
        <Modal
            showClose={false}
            show={openModal === 'addCourse'}
            onClose={handleCloseModal}
        >
            <Modal.Card >
                <Modal.Card.Header>
                    <Modal.Card.Title>Add Course</Modal.Card.Title>
                </Modal.Card.Header>
                <form onSubmit={handleAddCourse}
                >
                    <Modal.Card.Body>
                        <Form.Field>
                            <Form.Control>
                                <Form.Label>Name</Form.Label>
                                <Form.Input
                                    type='text'
                                    name='courseName'
                                    value={courseName}
                                    onChange={handleInputChange}
                                />
                            </Form.Control>
                            <Form.Help
                                className='ml-5'
                                color='danger'
                            >
                                {helpMessage}
                            </Form.Help>
                        </Form.Field>
                    </Modal.Card.Body>
                    <Modal.Card.Footer renderAs={Button.Group} align="right" >
                        <Button
                            disabled={helpMessage || !formIsComplete(formInputs)}
                            color='info'
                        >
                            Add Course
                        </Button>
                    </Modal.Card.Footer>
                </form>
            </Modal.Card>
        </Modal>
    )
}
