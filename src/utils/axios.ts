import request from './request'
let axios = {}
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
axios.get = function (url, params = null) {
  return new Promise((resolve, reject) => {
    request
      .get(url, {
        params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(e => {
        reject(e)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

axios.post = function (url, params) {
  return new Promise((resolve, reject) => {
    request
      .post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(e => {
        reject(e)
      })
  })
}

/**
 * put方法
 * @param {*} url
 * @param {*} params
 * @returns
 */

axios.put = function (url, params) {
  return new Promise((resolve, reject) => {
    request
      .put(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(e => {
        reject(e)
      })
  })
}
/**
 * delete方法
 * @param {*} url
 * @param {*} params
 * @returns
 */

axios.delete = function (url, params) {
  return new Promise((resolve, reject) => {
    request
      .delete(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(e => {
        reject(e)
      })
  })
}
axios.download = function (url, params) {
  return new Promise((resolve, reject) => {
    request({
      method: 'get',
      url: url, // 请求地址
      data: params, // 参数
      responseType: 'blob' // 表明返回服务器返回的数据类型
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(e => {
        reject(e)
      })
  })
}
export default axios
