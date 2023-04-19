后台模板

# 一、基本依赖

1.框架：vue、vue-router、pinia

2.网络请求：axios

3.组件库：element-plus

4.css预处理器：scss

5.其他插件：图表echarts、进度条nProgress



# 二、页面

由于是模板项目，我只准备配置基础的首页、404/403页面、权限页面（admin、普通用户）、关于、测试三级路由（一级、二级、三级）、登录页面。

基本布局就和一般管理系统类似

![image-20230413163615377](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230413163615377.png)

## 1.配置表

route.ts

```ts
import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
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
        redirect: "/dashboard"
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import("@/pages/Home/children/Dashboard/Dashboard.vue"),
        meta: {
          title: "首页"
        }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import("@/pages/Home/children/About/About.vue"),
        meta: {
          title: "关于"
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/pages/Login/Login.vue"),
    meta: {
      title: "登录"
    }
  }
]

export default routes
```

## 2.注册路由

```ts
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './route'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
```

​	在app实例上注册路由即可。

# 三、修改主题颜色

​	由于组件库使用的是elementUI，使用的css变量，我们可以通过js修改css变量的值，达到修改主题的颜色。

​	下面一个案例就是修改elmentUI的某一个css变量的值，我们可以找到element对于css变量的定义，进行全盘修改即可。

```js
// document.documentElement 是全局变量时
const el = document.documentElement
// const el = document.getElementById('xxx')

// 获取 css 变量
getComputedStyle(el).getPropertyValue(`--el-color-primary`)

// 设置 css 变量
el.style.setProperty('--el-color-primary', 'red')
```

# 四、项目启动

## 1.项目目录

![image-20230413170819197](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230413170819197.png)

## 	2.layout文件夹	

​	layout？后台管理系统中的基本三大布局就是：头部导航区、侧边栏导航、业务区域。在里面创建components文件夹用来创建这三大组件。再layout中创建index.vue文件用来将这三个组件进行布局即可，其实也就可以把这个layout组件当作我们系统页面，系统所有的业务都在这个组件中完成。

​	后期修改这三大组件或重新进行layout组件布局时，也方便维护。

#### 	1.index.vue（layout组件）

​		layout组件需要对头部组件、侧边组件、业务组件进行布局，我们使用element自带的容器组件。我们的布局就是基本的左右布局（左边侧边导航栏组件，右边头部导航栏组件和业务展示组件）

​	可以使用下列模板：![image-20230413173317157](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230413173317157.png)

![image-20230413173504926](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230413173504926.png)

```vue
<template>
  <el-container>
    <el-aside :class="sideBarClassName">
      <SideBar />
    </el-aside>
    <el-container>
      <el-header height="80" style="padding: 0;">
        <Header />
      </el-header>
      <el-main style="padding: 0;">
        <MainPanel />
      </el-main>
    </el-container>

  </el-container>
</template>

<script lang="ts" setup>
import SideBar from "./components/SideBar/SideBar.vue";
import Header from "./components/Header/Header.vue";
import MainPanel from "./components/MainPanel/MainPanel.vue";

import useSideBar from "../hooks/useSideBar";
import { computed } from 'vue'

// 获取sideBar仓库的数据
const { windowFlag, showFlag } = useSideBar(true)

// 根据sideBar仓库的数据源动态设置侧边栏的class值
const sideBarClassName = computed<string>(() => {
  let className = ''
  // 大屏模式小屏模式?
  className += windowFlag.value ? '' : 'aside-small-window'
  // 折叠(隐藏)还是展示?
  if (!windowFlag.value && showFlag.value) {
    // 小窗模式并展开
    className += ' aside-small-show'
  } else if (windowFlag.value && !showFlag.value) {
    // 小窗口模式折叠
    className += ' aside-hide'
  }
  return className
})

</script>

<style>
/**侧边栏样式**/
aside.el-aside {
  display: flex;
  height: 100vh;
  flex-direction: column;
  position: relative;
  transition: .5s;
  width: 200px;
  left: 0;
  z-index: 999;
  background-color: #fff;
  transition-property: left width;
}

/**小屏模式 */
aside.aside-small-window {
  position: absolute;
  left: -300px;
}

/**小屏模式展开 */
aside.aside-small-show {
  position: absolute;
  box-shadow: 0 0 10px rgb(200, 200, 200);
  left: 0px;
}

/**大窗口模式下折叠 */
aside.aside-hide {
  width: calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2);
}
</style>

```

​	基本代码如上。

### 	2.侧边栏组件

​	在layout文件夹中的components中创建SideBar文件夹,创建SideBar.vue，创建侧边栏组件。侧边栏需要引入路由表，路由表中记录着项目的路由信息，我们可以导入进来用来生成我们的侧边导航栏。

#### 	渲染多级导航项

​	由于导航栏不止一级两级，我们不可能只需要一层v-for就能把所有导航渲染完成，还需要考虑多级路由，需要把这些路由全部渲染出来，而不是我们手动的去使用v-for遍历每一级的路由表。需要封装一个menuItem.vue组件，完成对导航项的封装。封装完成后侧边栏组件只需要通过路由表中的路由信息渲染出每个导航项即可。

​	menu-item通过自定义属性props接收一个路由表中的一个路由元素（名称为route），menu-item拿到这个元素后。

​	menu-item可以通过route.children来判断该路由下是否还有无其他子路由：	**若没有子路由：**就可以直接通过el-menu-item（element内置组件）渲染路由名称即可完成。

​	**若有子路由：**则需要渲染el-sub-menu组件（专门用来渲染子导航栏的element内置组件），然后渲染路由名称，此时需要渲染子路由了，只需要渲染使用v-for列表渲染menu-item，自定义属性传入子路由的每一项，即可完成递归的渲染子路由以及下面的任何层级的路由。

​	最后回来sideBar组件处，只需传入路由表，列表渲染一级路由的导航项即可完成对所有层级路由的导航

```vue 
<template>
  <!--渲染有子级路由的导航项-->
  <el-sub-menu v-if="route.children && route.children.length > 0" :index="route.path">
    <template #title>
      <span v-if="route.meta && route.meta.title">{{ route.meta.title }}</span>
      <span v-else>{{ route.path }}</span>
    </template>
    <!--列表渲染该层级下的所有子路由-->
    <MenuItem :route="item" v-for="item in route.children" :key="item.path" />
  </el-sub-menu>
  <!--渲染无子级路由的导航项-->
  <el-menu-item v-else :index="route.path">
    <span v-if="route.meta && route.meta.title">{{ route.meta.title }}</span>
    <span v-else>{{ route.path }}</span>
  </el-menu-item>
</template>
<script lang='ts' setup>
// 渲染子级路由
import { RouteRecordRaw } from "vue-router";
// 自定义属性接收路由对象
const props = defineProps<{ route: RouteRecordRaw }>()
</script>
<style scoped></style>
```



####  侧边栏封装完成

```vue
<template>
  <el-menu :collapse="!showFlag && windowFlag" router :default-active="$route.path" class="menu"
    style="border:none;flex-grow: 1;">
    <MenuItem :route="item" v-for="item in formatRoutes" :key="item.path" />
    <!--隐藏按钮-->
    <el-menu-item @click="toggleShow" v-show="showFlag && !windowFlag" class="side-bar-hide-btn">
      <el-icon>
        <DArrowLeft />
      </el-icon>
    </el-menu-item>
  </el-menu>
</template>
<script lang='ts' setup>
import type { RouteRecordRaw } from "vue-router";
// 使用侧边栏钩子
import useSideBar from "../../../hooks/useSideBar";
// 引入路由表
import routes from "../../../router/routes"
// 引入导航项列表组件
import MenuItem from './MenuItem/MenuItem.vue'
// 从系统页面的子级路由开始渲染导航栏
const formatRoutes = routes[0].children as RouteRecordRaw[] || []
// 获取当前是展示侧边栏还是隐藏侧边栏
const { showFlag, windowFlag, toggleShow } = useSideBar()

</script>
<style>
.menu {
  flex-grow: 1 !important;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: var(--el-menu-item-height);
}

.side-bar-hide-btn {
  position: absolute;
  bottom: 0;
  width: 100%;
  justify-content: center;
}
</style> 
```

#### 导航栏标题组件

```vue
<template>
  <div class="header-container">
    <!--上方是面包屑-->
    <div class="top-bar">
      <el-icon @click="toggleShow" class="toggle-side-bar-btn" >
        <Menu />
      </el-icon>
      <BreadCrumdList />
    </div>
    <!--下方是路由的历史记录-->
    <RouteTags />
    <div>

    </div>
  </div>
</template>
<script lang='ts' setup>
import RouteTags from './RouteTags/RouteTags.vue'
import BreadCrumdList from './BreadCrumdList/BreadCrumdList.vue';
import useSideBar from "../../../hooks/useSideBar";

// 获取sideBar仓库的数据
const { toggleShow, showFlag } = useSideBar()


</script>
<style scoped>
.toggle-side-bar-btn{
  cursor: pointer;
}
.top-bar {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
}
</style>
```

 动态渲染导航栏标题，使用component动态组件，is属性为组件注册时名称的字符串。

![image-20230414210326341](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230414210326341.png)

#### 	自定义滚动条

```css
aside.el-aside::-webkit-scrollbar {
    width: 10px;
     background-color:#2c4a68;
}

aside.el-aside::-webkit-scrollbar-thumb {
    background-color: var(--el-color-primary);
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

```



### 3.头部导航栏

头部导航栏至少需要需要封装面包屑导航和当前访问过的路由历史记录tag。

#### 3.1 封装面包屑导航

```vue 
<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in routeList" :key="item.path" :to="item.path">
      <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
      <span v-else>{{ item.path }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang='ts' setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const $route = useRoute()

// 获取当前路由路径(不读取1是因为1是一级路由，我们的系统是从二级路由开始的)
const routeList = computed(() => {
  return $route.matched.slice(1)
})

</script>
<style scoped></style>
```

#### 3.2 封装路由历史记录tags

##### 	1.封装历史记录列表

```vue
<template>
  <div class="route-tags">
    <ul>
      <RouteTag @deleteHistoryTag="toDeleteTag" :key="item.path" v-for="item in list" :title="item.title"
        :path="item.path" :is-active="item.isActive">
      </RouteTag>
    </ul>
  </div>
</template>
<script lang='ts' setup>
import RouteTag from './RouteTag/RouteTag.vue';
import { useRoute,useRouter } from 'vue-router'
import { reactive, watch } from 'vue'

// 路由历史记录
const list = reactive<{ title: string; path: string; isActive: boolean }[]>([])

// 路由信息
const $route = useRoute()

// 路由导航对象
const $router = useRouter()

// 监听路由路径的变化,添加历史记录
watch(
  () => $route.path,
  () => {
    const getIndex = checkRepeat()
    if (getIndex !== -1) {
      // 存在就设置高亮
      activeTag(getIndex)
    } else {
      // 不存在保存该历史记录
      const route = {
        title: $route.meta ?
          $route.meta.title ? $route.meta.title as string : $route.path
          : $route.path,
        path: $route.path,
        isActive: false
      }
      // 高亮当前的历史记录
      activeTag(list.push(route) - 1)
    }
  },
  {
    immediate:true
  }
)

// 检查当前路由是否存在,存在返回下标,不存在返回-1
function checkRepeat() {
  return list.findIndex(ele => {
    return ele.path === $route.path
  })
}

//  传入下标,设置其高亮效果
function activeTag(index: number) {
  list.forEach(ele => {
    ele.isActive = false
  })
  list[index].isActive = true
}

// 删除某个历史记录
function toDeleteTag(path: string, isActive: boolean) {
  // 若删除的是当前激活的路由,则返回首页
  if(isActive){
    $router.push('/dashboard')
    // 设置首页被高亮
    list.some(ele=>{
      if(ele.path==='/dashboard'){
        ele.isActive=true
        return true
      }
    })
  }
  // 删除对应的历史记录
  list.some((ele,index,arr)=>{
    if(ele.path===path){
      arr.splice(index,1)
      return true
    }
  })
}


</script>
<style scoped>
.route-tags {
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  align-items: center;
  height: 30px;
}

.route-tags>ul {
  flex-grow: 1;
  display: flex;
}
</style>
```

##### 	2.封装历史记录项(基础功能完成，但尚未完成列表项多了会怎么办。)

```vue
<template>
    <li :class="isActive?'tag-active':''" @click="goToPage">
    <span>{{ title }}</span>
    <el-icon v-if="path!=='/dashboard'" @click.stop="toDeleteTag" style="marginLeft:5px;"><Close /></el-icon>
    </li>
</template>
<script lang='ts' setup>
import { useRouter } from 'vue-router'

// 路由信息
const props = defineProps<{ title: string; path: string; isActive: boolean }>()

// 自定义事件
const emit = defineEmits<{
  (e:"deleteHistoryTag",path:string,isActive:boolean)
}>()
// 路由实例对象
const $router = useRouter()

// 点击跳转路由
function goToPage(){
  $router.push(props.path)
}

// 删除路由历史记录
function toDeleteTag(){
  const {path,isActive}=props
  emit("deleteHistoryTag",path,isActive)
}
</script>
<style scoped>
li{
  display:flex;
  align-items:center;
  cursor: pointer;
  font-size: 12px;
  padding:3px 10px;
  margin-right: 10px;
  outline: 1px solid var(--el-color-info-light-3);
  border-radius:5px;
}
.tag-active{
  color: white;
  outline: none;
  background-color:var(--el-color-primary);
}
</style>
```

##### 3 路由历史记录滚动页

​	当路由历史记录多了之后就会超出容器大小导致ui显示异常，需要做滚动页处理，在路由历史记录外层包裹一个窗口容器，宽度和header一样宽，子内容超出后就隐藏。我们需要改变里层路由历史记录容器的滚动即可。

###### 	1.布局

​	需要注意的是，历史记录不能设置为flex布局，因为当子元素超出自己宽度时会强行让其挤在一起，所以我们只能不采用弹性布局，历史记录tag使用inline-block，并让历史记录强行不缓存white-space：nowarp即可完成布局。并且需要让历史记录的最小宽度为窗口容器的100%，因为在历史记录没有超过窗口容器时不能进行右滚动。

![image-20230416083919219](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230416083919219.png)

###### 	2.实现滚动的功能

​	只需滚动历史记录即可，改变其left的值。

​	左滚动，若left值本身为0则不能进行滚动，否则就+offset。

​	右滚动，若left的值等于父容器的宽度，则不能滚动，当left的值超过历史记录的宽度也不能进行滚动，否则就-offset

​	组件需要一个状态来维护left的值，也需要获取到历史记录的DOM。

![image-20230416110404148](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230416110404148.png)

###### 	2.5右滚动的实现难度

​	右滚动，每次滚动-offset。若当前|left|+窗口容器宽度>=历史记录容器大小就不能移动了.

![image-20230416111237146](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230416111237146.png)

​	但是每次移动时，需要考虑安全范围：**安全范围的left值为 0到-历史记录的宽度-offset**，若当前移动时在这个安全范围内，则可以放心大胆的-offset，若没有这个安全范围没有考虑-offset就会导致移动超过设定的范围导致出现大片的空白(下图):

![image-20230416111347600](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230416111347600.png)

​	当超过临界值时，则只需要设置left的值为-历史记录宽度-窗口容器宽度即可完成。

###### 	3.当历史记录未超过窗口容器时不显示左右滚动的按钮

###### 	4.当删除路由记录时，需要让left的值为0

###### 	5.动态的显示按钮，当历史记录不超过容器大小时不显示按钮；让浏览器窗口发生变化时动态检测是否需要显示按钮；当浏览器窗口大小发生变化并历史记录不超过容器大小时需要让left值为0

#### 3.3 封装业务主页面

```vue
<template>
  <div class="main-panel">
    <!--展示系统页面的子路由-->
    <router-view></router-view>
  </div>
</template>
<script lang='ts' setup>

</script>
<style scoped>
.main-panel{
  background-color:rgb(245, 247, 249);
  box-sizing: border-box;
  padding: 20px;
  min-height:calc(100vh - 80px);
  display: flex;
  flex-direction: column;
}
</style>
```

#### 3.4头部功能组





### 4.layout的响应式布局

#### 窗口有两个状态

##### 	屏幕小于800px

​		1.侧边栏被隐藏

​		2.侧边栏被显示，200px

##### 	屏幕大于800px

​		1.侧边栏正常显示200px

​		2.侧边栏被折叠100px；

两个窗口状态下，header组件中，菜单的按钮可以进行点击进行切换侧边栏的显示和隐藏（折叠）

需要header组件与Layout组件进行通讯，所以使用了pinia仓库进行状态管理，使用来个状态用于描述。

![image-20230414183755161](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230414183755161.png)

#### 实现

​	1.通过window来监听窗口大小变化的事件，来动态的设置仓库中的windowFlag。 

​	2.点击了控制侧边栏的展开和折叠（隐藏,在800像素以下为隐藏）

​	3.若当前要切换为大屏模式了，若侧边栏隐藏了，自动帮其展开c

​	4.若当前要切换为小屏模式了，若侧栏了展开了，自定义帮其隐藏

​	5.windowFlag的初始值有窗口大小决定

```ts
仓库
import { defineStore } from 'pinia';

// 侧边栏
const useSideBarStore = defineStore('sideBar', {
    state() {
        return {
            /**
             * 是否展开或折叠(隐藏)侧边栏,初始情况下默认展开true为展开
             */
            showFlag: true,
            /**
             * 小屏幕还是大屏模式,true为大屏
             */
            windowFlag: window.innerWidth > 800 ? true : false
        }
    },
    actions: {
        /**
         * 设置窗口模式
         * @param value - 大窗口或小窗口(布尔值)
         */
        toggleWindow(value: boolean) {
            this.windowFlag = value
        },
        /**
         * 设置展开还是折叠(隐藏)
         */
        toggleShow() {
            this.showFlag=!this.showFlag
        }
    }
})



export default useSideBarStore
```

```ts
钩子
import useSideBarStore from '../store/sideBar'
import { storeToRefs } from 'pinia'
/**
 * @param flag - 是否生成窗口的事件监听?
 */
export default function useSideBar(flag: boolean = false) {
    // 获取仓库实例
    const sideBarStore = useSideBarStore()
    // 仓库的数据源
    const { showFlag, windowFlag } = storeToRefs(sideBarStore)

    if (flag) {
        // 监听窗口大小变化动态设置windowFlag的值设置大屏还是小屏模式
        window.addEventListener("resize", () => {
            if (window.innerWidth > 800 && windowFlag.value === false) {
                // 当前为大屏模式下并且数据源还是false(意味着当前数据源还是小屏模式)
                // 是修改数据源,减少更新的次数
                sideBarStore.toggleWindow(true)
                // 若当前处于折叠状态自动帮其展开
                if (!showFlag.value) {
                    sideBarStore.toggleShow()
                }

            } else if (window.innerWidth <= 800 && windowFlag.value === true) {
                // 当前为小屏模式下并且数据源还是true是就修改数据源(意味着当前数据源还是大屏模式)
                sideBarStore.toggleWindow(false)
                // 若当前为展开模式下,自动帮其隐藏
                if (showFlag.value) {
                    sideBarStore.toggleShow()
                }
            }
        })
    }


    return {
        showFlag,
        windowFlag,
        toggleShow: sideBarStore.toggleShow
    }
}

```

## 3.登录页面

​	使用全局后置首页，当本地有token时就拦截到login页面。

### 1.验证登陆

​	登陆时，使用验证码登陆，使用插件"vue3-slide-verify"，这玩意需要条件渲染来控制验证码组件的显示和隐藏，所以我想使用render、h函数在需要的时候手动创建组件，封装成一个函数，函数返回值promise，通过验证码组件验证成功或失败来设置promise的成功或失败

```ts
import { h, render } from 'vue'
import Vcode from '@/components/Vcode/Vcode.vue'

import './index.css'
/**
 * 创建验证码组件
 */
function code() {
    // 验证码的成功和失败状态

    return new Promise((resovle, reject) => {
        // 创建真实容器
        const container = document.createElement("div")
        container.classList.add("vcode-container")

        // 当JS执行完后,容器被渲染到页面中后再添加动画
        setTimeout(() => {
            container.classList.add("vcode-container-enter")
        })

        // 验证码失败或成功的回调
        const stateHandler = (value: boolean) => {
            if (value) {
                resovle("success")
                // 消失动画,需要等JS执行完成后再添加动画效果
                container.classList.remove("vcode-container-enter")

                // 等待1秒再执行消失动画
                setTimeout(() => {
                    container.classList.add("vcode-container-leave")
                }, 1000)

                // 动画效果执行完成了销毁容器
                setTimeout(() => {
                    container.remove()
                }, 2000)

            } else {
                reject("fail")
            }
        }

        // 创建组件虚拟DOM
        const vnode = h(Vcode, { stateHandler })

        // 将虚拟DOM转为真实DOM
        render(vnode, container)
        // 插入到页面节点中去
        document.body.insertAdjacentElement("beforeend", container)

    })
}


export default code
```

### 2.封装axios，并在全局显示加载条

​	进度条使用Nprogress，注意不仅要引入Nprogress，还要引入对应的样式，否则没有样式哦

```ts
// 引入progress的样式
import 'nprogress/nprogress.css'
```

### 3.二次封装axios

```ts
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import type ResponseType from './interfaces'
import NProgress from 'nprogress'
import { ElMessage } from 'element-plus'

const request = axios.create({
    baseURL: 'https://mock.presstime.cn/mock/643b809c7e9ae476cd8b645f/admin-test'
})

// 请求拦截器
request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // 开启加载条
    NProgress.start()
    const token = localStorage.getItem("token")
    token ? config.headers.Authorization = 'Bearer ' + token : ''
    return config
}, (error: AxiosError) => {
    ElMessage.error("加载失败,请稍后再试!")
    return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use((response: AxiosResponse) => {
    // 结束加载条
    NProgress.done()
    return response.data
}, (error: AxiosError) => {
    // 结束加载条
    ElMessage.error("加载失败,请稍后再试!")
    NProgress.done()

    return Promise.reject(error)
})

export default {
    get<T = any>(url: string, params: object = {}, config?: AxiosRequestConfig): Promise<ResponseType<T>> {
        return request.get(url, { params, ...config })
    },
    post<T = any>(url: string, data: object = {}, params: object = {}, config?: AxiosRequestConfig): Promise<ResponseType<T>> {
        return request.post(url, data, { params, ...config })
    },
    delete<T = any>(url: string, params: object = {}, config?: AxiosRequestConfig): Promise<ResponseType<T>> {
        return request.delete(url, { params, ...config })
    },
    patch<T = any>(url: string, data: object = {}, params: object = {}, config?: AxiosRequestConfig): Promise<ResponseType<T>> {
        return request.patch(url, data, { params, ...config })
    },
    put<T = any>(url: string, data: object = {}, params: object = {}, config?: AxiosRequestConfig): Promise<ResponseType<T>> {
        return request.put(url, data, { params, ...config })
    }

}

```

### 4.懒加载的路由也可以使用进度条

​	懒加载的路由组件可以使用全局前置守卫开启进度条、全局后置守卫关闭进度条。

```ts
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
```

## 4.封装MessageBox的文本类型的对话框

​	手动封装了函数创建组件的消息提示组件，仅有最简单的消息展示和确认取消按钮，封装好了才发elementUI内置有消息弹出框。

​	我这个messageBox大概就是调用messageBox函数，传入title和content，即可在页面中创建一个消息提示框（包含遮罩层），有.5s的进场动画和离场动画，分别在显示、关闭该组件时会执行。消息提示框有两个关闭状态，确认关闭和取消关闭。

​	不过我遇到的问题就是，我想在点击遮罩层时也想要执行进场离场动画，由于我的进场离场动画是通过messageBox组件自身的状态来维护进场和离场的动画的，所以在点击遮罩层（也就是容器组件）也想要操作messageBox组件自身的状态来实现进场离场的动画。**这时候defineExpose闪亮登场。**

**defineExpose**：可以将当前组件的数据源、方法等等通过这个api暴露出去，在使用该组件的时候通过ref应用获取到组件实例从而获取到exposed属性，exponsed属性中就有组件暴露出来的东西。

![image-20230417164729469](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230417164729469.png)

由于我们创建了虚拟DOM，可以直接获取到组件的实例，可以直接获取到暴露的内容。

![image-20230417165356573](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230417165356573.png)

### MessageBox.vue

```vue
<template>
    <transition appear name="msg">
        <div class="message-box" v-if="showFlag">
            <h2><span>{{ title }}</span><span @click="toCloseWindow(false)">x</span></h2>
            <div class="message-content" v-html="content"></div>
            <div class="message-btns">
                <el-button @click.stop="toCloseWindow(false)">取消</el-button>
                <el-button type="primary" @click.stop="toCloseWindow(true)">确认</el-button>
            </div>
        </div>
    </transition>
</template>
<script lang='ts' setup>
/**
 * 暴露出来的属性:
 * showFlag 用于动画的进场和离场动画
 */
import { ElButton } from 'element-plus';
import { ref } from 'vue'

interface MessageBoxProps {
    /**
     * 消息的标题
     */
    title: string;
    /**
     * 消息的主要内容
     */
    content: string;
    /**
     * 关闭消息 
     */
    closeMessageBox: (flag: boolean) => void
}

// 控制动画的进场和离场
const showFlag = ref(true)
const props = defineProps<MessageBoxProps>()

function toCloseWindow(value: boolean) {
    // 隐藏消息窗口
    showFlag.value = false
    // 动画效果执行完成再销毁容器
    setTimeout(() => {
        props.closeMessageBox(value)
    }, 600)
}

// 将自身的状态暴露给外部,主要能够访问该组件实例就能获取到showFlag
defineExpose({ showFlag })

</script>
```

### render

```ts
import MessageBox from '@/components/MessageBox/MessageBox.vue'
import { h, render } from 'vue'
import './index.css'
function messageBox(title: string = '标题', content: string = '内容') {
    return new Promise((resolve, reject) => {
        const container = document.createElement("div")
        container.classList.add("message-box-container")

        const closeMessageBox = (flag: boolean) => {
            flag ? resolve("confirm") : reject("cancel")
            container.remove()
        }

        const vnode = h(MessageBox, { title, content, closeMessageBox })

        render(vnode, container)
        document.body.insertAdjacentElement("beforeend", container)

        // 点击遮罩层取消
        container.addEventListener("click", ({ target }) => {
            if (target === container) {
                // 修改组件暴露出来的数据,达到动画离场的效果
                (vnode.component as any).exposed.showFlag.value = false
                // 等待动画效果结束后再销毁容器
                setTimeout(() => {
                    closeMessageBox(false)
                }, 500)
            }
        })
    })

}

export default messageBox
```

## 5.封装echarts组件

​	我是使用窗口发生变化就重新渲染图表，但是频繁的触发窗口resize事件很浪费浏览器资源，所以我使用防抖，只对最后一次窗口变化就行渲染图表

```ts
<template>
    <li class="charts" ref="chartsDOM" :style="{ height: height + 'px' }"></li>
</template>
<script lang='ts' setup>
import debounce from '../../utils/debounce'
import type { EChartsType } from 'echarts'
import { onMounted, ref, onUnmounted } from 'vue';
import renderCharts from '../../utils/echarts'
// 图表组件的自定义属性
interface ChartsProps {
    option: object;
    height: number;
    width: number;
}
// 图表元素
const chartsDOM = ref<HTMLElement | null>(null)

// 图标配置项
const props = defineProps<ChartsProps>()

// echarts实例
let echarts: EChartsType | null = null


// 重新渲染图表
function renderRepeat() {
    echarts?.dispose()
    setTimeout(() => {
        echarts = renderCharts(chartsDOM.value as HTMLElement, props.option)
    })
}

// 重新渲染图表防抖版
const renderRepeatDebounce = debounce(renderRepeat,500)

// 首次渲染图表
onMounted(() => {
    echarts = renderCharts(chartsDOM.value as HTMLElement, props.option)
    // 窗口变化时重新渲染图表
    window.addEventListener("resize", renderRepeatDebounce)
})


// 组件销毁时,解绑事件处理函数
onUnmounted(() => {
    window.removeEventListener("resize", renderRepeatDebounce)

})

</script>
```

## 6.封装echarts函数

```ts
import * as echarts from 'echarts';
/**
 * 渲染图表
 * @param element - 渲染的元素
 * @param option - 渲染的配置项选项
 */
function renderCharts(element: HTMLElement, option: any) {
    const myChart = echarts.init(element);
    option && myChart.setOption(option);
    return myChart
}
export default renderCharts
```

## 7.深色模式

​	在设置面板中，可以设置系统的主题颜色和深色模式。

图表支持的深色模式：在渲染图表时，需要指定深色模式的class值为dark即可渲染深色模式的图表

```ts
import * as echarts from 'echarts';
import useThemeStore from '@/store/theme';
const themeStore = useThemeStore()
/**
 * 渲染图表
 * @param element - 渲染的元素
 * @param option - 渲染的配置项选项
 */
function renderCharts(element: HTMLElement, option: any) {
    // 获取当前是深色模式还是亮色模式
    const className = themeStore.isDark ? 'dark' : ''
    // 初始化图表
    const myChart = echarts.init(element, className);
    // 渲染图表
    option && myChart.setOption(option);
    return myChart
}
export default renderCharts
```



## 8.权限页面

​	在登录系统之后，用户的角色一般有两种，管理员和普通用户，管理员权限更高，所有页面都可以访问，而对于一般用户来说，某些页面是不允许访问的。

### 	8.1用户仓库

​	创建用户仓库用来保存登录后返回的用户信息，包括token、roles等。当然也要包括用于修改用户token和角色的仓库方法，用于切换用户时，更新用户信息。

![image-20230418171957153](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230418171957153.png)

### 	8.2.权限页面的路由配置

​	在路由表中设置权限页面的路由元数据meta，在需要权限的页面中配置页面访问角色。

下图就是管理员页面可以访问的角色有admin、用户页面可以访问的角色有user

![image-20230418171333901](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230418171333901.png)

### 	8.3使用路由独享守卫进行页面权限拦截

​	在需要权限的页面中，使用路由独享守卫进行拦截，若当前角色不为权限页面中需要的角色就停滞访问。(通过路由元数据meta来访问到当前页面允许的角色)。

#### 	问题：在路由中访问pinia仓库失败

![image-20230418173522845](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230418173522845.png)

![image-20230418174214646](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230418174214646.png)

#### 	解决方法1

​		在router中获取仓库时，需要提前createPinia一次，我是先前在store中暴露了一份，所以直接拿来引用了。并且在调用仓库钩子时必须要传入createPinia函数的返回值，否则也会报错。

```ts
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
// 在使用仓库之前必须要先createPinia一次
import store from "@/store";
import { Role } from '@/store/user/interfaces';
import useUserStore from "@/store/user/user";
import { storeToRefs } from "pinia";
// 由于不是在setup钩子中使用的pinia仓库,在调用获取仓库时,需要传入createPinia的返回值
const { role } = storeToRefs(useUserStore(store))

/**
 * 独享路由守卫进行路由页面的拦截
 */
export const hasPermisson = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // 若当前角色不为访问的路由页面允许的角色,则不允许跳转
    if ((to.meta.permission as Role[]).includes(role.value)) {
        next()
    } else {
        next(false)
    }
}


```

#### 解决方法2

​	这种方式和第一种思路是一样的，不过能够减少引入store的次数，少些代码

#### 1.某个仓库.ts

```ts
import store from '@/store'
import { defineStore } from 'pinia'
import type { UserState, Role } from './interfaces'

const userState: UserState = {
    role: "user",
    token: null
}

const useUserStore = defineStore("user", {
    state: () => userState,
    actions: {
        setRoles(value: Role) {
            this.role = value
        },
        setToken(value: string) {
            this.token = value
        }
    }
})

export default useUserStore

// 直接导出不需要在钩子中就能获取到仓库实例的方法
export const useUserStoreWithout = () => {
    return useUserStore(store)
}
```

#### 2.路由中直接使用

```ts
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { Role } from '@/store/user/interfaces';
import { useUserStoreWithout } from "@/store/user/user";
import { storeToRefs } from 'pinia';

const { role } = storeToRefs(useUserStoreWithout())
/**
 * 独享路由守卫进行路由页面的拦截
 */
export const hasPermisson = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    console.log((to.meta.permission as Role[]), role.value);
    // 若当前角色不为访问的路由页面允许的角色,则不允许跳转
    if ((to.meta.permission as Role[]).includes(role.value)) {
        next()
    } else {
        next(false)
    }
}


```



## 9.权限指令

​	在某些页面中，根据当前登录角色的不同，页面的一些元素会显示和隐藏，以此达到不同权限可以使用不同的功能。

### 	1.注册全局自定义指令遇到的问题

​	注册全局自定义指令时，app.directive的第一个参数不需要添加v的前缀。比如app.directive('hello',{....})，在模板中可以v-hello直接使用

### 	2.权限指令

​	不过这种方式只能初始化的时候有效，因为当权限不匹配时元素直接被删除了，若用户角色更新的话是无法重新创建元素的。

```ts
import type { Directive } from 'vue'
// 获取仓库数据源
import { useUserStoreWithout } from '@/store/user/user';
import { storeToRefs } from 'pinia';
const { role } = storeToRefs(useUserStoreWithout())
/**
 * 权限级别的自定义指令
 * 根据当前登录的用户,来控制元素的显示和隐藏
 * binding的值为角色数组,代表该元素在哪些角色下显示
 */
const roles: Directive = {
    mounted(el: HTMLElement, binding) {
        const { value: roles } = binding
        console.log('roles:' + roles + '    ' + 'role:' + role.value);
        if (!roles.includes(role.value)) {
            el.remove()
        }
    }
}
export default roles
```



## 10.错误页面

### 	404页面

​	404页面,在vue-router4版本中，使用错误页面，路由路径不能再是*了，而是使用正则来捕获未配置的路由路径。

![image-20230418124422009](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230418124422009.png)

## 11.动态路由(还是不知道怎么实现)

​	动态路由，根据当前用户角色不同从之加载哪些路由页面，是权限页面的升级版，因为权限级别的页面，路由表是写死的，不能通过用户的角色来动态注册路由，只是通过路由元数据meta来控制用户的页面访问权限。

​	而动态路由是将不需要权限的页面当作静态路由（固定的路由表），需要权限的路由是按照当前登录的用户来动态注册路由的。

## 12.权限组件

​	为了弥补自己没法实现的权限指令，所以就有了权限组件。传入自定义属性：允许的使用该元素的角色列表，根据v-if来渲染和销毁组件，感觉比自定义指令实现起来简单些。

1.组件

```ts
<template>
    <slot v-if="isAllow"></slot>
</template>
<script lang='ts' setup>
import useUserStore from '@/store/user/user';
import { storeToRefs } from 'pinia';
import { computed } from 'vue'
import { Role } from '@/store/user/interfaces';
// 自定义属性,接收允许访问组件的角色列表
const props = defineProps<{ roles: Role[] }>()
// 获取当前用户的角色
const { role } = storeToRefs(useUserStore())
// 当前用户是否在允许的角色列表中?
const isAllow = computed(() => {
    return props.roles.includes(role.value)
})
</script>
```

2.使用

```vue
       <RoleComponent :roles="['admin', 'user']">
                <el-button>admin,user</el-button>
            </RoleComponent>
            <RoleComponent :roles="['admin']">
                <el-button>admin</el-button>
            </RoleComponent>
            <RoleComponent :roles="['user']">
                <el-button>user</el-button>
            </RoleComponent>
```

## 13.根据用户角色动态渲染菜单栏

​	

```vue
<template>
  <el-sub-menu v-if="route.children && route.children.length > 0 && hasPermision" :index="route.path">
    <template #title>
      <MenuTitle :route="route" />
    </template>
    <MenuItem :route="item" v-for="item in route.children" :key="item.path" />
  </el-sub-menu>
  <el-menu-item v-else-if="route.meta && hasPermision" :index="route.path">
    <MenuTitle :route="route" />
  </el-menu-item>
</template>
<script lang='ts' setup>
// 获取用户仓库
import useUserStore from "@/store/user/user";
// 渲染子级路由
import { RouteRecordRaw } from "vue-router";
import { computed } from 'vue'
import MenuTitle from "../MenuTitle/MenuTitle.vue";
// 自定义属性接收路由对象
const props = defineProps<{ route: RouteRecordRaw }>()

const userStore = useUserStore()
// 根据当前用户的角色来动态展示导航项
const hasPermision = computed(() => {
  if (props.route.meta!.permission) {
    // 需要权限判断的就去检测是否有权限能够访问该路由
    return (props.route.meta!.permission as string[]).includes(userStore.role)
  } else {
    // 无需权限的路由就始终返回true,不需要权限判断
    return true
  }

})

</script>
```

