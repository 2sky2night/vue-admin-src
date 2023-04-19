import type { Directive } from 'vue'
// 获取仓库数据源
import { useUserStoreWithout } from '@/store/user/user';
import { storeToRefs } from 'pinia';
const { role } = storeToRefs(useUserStoreWithout())
/**
 * 权限级别的自定义指令
 * 根据当前登录的用户,来控制元素的显示和隐藏
 * binding的值为角色数组,代表该元素在哪些角色下显示
 */
const roles: Directive = {
    mounted(el: HTMLElement, binding) {
        const { value: roles } = binding
        console.log('roles:' + roles + '    ' + 'role:' + role.value);
        if (!roles.includes(role.value)) {
            el.remove()
        }
    }
}
export default roles