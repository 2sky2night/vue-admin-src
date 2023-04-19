export type Role = "user" | "admin"

export interface UserState {
    /**
     * 用户的token
     */
    token: string | null;
    /**
     * 用户的权限
     */
    role: Role
}