import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {UserForm, signUp} from '../'

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => bindActionCreators({signUp}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class UserSignUp extends Component {

    handleSignUp = (values) => {
        const {signUp} = this.props
        signUp(values)
    }

    render() {
        const {handleSignUp} = this
        return (
            <div className="content">
                <div className="row center-xs">
                    <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6">
                        <UserForm passwordConfirmation={true} title="Sign up" onSubmit={handleSignUp}></UserForm>
                    </div>
                </div>
            </div>
        )
    }

}