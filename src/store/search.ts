import { defineStore } from 'pinia'
import { getCookies, setCookies } from '@/utils/cookies.ts'
import { getsearchhot, getcloudsearch, geteggsstu, getTrackAll, getdetail, getSongUrl, getcheckmusic, getlyric } from '@/api/search.ts'
import debounce from '@/hooks/debounce.ts'
import realFormatSecond from '@/hooks/realFormatSecond.ts'
import formatLyric from '@/hooks/formatLyric.ts'
import { json } from 'stream/consumers'
export const searchStore = defineStore({
  id: 'search', // id必填，且需要唯一
  state: () => {
    return {
      options: [], //搜索关键词列表
      singlelist: [], //单曲列表
      skip_state: true,
      skip_state_search: true,
      songCount: 0,
      songurl: {}, //歌曲地址
      lyric: [], //歌词
      current_time: '', //当前播放时间
      detail: {}, //歌单详情
      allsong: [], //全部歌曲
      songbg: '', //背景图
      songinfo: null //歌曲信息
    }
  },
  actions: {
    // 热搜简略
    updateHot() {
      getsearchhot().then((res: any) => {
        if (res.code === 200) {
          this.options = res.data
        }
      })
    },
    //搜索
    updateSearch(vl: object) {
      getcloudsearch(vl).then(async (res: any) => {
        if (res.code === 200) {
          let songs = res.result.songs
          this.singlelist = songs
          this.songCount = res.result.songCount
        }
      })
    },
    //搜索建议
    updateEggsstu(vl: object) {
      geteggsstu(vl).then((res: any) => {
        this.options = res.result.songs
      })
    },
    //获取歌单所有单曲
    updateTrackAll(vl: object) {
      getTrackAll(vl).then(async (res: any) => {
        if (res.code === 200) {
          let songs = res.songs
          this.singlelist = songs
        }
      })
    },
    //获取歌单详情
    udatGetdetail(vl: any) {
      const { id } = vl
      getdetail({ id }).then((res: any) => {
        this.songCount = res.playlist.trackCount
        this.detail = res
        this.updateTrackAll(vl)
      })
    },
    //获取歌曲地址
    updategetSongUrl(vl: any) {
      let obj = { ...vl }
      return getSongUrl({ id: vl }).then((res: any) => {
        if (res.code === 200) {
          let data: any = res.data[0]
          obj.url = data
          this.songurl = obj
        }
      })
    },
    //url是否可用
    updategetcheckmusic(vl: any) {
      return getcheckmusic({ id: vl }).then((res: any) => {
        return { success: res.success }
      })
    },
    //获取歌词
    updategetlyric(vl: any) {
      const { id } = vl
      getlyric({ id }).then((res: any) => {
        if (res.code === 200) {
          let lrc = res.lrc.lyric
          this.lyric = formatLyric(lrc)
          // this.songurl = vl
        }
      })
    },
    //全部播放
    updateAll(index: number = 0) {
      this.allsong = []
      this.allsong = JSON.parse(JSON.stringify(this.singlelist))
      this.updategetlyric(this.allsong[index])
    }
  }
})
