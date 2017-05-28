import React, {Component} from 'react'

import {Field as ReduxField} from 'redux-form'

import Input from './input'
import Select from './select'

const INTEGER_REGEX = /^-?\d+?$/
const FLOAT_REGEX = /^-?\d+(\.\d+)?$/
const EMAIL_REGEX = /\S+@\S+\.\S+/
const PASSWORD_REGEX = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

export default class Field extends Component {

    getValidators = () => {
        const validatorFunctions = []
        const {validators = {}, label} = this.props
        const {required, number, match, email, password, text} = validators
        if(required) {
            validatorFunctions.push((value) => !value ? `The "${label}" field is required` : undefined)
        }
        if(number) {
            const {min, max, int = false} = number
            if(int) {
                validatorFunctions.push((value) => !INTEGER_REGEX.test(value) ? `The "${label}" field must be an integer number` : undefined)
            } else {
                validatorFunctions.push((value) => !FLOAT_REGEX.test(value) ? `The "${label}" field must be a number` : undefined)
            }

            if(min !== undefined) {
                validatorFunctions.push((value) => +min > +value ? `The "${label}" field must be greater than ${min}` : undefined)
            }
            if(max !== undefined) {
                validatorFunctions.push((value) => +value > +max ? `The "${label}" field must be lesser than ${max}` : undefined)
            }
        }
        if(text) {
            const {min, max, pattern} = text
            if(pattern) {
                const {regex, text} = pattern
                validatorFunctions.push((value) => regex && regex.test(value) ? text || `The "${label}" field must match the "${regex}" pattern` : undefined)
            }
            if(min !== undefined) {
                validatorFunctions.push((value) => value && value.length < min ? `The "${label}" field must be greater than ${min} characters` : undefined)
            }
            if(max !== undefined) {
                validatorFunctions.push((value) => value && value.length > max ? `The "${label}" field must be lesser than ${max} characters` : undefined)
            }
        }
        if(match) {
            validatorFunctions.push((value) => value !== match.value ? `The "${label}" field must match "${match.name}" field` : undefined)
        }
        if(email) {
            const regex = email instanceof RegExp ? email : EMAIL_REGEX
            validatorFunctions.push((value) => !regex.test(value) ? `The "${label}" field must be a valid e-mail` : undefined)
        }
        if(password) {
            const regex = password instanceof RegExp ? password : PASSWORD_REGEX
            validatorFunctions.push((value) => !regex.test(value) ? `The "${label}" field must be a valid password` : undefined)
        }

        return validatorFunctions
    }

    render() {
        const {name, label, disabled, validators, options, type = 'text', icon} = this.props
        return (
            <ReduxField name={name} 
                        validate={this.getValidators()} 
                        component={options ? Select : Input} 
                        label={label} 
                        type={type} 
                        options={options}
                        disabled={disabled} 
                        icon={icon}
                        required={validators && validators.required} />
        )
    }

}