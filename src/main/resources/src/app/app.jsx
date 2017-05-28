import React, {Component} from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {BrowserRouter} from 'react-router-dom'

import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import appReducer from './app.reducer'
import AppRoutes from './app.routes'
import {Messages} from './widgets'

export default props => {

    injectTapEventPlugin();
    const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    const store = applyMiddleware(thunk, multi, promise)(createStore)(appReducer, devTools)

    return (
        <Provider store={store}>
            <div>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
                <Messages />
            </div>
        </Provider>
    )
}