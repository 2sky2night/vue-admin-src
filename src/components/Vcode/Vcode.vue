<template>
    <div class="silde_box">
        <slide-verify ref="block" :slider-text="text" :accuracy="accuracy" @again="onAgain"
            @success="onSuccess" @fail="onFail"></slide-verify>
        <div :class="`code-tips ${tipsType ? 'success' : 'error'}`">{{ msg }}</div>
    </div>
</template>
 
<script lang="ts" setup>
import { ref } from "vue";
import SlideVerify, { SlideVerifyInstance } from "vue3-slide-verify";
import "vue3-slide-verify/dist/style.css";

/**
 * 接收的自定义事件,用来设置验证的成功和失败状态的设置
 */
const props = defineProps<{
    stateHandler: (value: boolean) => void
}>()

const msg = ref("");
const block = ref<SlideVerifyInstance>();
const text = "向右滑动->"
const accuracy = 1
const tipsType = ref(false)

const onAgain = () => {
    msg.value = "检测到非人为操作的哦！ try again";
    // 刷新
    block.value?.refresh();
};

const onSuccess = (times: number) => {
    msg.value = `太厉害了! 本次验证耗时${(times / 1000).toFixed(1)}s`;
    tipsType.value = true
    props.stateHandler(true)
};

const onFail = () => {
    msg.value = "验证不通过";
    tipsType.value = false
    props.stateHandler(false)
};


</script>
<style scoped>
.silde_box {
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    background-color: var(--el-bg-color);
    display: flex;
    flex-direction: column;
    width: 350px;
    height: 255px;
  box-shadow:var(--el-box-shadow);
}

.code-tips {
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
}

.success {
    color: var(--el-color-success)
}

.error {
    color: var(--el-color-error)
}

:deep(.slide-verify-slider-text) {
    font-size: 12px;
    color: rgba(170, 170, 170)
}
</style>