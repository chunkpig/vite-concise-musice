<template>
  <div class="w_30 serch-input m_t_x_20"><el-input v-model="state.input" placeholder="" /></div>
  <div class="flex overflow-hidden">
    <div
      class="overflow-hidden m_t_x_20 p_l_5 p_r_5"
      :style="{
        boxShadow: `var(${getCssVarName('dark')})`
      }"
    >
      <h4 class="c_fff m_b_10 text-center">热搜列表</h4>
      <p class="c_909AA4 cursor-pointer m_b_x_5 search_hot" v-for="(item, index) in options" :key="index">
        <span class="w_x_20 text-right inline-block" :class="index < 3 ? 'c_F56C6C' : 'c_c5c9cd'">{{ index + 1 }}.</span>
        {{ item.searchWord }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { searchStore } from '@/store/search.ts'
import { gettopsong } from '@/api/search.ts'
const state = reactive({
  input: ''
})
const getsearchStore = searchStore()
const options = computed(() => {
  return getsearchStore.options
})
const getCssVarName = (type: string) => {
  return `--el-box-shadow${type ? '-' : ''}${type}`
}
//新歌速递
const topsong = () => {
  gettopsong({ type: 0 }).then((res: any) => {})
  // gettopsong().then((res: any) => {})
}
onMounted(() => {
  getsearchStore.updateHot()
  topsong()
})
</script>
<style lang="scss" scoped>
.serch-input {
  ::v-deep .el-input__wrapper {
    background: unset;
  }
}
.search_hot {
  &:hover {
    color: #fff;
  }
}
</style>
