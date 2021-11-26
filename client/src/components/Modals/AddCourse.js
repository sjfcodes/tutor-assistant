import React, { useContext, useState } from 'react'
import { Button, Form, Modal, } from 'react-bulma-components'
import { AppContext } from '../../Context/AppProvider'
import { addCourse, deleteCourse } from '../../utils'


export const AddCourse = () => {

    const { openModal, setOpenModal } = useContext(AppContext)
    const [formInputs, setFormInputs] = useState({ courseName: '' })
    const [helpMessage, setHelpMessage] = useState()

    const { tutorDetails, setTutorDetails } = useContext(AppContext)

    const { courseName } = formInputs

    const handleInputChange = (e) => {
        const { target: { name, value } } = e
        if (helpMessage) setHelpMessage('')

        setFormInputs({ ...formInputs, [name]: value })
    }

    const handleAddCourse = async (e) => {
        e.preventDefault()
        if (!courseName) {
            setHelpMessage('Please enter a name')
            return
        }
        try {
            const data = await addCourse(courseName)
            // const data = await deleteCourse(courseName)
            setTutorDetails({ ...tutorDetails, courses: data })
            setFormInputs({ courseName: '' })
            setOpenModal()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Modal
            showClose={false}
            show={openModal === 'addCourse'}
            onClose={() => setOpenModal()}
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
