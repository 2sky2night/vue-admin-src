<template>
    <transition appear name="msg">
        <div class="message-box" v-if="showFlag">
            <h2><span>{{ title }}</span><span @click="toCloseWindow(false)">x</span></h2>
            <div class="message-content" v-html="content"></div>
            <div class="message-btns">
                <el-button @click.stop="toCloseWindow(false)">取消</el-button>
                <el-button type="primary" @click.stop="toCloseWindow(true)">确认</el-button>
            </div>
        </div>
    </transition>
</template>
<script lang='ts' setup>
/**
 * 暴露出来的属性:
 * showFlag 用于动画的进场和离场动画
 */
import { ElButton } from 'element-plus';
import { ref } from 'vue'

interface MessageBoxProps {
    /**
     * 消息的标题
     */
    title: string;
    /**
     * 消息的主要内容
     */
    content: string;
    /**
     * 关闭消息 
     */
    closeMessageBox: (flag: boolean) => void
}

// 控制动画的进场和离场
const showFlag = ref(true)
const props = defineProps<MessageBoxProps>()

/**
 * 消息窗口
 * @param value - 以什么状态关闭消息窗口
 */
function toCloseWindow(value: boolean) {
    // 隐藏消息窗口
    showFlag.value = false
    // 动画效果执行完成再销毁容器
    setTimeout(() => {
        props.closeMessageBox(value)
    }, 600)
}

// 将自身的状态暴露给外部,主要能够访问该组件实例就能获取到showFlag
defineExpose({ showFlag })

</script>
<style scoped>
.msg-enter-active {
    animation: msgMove .5s 1 ease-in-out;
}

.msg-leave-active {
    animation: msgMove .5s 1 ease-in-out reverse;
}

@keyframes msgMove {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0px);
    }
}

h2 {
    font-weight: 100;
    font-size: 15px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

h2>span:nth-child(2) {
    font-size: 20px;
    cursor: pointer;
    color: var(--el-color-info);
}

h2>span:nth-child(2):hover {
    color: var(--el-color-black)
}

.message-content {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 10px;
    flex-grow: 1;
    font-size: 14px;
    color: var(--el-color-info)
}

.message-box {
    user-select: none;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    background-color: var(--el-bg-color);
    min-height: 150px;
    width: 400px;
    border: 1px solid var(--el-border-color);
}

.message-btns {
    padding: 0 10px;
    align-self: flex-end;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}
</style>
