import { createStore } from 'vuex'
import * as auth from '../services/AuthService'

export default createStore({
  state: {
    isLoggedIn: false,
    apiUrl: 'https://localhost:3000',
    username: null,
    userid: null,
  },
  getters: {
  },
  mutations: {
    authenticate(state) {
      state.isLoggedIn = auth.isLoggedIn()
      if (state.isLoggedIn) {
        state.username = auth.getUsername()
        state.userId = auth.getUserId()
      } else {
        state.userId = null
        state.username = null
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
