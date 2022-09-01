<template>
  <!-- <div class="wavesurfer-box " ref=""></div> -->
  <div class="play c_fff">
    <div class="music-cover flex" v-if="songinfo">
      <img :src="songinfo.al.picUrl" class="border-radius4" />
      <p class="m_l_x_10">{{ songinfo.name }}</p>
      <span>--</span>
      <p class="nowrap">
        <span v-for="(item_ar, item_index) in songinfo.ar" :key="item_ar.id">
          {{ item_ar.name }} <span v-if="songinfo.ar.length > 1 && item_index != songinfo.ar.length - 1">&nbsp;/&nbsp;</span>
        </span>
      </p>
    </div>
    <div class="music-center flex align-center">
      <div class="up m_l_x_10 cursor-pointer">
        <el-icon :size="32" color="#fff"><i-ep-CaretLeft /></el-icon>
      </div>
      <div @click="start" class="start m_l_x_10 cursor-pointer">
        <el-icon v-show="!musicplay" :size="32" color="#fff"><i-ep-VideoPlay /></el-icon>
        <el-icon v-show="musicplay" :size="32" color="#fff"><i-ep-VideoPause /></el-icon>
      </div>
      <div class="down m_l_x_10 cursor-pointer">
        <el-icon :size="32" color="#fff"><i-ep-CaretRight /></el-icon>
      </div>
      <div class="down flex align-center m_l_x_32 cursor-pointer">
        <el-icon @click="state.volumeShow = !state.volumeShow" :size="20" color="#fff">
          <voice v-if="state.volume > 0" />
          <mute v-else />
        </el-icon>
      </div>
    </div>
    <transition name="adjustment">
      <div v-if="state.volumeShow && songurl.url" class="down volume m_l_x_32 cursor-pointer">
        <slider
          refprops="volume"
          :sliderCurrentTime="state.slidervolume"
          @emitEvetnclick="volumeclick"
          @emitMousedown="volumedown"
          @emitMouseup="volumeup"
          @emitMousemove="volumemove"
          @emitOffsetWidth="volumeOffsetWidth"
        />
      </div>
    </transition>
    <div class="music-time m_l_x_32">
      <div v-if="songurl.url" class="width flex align-center">
        <p class="m_l_x_10">{{ state.current_time }}/{{ state.duration }}</p>
      </div>
    </div>
  </div>
  <div class="aplayer">
    <slider
      v-if="songurl.url"
      :sliderCurrentTime="state.sliderCurrentTime"
      @emitEvetnclick="evetnclick"
      @emitMousedown="mousedown"
      @emitMouseup="mouseup"
      @emitMousemove="mousemove"
      @emitOffsetWidth="OffsetWidth"
    />
  </div>
  <audio
    v-if="songurl.url"
    controls
    ref="audioRef"
    @play="playaudio"
    @pause="pauseaudio"
    @canplay="getDuration"
    @timeupdate="getCurr"
    @ended="overAudio"
    class="audio-control"
    :src="songurl.url.url"
  ></audio>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, reactive, nextTick } from 'vue'
import { searchStore } from '@/store/search.ts'
import { LayoutStore } from '@/store/layout.ts'
import realFormatSecond from '@/hooks/realFormatSecond.ts'
import voice from '@/components/icon/voice.vue'
import mute from '@/components/icon/mute.vue'
import slider from '@/components/slider/index.vue'
import { DailyStore } from '@/store/daily.ts'
const dailyStore = DailyStore()
const state = reactive({
  music_url: '',
  playing: false,
  // play: false, //播放暂停
  duration: '00:00', //总时间
  current_time: '00:00', //当前时间
  sliderDuration: <any | number>'', //进度条总时长
  sliderCurrentTime: <any | number>'', //进度条时长
  progressWidth: <any | number>'', //将时间进度条组件的宽度赋值给变量
  mouseStart: '', //拖拽开始位置
  mouseEnd: '', //拖拽结束位置
  percentage: '',
  mouseShow: false,
  volumeShow: false,
  volume: 0.5,
  slidervolume: <any | number>'50',
  volumeprogressWidth: <any | number>'', //将音量进度条组件的宽度赋值给变量
  volumemouseStart: '', //拖拽音量开始位置
  volumemouseEnd: '', //拖拽音量结束位置
  volumemouseShow: false
})
const getlayoutStore = LayoutStore()
const getsearchStore = searchStore()

const songurl = computed(() => getsearchStore.songurl)
const songinfo = computed(() => getsearchStore.songinfo)
const musicplay = computed(() => getlayoutStore.play)
const dailylist = computed(() => dailyStore.dailylist)
// dailyStore.dailylist
const audioRef = ref()
// const aplayer = ref()
//时间条长度
const OffsetWidth = (el: any) => {
  state.progressWidth = el.value.offsetWidth
}
//音量长度
const volumeOffsetWidth = (el: any) => {
  state.volumeprogressWidth = el.value.offsetWidth
}
//当前播放时间
const getCurr = () => {
  state.sliderCurrentTime = (audioRef.value.currentTime / state.sliderDuration) * 100
  state.current_time = realFormatSecond(audioRef.value.currentTime)
  getsearchStore.current_time = state.current_time
}
//开始
const start = () => {
  if (songurl.value.url) {
    getlayoutStore.updatePlay()
    if (musicplay.value) audioRef.value.play()
    if (!musicplay.value) audioRef.value.pause()
  }
}
//播放结束
const overAudio = () => {
  if (dailylist.value.length === 1) {
    start()
  } else {
    dailylist.value.forEach((item: any, index: number) => {
      if (songinfo.value.id == item.id) {
        if (index < dailylist.value.length) {
          let nexIndex = index + 1

          setTimeout(() => {
            getsearchStore.songbg = dailylist.value[nexIndex].al.picUrl
            getsearchStore.songinfo = dailylist.value[nexIndex]
            getsearchStore.updategetSongUrl(dailylist.value[index + 1].id)
            getsearchStore.updategetlyric(dailylist.value[index + 1])
          }, 1000)
        }
        if (index === dailylist.value.length) start()
      }
    })
  }
}
//播放开始
const playaudio = () => {
  getlayoutStore.play = true
  //设置播放声音大小
  audioRef.value.volume = state.volume
}
//播放暂停
const pauseaudio = () => {
  getlayoutStore.play = false
}
//总时长
const getDuration = () => {
  state.sliderDuration = parseInt(audioRef.value.duration)
  state.duration = realFormatSecond(audioRef.value.duration)
}
//点击进度条
const evetnclick = (el: any, node: any) => {
  if (songurl.value.url) {
    const position = el.clientX - node.value.offsetLeft // 当前点击位置距离进度条最左边的距离

    state.sliderCurrentTime = ((position / state.progressWidth) * 100).toFixed(3).toString()

    audioRef.value.currentTime = (state.sliderCurrentTime / 100) * state.sliderDuration //修改当前时间
    getsearchStore.current_time = (state.sliderCurrentTime / 100) * state.sliderDuration
  }
}
//鼠标按下
const mousedown = (el: any, node: any) => {
  if (songurl.value.url) {
    state.mouseStart = el.clientX
    state.mouseShow = true
  }
}
//鼠标松开
const mouseup = (el: any, node: any) => {
  if (songurl.value.url) {
    state.mouseEnd = el.clientX
    state.mouseShow = false
    if (state.mouseEnd === state.mouseStart) {
      console.log('鼠标点击事件')
    } else {
      state.sliderCurrentTime = state.percentage
      audioRef.value.currentTime = (state.sliderCurrentTime / 100) * state.sliderDuration //修改当前时间
      getsearchStore.current_time = (state.sliderCurrentTime / 100) * state.sliderDuration
    }
  }
}
//拖拽进度条
const mousemove = (el: any, node: any) => {
  if (songurl.value.url) {
    let moveX = el.clientX - node.value.offsetLeft // aplayer.value.offsetLeft是进度条左边距浏览器左侧的距离 不变的
    if (moveX >= state.progressWidth.value) moveX = state.progressWidth.value
    if (moveX <= 0) moveX = 0
    state.percentage = ((moveX / state.progressWidth) * 100).toFixed(3).toString()
    if (state.mouseShow) {
      state.sliderCurrentTime = state.percentage
      audioRef.value.currentTime = (state.sliderCurrentTime / 100) * state.sliderDuration //修改当前时间
      getsearchStore.current_time = (state.sliderCurrentTime / 100) * state.sliderDuration
    }
  }
}
//点击音量
const volumeclick = (el: any, node: any) => {
  if (songurl.value.url) {
    const position = el.offsetX / node.value.clientWidth // 当前点击位置距离进度条最左边的距离
    state.slidervolume = position * 100
    audioRef.value.volume = position //修改当前音量
    state.volume = position
  }
}
//鼠标按下音量
const volumedown = (el: any, node: any) => {
  if (songurl.value.url) {
    state.volumemouseStart = el.offsetX
    state.volumemouseShow = true
  }
}
//鼠标松开音量
const volumeup = (el: any, node: any) => {
  if (songurl.value.url) {
    state.volumemouseEnd = el.offsetX
    state.volumemouseShow = false
    if (state.mouseEnd === state.mouseStart) {
      console.log('鼠标点击事件')
    } else {
      // state.volume = state.percentage
      // audioRef.value.volume = position //修改当前音量
      // audioRef.value.currentTime = (state.sliderCurrentTime / 100) * state.sliderDuration //修改当前时间
    }
  }
}
//鼠标拖拽音量
const volumemove = () => {}

//
watch(
  () => getsearchStore.songurl,
  (nvl, ovl) => {
    setTimeout(() => {
      if (audioRef.value) {
        getlayoutStore.play = true
        audioRef.value.play()
      }
    }, 1000)
  }
)
onMounted(() => {})
</script>

<style lang="scss" scoped>
.play {
  position: relative;
  width: 70%;
  height: 100%;
  padding: 5px;
  margin: auto;
  box-sizing: border-box;
  overflow: hidden;
  .music-cover {
    position: absolute;
    left: 3%;
    top: 55%;
    width: 30%;
    transform: translateY(-50%);
    height: 100%;
    overflow: hidden;
    img {
      margin-top: 5px;
      width: 60px;
      height: 76%;
    }
  }
  .music-center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .music-time {
    position: absolute;
    right: 3%;
    top: 50%;
    transform: translateY(-50%);
  }
  .volume {
    position: absolute;
    left: 56%;
    top: 50%;
    width: 100px;
    height: 5px;
    transform: translateY(-50%);
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.5);
    transition: all 0.1s;
  }
  .up {
    margin-left: 10px;
  }
  .audio-control {
    display: none;
  }
}
.aplayer {
  position: absolute;
  top: -5px;
  width: 100%;
  height: 5px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.3);
  transition: all 0.1s;
  cursor: pointer;
}
.Playlist:hover {
  color: #67c23a;
}
.wavesurfer-box {
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 50px;
  outline: 1px solid red;
}
</style>
<style lang="scss">
.play {
  ::v-deep .el-popover.el-popper {
    width: 50px !important;
  }
}
</style>
