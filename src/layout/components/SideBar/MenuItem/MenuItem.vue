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