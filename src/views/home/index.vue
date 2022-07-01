<template>
  <div class="width height">
    <Navigation />
    <template v-for="item in state.playlist" :key="item.userId">
      <div
        class="music relative height100px cursor-pointer margin-auto margin-top20px margin-bottom50px border-cad6e1 border-radius4 background-fiilter background-size overflow-hidden"
        :style="`background:url(${item.coverImgUrl}) no-repeat center; background-size: cover;`"
      >
        <div class="width height opacity background-fiilter background overflow-hidden" />

        <div class="absolute top left">
          <h2 class="text-center margin-top6">
            {{ item.name }}
          </h2>
          <p class="width80 margin-auto ellipsis">{{ item.description }}</p>
        </div>
      </div>
    </template>
    <div class="width height" v-html="state.html"></div>
    <div class="next relative">
      <div v-if="state.playcount > 1" class="next-page absolute cursor-pointer" @click="nextpage">下一页</div>
    </div>
  </div>
  <el-backtop target="#layout" :visibility-height="300" :bottom="100"> </el-backtop>
</template>

<script lang="ts" setup>
import Navigation from './components/navigation.vue'
import { onMounted, onUnmounted, getCurrentInstance, ref, reactive, nextTick } from 'vue'
import { geplaylist } from '@/api/home.ts'
const state = reactive({
  playlist: [],
  playpagesize: 1, //当前页
  playtotal: 0, //总条数
  playcount: 0, //总页数
  playlimit: 10, //一页多少条
  scrollTop: 0 // 窗口位置
})
const init = () => {
  //网友精选

  geplaylist({ limit: state.playlimit, offset: (state.playpagesize - 1) * state.playlimit }).then(res => {
    if (res.code === 200) {
      const { playlists, total } = res
      state.playlist = playlists
      state.playtotal = total
      document.getElementById('layout').scrollTop = 0
      // state.playcount = total / 10
      //总共分几页
      if (total / state.playlimit > parseInt(total / state.playlimit)) {
        state.playcount = parseInt(total / state.playlimit) + 1
      } else {
        state.playcount = parseInt(total / state.playlimit)
      }
    }
  })
}
//下一页
const nextpage = () => {
  const { playpagesize, playcount } = state
  state.playpagesize = state.playpagesize + 1
  if (state.playpagesize - state.playcount === 0) return

  init()
}
//滚动条
const onScroll = res => {
  state.scrollTop = res.target.scrollTop
}
onUnmounted(() => {
  window.removeEventListener('scroll', () => {
    onScroll()
  })
})
onMounted(() => {
  nextTick(() => {
    window.addEventListener(
      'scroll',
      res => {
        onScroll(res)
      },
      true
    )
  })
  init()
})
</script>

<style lang="scss" scoped>
.music {
  width: 800px;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.1);
  }
}
.next {
  width: 100%;
  .next-page {
    border: 1px solid #345;
    border-radius: 30px;
    padding: 5px 30px;
    right: 0;
    bottom: 0;
    transition: all 0.3s;
    &:hover {
      background: #345;
      color: #fff;
    }
  }
}
</style>
