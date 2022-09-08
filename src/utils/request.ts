import axios from 'axios'
import Vue from 'vue'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'
import { getCookies } from './cookies.ts'
axios.defaults.withCredentials = true
const service = axios.create({
  baseURL: '/api',
  // baseURL: 'http://localhost:3000', //process.env.VITE_APP_API, // api 的 base_url process.env.VUE_APP_BASE_API
  timeout: 50000, // 请求超时时间
  withCredentials: true
})
let nprogressshow = true
//请求
service.interceptors.request.use((config: any) => {
  let str = JSON.stringify(config.url).slice(1, 16)
  if (getCookies('cookiekey')) {
    let cookie = getCookies('cookiekey')
    // config.headers.cookie = cookie
    // config.headers['cookie'] = cookie
  }
  if (str != '/login/qr/check') {
    // config.headers=
    NProgress.start() // 进度条开始
  } else {
    nprogressshow = false
  }
  return config
})
service.interceptors.response.use(
  response => {
    NProgress.done()
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    NProgress.done()
    if (error.response) {
      ElMessage.closeAll()
      ElMessage({
        showClose: true,
        message: error.response.data.message,
        type: 'warning'
      })
      return Promise.reject(error)
    }
  }
)
export default service
