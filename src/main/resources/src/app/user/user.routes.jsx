import React from 'react'

import {Route} from 'react-router-dom'

import {UserSignUp} from './'

export default ({prefix = '/'}) => (
    <div>
        <Route exact path={`${prefix}sign-up`} component={UserSignUp} />
    </div>
)