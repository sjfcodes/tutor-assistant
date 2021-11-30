import React from 'react'
import { Button, Level } from 'react-bulma-components'

export const DeleteCourseLayout = ({ courseName, courseId, handleDeleteCourse }) => {
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
                            outlined
                            color='danger'
                            onClick={() => handleDeleteCourse(null)}
                        >
                            cancel
                        </Button>

                        <Button
                            color='danger'
                            onClick={() => handleDeleteCourse(courseId)}
                        >
                            confirm
                        </Button>
                    </Button.Group>
                </Level.Item>
            </Level.Side>
        </>
    )
}
