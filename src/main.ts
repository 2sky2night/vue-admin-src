import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import plugins from './plugins'

// 创建app实例
const app = createApp(App)

// 安装各种插件
app.use(plugins)

// 挂载app实例
app.mount("#app")
