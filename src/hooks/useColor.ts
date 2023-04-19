import { ref, watch, onMounted } from 'vue'
export default () => {
    const themeColor = ref("")

    onMounted(() => {
        const el = document.documentElement
        // 获取 css 变量
        themeColor.value = getComputedStyle(el).getPropertyValue(`--el-color-primary`)
    })

    // 检测到主题色数据源更新后就修改css变量
    watch(themeColor, () => {
        // 设置 css 变量
        const el = document.documentElement
        el.style.setProperty('--el-color-primary', themeColor.value)
    })

    return {
        themeColor
    }
}