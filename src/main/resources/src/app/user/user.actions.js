import axios from 'axios'
import {toastr} from 'react-redux-toastr'

export const USER_FORM_NAME = 'userForm'

export const USER = {
    SIGNED_UP: 'USER.SIGNED_UP'
}

export const signUp = values => {
    return dispatch => {

        axios.post('/api/users', values)
                .then(resp => {
                    toastr.success('User successfully registrated')
                    return resp
                })
                .then(resp => dispatch({
                    type: USER.SIGNED_UP
                }))

    }
}