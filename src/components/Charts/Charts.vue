<template>
    <li class="charts" ref="chartsDOM" :style="{ height: height + 'px' }"></li>
</template>
<script lang='ts' setup>
import type { EChartsType } from 'echarts'
import { onMounted, ref, onUnmounted } from 'vue';
import debounce from '@/utils/debounce'
import renderCharts from '@/utils/echarts'
import useThemeStore from '@/store/theme/theme.js';

const themeStore = useThemeStore()

// 图表组件的自定义属性
interface ChartsProps {
    option: object;
    height: number;
    width: number;
}
// 图表元素
const chartsDOM = ref<HTMLElement | null>(null)

// 图标配置项
const props = defineProps<ChartsProps>()

// echarts实例
let echarts: EChartsType | null = null

// 重新渲染图表
function renderRepeat() {
    echarts?.dispose()
    setTimeout(() => {
        echarts = renderCharts(chartsDOM.value as HTMLElement, props.option)
    })
}

// 重新渲染图表防抖版
const renderRepeatDebounce = debounce(renderRepeat, 500)

// 首次渲染图表
onMounted(() => {
    echarts = renderCharts(chartsDOM.value as HTMLElement, props.option)
    // 窗口变化时重新渲染图表
    window.addEventListener("resize", renderRepeatDebounce)
})


// 组件销毁时,解绑事件处理函数
onUnmounted(() => {
    window.removeEventListener("resize", renderRepeatDebounce)
})

// 检测主题仓库的方法执行,就重新渲染图表
themeStore.$onAction(({ after }) => {
    after(renderRepeat)
})
</script>