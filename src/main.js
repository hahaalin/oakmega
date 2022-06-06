import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
const app = createApp(App)
app.use(vue3GoogleLogin, {
  clientId: '702499624062-e52p5t0acdvs3njfb44njaaqjo064kfi.apps.googleusercontent.com'
})
// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      googleUserName: '',
      googleUserImg: '',
      FB: null
    }
  },
  mutations: {
    changeGoogleUserName (state, payload) {
      state.googleUserName = payload
    },
    changeGoogleUserImg (state, payload) {
      state.googleUserImg = payload
    },
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
    updateGoogleUserName (context, payload) {
      context.commit('changeGoogleUserName', payload)
    },
    updateGoogleUserImg (context, payload) {
      context.commit('changeGoogleUserImg', payload)
    }

  }
})

app.use(store)
app.use(router)
app.mount('#app')
