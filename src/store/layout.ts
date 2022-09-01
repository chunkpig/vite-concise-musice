import { defineStore } from 'pinia'
export const LayoutStore = defineStore({
  id: 'layout', // id必填，且需要唯一
  state: () => {
    return {
      layoutbottom: false,
      play: false //播放/暂停
    }
  },
  actions: {
    updatellayoutbottom() {
      this.layoutbottom = !this.layoutbottom
    },
    //更新play
    updatePlay() {
      this.play = !this.play
    }
  }
})
