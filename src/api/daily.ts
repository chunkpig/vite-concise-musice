import axios from '@/utils/axios.ts'

/**
 * 每日推荐
 *
 * */

export function getrecommend(params: any) {
  return axios.get('/recommend/songs', params)
}
/**
 * 最近播放
 *
 * */

export function getrecentsong(params: any) {
  return axios.get('/record/recent/song', params)
}
