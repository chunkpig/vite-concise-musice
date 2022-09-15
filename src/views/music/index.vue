<template>
  <div class="login_bg w_100 h_100">
    <img :src="state.locabg" alt="" class="w_100 h_100 login_bg" />
  </div>
  <div class="absolute t_0 l_0 login_rgba w_100 h_100"></div>
  <div class="absolute t_0 w_100 h_x_60">
    <nav-bar />
  </div>
  <div class="absolute t_50 l_40 translate50 w_70 h_83">
    <div class="width flex align-center c_909AA4">
      <div
        v-for="(item, index) in state.Taglist"
        :key="item.value"
        class="border-cad6e1 p_l_x_20 p_t_x_10 p_r_x_20 p_b_x_10 m_r_x_20 br_x_4 cursor-pointer"
        :class="{ c_fff: state.active === index }"
        @click="Tagclick(item, index)"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="width h_c_55 m_t_x_10">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.name" v-if="route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" :key="$route.name" v-if="!route.meta.keepAlive" />
      </router-view>
    </div>
  </div>
  <div class="absolute t_50 r_4 translateY50 w_20 h_83">
    <div class="song_img w_x_186 h_x_186 relative m_a">
      <img class="w_100 h_100" :src="cssbg" alt="" />
    </div>
    <div v-if="songinfo" class="c_c5c9cd box-sizing text-center f_s_x_14">
      <p class="m_t_x_10">
        {{ songinfo.name }}
      </p>
      <p class="m_t_x_5">
        <span v-for="(item_ar, item_index) in songinfo.ar" :key="item_ar.id">
          {{ item_ar.name }} <span v-if="songinfo.ar.length > 1 && item_index != songinfo.ar.length - 1">/</span>
        </span>
      </p>
      <p class="m_t_x_5">{{ songinfo.al.name }}</p>
    </div>
    <div v-else class="c_c5c9cd text-center">快点开始播放</div>
    <div class="h_c_300 m_t_x_20 overflow-hidden">
      <lyric-box />
    </div>
  </div>
  <div class="absolute b_0 w_92 h_x_60 l_50 translateX50">
    <play-music />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/navbar.vue'
import PlayMusic from './components/playmusic.vue'
import LyricBox from '@/components/lyric/index.vue'
import { useUserStore } from '@/store/user.ts'
import { useRoute, useRouter } from 'vue-router'
import { searchStore } from '@/store/search.ts'
import img from '@/assets/player_cover.png'
const state = reactive({
  Taglist: [
    {
      label: '搜索',
      value: 'search'
    },
    {
      label: '歌单',
      value: 'song'
    },
    {
      label: '每日推荐',
      value: 'daily'
    },
    {
      label: '最近播放',
      value: 'recent_play'
    },
    {
      label: '我的歌单',
      value: 'mysong'
    }
  ],
  active: 1,
  locabg: 'https://p0.meituan.net/dpplatform/43245f564ac688bf128cf2c03b02ad912734396.jpg',
  srcimg: img
})
const router = useRouter()
const route = useRoute()
const status = useUserStore()
const getsearchStore = searchStore()
const userId = computed(() => {
  if (status.userinfo) return status.userinfo.userId
})
//背景图
const cssbg = computed(() => {
  let bg = getsearchStore.songbg ? getsearchStore.songbg : state.srcimg
  return bg
})
//歌曲信息
const songinfo = computed(() => {
  return getsearchStore.songinfo
})
//歌词
const lyric = computed(() => {
  return getsearchStore.lyric
})
//标签点击
const Tagclick = (e: any, index: number) => {
  router.push({ path: `/music/${e.value}`, query: { id: userId.value } })
  state.active = index
}

onMounted(() => {
  if (route.meta.active || route.meta.active === 0) {
    state.active = route.meta.active as number
  }
})
</script>

<style lang="scss" scoped>
.login_bg {
  //  https://p0.meituan.net/dpplatform/43245f564ac688bf128cf2c03b02ad912734396.jpg
  // background: v-bind('cssbg');
  // background-size: cover;
  //
  transition: background-image 0.5s linear;
}
.login_rgba {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
}
.song_img {
  vertical-align: middle;
  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: 9px;
    width: 201px;
    height: 180px;
    background: url('data:image/png;base64,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')
      0 0 no-repeat;
  }
}
</style>
