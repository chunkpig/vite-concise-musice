<template>
  <div :key="refprops" :ref="refprops" class="slider" @click="evetnclick" @mousedown="mousedown" @mouseup="mouseup" @mousemove="mousemove">
    <div class="aplayer-bar" :style="{ width: `${sliderCurrentTime}%`, background: `${bgcolor}` }"></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref, reactive, defineEmits } from 'vue'
const props = defineProps({
  refprops: {
    type: String,
    default: 'aplayer'
  },
  sliderCurrentTime: {
    type: [String, Number],
    default: ''
  },
  bgcolor: {
    type: String,
    default: '#67C23A'
  }
})
const $emit = defineEmits(['emitEvetnclick', 'emitMousedown', 'emitMouseup', 'emitMousemove', 'emitOffsetWidth'])
const aplayer = ref()
const refprops = (el: any) => {
  if (el) {
    aplayer.value = el
  }
}
//点击进度条
const evetnclick = (el: any) => {
  $emit('emitEvetnclick', el, aplayer)
}
//鼠标按下
const mousedown = (el: any) => {
  $emit('emitMousedown', el, aplayer)
}
//鼠标松开
const mouseup = (el: any) => {
  $emit('emitMouseup', el, aplayer)
}
//拖拽进度条
const mousemove = (el: any) => {
  $emit('emitMousemove', el, aplayer)
}
//将进度条组件的宽度赋值给变量
const offsetWidth = () => {
  $emit('emitOffsetWidth', aplayer)
}
onMounted(() => {
  offsetWidth()
})
</script>
<style lang="scss" scoped>
.slider {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.1);
  transition: all 0.1s;
  overflow: hidden;
  cursor: pointer;
  .aplayer-bar {
    height: inherit;
    width: 0%;
    border-radius: 8px;
    transition: all 0.1s;
  }
}
</style>
