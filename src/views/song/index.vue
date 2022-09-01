<template>
  <div class="width h_x_80 flex">
    <p class="w_x_40 c_fff m_r_x_5">类型:</p>
    <div class="c_fff w_c_50 flex c_c5c9cd align-center flex-wrap">
      <template v-for="(item, index) in state.collapseList" :key="item.id">
        <p class="m_r_x_10 cursor-pointer tag" :class="{ c_fff: state.active === index }" @click="tagclick(item, index)">{{ item.name }}</p>
      </template>
    </div>
  </div>
  <p class="c_fff m_t_x_10 m_r_x_5">{{ state.catname ? state.catname : '全部' }}歌单:</p>
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
import { gethot, gecatlist, geplaylist } from '@/api/home.ts'
import { searchStore } from '@/store/search.ts'
const getsearchStore = searchStore()
const router = useRouter()
const state = reactive({
  collapseList: [], //类型
  playlist: [], //歌单
  active: 0,
  catname: ''
})
const init = () => {
  gecatlist().then(res => {
    if (res.code === 200) {
      state.collapseList = res.sub
      state.collapseList.unshift({ name: '全部' })
    }
  })
}
const getplaylist = () => {
  geplaylist({ cat: state.catname, limit: 50 }).then((res: any) => {
    if (res.code === 200) {
      const { playlists } = res
      state.playlist = playlists
    }
  })
}
const tagclick = (item: any, index: number) => {
  state.catname = item.name
  state.active = index
  getplaylist()
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
  getplaylist()
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
