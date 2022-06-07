import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import { store } from './store'

const app = createApp(App)
app.use(vue3GoogleLogin, {
  clientId: '702499624062-e52p5t0acdvs3njfb44njaaqjo064kfi.apps.googleusercontent.com'
})
app.use(store)
app.use(router)
app.mount('#app')
