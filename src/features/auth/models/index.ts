export type User = {
    name: string
    email: string
    role: UserRole
}

export type UserRole = "user" | "admin"

export type UserPermissions = {
    update: boolean
    delete: boolean
}
