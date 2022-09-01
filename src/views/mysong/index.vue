<template>
  <p>{{ userId }}</p>
  <div class="play width h_c_150 m_t_x_20 flex flex-wrap align-content-start">
    <template v-for="(item, index) in state.playlist" :key="index + item.userId">
      <div class="w_x_120 m_r_x_30 m_l_x_15 m_b_x_15 cursor-pointer c_c5c9cd tag" :style="{ animation: `change ${0.2 * index}s` }">
        <div
          @click="songclick(item)"
          class="w_x_120 h_x_120 m_b_x_5"
          :style="{
            background: `url(${item.coverImgUrl}) no-repeat`,
            backgroundSize: 'cover'
          }"
        ></div>
        <p class="ellipsis_1">{{ item.name }}</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { getuserplaylist } from '@/api/home.ts'
import { searchStore } from '@/store/search.ts'

import { getCookies, setCookies, removeCookies } from '@/utils/cookies.ts'
const getsearchStore = searchStore()
const router = useRouter()
const route = useRoute()
const state = reactive({
  collapseList: [], //类型
  playlist: [], //歌单
  active: 0,
  catname: ''
})
const { id } = route.query

const init = () => {
  getuserplaylist({ uid: id }).then((res: any) => {
    if (res.code === 200) {
      state.playlist = res.playlist
    }
  })
}

const songclick = (item: any) => {
  getsearchStore.singlelist = []
  // getsearchStore.songbg = item.coverImgUrl
  router.push({
    path: '/music/details',
    query: { id: item.id }
  })
}
onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
.tag {
  &:hover {
    color: #fff;
  }
}
.play {
  overflow: hidden;
  overflow-y: auto;
}
</style>
<style>
@keyframes change {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
