import { useDark, useToggle } from '@vueuse/core'
import useThemeStore from '@/store/theme/theme'

function useToggleDark() {
    // 主题仓库
    const themeStore = useThemeStore()
    // 获取dark
    const dark = useDark()
    // 获取切换dark的处理函数
    const toggleDark = useToggle(dark)

    // 切换主题颜色
    function toggleTheme() {
        toggleDark()
        themeStore.toggleDark()
    }

    return  toggleTheme
    
}

export default useToggleDark
