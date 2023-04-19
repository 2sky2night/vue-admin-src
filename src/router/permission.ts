import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { Role } from '@/store/user/interfaces';
import { useUserStoreWithout } from "@/store/user/user";
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
const { role } = storeToRefs(useUserStoreWithout())
/**
 * 独享路由守卫进行路由页面的拦截
 */
export const hasPermisson = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    console.log((to.meta.permission as Role[]), role.value);
    // 若当前角色不为访问的路由页面允许的角色,则不允许跳转
    if ((to.meta.permission as Role[]).includes(role.value)) {
        next()
    } else {
        ElMessage.error("权限不足,不允许跳转")
        setTimeout(() => {
            document.title=from.meta.title as string
        })
        next(false)
    }
}

