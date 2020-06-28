import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    auth: {},
    userInfo: {},
    login: false,
    searchKw: ''
  },
  mutations: {
    setAuth: (state, auth) => {
      state.auth = auth
    },
    setUserInfo: (state, user) => {
      state.userInfo = user
      mpvue.setStorageSync('userInfo', state.userInfo)
    },
    updateLogin: (state, isLogin) => {
      state.login = isLogin
      mpvue.setStorageSync('login', state.login)
    },
    updateSearchKw: (state, kw) => {
      state.searchKw = kw
    }
  },
  actions: {
    getAuthInfo: ({ commit}) => {
      mpvue.getSetting({
        success: res => {
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
