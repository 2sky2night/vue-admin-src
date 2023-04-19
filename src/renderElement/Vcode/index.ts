import { h, render } from 'vue'
import Vcode from '@/components/Vcode/Vcode.vue'

import './index.css'
/**
 * 创建验证码组件
 */
function code() {
    // 验证码的成功和失败状态

    return new Promise((resovle, reject) => {
        // 创建真实容器
        const container = document.createElement("div")
        container.classList.add("vcode-container")

        // 当JS执行完后,容器被渲染到页面中后再添加动画
        setTimeout(() => {
            container.classList.add("vcode-container-enter")
        })

        // 验证码失败或成功的回调
        const stateHandler = (value: boolean) => {
            if (value) {
                resovle("success")
                // 消失动画,需要等JS执行完成后再添加动画效果
                container.classList.remove("vcode-container-enter")

                // 等待1秒再执行消失动画
                setTimeout(() => {
                    container.classList.add("vcode-container-leave")
                }, 1000)

                // 动画效果执行完成了销毁容器
                setTimeout(() => {
                    container.remove()
                }, 1900)

            } else {
                reject("fail")
            }
        }

        // 创建组件虚拟DOM
        const vnode = h(Vcode, { stateHandler })

        // 将虚拟DOM转为真实DOM
        render(vnode, container)
        // 插入到页面节点中去
        document.body.insertAdjacentElement("beforeend", container)
    })
}


export default code