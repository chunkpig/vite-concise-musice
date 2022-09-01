import axios from '@/utils/axios.ts'

/**
 * 歌单分类
 *
 * */

export function gecatlist(params: any) {
  return axios.get('/playlist/catlist', params)
}
/**
 * 获取热门歌单
 *
 * */

export function gethot(params: any) {
  return axios.get('/playlist/hot', params)
}
/**
 * 获取网友精选歌单
 *
 * */

export function geplaylist(params: any) {
  return axios.get('/top/playlist', params)
}
/**
 * 我的歌单
 *
 * */
export function getuserplaylist(params: any) {
  return axios.get('/user/playlist', params)
}
