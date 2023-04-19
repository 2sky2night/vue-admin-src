<template>
    <!--功能按钮-->
    <div class="func-btns">
        <el-icon>
            <Search />
        </el-icon>
        <el-icon @click="toggleFullScreen">
            <FullScreen />
        </el-icon>
    </div>
</template>
<script lang='ts' setup>
/**
 * 切换全屏
 */
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

</script>
<style scoped>
.func-btns {
    margin-right: 10px;
    display: flex;
}

.func-btns i {
    cursor: pointer;
    margin-left: 10px;
}
</style>