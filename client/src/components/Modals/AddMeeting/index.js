import React, { useContext, useState } from 'react'
import { Button, Modal } from 'react-bulma-components'
import { AppContext, CourseContext, ModalContext } from '../../../context'
import { createModel, formIsComplete } from '../../../utils'
import { AddMeetingForm } from './AddMeetingForm'

export const AddMeeting = () => {

    const { openModal, setOpenModal } = useContext(ModalContext)
    const { allCourses, setAllCourses, selectedCourse } = useContext(CourseContext)
    const { tutorDetails: { _id: tutorId } } = useContext(AppContext)
    const [formInputs, setFormInputs] = useState({
        tutorId,
        studentId: '',
        duration: 1,
        startDate: '',
        status: 'scheduled'
    })


    const handleAddMeeting = async (e) => {
        e.preventDefault()
        const inputs = { ...formInputs }
        // inputs.graduationDate = getFutureDateInUnix(formInputs.graduationDate)
        console.log(inputs)

        try {
            const { _id: newMeetingId, createdAt } = await createModel('meeting', inputs, selectedCourse)
            if (!newMeetingId) return console.log('failed')

            const currentMeetings = allCourses[selectedCourse].meetings
            const updatedMeetings = {
                ...currentMeetings,
                [newMeetingId]: {
                    _id: newMeetingId,
                    ...inputs,
                    createdAt
                }
            }
            const updatedCourse = {
                ...allCourses[selectedCourse],
                meetings: updatedMeetings
            }
            setAllCourses({
                ...allCourses,
                [selectedCourse]: updatedCourse
            })
            setOpenModal()
        } catch (error) {
            // handleAddMeeting failed
            console.error('handleAddMeeting failed')
        }
    }


    return (
        <Modal
            className=''
            showClose={false}
            show={openModal === 'addMeeting'}
            onClose={() => setOpenModal()}
        >
            <Modal.Card
            // style={{ width: '50vw', margin: 'auto' }}
            >
                <Modal.Card.Header showClose={true}
                >
                    <Modal.Card.Title>Add Meeting</Modal.Card.Title>
                </Modal.Card.Header>
                <form onSubmit={handleAddMeeting}>
                    <Modal.Card.Body>
                        <AddMeetingForm formInputs={formInputs} setFormInputs={setFormInputs} />
                    </Modal.Card.Body>
                    <Modal.Card.Footer renderAs={Button.Group} align="right" hasAddons>
                        <Button type='button' onClick={() => setOpenModal()}>cancel</Button>
                        <Button
                            color="success"
                            type='submit'
                            disabled={!formIsComplete(formInputs)}
                        >
                            Add Meeting
                        </Button>
                    </Modal.Card.Footer>
                </form>
            </Modal.Card>
        </Modal>
    )
}