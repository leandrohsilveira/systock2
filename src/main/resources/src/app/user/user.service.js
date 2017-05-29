import axios from 'axios'

export default class UserService {

    static save(user) {
        return axios.post('/api/users', user);
    }

    static findAll(page, size, sort) {
        return axios.get(`/api/users?page=${page}&size=${size}&sort=${sort}`)
                    .then(resp => resp.data)
    }
}