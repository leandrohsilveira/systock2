import React, {Component} from 'react'
import {toastr} from 'react-redux-toastr'

import {UserForm, UserService} from '../'

export default class UserSignUp extends Component {

    handleSignUp = (values) => {
        UserService.save(values)
                    .then(resp => {
                        toastr.success('Success', 'User registration successful')
                    })
    }

    render() {
        const {handleSignUp} = this
        return (
            <div className="content">
                <div className="row center-xs">
                    <div className="col-xs-12 col-sm-9 col-md-6">
                        <UserForm passwordConfirmation={true} title="Sign up" onSubmit={handleSignUp}></UserForm>
                    </div>
                </div>
            </div>
        )
    }

}