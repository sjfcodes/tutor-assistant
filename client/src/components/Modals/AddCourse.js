import React, { useContext, useState } from 'react'
import { Button, Form, Modal, } from 'react-bulma-components'
import { AppContext } from '../../context'
import { createModel } from '../../utils'
import { validateFormInputs } from '../Forms/utils'


export const AddCourse = () => {

    const { openModal, setOpenModal } = useContext(AppContext)
    const [formInputs, setFormInputs] = useState({ courseName: '' })
    const { courseName } = formInputs
    const [helpMessage, setHelpMessage] = useState()

    const { tutorDetails, setTutorDetails } = useContext(AppContext)
    const courseNamesArr = tutorDetails?.courses?.map(({ name }) => name) || []

    const resetForm = () => setFormInputs({ courseName: '' })


    const handleInputChange = (e) => {
        const { target: { name, value } } = e
        if (helpMessage) setHelpMessage('')
        if (courseNamesArr.indexOf(value) !== -1) setHelpMessage('name already in use')

        setFormInputs({ ...formInputs, [name]: value })
    }

    const handleAddCourse = async (e) => {
        e.preventDefault()
        if (!courseName) {
            setHelpMessage('Please enter a name')
            return
        }
        try {
            const body = { tutor_id: tutorDetails._id, name: courseName }
            const data = await createModel('course', body)
            setTutorDetails({ ...tutorDetails, courses: data })
            resetForm()
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
                            disabled={validateFormInputs(formInputs)}
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
