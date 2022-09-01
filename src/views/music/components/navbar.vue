<template>
  <div class="navbar w_100 h_100 p_l_x_10 p_r_x_10 flex align-center justify-end">
    <div v-if="userinfo" class="w_8 head-sculpture flex cursor-pointer c_fff">
      <el-popover :visible="state.usevisible" placement="bottom" :width="180" trigger="click">
        <el-button class="w_100" @click="logout">退出登录</el-button>
        <template #reference>
          <div class="flex w_100 align-center" @click="state.usevisible = !state.usevisible">
            <img class="br_100 h_x_40 w_x_40" :src="userinfo.avatarUrl" alt="" />
            <p class="m_l_10 nowrap">{{ userinfo.nickname }}</p>
          </div>
        </template>
      </el-popover>
    </div>
    <div v-else class="head-sculpture flex cursor-pointer c_fff">
      <el-popover :visible="visible" placement="bottom" :width="180" trigger="click">
        <img :src="imgurl" alt="" />
        <p class="text-center">{{ message }}</p>
        <template #reference>
          <p @click="login">立即登录</p>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import { useUserStore } from '@/store/user.ts'
import { LoginOutStore } from '@/store/login.ts'
import { searchStore } from '@/store/search.ts'
import NavSearch from './search.vue'
const prop = defineProps({
  modelValue: String
})
const state = reactive({
  usevisible: false //
})

//搜索
const searchfocus = () => {
  searchstats.updatestate()
}
//搜索状态
const searchstats = searchStore()
const inputShow = computed(() => searchstats.selectShow)
//获取登录状态
const status = useUserStore()
const loginout = LoginOutStore()
onMounted(() => {
  status.updateStatus()
})
//用户信息
const userinfo = computed(() => {
  return status.userinfo
})
//二维码地址
const imgurl = computed(() => loginout.imgurl)
//二维码状态
const message = computed(() => loginout.message)
//二维码弹窗
const visible = computed(() => loginout.visible)
// 登录
const login = async () => {
  if (visible.value) {
    loginout.visible = false
    loginout.cleartime()
  } else {
    await loginout.register()
  }
}
//退出
const logout = () => {
  status.userlayout()
}
</script>

<style lang="scss" scoped>
.navbar {
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.5);
  .nav-search {
    width: 2rem;
    margin-right: 3%;
    background: #f0f0f0;
    border-radius: 2.5rem;
    transition: 0.3s ease all;
    overflow: hidden;
    .search-box {
      height: 2rem;
      width: 2rem;
      border-radius: 100%;
      font-size: 0.75rem;

      color: #ccc;
      vertical-align: middle;
      transition: 0.8s ease all;
      &:hover {
        background: #2c2a2a;
      }
    }
    .nav-select {
      width: calc(100% - 2rem);
    }
    ::v-deep .el-input__wrapper {
      background: unset;
      box-shadow: unset;
    }
    ::v-deep .el-select:hover:not(.el-select--disabled) .el-input__wrapper {
      box-shadow: unset;
    }
    ::v-deep .el-select .el-input.is-focus .el-input__wrapper {
      box-shadow: unset !important;
    }
  }
  .head-sculpture {
    // width: 2.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    // border-radius: 100%;
    // background: #345;

    > p:hover {
      transition: 0.3s ease all;
      color: #409eff;
    }
  }
}
</style>
