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
