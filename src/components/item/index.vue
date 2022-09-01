<template>
  <div class="width m_t_x_20 p_b_x_15 p_r_x_10 flex aling-center c_fff dail-b-b">
    <p class="flex-sub p_l_x_30">歌曲</p>
    <p class="w_x_300">歌手</p>
    <p class="w_x_300">专辑</p>
  </div>
  <div class="width p_r_x_10 h_c_50 overflow-hidden overflowY">
    <div
      v-for="(item, index) in list"
      @click="singleclick(item)"
      :key="index"
      class="width m_t_x_20 p_b_x_15 flex aling-center b-b c_c5c9cd"
    >
      <p class="flex-sub p_l_x_30" :class="{ c_fff: songinfo ? songinfo.id === item.id : false }">
        <span class="m_r_x_10">{{ index + 1 }}</span> {{ item.name }}
      </p>
      <p class="w_x_300" :class="{ c_fff: songinfo ? songinfo.id === item.id : false }">
        <span v-for="(item_ar, item_index) in item.ar" :key="item_ar.id">
          {{ item_ar.name }} <span v-if="item.ar.length > 1 && item_index != item.ar.length - 1">&nbsp;/&nbsp;</span>
        </span>
      </p>
      <p class="w_x_300" :class="{ c_fff: songinfo ? songinfo.id === item.id : false }">{{ item.al.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { searchStore } from '@/store/search.ts'
const getsearchStore = searchStore()
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
const songinfo = computed(() => getsearchStore.songinfo)
const singleclick = (item: any) => {
  getsearchStore.songbg = item.al.picUrl
  getsearchStore.songinfo = item
  // getsearchStore.updateTrackAll(item)
  getsearchStore.updategetSongUrl(item.id)
  getsearchStore.updategetlyric(item)
}
</script>
