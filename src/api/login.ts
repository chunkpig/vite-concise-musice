import axios from '@/utils/axios.ts'
/**
 * 游客登录
 *
 * */

export function anonimous(params: any) {
  return axios.get(`/register/anonimous?timerstamp=${Date.now()}`, params)
}
/**
 * 登录状态
 *
 * */

export function poststatus(params: any) {
  return axios.post(`/login/status?timerstamp=${Date.now()}`, params)
}

/**
 * 二维码 key 生成接口
 *
 * */

export function loginqrkey(params: any) {
  return axios.get(`/login/qr/key?timerstamp=${Date.now()}`, params)
}

/**
 * 二维码生成接口
 *
 * */

export function loginqrcreate(params: any) {
  return axios.get(`/login/qr/create?timerstamp=${Date.now()}`, params)
}

/**
 *  二维码检测扫码状态接口
 *
 * */

export function loginqrcheck(params: any) {
  return axios.get(`/login/qr/check?key=${params}&timerstamp=${Date.now()}`)
}

/**
 *  退出
 *
 * */

export function logout(params: any) {
  return axios.get('/logout')
}
