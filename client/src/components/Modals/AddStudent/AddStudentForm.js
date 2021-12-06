import React, { useEffect, useState } from 'react'
import { Columns, Form, Icon, Level } from 'react-bulma-components'
import { emailIsValid, getCurrentUnix, getUnixFromFormInputs, inputIsSelected } from '../../../utils'
import { FormInput } from '../../Forms'

const { Column } = Columns


export const AddStudentForm = ({ formInputs, setFormInputs }) => {
    const {
        firstName,
        lastName,
        email,
        classId,
        timeZone,
        graduationDate,
        fullTimeCourse,
        gitHubUsername,
        zoomLink,
        meetingsPerWeek,
        reassignment,
        temporary
    } = formInputs


    const [displayHelpText, setDisplayHelpText] = useState()
    const [helpText, setHelpText] = useState(() => {
        const object = {}
        Object
            .keys(formInputs)
            .forEach(property => { object[property] = '' })
        return object
    })

    const updateHelpText = (inputName, message) => setHelpText({
        ...helpText,
        [inputName]: message ? message : `missing ${inputName}`
    })

    const handleInputChange = ({ target: { name: inputName, value: inputValue } }) => {

        switch (inputName) {
            case "graduationDate":
                const selectedDate = getUnixFromFormInputs(inputValue)
                const today = getCurrentUnix()
                console.log('here', selectedDate < today)
                if (selectedDate < today) {
                    updateHelpText(inputName, 'graduation date must be in the future')
                }
                break;

            case "meetingsPerWeek":
                if (!parseInt(inputValue)) return
                break;

            case "timeZone":
                if (!inputValue || inputValue === '-') updateHelpText(inputName)
                break;
            default:
                helpText[inputName] && updateHelpText(inputName, '')
        }

        setFormInputs({ ...formInputs, [inputName]: inputValue })
    }

    useEffect(() => {
        console.log(helpText)

        setDisplayHelpText(
            Object.entries(helpText)
                .map(([key, value]) => {
                    return value
                        ? <p key={key}>{value}</p>
                        : ''
                })
        )
    }, [helpText])


    return (
        <>
            <Columns
                centered
                vCentered
            >
                <Column>
                    <FormInput
                        label='First Name'
                        name='firstName'
                        value={firstName}
                        icon='far fa-address-card'
                        onChange={handleInputChange}
                    />
                </Column>

                <Column>
                    <FormInput
                        label='Last Name'
                        name="lastName"
                        value={lastName}
                        icon='far fa-address-card'
                        onChange={handleInputChange}
                    />
                </Column>
            </Columns>
            <Columns>
                <Column>
                    <FormInput
                        label='Class Id'
                        name='classId'
                        value={classId}
                        icon='far fa-address-card'
                        onChange={handleInputChange}
                    />
                </Column>
                <Column>
                    <FormInput
                        label='Github Username'
                        name='gitHubUsername'
                        value={gitHubUsername}
                        icon="fab fa-github"
                        onChange={handleInputChange}
                    />
                </Column>
            </Columns>


            <Columns>
                <Column narrow>
                    <Form.Label>Time Zone</Form.Label>
                    <Form.Field kind='addons'>
                        <Form.Control>
                            <Form.Select
                                type='text'
                                name='timeZone'
                                value={timeZone}
                                onInput={handleInputChange}
                            >
                                <option>-</option>
                                <option>Pacific</option>
                                <option>Mountain</option>
                                <option>Central</option>
                                <option>Eastern</option>
                            </Form.Select>
                        </Form.Control>
                        <Form.Control>
                            {inputIsSelected(timeZone) &&
                                <Icon className='ml-2 mt-2'>
                                    <i className="fas fa-check" />
                                </Icon>
                            }
                        </Form.Control>
                    </Form.Field>
                </Column>
                <Column>
                    <FormInput
                        label='Email'
                        name='email'
                        value={email}
                        icon="far fa-envelope"
                        onChange={handleInputChange}
                        validate={emailIsValid}
                    />
                </Column>
            </Columns>

            <Columns>
                <Column narrow>
                    <FormInput
                        label='Graduation Date'
                        type='date'
                        name='graduationDate'
                        value={graduationDate}
                        icon="fa-calendar-alt"
                        onChange={handleInputChange}
                    />
                </Column>

                <Column>
                    <FormInput
                        label='Zoom Link'
                        name='zoomLink'
                        value={zoomLink}
                        onChange={handleInputChange}
                        icon="fas fa-link"
                    />
                </Column>
            </Columns>

            <Columns>
                <Level renderAs='div'>
                    <Column>
                        <FormInput
                            label='Meetings Per Week'
                            type='number'
                            name='meetingsPerWeek'
                            value={meetingsPerWeek}
                            onChange={handleInputChange}
                            icon="fas fa-lock"
                        />
                    </Column>

                    <Column>
                        <Form.Label>Full Time Student?</Form.Label>
                        <Form.Control>
                            <Form.Radio
                                value="true"
                                name="fullTimeCourse"
                                checked={fullTimeCourse === "true"}
                                onChange={handleInputChange}
                            >
                                Yes
                            </Form.Radio>
                            <Form.Radio
                                value="false"
                                name="fullTimeCourse"
                                checked={fullTimeCourse === "false"}
                                onChange={handleInputChange}
                            >
                                No
                            </Form.Radio>
                        </Form.Control>
                    </Column>

                    <Column>
                        <Form.Label>Reassignment From Another Tutor?</Form.Label>
                        <Form.Control>
                            <Form.Radio
                                value="true"
                                name="reassignment"
                                checked={reassignment === "true"}
                                onChange={handleInputChange}
                            >
                                Yes
                            </Form.Radio>
                            <Form.Radio
                                value="false"
                                name="reassignment"
                                checked={reassignment === "false"}
                                onChange={handleInputChange}
                            >
                                No
                            </Form.Radio>
                        </Form.Control>
                    </Column>
                    <Column>
                        <Form.Label>Recurring Meeting?</Form.Label>
                        <Form.Control>
                            <Form.Radio
                                value="true"
                                name="temporary"
                                checked={temporary === "true"}
                                onChange={handleInputChange}
                            >
                                Yes
                            </Form.Radio>
                            <Form.Radio
                                value="false"
                                name="temporary"
                                checked={temporary === "false"}
                                onChange={handleInputChange}
                            >
                                No
                            </Form.Radio>
                        </Form.Control>
                    </Column>
                </Level>
            </Columns>
            {displayHelpText}
        </ >
    )
}
