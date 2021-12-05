import React from 'react'
import { Form, Icon } from 'react-bulma-components'

export const FormInput = ({ label, name, type, value, icon, onChange, validate }) => {
    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Form.Control>
                <Form.Input
                    type={type ? type : 'text'}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                <Icon align='left'>
                    <i className={icon}></i>
                </Icon>
                {(validate ? validate(value) : value) &&
                    <Icon align="right">
                        <i className="fas fa-check" />
                    </Icon>
                }
            </Form.Control>
        </>
    )
}