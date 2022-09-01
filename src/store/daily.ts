import { defineStore } from 'pinia'
import { getCookies, setCookies } from '@/utils/cookies.ts'
import { getrecommend, getrecentsong } from '@/api/daily.ts'

export const DailyStore = defineStore({
  id: 'daily', // id必填，且需要唯一
  state: () => {
    return {
      dailylist: []
    }
  },
  actions: {
    //每日推荐
    updaterecommend() {
      getrecommend().then((res: any) => {
        if (res.code === 200) {
          this.dailylist = res.data.dailySongs
        }
      })
    },
    //最近播放
    updaterecent() {
      getrecentsong().then((res: any) => {
        if (res.code === 200) {
          let list = res.data.list
          this.dailylist = list.map((item: any) => item.data)
          // console.log(arr)
          // this.dailylist = list.filter((item: any) => item.data)
        }
      })
    }
  }
})
