import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import nProgress from 'nprogress'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  nProgress.start()
  if (to.meta.noAuthorization) {
    next()
  } else {
    const token = localStorage.getItem("token")
    if (token === null) {
      next({name:'login'})
    } else {
      next()
    }
  }
})


// 全局路由后置守卫
router.afterEach(to => {
  nProgress.done()
  document.title = to.meta.title as string
})

export default router