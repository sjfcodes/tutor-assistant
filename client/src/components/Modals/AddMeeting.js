import React, { useContext } from 'react'
import { Button, Content, Image, Media, Modal } from 'react-bulma-components'
import { ModalContext } from '../../context'

export const AddMeeting = () => {

    const { openModal, setOpenModal } = useContext(ModalContext)

    return (
        <Modal
            showClose={false}
            show={openModal === 'addMeeting'}
            onClose={() => setOpenModal()}
        >
            <Modal.Card >
                <Modal.Card.Header showClose={false}>
                    <Modal.Card.Title>Add Meeting</Modal.Card.Title>
                </Modal.Card.Header>
                <Modal.Card.Body>
                    <Media>
                        <Media.Item renderAs="figure" align="left">
                            <Image
                                size={64}
                                alt="64x64"
                                src="http://bulma.io/images/placeholders/128x128.png"
                            />
                        </Media.Item>
                        <Media.Item>
                            <Content>
                                <p>
                                    <strong>John Smith</strong> <small>@johnsmith</small>{' '}
                                    <small>31m</small>
                                    <br />
                                    If the children of the Modal is a card, the close button
                                    will be on the Card Head instead than the top-right corner
                                    You can also pass showClose = false to Card.Head to hide the
                                    close button
                                </p>
                            </Content>
                        </Media.Item>
                    </Media>
                </Modal.Card.Body>
                <Modal.Card.Footer renderAs={Button.Group} align="right" hasAddons>
                    <Button onClick={() => setOpenModal()}>cancel</Button>
                    <Button color="success">Add Meeting</Button>
                </Modal.Card.Footer>
            </Modal.Card>
        </Modal>
    )
}
