import axios from 'axios'

const url = 'http://localhost:8081/api/'

export default {
    login(credentials) {
        return axios.post(url + 'login/', credentials).then(response => response.data)
    },
    register(credentials) {
        return axios.post(url + 'register/', credentials).then(response => response.data)
    },
    getSecretContent() {
        return axios.get(url + 'secret-route/').then(response => response.data)
    },
    getPosts() {
        return axios.get(url + 'posts/').then(response => response.data)
    },
    createPost(post) {
        return axios.post(url + 'create/', post).then(response => response.data)
    }
}