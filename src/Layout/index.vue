<template>
  <div id="layout">
    <div class="layout-top"></div>
    <div class="layout-centent">
      <router-view></router-view>
    </div>
    <div class="layout-bottom"></div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
#layout {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  .layout-top {
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    border-bottom: 1px solid #d6e2e9;
    box-shadow: 0 0.3125rem 0.3125rem -0.3125rem rgb(0 0 0 / 12%);
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    z-index: 999;
  }
  .layout-centent {
    width: 70%;
    min-height: calc(100% - 148px);
    margin: 100px auto 80px;
    // margin-top: 100px;
    box-sizing: border-box;
  }
  .layout-bottom {
    width: 100%;
    height: 45px;
    background: #fafafa;
  }
}
</style>
