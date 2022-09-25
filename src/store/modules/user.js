import { loginAPI } from '@/api'

export default {
  namespaced: true,
  state: {
    token: null
  },
  getters: {

  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      // 接口的调用
      const { data: { token }} = await loginAPI(loginData)
      console.log(token)
      // 调用方法，更改state中存储的值
      commit('SET_TOKEN', token)
    }
  }
}
