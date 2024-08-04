import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import Guard from '../services/middleware'
import CadUserView from '@/views/CadUserView.vue'
import CadProdView from '@/views/CadProdView.vue'

const routes = [

  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },

  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: Guard.auth
  },

  {
    path: '/cadastro-usuario',
    name: 'CadUser',
    component: CadUserView
  },

  {
    path: '/cadastro-produtos',
    name: 'CadProd',
    component: CadProdView,
    beforeEnter: Guard.auth
  },

  {
    path: '/about',
    name: 'about',
    beforeEnter: Guard.auth,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
