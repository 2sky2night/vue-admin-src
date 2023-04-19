<template>
    <div class="select-role">
        <div>当前权限为:{{ role }}</div>
        <el-select v-model="selectRole">
            <el-option value="admin" label="管理员" />
            <el-option value="user" label="用户" />
        </el-select>
        <el-button type="primary" @click="toChangeRole">确认</el-button>
    </div>
</template>
<script lang='ts' setup>
import useUserStore from '@/store/user/user';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'
const userStore = useUserStore()
// 获取仓库中的用户值
const { role } = storeToRefs(userStore)
// 初始化选择的角色
const selectRole = ref(role.value)

/**
 * 修改角色
 */
function toChangeRole() {
    userStore.setRoles(selectRole.value)
}
</script>
