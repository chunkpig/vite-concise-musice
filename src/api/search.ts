import axios from '@/utils/axios.ts'

/**
 * 默认搜索关键词
 *
 * */

export function getsearchdefault(params: any) {
  return axios.get('/search/default', params)
}

/**
 * 热搜列表(简略)
 *
 * */

export function getsearchhot(params: any) {
  return axios.get('/search/hot', params)
}

/**
 * 搜索
 *
 * */

export function getcloudsearch(params: any) {
  return axios.get('/cloudsearch', params)
}
/**
 * 搜索建议
 *
 * */

export function geteggsstu(params: any) {
  return axios.get('/search/eggsstu', params)
}

/**
 *  获取歌单所有歌曲
 *
 * */

export function getTrackAll(params: any) {
  return axios.get('/playlist/track/all', params)
}
/**
 *  获取歌单所有歌曲
 *
 * */
export function getdetail(params: any) {
  return axios.get('/playlist/detail', params)
}
/**
 *  获取歌曲地址
 *
 * */
export function getSongUrl(params: any) {
  return axios.get('/song/url', params)
}

/**
 *  查看歌曲是否可用
 *
 * */
export function getcheckmusic(params: any) {
  return axios.get('/check/music', params)
}
/**
 * 获取歌词
 */

export function getlyric(params: any) {
  return axios.get('/lyric', params)
}
