<template>
  <div v-if="userinfo" class="w_100 h_100 overflow-hidden">
    <item-box :list="dailylist" />
  </div>
  <div v-else class="width relative p_r_x_10 h_c_50 overflow-hidden overflowY">
    <h3 class="absolute translate50 t_40 l_50 c_fff">登录后获取最近播放</h3>
  </div>
</template>

<script setup lang="ts">
import ItemBox from '@/components/item/index.vue'
import { DailyStore } from '@/store/daily.ts'
import { useUserStore } from '@/store/user.ts'
const dailyStore = DailyStore()
const dailylist = computed(() => {
  return dailyStore.dailylist
})
//获取登录状态
const status = useUserStore()
//用户信息
const userinfo = computed(() => {
  if (status.userinfo && dailylist.value.length == 0) {
    dailyStore.updaterecent()
  }
  return status.userinfo
})
onMounted(() => {
  dailyStore.updaterecent()
})
</script>
<style lang="scss" scoped></style>
