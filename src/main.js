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
      googleUserImg: ''
    }
  },
  mutations: {
    changeGoogleUserName (state, status) {
      state.googleUserName = status
    },
    changeGoogleUserImg (state, status) {
      state.googleUserImg = status
    }

  },
  actions: {
    updateGoogleUserName (context, status) {
      context.commit('changeGoogleUserName', status)
    },
    updateGoogleUserImg (context, status) {
      context.commit('changeGoogleUserImg', status)
    }
  }
})

app.use(store)
app.use(router)
app.mount('#app')
