<template>
  <div class="w_100 h_100">
    <transition name="fade">
      <div v-if="lyric.length > 0" class="h_100 overflow-hidden">
        <div class="w_100 h_100 relative overflowY">
          <el-scrollbar ref="scrollBarRef" height="100%" @scroll="scroll">
            <div class="lyric-item m_t_x_15" v-for="(item, index) in lyric" :key="index">
              <p class="text-center c_909AA4" :class="lyricClass(item.text, index)">
                {{ item.text }}
              </p>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { searchStore } from '@/store/search.ts'
import { LayoutStore } from '@/store/layout.ts'
const getsearchStore = searchStore()
const layoutStore = LayoutStore()
const lyric = computed(() => {
  return getsearchStore.lyric
})
/** 滚动条ref */
const scrollBarRef = ref()
/** 当前播放的歌词的索引 */
const currentLyricIndex = ref(-1)
/** 歌曲当前播放时间 */
const lyricClass = (text: string, index: number) => {
  return {
    'text-gray': currentLyricIndex.value === index - 1
  }
}
const scrollShow = ref(true)
const Timeout: any | null = ref(null)
const scrolltop = ref(0)
const scroll = (scroll: any) => {
  scrolltop.value = scroll.scrollTop
  scrollShow.value = false
  if (Timeout.value) {
    clearTimeout(Timeout.value)
    Timeout.value = null
  }
  Timeout.value = setTimeout(() => {
    scrollShow.value = true
  }, 3000)
}
watch(
  () => getsearchStore.lyric,
  (nvl, ovl) => {
    if (ovl.length > 0) {
      scrollBarRef.value.setScrollTop(0)
    }
  }
)
watch(
  () => layoutStore.play,
  (nvl, ovl) => {
    if (nvl === true) {
      const lyricEles = document.querySelectorAll('.lyric-item')
      lyricEles.forEach((ele, index) => {
        if (currentLyricIndex.value === index) {
          scrollBarRef.value.setScrollTop(ele.clientHeight)
        }
      })
    }
  }
)
watch(
  () => getsearchStore.current_time,
  (newTime, oldTime) => {
    if (newTime !== oldTime) {
      /** 获取比当前播放时间大的第一个元素 */
      for (let i = 0; i < lyric.value.length; i++) {
        if (lyric.value[i].time === getsearchStore.current_time) {
          currentLyricIndex.value = i - 1
          break
        } else if (lyric.value[i].time > getsearchStore.current_time) {
          currentLyricIndex.value = i - 2
          break
        }
      }
      let height = 0
      let num = 20
      if (currentLyricIndex.value !== 0) {
        const lyricEles = document.querySelectorAll('.lyric-item')
        lyricEles.forEach((ele, index) => {
          if (currentLyricIndex.value >= index) {
            height += ele.clientHeight
            num += 10
          }
        })
        if (height >= 135) {
          if (scrollShow.value) {
            scrollBarRef.value.setScrollTop(height - 100 + num)
          }
        }
      }
    }
  }
)
</script>
<style lang="scss" scoped>
.layout-lyric {
  overflow: hidden;
}
</style>
