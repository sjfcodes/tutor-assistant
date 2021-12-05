import React, { useContext } from 'react'
import { Container, Section, Columns, Button } from 'react-bulma-components'
import { MeetingsSection, StudentsSection } from '../../components'
import { CourseTabs } from '../../components/CourseTabs'
import { AddMeeting, AddStudent } from '../../components/Modals'
import { CourseContext, ModalContext } from '../../context'
import './style.css'


export const Home = () => {

    const { setOpenModal } = useContext(ModalContext)
    const { selectedCourse } = useContext(CourseContext)


    return (
        <Section className='p-3 background-dark-blurred rounded'>
            <CourseTabs />
            {selectedCourse &&
                <>
                    <StudentsSection />
                    <Columns
                        className=''
                    >
                        <Columns.Column size={6}>
                            <Button
                                fullwidth
                                rounded
                                color="primary"
                                onClick={() => setOpenModal('addStudent')}
                            >
                                Add Student
                            </Button>
                        </Columns.Column>
                        <AddStudent />
                    </Columns>

                    <MeetingsSection />
                    <Columns
                        className=''
                    >
                        <Columns.Column size={6}>
                            <Button
                                fullwidth
                                rounded
                                color="primary"
                                onClick={() => setOpenModal('addMeeting')}
                            >
                                Add Meeting
                            </Button>
                        </Columns.Column>
                        <AddMeeting />
                    </Columns>
                </>
            }



            {/* <Box className='has-background-white m-5'>
                <Container>
                    <Heading>
                        Box 2
                    </Heading>
                    <Heading subtitle>
                        A simple container to divide your page into{' '}
                        <strong>
                            sections
                        </strong>
                        , like the one you are currently reading
                    </Heading>
                </Container>
            </Box>

            <Box className='has-background-white m-5'>
                <Container>
                    <Heading>
                        Box 3
                    </Heading>
                    <Heading subtitle>
                        A simple container to divide your page into{' '}
                        <strong>
                            sections
                        </strong>
                        , like the one you are currently reading
                    </Heading>
                </Container>
            </Box> */}

        </Section >
    )
}
