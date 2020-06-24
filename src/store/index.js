import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    auth: {},
    userInfo: {},
    login: false,
  },
  mutations: {
    setAuth: (state, auth) => {
      state.auth = auth
    },
    setUserInfo: (state, user) => {
      state.userInfo = user
    },
    updateLogin: (state, isLogin) => {
      state.login = isLogin
    }
  },
  actions: {
    getAuthInfo: ({ commit}) => {
      mpvue.getSetting({
        success: res => {
          console.log(res)
          commit('setAuth', res)
        },
        fail: err => {
          console.log(err)
        }
      })
    }
  }
})

export default store
