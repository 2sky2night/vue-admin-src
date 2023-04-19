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

// 获取当前路由路径
const routeList = computed(() => {
  return $route.matched.slice(1)
})

</script>
<style scoped></style>