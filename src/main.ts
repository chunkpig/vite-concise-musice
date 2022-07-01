import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'
import { setupAssets } from './plugins/index'
const app = createApp(App)
function setupPlugins() {
  //引入静态资源
  setupAssets()
}
setupPlugins()
app.use(router)
app.mount('#app')
