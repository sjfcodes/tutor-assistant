import React, { useEffect, useState } from 'react'
import { Form, Icon } from 'react-bulma-components'
import { getUnixFromFormInputs } from '../../../utils'

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * WHEN a day is selected
 * THEN set year,month,day to local state --x
 * 
 * WHEN an hour is selected
 * THEN set hour to local state --x
 * 
 * WHEN am/pm is selected
 * THEN set value to state --x
 * 
 * WHEN day, hour & amPm have value
 * THEN 
 * -    get unix time for date selected --x
 * -    update main form state with unix time --x
 * -    allow submit button to be clicked
 * 
 * WHEN submit button is clicked
 * THEN a post request is made to create the new meeting
 *
 * WHEN post request is successful
 * THEN client recieves _id && new meeting is stored in local state
 * 
 * 
 */

export const MeetingTime = ({ formInputs, setFormInputs }) => {

    const [date, setDate] = useState({
        day: '',
        time: '',
        amPm: ''
    });

    const { day, time, amPm } = date;
    const { studentId, startDate } = formInputs;

    const validateStartDate = ({ day, time, amPm }) => day && time && amPm ? true : false;

    const handleInputChange = ({ target: { name, value } }) => {

        const copy = {
            ...date,
            [name]: value === '-' ? '' : value
        }

        if (validateStartDate(copy)) {
            // if we have all the data, get the unix time
            const unix = getUnixFromFormInputs(copy.day, copy.time, copy.amPm)
            setFormInputs({ ...formInputs, startDate: unix })

        } else if (startDate) {
            setFormInputs({ ...formInputs, startDate: '' })
        }

        setDate({ ...date, [name]: value === '-' ? '' : value })
    }


    return (
        <Form.Field kind='addons' >
            <Form.Control>
                <Form.Label>Day</Form.Label>
                <Form.Input
                    type="date"
                    name="day"
                    value={day}
                    onChange={handleInputChange}
                    disabled={!studentId}
                />
            </Form.Control>
            <Form.Control>
                <Form.Label>Time</Form.Label>

                <Form.Select
                    name="time"
                    value={time}
                    onChange={handleInputChange}
                    disabled={!day}
                >
                    <option>-</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                </Form.Select>
            </Form.Control>
            <Form.Control>
                <Form.Label>AM/PM</Form.Label>
                <Form.Select
                    name='amPm'
                    value={amPm}
                    onChange={handleInputChange}
                    disabled={!time}

                >
                    <option>-</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </Form.Select>
                <Icon className='ml-2 mt-2'>
                    <i className={`fas fa-check ${!validateStartDate(date) && `has-text-white`}`} />
                </Icon>
            </Form.Control>
        </Form.Field>
    )
}
