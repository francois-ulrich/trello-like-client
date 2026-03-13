import type { UserPermissions } from "@/features/auth/models"

export interface Board {
    id: number
    name: string
    can: UserPermissions
}
