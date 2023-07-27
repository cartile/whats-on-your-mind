import { createStore } from 'vuex'
import * as auth from '../services/AuthService'

export default createStore({
  state: {
    isLoggedIn: false,
    apiUrl: `${window.location.protocol}//${window.location.hostname}:3000/api`,
    username: null,
    userid: null,
    user: null
  },
  getters: {
  },
  mutations: {
    authenticate(state) {
      state.isLoggedIn = auth.isLoggedIn()
      if (state.isLoggedIn) {
        state.username = auth.getUsername()
        state.userId = auth.getUserId()
        state.user = auth.getUser()
      } else {
        state.userId = null
        state.username = null
        state.user = null
      }
    }
  },
  actions: {
    authenticate(context) {
      context.commit('authenticate')
    }
  },
  modules: {
  }
})
