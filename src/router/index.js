import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/googleLogin',
    name: 'GoogleLogin',
    component: () => import('../views/GoogleLogin.vue')
  },
  {
    path: '/fbLogin',
    name: 'FbLogin',
    component: () => import('../views/FbLogin.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
