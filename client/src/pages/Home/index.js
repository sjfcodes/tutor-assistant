import React, { useContext } from 'react'
import { Container, Heading, Box as BulmaBox, Section, Columns, Button } from 'react-bulma-components'
import { CourseTabs } from '../../components/CourseTabs'
import { AddMeeting, AddStudent } from '../../components/Modals'
import { AppContext, ModalContext } from '../../context'
import './style.css'


const Box = ({ children }) => <BulmaBox className='mx-1'>{children}</BulmaBox>

export const Home = () => {

    const { tutorDetails: { courses } } = useContext(AppContext)
    const { setOpenModal } = useContext(ModalContext)


    return (
        <Section className='p-3 background-dark-blurred' >

            <CourseTabs courses={courses} />

            <Columns
                className='px-5'
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
            </Columns>
            <AddStudent />
            <AddMeeting />

            <Box>
                <Container>
                    <Heading>
                        Box 1
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
            </Box>

            <Box className='has-background-white m-5'>
                <Container>
                    <Heading>
                        Box 4
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
                        Box 5
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
                        Box 6
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
        </Section >
    )
}
