import { http } from './HttpService'

//Each function corresponds to a specific API endpoint 
//and makes use of the http() method to send the corresponding 
//HTTP request.

export function getAllThoughts() {
    return http().get('/thought')
}

export function getThoughtById(id) {
    return http().get(`/thought/${id}`)
}

export function createThought(thought) {
    return http().post('/thought', thought)
}

export function deleteThought(id) {
    return http().delete(`/thought/${id}`)
}

export function updateThought(thought) {
    return http().put('/thought', thought)
}

export function updateThoughtLikes(id, likes) {
    return http().put(`/thought/${id}/likes`, { likes });
}
  