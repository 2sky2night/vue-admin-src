<template>
    <div>
        <h1>设置权限页面</h1>
        <h2>所有角色可见😎</h2>
        <SelectRole />
        <div>
            tips:设置的角色有:admin和user
        </div>
        <div style="margin: 30px;">
            <h2>当前角色可见按钮(指令级别)</h2>
            <el-button v-roles="['admin', 'user']" type="primary">admin,user</el-button>
            <el-button v-roles="['admin']" type="warning">admin</el-button>
            <el-button v-roles="['user']" type="danger">user</el-button>
        </div>
        <div style="margin: 30px;">
            <h2>当前角色可见按钮(组件级别)</h2>
            <RoleComponent :roles="['admin']">
                <el-button type="warning">admin</el-button>
            </RoleComponent>
            <RoleComponent :roles="['admin', 'user']">
                <el-button type="primary">admin,user</el-button>
            </RoleComponent>
            <RoleComponent :roles="['user']">
                <el-button type="danger">user</el-button>
            </RoleComponent>
        </div>
        <el-tag>🆒</el-tag>
        <el-tag class="mr-1" type="success">😘</el-tag>
        <el-tag class="mr-1" type="info">😊</el-tag>
        <el-tag class="mr-1" type="warning">😛</el-tag>
        <el-tag class="mr-1" type="danger">😉</el-tag>
    </div>
</template>
<script lang='ts' setup>
import SelectRole from '@/components/SelectRole/SelectRole.vue';
</script>
<style scoped></style>