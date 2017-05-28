import React from 'react'
import {Link} from 'react-router-dom'

import Button from 'react-toolbox/lib/button/Button'

export default ({}) => (
    <div className="content">
        <h3>Wellcome to systock!</h3>
        <p>
            <Button icon="exit_to_app" label="Login here" raised primary />
        </p>
        <p>New employee? click <Link to="/sign-up">here</Link> to sign-up and then ask to the administrator to assign you to a employee role.</p>
    </div>
)