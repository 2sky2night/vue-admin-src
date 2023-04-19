import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import type { App } from 'vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store'
// 引入progress的样式
import 'nprogress/nprogress.css'
// 引入暗夜模式的样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 引入全局自定义指令
import directives from './directives'
import RoleComponent from '@/components/RoleComponent/RoleComponent.vue'
export default {
  install(app: App) {
    // 安装elementui
    app.use(ElementPlus)
    // 安装elementui的图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    // 批量注册全局自定义指令
    for (const [key, directive] of Object.entries(directives)) {
      app.directive(key, directive)
    }
    // 注册权限组件
    app.component('RoleComponent', RoleComponent)
    // 安装仓库pinia
    app.use(store)
    // 安装路由
    app.use(router)
  }
}