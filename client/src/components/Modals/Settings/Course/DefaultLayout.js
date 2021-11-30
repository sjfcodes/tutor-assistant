import React from 'react'
import { Button, Level } from 'react-bulma-components'

export const DefaultLayout = ({ courseName, courseId, handleEditNameClick, setCourseToDelete }) => {
    return (
        <>
            <Level.Side align='left'>
                <Level.Item >
                    {courseName}
                </Level.Item>
            </Level.Side>
            <Level.Side align='right'>
                <Level.Item>
                    <Button.Group>
                        <Button
                            color='info'
                            onClick={() => handleEditNameClick(courseName, courseId)}
                        >
                            edit name
                        </Button>
                        <Button
                            outlined
                            color='danger'
                            onClick={() => setCourseToDelete(courseId)}
                        >
                            delete
                        </Button>
                    </Button.Group>
                </Level.Item>
            </Level.Side>
        </>
    )
}
