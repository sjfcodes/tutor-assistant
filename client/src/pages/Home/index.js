import React, { useContext, useEffect, useState } from 'react'
import { Container, Heading, Box as BulmaBox, Section } from 'react-bulma-components'
import { CourseTabs } from '../../components/CourseTabs'
import { AppContext } from '../../Context/AppProvider'
import './style.css'


const Box = ({ children }) => <BulmaBox className='mx-1'>{children}</BulmaBox>

export const Home = () => {

    const { tutorDetails: { courses } } = useContext(AppContext)


    return (
        <Section className='p-3 background-dark-blurred' >
            <CourseTabs courses={courses} />
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
