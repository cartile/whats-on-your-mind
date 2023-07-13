import store from '../store'
import axios from 'axios'

export function http() {
    return axios.create({
        baseUrl: store.state.apiUrl
    })
}