<template>
    <component  v-if="route.meta && route.meta.icon" class="el-icon" :is="route.meta.icon"></component>
    <el-icon v-else>
        <ElementPlus />
    </el-icon>
    <span v-if="route.meta && route.meta.title">{{ route.meta.title }}</span>
    <span v-else>{{ route.path }}</span>
</template>

<script lang='ts' setup>
import type { RouteRecordRaw } from 'vue-router';
const props = defineProps<{ route: RouteRecordRaw }>()

</script>
