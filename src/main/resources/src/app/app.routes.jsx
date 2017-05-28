import React from 'react';

import {Route, Redirect} from 'react-router'

import AppLayout from './layout'
import Home from './home'

import {UserRoutes} from './user'

export default props => (
    <div>
        <Route render={() => (
            <AppLayout>
                <Route exact path="/" component={Home} />
                <UserRoutes />
            </AppLayout>
        )} />
    </div>
)