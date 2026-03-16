export interface UserEntryResponseDTO {
    id: number
    name: string
    email: string
    created_at: string
    banned_at: string
    role: {
        name: string
    }
}

export interface UserDashboardEntry {
    id: number
    name: string
    email: string
    role: string
    createdAt: Date
    bannedAt: Date | null
}
