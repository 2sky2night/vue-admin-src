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

import useSideBar from "@/hooks/useSideBar";
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
  background-color: var(--el-bg-color);
  transition-property: left width;
}

aside.el-aside::-webkit-scrollbar {
  width: 6px;
  background-color: #2c4a68;
}

aside.el-aside::-webkit-scrollbar-thumb {
  background-color: var(--el-color-primary-light-3);
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

/**小屏模式 */
aside.aside-small-window {
  position: absolute;
  left: -300px;
}

/**小屏模式展开 */
aside.aside-small-show {
  position: absolute;
  box-shadow: var(--el-box-shadow);
  left: 0px;
}

/**大窗口模式下折叠 */
aside.aside-hide {
  width: calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2);
}
</style>
