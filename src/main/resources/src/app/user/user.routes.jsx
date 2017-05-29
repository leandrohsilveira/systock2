import React from 'react'

import {Route} from 'react-router-dom'

import {UserSignUp, UserList} from './'

export default ({prefix = '/'}) => (
    <div>
        <Route exact path={`${prefix}sign-up`} component={UserSignUp} />
        <Route exact path={`${prefix}users`} component={UserList} />
    </div>
)