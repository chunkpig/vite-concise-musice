import { defineStore } from 'pinia'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies.ts'
import { inspect } from '@/utils/inspect.ts'
import { poststatus, logout } from '@/api/login.ts'
export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      userinfo: inspect('userinfo'),
      cookiekey: inspect('cookiekey')
    }
  },
  actions: {
    updateUserinfo(value: object) {
      this.userinfo = value
      setCookies('userinfo', value)
    },
    updateKey(value: string) {
      this.cookiekey = value
      setCookies('cookiekey', value)
    },
    //更新登录状态
    updateStatus() {
      poststatus({ cookie: this.cookiekey }).then((res: any) => {
        const { profile } = res.data
        if (profile) {
          this.updateUserinfo(profile)
        }
      })
    },
    //退出
    userlayout() {
      logout().then((res: any) => {
        removeCookies('userinfo')
        removeCookies('cookiekey')
        this.userinfo = null
        this.cookiekey = ''
      })
    }
  }
})
