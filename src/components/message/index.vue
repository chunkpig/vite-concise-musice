<template>
  <div id="messageBox" class="fixed width heightvh top left">
    <div class="box-modal borderR8" :style="modalwidth || modalheight ? 'width:' + modalwidth + '%;height:' + modalheight + '%' : ''">
      <div class="title-modal">
        <p class="p-title">
          <slot name="title"></slot>
        </p>
        <i v-if="cancelShow" class="el-icon-close pointer fontSize1_2" @click="$emit('cancel')"></i>
      </div>
      <div class="centent-modal">
        <slot name="centent"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  modalwidth: {
    type: String,
    default: ''
  },
  modalheight: {
    type: String,
    default: ''
  },
  cancelShow: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
#messageBox {
  background: rgba(0, 0, 0, 0.6);
  .box-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 85%;
    border-radius: 6px;
    transform: translate(-50%, -50%);
    background: #fff;
    box-shadow: 0 0 4px #345;
    // transition: all 0.5s;
    overflow: hidden;
    .title-modal {
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6eaf1;
      background: #f5f7fa;
      .p-title {
        font-size: 20px;
        padding-left: 5px;
      }
      .fontSize1_2 {
        font-size: 20px;
        margin-right: 15px;
        &:hover {
          transition: all 0.3s;
          transform: rotate(360deg);
        }
      }
    }
    .centent-modal {
      width: 98%;
      height: calc(100% - 62px);
      padding: 1%;
      overflow: hidden;
    }
  }
}
</style>
