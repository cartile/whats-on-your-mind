import store from '../store'
import { http } from './HttpService'
import jwt from 'jsonwebtoken'

export function isLoggedIn() {
    const token = localStorage.getItem('token')
    return token != null
}

export function logout() {
    localStorage.clear()
    store.dispatch('authenticate')
}
function setToken(token) {
    localStorage.setItem('token', token)
    store.dispatch('authenticate')
}

export function login(user) {
    return http().post('auth', user)
    .then(res => {
        if(res.status === 200) {
            setToken(res.data.token)
        }
    })
    .catch(error => {
        console.error('Error during login:, error')
        throw error
    })
}

export function getToken() {
    return localStorage.getItem('token')
}

export function getUsername() {
    const token = decodeToken()
    if (!token){
        return null
    }
    return token.user.username
}

export function getUserId() {
    const token = decodeToken()
    if (!token){
        return null
    }
    return token.user.id
}

export function getUser() {
    const token = decodeToken()
    if (!token){
        return null
    }
    return token.user
}

export function registerUser(user) {
    return http().post('/register', user)
}

function decodeToken() {
    const token = getToken()
    if(!token) {
        return null
    }
    return jwt.decode(token)
}