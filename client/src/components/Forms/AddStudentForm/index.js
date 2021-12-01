import React from 'react'
import { Columns, Form, Icon } from 'react-bulma-components'
import { validateEmail, validateSelect } from '../../../utils'

const { Column } = Columns

export const AddStudentForm = ({ formInputs, setFormInputs }) => {


    const {
        firstName,
        lastName,
        email,
        classCode,
        timeZone,
        graduationDate,
        fullTimeCourse,
        gitHubUsername,
        zoomLink,
        meetingsPerWeek,
        reassignment,
        temporary

    } = formInputs

    const handleInputChange = (e) => {
        const { target: { name, value } } = e
        // meetings per week must be greater then 0
        if (name === "meetingsPerWeek" && !parseInt(value)) return
        setFormInputs({ ...formInputs, [name]: value })
    }


    return (
        <>

            <Columns
                centered
                vCentered
            >
                <Column>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control>
                        <Form.Input
                            type='text'
                            name='firstName'
                            value={firstName}
                            onChange={handleInputChange}
                        />
                        <Icon align='left'>
                            <i className="far fa-address-card"></i>
                        </Icon>
                        {firstName &&
                            <Icon align="right">
                                <i className="fas fa-check" />
                            </Icon>
                        }
                    </Form.Control>
                </Column>

                <Column>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control>
                        <Form.Input
                            type='text'
                            name='lastName'
                            value={lastName}
                            onChange={handleInputChange}
                        />
                        <Icon align='left'>
                            <i className="fas fa-address-card"></i>
                        </Icon>
                        {lastName &&
                            <Icon align="right">
                                <i className="fas fa-check" />
                            </Icon>
                        }
                    </Form.Control>
                </Column>
            </Columns>
            <Columns>
                <Column>
                    <Form.Label>classCode</Form.Label>
                    <Form.Control>
                        <Form.Input
                            type='text'
                            name='classCode'
                            value={classCode}
                            onChange={handleInputChange}
                        />
                        <Icon align='left'>
                            <i className="fas fa-address-card"></i>
                        </Icon>
                        {classCode &&
                            <Icon align="right">
                                <i className="fas fa-check" />
                            </Icon>
                        }
                    </Form.Control>
                </Column>
                <Column>
                    <Form.Label>Github Username</Form.Label>
                    <Form.Control>
                        <Form.Input
                            type='text'
                            name='gitHubUsername'
                            value={gitHubUsername}
                            onChange={handleInputChange}
                        />
                        <Icon align='left'>
                            <i className="fab fa-github"></i>
                        </Icon>
                        {gitHubUsername &&
                            <Icon align="right">
                                <i className="fas fa-check" />
                            </Icon>
                        }
                    </Form.Control>
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
                                <option>---</option>
                                <option>Pacific</option>
                                <option>Mountain</option>
                                <option>Central</option>
                                <option>Eastern</option>
                            </Form.Select>
                        </Form.Control>
                        <Form.Control>
                            {validateSelect(timeZone) &&
                                <Icon className='ml-2 mt-2'>
                                    <i className="fas fa-check" />
                                </Icon>
                            }
                        </Form.Control>
                    </Form.Field>
                </Column>
                <Column>
                    <Form.Label>Email</Form.Label>
                    <Form.Control>
                        <Form.Input
                            type='text'
                            name='email'
                            value={email}
                            onChange={handleInputChange}
                        />
                        <Icon align='left'>
                            <i className="far fa-envelope"></i>
                        </Icon>
                        {validateEmail(email) &&
                            <Icon align="right">
                                <i className="fas fa-check" />
                            </Icon>
                        }
                    </Form.Control>
                </Column>
            </Columns>

            <Columns>
                <Column narrow>
                    <Form.Label>Course(s)</Form.Label>
                    <Form.Field kind='addons'>
                        <Form.Control>
                            <Form.Input
                                type='date'
                                name='graduationDate'
                                value={graduationDate}
                                onInput={handleInputChange}
                            >

                            </Form.Input>
                        </Form.Control>
                        <Form.Control>
                            {graduationDate &&
                                <Icon className='ml-2 mt-2'>
                                    <i className="fas fa-check" />
                                </Icon>
                            }
                        </Form.Control>
                    </Form.Field>
                </Column>

                <Column>
                    <Form.Label>Zoom Link</Form.Label>
                    <Form.Control>
                        <Form.Input
                            type='text'
                            name='zoomLink'
                            value={zoomLink}
                            onChange={handleInputChange}
                        />
                        <Icon align="left">
                            <i className="fas fa-link"></i>
                        </Icon>
                        {zoomLink &&
                            <Icon align="right">
                                <i className="fas fa-check" />
                            </Icon>
                        }
                    </Form.Control>
                </Column>
            </Columns>

            <Columns>
                <Column>
                    <Form.Label>Meetings Per Week</Form.Label>
                    <Form.Control>
                        <Form.Input
                            type='number'
                            name='meetingsPerWeek'
                            value={meetingsPerWeek}
                            onChange={handleInputChange}
                        />
                        <Icon align="left">
                            <i className="fas fa-lock"></i>
                        </Icon>
                        {meetingsPerWeek &&
                            <Icon align="right">
                                <i className="fas fa-check" />
                            </Icon>
                        }
                    </Form.Control>
                </Column>

                <Column>
                    <Form.Label>Full Time</Form.Label>
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
                    <Form.Label>reassignment</Form.Label>
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
                    <Form.Label>temporary</Form.Label>
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
            </Columns>
        </ >
    )
}
