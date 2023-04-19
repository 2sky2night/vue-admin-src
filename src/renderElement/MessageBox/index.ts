import MessageBox from '@/components/MessageBox/MessageBox.vue'
import { h, render } from 'vue'
import './index.css'
function messageBox(title: string = '标题', content: string = '内容') {
    return new Promise((resolve, reject) => {
        const container = document.createElement("div")
        container.classList.add("message-box-container")

        const closeMessageBox = (flag: boolean) => {
            flag ? resolve("confirm") : reject("cancel")
            container.remove()
        }

        const vnode = h(MessageBox, { title, content, closeMessageBox })

        render(vnode, container)
        document.body.insertAdjacentElement("beforeend", container)

        // 点击遮罩层取消
        container.addEventListener("click", ({ target }) => {
            if (target === container) {
                // 修改组件暴露出来的数据,达到动画离场的效果
                (vnode.component as any).exposed.showFlag.value = false
                // 等待动画效果结束后再销毁容器
                setTimeout(() => {
                    closeMessageBox(false)
                }, 500)
            }
        })
    })

}

export default messageBox