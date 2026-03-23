export type User = {
    name: string
    email: string
    role: UserRole
    isBanned: boolean
}

export type UserRole = "user" | "admin"

export type UserPermissions = {
    update: boolean
    delete: boolean
}
