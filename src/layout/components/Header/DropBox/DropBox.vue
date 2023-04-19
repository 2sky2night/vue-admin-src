<template>
    <div class="drop-box">
        <el-avatar @click="showFlag = !showFlag" class="user-avatar" shape="square"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <Transition name="el-fade-in-linear">
            <ul @mouseleave="showFlag = false" class="drop-list" v-show="showFlag">
                <li>关于</li>
                <li @click="logout">退出</li>
            </ul>
        </Transition>
    </div>
</template>
<script lang='ts' setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import messageBox from '@/renderElement/MessageBox'
const showFlag = ref<boolean>(false)
const $router = useRouter()

function logout() {
    messageBox("提示", "确认退出?").then(() => {
        localStorage.removeItem("token")
        $router.push("/login")
    })
}

</script>

<style scoped>
.user-avatar {
    cursor: pointer;
}

.drop-box {
    position: relative;
}

.drop-list::after {
    content: '';
    background-color: var(--el-bg-color);
    display: block;
    height: 10px;
    width: 10px;
    top: -5px;
    transform: rotate(45deg);
    left: 35px;
    position: absolute;
}

.drop-list {
    border: 1px solid var(--el-border-color);
    box-shadow: var(--el-box-shadow);
    background-color: var(--el-bg-color);
    z-index: 1000;
    position: absolute;
    padding: 5px 0;
    width: 80px;
    left: -20px;
    bottom: -80px;
}

.drop-list li {
    font-size: 13px;
    height: 30px;
    cursor: pointer;
    line-height: 30px;
    text-align: center;
}

.drop-list li:hover {
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);
}
</style>