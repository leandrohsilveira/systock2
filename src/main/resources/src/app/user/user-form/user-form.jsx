import React, {Component} from 'react'
import {reduxForm, formValueSelector} from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toastr} from 'react-redux-toastr'

import Card from 'react-toolbox/lib/card/Card'
import CardText from 'react-toolbox/lib/card/CardText'
import CardActions from 'react-toolbox/lib/card/CardActions'
import Button from 'react-toolbox/lib/button/Button'

import {USER, USER_FORM_NAME, UserService} from '../'
import {Field} from '../../widgets'
import {changeTitle} from '../../layout'

const selector = formValueSelector(USER_FORM_NAME)
const mapStateToProps = state => ({password: selector(state, 'password')})
const mapDispatchToProps = dispatch => bindActionCreators({changeTitle}, dispatch)

@reduxForm({form: USER_FORM_NAME})
@connect(mapStateToProps, mapDispatchToProps)
export default class UserForm extends Component {
    
    componentDidMount() {
        const {changeTitle} = this.props
        changeTitle("Sign up")
    }

    handleSignUp = (values) => {
        const {history, submitRedirect = '/'} = this.props
        UserService.save(values)
                    .then(resp => {
                        toastr.success('Success', 'User registration successful')
                        history.push(submitRedirect)
                    })
                    .catch((resp) => {
                        UserService.handleError(resp)
                    })
    }

    render() {
        const {password, handleSubmit, invalid} = this.props
        const {handleSignUp} = this
        return (
            <div className="content">
                <div className="row center-xs">
                    <div className="col-xs-12 col-sm-9 col-md-6">
                        <form noValidate onSubmit={handleSubmit(values => handleSignUp(values))}>
                            <Card>
                                <CardText>
                                    <Field name="username" label="Username" validators={{required: true, text: {min: 3}}} />
                                    <Field name="password" label="Password" type="password" validators={{required: true, text: {min: 6}}} />
                                    <Field name="confirmPassword" label="Confirm password" type="password" validators={{required: true, text: {min: 6}, match: {name: "Password", value: password}}} />
                                    <Field name="profile.firstName" label="First name" validators={{required: true, text: {min: 2}}} />
                                    <Field name="profile.lastName" label="Last name" validators={{text: {min: 2}}} />
                                    <Field name="profile.email" label="E-mail" type="email" validators={{required: true, email: true}} />
                                </CardText>
                                <CardActions>
                                    <div className="flex flex-row-reverse">
                                        <div className="flex flex-self-center">
                                            <Button disabled={invalid} type="submit" label="Sign-up" icon="send" raised primary />
                                        </div>
                                    </div>
                                </CardActions>
                            </Card>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}