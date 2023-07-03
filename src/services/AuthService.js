import store from '../store'

export function isLoggedIn() {
    const token = localStorage.getItem('token')
    return token != null
}

function setToken(token) {
    localStorage.setItem('token', JSON.stringify(token))
    store.dispatch('authenticate')
}

export function login() {
    const token = {
        username: 'jeff'
    }
    setToken(token);
}

export function getUsername() {
    return 'jeff'
}

export function getUserId() {
    return 0
}