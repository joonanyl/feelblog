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
    },
    getPosts() {
        return axios.get(url + 'posts/').then(response => response.data)
    },
    createPost(post) {
        return axios.post(url + 'profile/myposts/', post).then(response => response.data)
    }
}