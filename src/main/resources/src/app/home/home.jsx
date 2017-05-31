import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'

import Button from 'react-toolbox/lib/button/Button'
import {changeTitle} from '../layout'

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => bindActionCreators({changeTitle}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component {

    componentWillMount() {
        const {changeTitle} = this.props
        changeTitle('Home')
    }

    render() {
        return (
            <div className="content">
                <h3>Wellcome to systock!</h3>
                <p>
                    <Button icon="exit_to_app" label="Login here" raised primary />
                </p>
                <p>New employee? click <Link to="/sign-up">here</Link> to sign-up and then ask to the administrator to assign you to a employee role.</p>
            </div>
        )
    }
}