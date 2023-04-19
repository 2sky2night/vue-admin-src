<template>
  <li :class="isActive ? 'tag-active' : ''" @click="goToPage">
    <span>{{ title }}</span>
    <el-icon v-if="path !== '/dashboard'" @click.stop="toDeleteTag" class="tag-close-icon">
      <Close />
    </el-icon>
  </li>
</template>
<script lang='ts' setup>
import { useRouter } from 'vue-router'

// 路由信息
const props = defineProps<{ title: string; path: string; isActive: boolean }>()

// 自定义事件
const emit = defineEmits<{
  (e: "deleteHistoryTag", path: string, isActive: boolean): void
}>()
// 路由实例对象
const $router = useRouter()

// 点击跳转路由
function goToPage() {
  $router.push(props.path)
}

// 删除路由历史记录
function toDeleteTag() {
  const { path, isActive } = props
  emit("deleteHistoryTag", path, isActive)
}
</script>
<style scoped>
li {
  max-height: 16px;
  display: inline-block;
  cursor: pointer;
  font-size: 12px;
  padding: 3px 10px;
  background-color: var(--el-bg-color);
  margin-right: 10px;
  outline: 1px solid var(--el-color-info-light-3);
  border-radius: 5px;
  transition: .2s;
}

.tag-active,
li:hover {
  color: var(--el-color-white);
  outline: none;
  background-color: var(--el-color-primary);
}

.tag-close-icon {
  margin-left: 5px;
  position: relative;
  top: 2px
}
</style>