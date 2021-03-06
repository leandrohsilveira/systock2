import axios from 'axios'
import {toastr} from 'react-redux-toastr'

export default class UserService {

    static save(user) {
        let promise;
        if(user.id) {
            promise = axios.patch(`/api/users/${user.id}`, user)
        } else {
            promise = axios.post('/api/users', user)
        }
        return promise
                    .catch(error => {
                        throw error.response
                    })
    }

    static findAll(page, size, sort) {
        return axios.get(`/api/users?page=${page}&size=${size}&sort=${sort}`)
                    .then(resp => resp.data)
                    .catch(error => {
                        throw error.response
                    })
    }

    static findOne(id) {
        return axios.get(`/api/users/${id}`)
                    .then(resp => resp.data)
                    .catch(error => {
                        throw error.response
                    })
    }
    
    static getFullName(profile) {
        return profile && [profile.firstName, profile.lastName].filter(v => !!v).join(' ')
    }

    static handleError(resp) {
        const {status, error, message} = resp.data
        toastr.error(`${status}: ${error}`, message)
    }


}