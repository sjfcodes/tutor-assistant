import React, { useContext } from 'react'
import { Container, Heading, Box as BulmaBox, Columns } from 'react-bulma-components'
import { CourseTabs } from '../../components/CourseTabs'
import { AppContext } from '../../Context/AppProvider'
import './style.css'

const { Column } = Columns

const Box = ({ children }) => <BulmaBox className='mx-1'>{children}</BulmaBox>

export const Home = () => {
    const { tutorDetails } = useContext(AppContext)
    const courses = ['Fsf', 'DataViz']

    return (
        <>
            <Box className='has-background-white m-5'>
                <Columns>
                    <Column size={6}>
                        <CourseTabs courses={courses} />
                    </Column>

                    <Column mobile={{ size: 5 }}>

                    </Column>
                </Columns>
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
        </>
    )
}
