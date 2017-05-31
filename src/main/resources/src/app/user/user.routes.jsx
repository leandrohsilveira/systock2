import React from 'react'

import {Route} from 'react-router-dom'

import {UserForm, PasswordChange, UserList} from './'

export default ({prefix = '/'}) => (
    <div>
        <Route exact path={`${prefix}sign-up`} render={props => (
            <UserForm {...props} submitRedirect={`${prefix}users`} />
        )} />
        <Route exact path={`${prefix}users/:id/password`} render={props => (
            <PasswordChange {...props} submitRedirect={`${prefix}users`} />
        )} />
        <Route exact path={`${prefix}users`} component={UserList} />
    </div>
)