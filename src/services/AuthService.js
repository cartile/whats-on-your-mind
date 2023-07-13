import store from '../store'
import { http } from './HttpService'

export function isLoggedIn() {
    const token = localStorage.getItem('token')
    return token != null
}

function setToken(token) {
    localStorage.setItem('token', JSON.stringify(token))
    store.dispatch('authenticate')
}

export function login(user) {
    return http().post('/auth', user)
    .then(res => {
        if(res){
            console.log(res)
            const fakeToken = {
                token: 'my-token'
            }
            setToken(fakeToken)
        }
    })
}

export function getUsername() {
    return 'jeff'
}

export function getUserId() {
    return 0
}

export function registerUser(user) {
    return http().post('/register', user)
}