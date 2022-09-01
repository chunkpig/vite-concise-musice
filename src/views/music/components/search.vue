<template>
  <div class="search width">
    <el-popover :visible="state.hotShow" placement="bottom" :width="200" trigger="click">
      <div class="flex-wrap">
        <p class="title-hover cursor-pointer" v-for="element in hotlist.slice(0, 10)" :key="element.name" @click="hotclick(element.name)">
          {{ element.name }}
        </p>
      </div>
      <template #reference>
        <el-input
          v-model="state.inquer"
          @focus="state.hotShow = true"
          @blur="state.hotShow = false"
          @input="selectChang"
          @keyup.enter.native="nativeInput"
          ref="searchinput"
          size="small"
          :placeholder="state.placeholder"
        />
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { searchStore } from '@/store/search.ts'
import { getsearchdefault, getcloudsearch } from '@/api/search.ts'
import fixWidth from '@/hooks/fixWidth.ts'
import debounce from '@/hooks/debounce.ts'
const state = reactive({
  loading: false,
  hotShow: false,
  inquer: '',
  placeholder: ''
})
const router = useRouter()
const searchinput = ref<HTMLCanvasElement>(null)
const searchstats = searchStore()
const selectShow = computed(() => searchstats.selectShow)
const hotlist = computed(() => searchstats.options)

//
const hotclick = debounce((val: string) => {
  state.inquer = val
  searchinput.value.focus()
  searchstats.updateEggsstu({ keywords: val })
}, 100)
//
const selectChang = debounce((el: string) => {
  if (el === '') {
    searchstats.updateHot()
  } else {
    searchstats.updateEggsstu({ keywords: el, type: 'mobile' })
    //
  }
}, 1000)

//
const searchdefault = () => {
  getsearchdefault().then((res: any) => {
    if (res.code === 200) {
      state.placeholder = res.data.showKeyword
    }
  })
}
//回车搜索
const nativeInput = (el: string) => {
  if (!state.inquer) state.inquer = state.placeholder
  searchstats.updateSearch({ keywords: state.inquer, limit: 12, offset: 0, type: 1 })
  state.hotShow = false
  searchstats.skip_state = false
  searchinput.value.blur()
  router.push({
    path: '/Layout/single',
    query: { name: state.inquer }
  })
}

onMounted(() => {
  searchdefault()
})
</script>

<style lang="scss" scoped>
.title-hover {
  margin: 5px 4px;
  &:hover {
    color: rgb(81, 185, 230);
  }
}
</style>
