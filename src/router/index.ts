import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import login from '@/views/login/index.vue'
import Layout from '@/Layout/index.vue'
const routes = [
  {
    path: '/',
    name: 'Login',
    meta: {
      title: 'Login'
    },
    component: login
  },
  {
    path: '/Layout',
    name: 'Layout',
    meta: {
      title: 'Layout'
    },
    component: Layout,
    children: [
      {
        path: '/Layout/home',
        name: 'Home',
        meta: {
          title: 'Home'
        },
        component: () => import('@/views/home/index.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
export default router
