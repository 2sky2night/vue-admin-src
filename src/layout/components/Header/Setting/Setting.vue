<template>
    <!--设置按钮-->
    <el-icon size="20" @click="drawer = !drawer" style="cursor: pointer;">
        <Setting />
    </el-icon>
    <el-drawer :size="300" v-model="drawer" title="设置">
        <el-form>
            <el-form-item label="主题色">
                <el-color-picker v-model="themeColor" />
            </el-form-item>
            <el-form-item label="主题模式">
                <DarkBtn />
            </el-form-item>
        </el-form>
    </el-drawer>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import DarkBtn from '@/components/DarkBtn/DarkBtn.vue';
import useColor from '@/hooks/useColor'
// 获取主题颜色钩子
const { themeColor } = useColor()
// 控制抽屉的开启和关闭
const drawer = ref(false)
</script>
<style scoped></style>