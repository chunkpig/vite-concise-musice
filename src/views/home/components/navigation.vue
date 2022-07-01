<template>
  <div class="navigation">
    <el-collapse accordion>
      <el-collapse-item v-for="item in state.collapseList" :name="item.title" :key="item.title">
        <template #title>
          <h3>{{ item.title }}</h3>
        </template>
        <div class="flex flex-wrap">
          <p
            class="title-hover cursor-pointer"
            :style="`width:${fixWidth(element.name)}px`"
            v-for="element in item.list"
            :key="element.createTime"
            @click="navigationclick(element)"
          >
            {{ element.name }}
          </p>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { gethot, gecatlist, geplaylist } from '@/api/home.ts'
import { onMounted, getCurrentInstance, ref, reactive } from 'vue'
const state = reactive({
  collapseList: [
    {
      title: '歌单分类',
      list: []
    },
    {
      title: '热门歌单',
      list: []
    }
  ]
})
onMounted(() => {
  init()
})
const init = () => {
  //歌单分类
  gecatlist().then(res => {
    if (res.code === 200) {
      state.collapseList[0].list = res.sub
    }
  })
  //获取热门歌单分类
  gethot().then(res => {
    if (res.code === 200) {
      state.collapseList[1].list = res.tags
    }
  })
  //网友精选
  // geplaylist().then(res => {
  //   if (res.code === 200) {

  //   }
  // })
}
//获取歌单
const navigationclick = el => {
  console.log(el.playlistTag)
}

// 计算文字宽度
const fixWidth = val => {
  let length = 0
  if (val.indexOf('(') != -1) {
    length = val.length * 16
  } else {
    length = val.length * 10 + 15
  }
  if (length < 50) {
    length = 40
  }
  return length
}
</script>

<style lang="scss" scoped>
.navigation {
  position: fixed;
  left: 20px;
  top: 100px;
  width: 200px;
  // min-height: 50%;
  padding: 10px;
  border: 1px solid #d6e2e9;
  border-radius: 4px;
  box-shadow: 0 0 4px rgb(105, 119, 132);
  background: #fff;
  z-index: 999;
  .title-hover:hover {
    color: rgb(81, 185, 230);
  }
}
</style>
