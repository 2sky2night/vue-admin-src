<template>
  <el-menu :collapse="!showFlag && windowFlag" router :default-active="$route.path" class="menu"
    style="border:none;flex-grow: 1;" text-color="#dcdcdc" background-color="#2c4a68">
    <MenuItem :route="item" v-for="item in formatRoutes" :key="item.path" />
    <!--隐藏按钮-->
    <div @click="toggleShow" v-show="showFlag && !windowFlag" class="side-bar-hide-btn">
      <el-icon color="#dcdcdc">
        <DArrowLeft />
      </el-icon>
    </div>
  </el-menu>
</template>
<script lang='ts' setup>
import type { RouteRecordRaw } from "vue-router";
// 使用侧边栏钩子
import useSideBar from "@/hooks/useSideBar";
// 引入路由表
import routes from "@/router/routes"
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
  transition: .5s;
  cursor: pointer;
  position: absolute;
  height: var(--el-menu-item-height);
  display: flex;
  align-items: center;
  bottom: 0;
  width: 100%;
  justify-content: center;
}

.side-bar-hide-btn:hover {
  background-color: var(--el-menu-hover-bg-color);
}
</style> 