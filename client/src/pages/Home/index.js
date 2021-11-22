import React, { useContext } from 'react'
import { Box, Container, Heading, Section } from 'react-bulma-components'
import { FullWidthBody } from '../../components'
import { AppContext } from '../../Context/AppProvider'
import './style.css'

export const Home = () => {

    const styles = {
        width: 400,
        margin: 'auto',
        color: 'black',
        border: 'solid black 1px'
    }

    const { tutorDetails: {
        firstName
    } } = useContext(AppContext)

    return (
        <Section>
            <Container>
                <Heading>
                    Section
                </Heading>
                <Heading subtitle>
                    A simple container to divide your page into{' '}
                    <strong>
                        sections
                    </strong>
                    , like the one you are currently reading
                </Heading>
            </Container>
        </Section>
    )
}
