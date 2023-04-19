<template>
    <el-switch active-text="深色" inactive-text="亮色" @change="themeStore.toggleDark" :model-value="isDark">点我</el-switch>
</template>
<script lang='ts' setup>
import useThemeStore from '@/store/theme/theme.js'
import { storeToRefs } from 'pinia';
const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
</script>