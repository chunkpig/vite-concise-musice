<template>
  <el-table :data="props.tableData" style="width: 100%">
    <template v-for="(element, index) in state.tableHead" :key="index">
      <el-table-column :prop="element.prop" :label="element.label" width="180" />
    </template>
  </el-table>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
  tableData: {
    type: Array,
    default: () => []
  }
})
const state = {
  tableHead: [
    {
      prop: '',
      label: '单曲'
    },
    {
      prop: '',
      label: '歌手'
    },
    {
      prop: '',
      label: '专辑'
    },

    {
      prop: '',
      label: '歌词'
    },
    {
      prop: '',
      label: '歌单'
    },

    {
      prop: '',
      label: '用户'
    },
    {
      prop: '',
      label: '时长'
    }
  ]
}
</script>

<style></style>
