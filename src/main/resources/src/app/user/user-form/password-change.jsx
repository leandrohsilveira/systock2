import React, {Component} from 'react'
import {reduxForm, formValueSelector} from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toastr} from 'react-redux-toastr'

import Card from 'react-toolbox/lib/card/Card'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
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
export default class PasswordChange extends Component {

    state = {
        user: {}
    }

    componentDidMount() {
        const {changeTitle, match, history, submitRedirect = '/'} = this.props
        const {id} = match.params
        UserService.findOne(id)
                    .then(user => {
                        this.setState({user})
                        changeTitle("Change password")
                    })
                    .catch(resp => {
                        UserService.handleError(resp)
                        history.push(submitRedirect)
                    })
    }

    handlePasswordChangeSubmit = (values) => {
        const {match, history, submitRedirect = '/'} = this.props
        const {id} = match.params
        UserService.save({...values, id})
                .then(resp => {
                    toastr.success('Success', 'Password change successful')
                    history.push(submitRedirect)
                })
                .catch(resp => UserService.handleError(resp))

    }

    render() {
        const {password, handleSubmit, invalid} = this.props
        const {user} = this.state
        const {handlePasswordChangeSubmit} = this
        return (
            <div className="content">
                <div className="row center-xs">
                    <div className="col-xs-12 col-sm-9 col-md-6">
                        <form noValidate onSubmit={handleSubmit(values => handlePasswordChangeSubmit(values))}>
                            <Card>
                                <CardTitle title={UserService.getFullName(user.profile)}
                                            subtitle={user.username} />
                                <CardText>
                                    <Field name="currentPassword" label="Current" type="password" validators={{required: true, text: {min: 6}}} />
                                    <Field name="password" label="Password" type="password" validators={{required: true, text: {min: 6}}} />
                                    <Field name="confirmPassword" label="Confirm password" type="password" validators={{required: true, text: {min: 6}, match: {name: "Password", value: password}}} />
                                </CardText>
                                <CardActions>
                                    <div className="flex flex-row-reverse">
                                        <div className="flex flex-self-center">
                                            <Button disabled={invalid} type="submit" label="Change" icon="send" raised primary />
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