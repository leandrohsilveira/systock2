import React, {Component} from 'react'
import {reduxForm, initialize} from 'redux-form'
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

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => bindActionCreators({changeTitle, initialize}, dispatch)

@reduxForm({form: USER_FORM_NAME})
@connect(mapStateToProps, mapDispatchToProps)
export default class ProfileForm extends Component {
    
    state = {
        profile: {},
        username: ''
    }

    componentDidMount() {
        const {changeTitle, match, history, initialize, submitRedirect = '/'} = this.props
        const {id} = match.params
        UserService.findOne(id)
                    .then(user => {
                        initialize(USER_FORM_NAME, user)
                        this.setState({profile: user.profile, username: user.username})
                        changeTitle("User profile")
                    })
                    .catch(resp => {
                        UserService.handleError(resp)
                        history.push(submitRedirect)
                    })
    }

    handleProfileSave = (values) => {
        const {history, match, submitRedirect = '/'} = this.props
        const {id} = match.params
        UserService.save({...values, id})
                    .then(resp => {
                        toastr.success('Success', 'Profile successfully saved')
                        history.push(submitRedirect)
                    })
                    .catch((resp) => {
                        UserService.handleError(resp)
                    })
    }

    render() {
        const {password, handleSubmit, invalid} = this.props
        const {profile, username} = this.state
        const {handleProfileSave} = this
        return (
            <div className="content">
                <div className="row center-xs">
                    <div className="col-xs-12 col-sm-9 col-md-6">
                        <form noValidate onSubmit={handleSubmit(values => handleProfileSave(values))}>
                            <Card>
                                <CardTitle title={UserService.getFullName(profile)}
                                            subtitle={username} />
                                <CardText>
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