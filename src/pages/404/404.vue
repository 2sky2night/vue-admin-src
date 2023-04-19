<template>
    <div class="page-error">
        <el-result icon="error" title="404" sub-title="没有找到该页面!">
            <template #extra>
                <el-button type="primary" @click="goBack">返回</el-button>
            </template>
        </el-result>
    </div>
</template>
<script lang='ts' setup>
import { useRouter } from 'vue-router'
const $router = useRouter()
function goBack() {
    $router.back()
}
</script>
