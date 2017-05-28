import React, {Component} from 'react'
import {reduxForm, formValueSelector} from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Card from 'react-toolbox/lib/card/Card'
import CardText from 'react-toolbox/lib/card/CardText'
import CardActions from 'react-toolbox/lib/card/CardActions'
import Button from 'react-toolbox/lib/button/Button'

import {USER, USER_FORM_NAME} from '../'
import {Field} from '../../widgets'
import {changeTitle} from '../../layout'

const selector = formValueSelector(USER_FORM_NAME)
const mapStateToProps = state => ({password: selector(state, 'password')})
const mapDispatchToProps = dispatch => bindActionCreators({changeTitle}, dispatch)

@reduxForm({form: USER_FORM_NAME})
@connect(mapStateToProps, mapDispatchToProps)
export default class UserForm extends Component {
    
    componentDidMount() {
        const {changeTitle, title} = this.props
        changeTitle(title)
    }

    render() {
        const {passwordConfirmation, password, children, handleSubmit, invalid} = this.props
        return (
            <form noValidate onSubmit={handleSubmit}>
                <Card>
                    <CardText>
                        <Field name="username" label="Username" validators={{required: true, text: {min: 3}}} />
                        <Field name="password" label="Password" type="password" validators={{required: true, text: {min: 6}}} />
                        {passwordConfirmation && (
                            <Field name="confirmPassword" label="Confirm password" type="password" validators={{required: true, text: {min: 6}, match: {name: "Password", value: password}}} />
                        )}
                    </CardText>
                    <CardActions>
                        {children}
                        <Button disabled={invalid} type="submit" label="Submit" icon="send" raised primary />
                    </CardActions>
                </Card>
            </form>
        )
    }
}