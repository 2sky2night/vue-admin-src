<template>
  <div class="main-panel">
    <!--展示系统页面的子路由-->
    <router-view v-slot="{ Component }">
      <transition name="page">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script lang='ts' setup>

</script>
<style scoped>
.main-panel {
  background-color: var(--el-bg-color);
  min-height: calc(100vh - 80px);
  position: relative;
  overflow-x: hidden;
}

.main-panel::-webkit-scrollbar {
  width: 5px;
}

.main-panel::-webkit-scrollbar-thumb {
  width: 5px;
  border-radius: 10px;
  background-color: var(--el-color-primary);
}

.page-enter-active {
  animation: pageMove .5s ease-in-out 1;
}

@keyframes pageMove {
  from {
    opacity: 0;
    transform: translateX(10px);
  }

  to {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>