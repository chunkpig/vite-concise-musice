import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import login from '@/views/login/index.vue'
const routes = [
  {
    path: '/',
    redirect: '/music/song'
  },
  {
    path: '/music',
    name: 'music',
    meta: {
      title: 'music'
    },
    component: () => import('@/views/music/index.vue'),

    children: [
      {
        path: '/music/search',
        name: 'search',
        meta: {
          title: '搜索',
          active: 0,
          keepAlive: false
        },
        component: () => import('@/views/search/index.vue')
      },
      {
        path: '/music/song',
        name: 'Song',
        meta: {
          title: '歌单',
          active: 1,
          keepAlive: true
        },
        component: () => import('@/views/song/index.vue')
      },
      {
        path: '/music/daily',
        name: 'daily',
        meta: {
          title: '每日推荐',
          active: 2,
          keepAlive: false
        },
        component: () => import('@/views/daily/index.vue')
      },
      {
        path: '/music/details',
        name: 'details',
        meta: {
          title: '歌曲',
          active: null,
          keepAlive: false
        },
        component: () => import('@/views/details/index.vue')
      },
      {
        path: '/music/recent_play',
        name: 'recent_play',
        meta: {
          title: '最近播放',
          active: 3,
          keepAlive: false
        },
        component: () => import('@/views/recent_play/index.vue')
      },
      {
        path: '/music/mysong',
        name: 'mysong',
        meta: {
          title: '我的歌单',
          active: 4,
          keepAlive: false
        },
        component: () => import('@/views/mysong/index.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
export default router
