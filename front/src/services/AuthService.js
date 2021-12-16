import axios from 'axios'

const url = 'http://localhost:8081/'

export default {
    login(credentials) {
        return axios.post(url + 'auth/login', credentials).then(response => response.data)
    },
    register(credentials) {
        return axios.post(url + 'auth/register', credentials).then(response => response.data)
    },
    getSecretContent() {
        return axios.get(url + 'secret-route/').then(response => response.data)
    }
}