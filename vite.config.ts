import path from 'path'
import { defineConfig } from 'vite' // 帮手函数，这样不用 jsdoc 注解也可以获取类型提示
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

//这个配置 为了在html中使用 环境变量
const pathSrc = path.resolve(__dirname, 'src')
export default defineConfig({
  plugins: [
    //配置需要使用的插件列表
    vue(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts')
    }),
    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        }),
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ],
      dts: path.resolve(pathSrc, 'components.d.ts')
    }),
    Icons({
      autoInstall: true
    })
  ],
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
        // 给导入的路径最后加上 ;
        // additionalData: '@import "./src/styles/variable.scss";'
      }
    }
  },
  //静态资源服务的文件夹
  publicDir: process.env.NODE_ENV === 'production' ? 'vite-concise-musice' : 'public',
  base: './',
  //静态资源处理
  assetsInclude: '',
  // 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息
  clearScreen: true,
  resolve: {
    alias: [
      //配置别名
      { find: '@', replacement: pathSrc }
    ],
    // 情景导出 package.json 配置中的exports字段
    conditions: [],
    // 导入时想要省略的扩展名列表
    // 不建议使用 .vue 影响IDE和类型支持
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  server: {
    open: true, //项目启动自动打开浏览器
    port: 8988, //项目端口
    proxy: {
      '/api': {
        // target: 'https://music-api-coral-seven.vercel.app',
        // target: 'http://localhost:3000',
        target: 'https://autumnfish.cn',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  //打包配置
  build: {
    //浏览器兼容性  "esnext"|"modules"
    target: 'modules',
    //指定输出路径
    outDir: 'docs',
    //生成静态资源的存放路径
    assetsDir: 'static',
    //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
    assetsInlineLimit: 4096,
    //启用/禁用 CSS 代码拆分
    cssCodeSplit: true,
    //构建后是否生成 source map 文件
    sourcemap: false,
    //自定义底层的 Rollup 打包配置
    rollupOptions: {},
    //@rollup/plugin-commonjs 插件的选项
    commonjsOptions: {}
  }
})
