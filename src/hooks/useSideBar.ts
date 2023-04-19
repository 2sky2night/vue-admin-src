import useSideBarStore from '@/store/sideBar/sideBar'
import { storeToRefs } from 'pinia'
/**
 * @param flag - 是否生成窗口的事件监听?
 */
export default function useSideBar(flag: boolean = false) {
    // 获取仓库实例
    const sideBarStore = useSideBarStore()
    // 仓库的数据源
    const { showFlag, windowFlag } = storeToRefs(sideBarStore)

    if (flag) {
        // 监听窗口大小变化动态设置windowFlag的值设置大屏还是小屏模式
        window.addEventListener("resize", () => {
            if (window.innerWidth > 800 && windowFlag.value === false) {
                // 当前为大屏模式下并且数据源还是false(意味着当前数据源还是小屏模式)
                // 是修改数据源,减少更新的次数
                sideBarStore.toggleWindow(true)
                // 若当前处于折叠状态自动帮其展开
                if (!showFlag.value) {
                    sideBarStore.toggleShow()
                }

            } else if (window.innerWidth <= 800 && windowFlag.value === true) {
                // 当前为小屏模式下并且数据源还是true是就修改数据源(意味着当前数据源还是大屏模式)
                sideBarStore.toggleWindow(false)
                // 若当前为展开模式下,自动帮其隐藏
                if (showFlag.value) {
                    sideBarStore.toggleShow()
                }
            }
        })
    }


    return {
        showFlag,
        windowFlag,
        toggleShow: sideBarStore.toggleShow
    }
}
