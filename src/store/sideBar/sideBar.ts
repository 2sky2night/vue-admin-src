import { defineStore } from 'pinia';

// 侧边栏
const useSideBarStore = defineStore('sideBar', {
    state() {
        return {
            /**
             * 是否展开或折叠(隐藏)侧边栏,初始情况下默认展开true为展开
             */
            showFlag: window.innerWidth > 800 ? true : false,
            /**
             * 小屏幕还是大屏模式,true为大屏
             */
            windowFlag: window.innerWidth > 800 ? true : false
        }
    },
    actions: {
        /**
         * 设置窗口模式
         * @param value - 大窗口或小窗口(布尔值)
         */
        toggleWindow(value: boolean) {
            this.windowFlag = value
        },
        /**
         * 设置展开还是折叠(隐藏)
         */
        toggleShow() {
            this.showFlag=!this.showFlag
        }
    }
})



export default useSideBarStore