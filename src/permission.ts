import router from './router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
  // NProgress.start() // 进度条开始
  next()
})

router.afterEach(() => {
  // NProgress.done() // 进度条结束
})
