import store from '@/store'
import { defineStore } from 'pinia'
import type { UserState, Role } from './interfaces'

const userState: UserState = {
    role: "user",
    token: null
}

const useUserStore = defineStore("user", {
    state: () => userState,
    actions: {
        setRoles(value: Role) {
            this.role = value
        },
        setToken(value: string) {
            this.token = value
        }
    }
})

export default useUserStore

export const useUserStoreWithout = () => {
    return useUserStore(store)
}