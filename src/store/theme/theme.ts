import { useDark, useToggle } from '@vueuse/core'
import { defineStore } from 'pinia'
// 获取dark
const dark = useDark()
// 获取切换dark的处理函数
const toggleDark = useToggle(dark)

// 根据本地存储的主题数据来初始化页面
const themeFlag = localStorage.getItem('vueuse-color-scheme') === 'light' ? false : true

const useThemeStore = defineStore("theme", {
    state: () => ({
        isDark: themeFlag
    }),
    getters: {
        isDarkFormat({ isDark }) {
            return isDark ? '深色模式' : '亮色模式'
        }
    },
    actions: {
        toggleDark() {
            this.isDark = !this.isDark
            toggleDark(this.isDark)
        }
    }
})

export default useThemeStore