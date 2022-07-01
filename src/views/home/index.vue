<template>
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
  <div class="next relative">
    <div class="next-page absolute cursor-pointer">下一页</div>
  </div>
</template>

<script lang="ts" setup>
import Navigation from './components/navigation.vue'
import { onMounted, getCurrentInstance, ref, reactive } from 'vue'
import { geplaylist } from '@/api/home.ts'
const state = reactive({
  playlist: []
})
const init = () => {
  //网友精选
  geplaylist({ limit: 10 }).then(res => {
    if (res.code === 200) {
      state.playlist = res.playlists
    }
  })
}
onMounted(() => {
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
