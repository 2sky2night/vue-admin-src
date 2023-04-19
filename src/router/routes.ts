import { RouteRecordRaw } from "vue-router";
import { hasPermisson } from './permission'

const routes: RouteRecordRaw[] = [
  // 注意: 一级路由的第一个路由必须是系统页面(也就是要有子路由)
  {
    path: '/',
    name: 'index',
    component: () => import("@/pages/Home/Home.vue"),
    meta: {
      title: "系统页面"
    },
    children: [
      {
        path: '',
        redirect: "/dashboard",
        name: "toDashboard"
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import("@/pages/Home/children/Dashboard/Dashboard.vue"),
        meta: {
          title: "首页",
          icon: "house"
        }
      },
      {
        path: '/about',
        name: 'about',
        component: () => import("@/pages/Home/children/About/About.vue"),
        meta: {
          title: "关于",
          icon: "location"
        }
      },
      {
        path: '/test',
        name: 'test',
        component: () => import("@/pages/Home/children/Test01/Test01.vue"),
        meta: {
          title: "测试页面01",
          icon: "location"
        },
        children: [
          {
            path: '/test/test-son01',
            name: 'test-son01',
            component: () => import("@/pages/Home/children/Test01/children/TestSon01/TestSon01.vue"),
            meta: {
              title: "测试1",
              icon: "location"
            },
            children: [
              {
                path: '/test/test-son01/test-son-son01',
                name: 'test-son-son01',
                component: () => import("@/pages/Home/children/Test01/children/TestSon01/children/TestSonSon01/TestSonSon01.vue"),
                meta: {
                  title: "测试1-1",
                  icon: "location"
                },
                children: [
                  {
                    path: '/test/test-son01/test-son-son01/test-son-son-son01',
                    name: 'test-son-son-son01',
                    component: () => import("@/pages/Home/children/Test01/children/TestSon01/children/TestSonSon01/children/TestSonSonSon01/TestSonSonSon01.vue"),
                    meta: {
                      title: "测试1-1-1",
                      icon: "location"
                    },
                  },
                  {
                    path: '/test/test-son01/test-son-son01/test-son-son-son02',
                    name: 'test-son-son-son02',
                    component: () => import("@/pages/Home/children/Test01/children/TestSon01/children/TestSonSon01/children/TestSonSonSon02/TestSonSonSon02.vue"),
                    meta: {
                      title: "测试1-1-2",
                      icon: "location"
                    },
                  }
                ]
              },
              {
                path: '/test/test-son01/test-son-son02',
                name: 'test-son-son02',
                component: () => import("@/pages/Home/children/Test01/children/TestSon01/children/TestSonSon02/TestSonSon02.vue"),
                meta: {
                  title: "测试1-2",
                  icon: "location"
                },
              }
            ]
          },
          {
            path: '/test/test-son02',
            name: 'test-son02',
            component: () => import("@/pages/Home/children/Test01/children/TestSon02/TestSon02.vue"),
            meta: {
              title: "测试2",
              icon: "location"
            },
          }
        ]
      },
      {
        path: '/test02',
        name: 'test02',
        component: () => import("@/pages/Home/children/Test02/Test02.vue"),
        meta: {
          title: "测试页面02",
          icon: "house"
        }
      },
      {
        path: '/test03',
        name: 'test03',
        component: () => import("@/pages/Home/children/Test03/Test03.vue"),
        meta: {
          title: "测试页面03",
          icon: "house"
        }
      },
      {
        path: '/list',
        name: 'list',
        component: () => import("@/pages/Home/children/List/List.vue"),
        meta: {
          title: "滚动页面",
          icon: "house"
        }
      },
      {
        path: '/test-roles',
        name: 'test-roles',
        component: () => import("@/pages/Home/children/TestRole/TestRole.vue"),
        meta: {
          title: '角色权限',
          icon: 'location'
        },
        children: [
          {
            path: '/test-roles/set-roles',
            component: () => import("@/pages/Home/children/TestRole/children/SetRole/SetRole.vue"),
            meta: {
              title: '角色设置',
              icon: 'location'
            }
          },
          {
            path: '/test-roles/admin',
            component: () => import("@/pages/Home/children/TestRole/children/Admin/Admin.vue"),
            meta: {
              title: '管理员页面',
              icon: 'location',
              permission: ["admin"]
            },
            beforeEnter: hasPermisson
          },
          {
            path: '/test-roles/user',
            component: () => import("@/pages/Home/children/TestRole/children/User/User.vue"),
            meta: {
              title: '用户页面',
              icon: 'location',
              permission: ["admin", "user"]
            },
            beforeEnter: hasPermisson
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/pages/Login/Login.vue"),
    meta: {
      title: "登录",
      noAuthorization: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import("@/pages/404/404.vue"),
    meta: {
      title: "404",
      noAuthorization: true
    }
  },
  {
    path: "/:catchAll(.*)", // 不识别的path自动匹配404
    redirect: '/404',
  },
]

export default routes