<template>
  <!-- <canvas id="three" width="1200" height="900"></canvas> -->
  <div id="container"></div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const routr = useRoute()
const router = useRouter()
//获取dom
onMounted(() => {
  init()
})
const init = () => {
  const container: HTMLCanvasElement | null = document.getElementById('container')
  if (container) {
    //创建场景对象
    const scene = new THREE.Scene()
    /**
     * 网格模型添加到场景中;
     * 创建一个立方体
     * BoxGeometry（立方体）
     * MeshBasicMaterial （材质，来让它有颜色）
     * Mesh（网格）
     *
     */
    let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
    let material = new THREE.MeshNormalMaterial({
      color: 'white'
    })
    let mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    //边框
    let lineGeom = new THREE.EdgesGeometry(geometry)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x018bf5,
      linewidth: 10,
      linecap: 'round',
      linejoin: 'round'
    })
    let frame = new THREE.LineSegments(lineGeom, lineMaterial)
    frame.scale.copy(mesh.scale)
    frame.rotation.copy(mesh.rotation)
    frame.position.copy(mesh.position)
    // scene.add(frame)
    //添加网格
    scene.add(new THREE.GridHelper(2, 20))
    /**
     * 相机设置
     * PerspectiveCamera 透视相机
     *第一个参数是视野角度（FOV）
     * 第二个参数是长宽比（aspect ratio）物体的宽除以它的高的值
     * 接下来的两个参数是近截面（near）和远截面（far）
     */
    //  let container = document.getElementById('container')

    let camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10)
    //为防止物体被添加到(0,0,0)坐标，将摄像机向外移动
    camera.position.z = 1
    camera.position.y = 1.1
    // camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
    /**
     * 创建渲染器对象
     * setSize渲染器的尺寸
     */
    let renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)
    //创建控件对象
    let controls = new OrbitControls(camera, renderer.domElement)
    //模型双击事件
    container.addEventListener('dblclick', onDoubleClick, false)
    const animate = () => {
      /**
       * 渲染循环
       */
      requestAnimationFrame(animate)
      mesh.rotation.x += 0.01
      mesh.rotation.y += 0.02
      frame.rotation.x += 0.02
      frame.rotation.y += 0.01
      //   this.frame.position.copy(this.mesh.position);
      renderer.render(scene, camera)
    }
    animate()
  }
}
const onDoubleClick = res => {
  // console.log(res)
  // routr.push()
  router.replace({
    name: 'Home'
  })
  console.log(router)
}
</script>
<style scoped>
#container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
