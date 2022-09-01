<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
document.addEventListener(
  'visibilitychange',
  el => {
    if (document.hidden) {
      document.title = '快回来~'
    } else {
      document.title = route.meta.title as string
    }
  },
  false
)
watchEffect(() => {
  // 如果你确定to.meta.title的类型是string，那就用类型断言
  document.title = route.meta.title as string
})
</script>
