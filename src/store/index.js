import { createStore } from 'vuex'
// 创建一个新的 store 实例
export const store = createStore({
  state () {
    return {
      FB: null
    }
  },
  mutations: {
    setFB (state, payload) {
      state.FB = payload
    },
    loginOut (state) {
      // 檢查登入狀態
      console.log('登出')
      state.FB.logout()
    }
  },
  actions: {
  }
})
