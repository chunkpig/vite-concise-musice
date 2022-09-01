import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { getCookies, setCookies } from '@/utils/cookies.ts'
import { loginqrkey, loginqrcreate, loginqrcheck, poststatus } from '@/api/login.ts'

export const LoginOutStore = defineStore({
  id: 'loginout', // id必填，且需要唯一
  state: () => {
    return {
      key: '', //二维码key
      imgurl: '', //二维码地址
      visible: false, //二维码弹窗
      setTimer: <any | null>null,
      message: '' //二维码提示信息
    }
  },
  actions: {
    //获取二维码key
    register() {
      loginqrkey().then((res: any) => {
        if (res.code === 200) {
          this.key = res.data.unikey
          this.create()
        }
      })
    },
    //获取二维码
    create() {
      const { key } = this
      loginqrcreate({ key, qrimg: true }).then((res: any) => {
        if (res.code === 200) {
          this.imgurl = res.data.qrimg
          this.visible = true
          this.qrcheck()
        }
      })
    },
    // 二维码状态
    qrcheck() {
      this.cleartime()
      const { key } = this
      this.setTimer = setInterval(() => {
        loginqrcheck(key).then((res: any) => {
          this.message = res.message
          if (res.code === 800) {
            this.cleartime()
          }
          if (res.code === 803) {
            const status = useUserStore()
            this.cleartime()
            this.visible = false
            status.cookiekey = res.cookie
            status.updateKey(res.cookie)
            status.updateStatus()
          }
        })
      }, 3000)
    },
    //清除时间
    cleartime() {
      if (this.setTimer) {
        clearInterval(Number(this.setTimer))
        this.setTimer = null
      }
    }
  }
})
