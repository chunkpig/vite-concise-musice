import axios from 'axios'
import Vue from 'vue'
import { ElMessage } from 'element-plus'
const service = axios.create({
  baseURL: '/api', //process.env.VITE_APP_API, // api 的 base_url process.env.VUE_APP_BASE_API
  timeout: 50000 // 请求超时时间
})
//请求
service.interceptors.request.use(config => {
  // if (getCache('accessToken')) {
  //   config.headers['Authorization'] = 'Bearer ' + getCache('accessToken'); // 让每个请求携带自定义 token 请根据实际情况自行修改
  //   config.headers['X-Authorization'] = 'Bearer ' + getCache('X-Authorization'); // 让每个请求携带自定义 token 请根据实际情况自行修改      }
  // }
  return config
})
service.interceptors.response.use(
  response => {
    const res = response.data

    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response) {
      ElMessage.closeAll()
      switch (error.response.status) {
        case 401:
          break
        case 404:
          ElMessage({
            message: '很抱歉，资源未找到!',
            type: 'error'
          })
          break
        case 500:
          ElMessage({
            message: '网络错误，请稍后再试!',
            type: 'error'
          })
          break
        case 503:
          ElMessage({
            message: '系统错误，请稍后再试!',
            type: 'error'
          })
          break
        case 504:
          ElMessage({
            message: '网络超时，请稍后再试!',
            type: 'error'
          })
          break
      }

      return Promise.reject(error)
    }
  }
)
export default service
