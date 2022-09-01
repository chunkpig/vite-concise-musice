<template>
  <div class="w_100 h_100 overflow-hidden">
    <item-box :list="detailslist" />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { searchStore } from '@/store/search.ts'
import ItemBox from '@/components/item/index.vue'

const route = useRoute()
const getsearchStore = searchStore()
const { id, name } = route.query

const detailslist = computed(() => getsearchStore.singlelist)
//歌单歌曲
const songsall = () => {
  if (id) {
    getsearchStore.udatGetdetail({ id, limit: 100 })
  } else if (name) {
    getsearchStore.updateSearch({ keywords: name, limit: 100, type: 1 })
  }
}
//搜索歌曲
onMounted(() => {
  songsall()
})
</script>
