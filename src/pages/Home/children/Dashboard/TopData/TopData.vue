<template>
    <!--顶部数据栏目-->
    <ul class="top-header">
        <li>
            <el-statistic title="Daily active users" :value="268500" />
        </li>
        <li>
            <el-statistic :value="138">
                <template #title>
                    <div style="display: inline-flex; align-items: center">
                        Ratio of men to women
                        <el-icon style="margin-left: 4px" :size="12">
                            <Male />
                        </el-icon>
                    </div>
                </template>
                <template #suffix>/100</template>
            </el-statistic>
        </li>

        <li>
            <el-statistic title="Total Transactions" :value="172000" />
        </li>

        <li>
            <el-statistic title="Feedback number" :value="562">
                <template #suffix>
                    <el-icon style="vertical-align: -0.125em">
                        <ChatLineRound />
                    </el-icon>
                </template>
            </el-statistic>
        </li>

    </ul>
</template>
<script lang='ts' setup>
import { ChatLineRound, Male } from '@element-plus/icons-vue'
</script>
<style scoped>
.top-header {
    display: flex;
    justify-content: space-around;
}

.top-header li {
    text-align: center;
}
</style>