import api from "@/api"
import type { UserEntryResponseDTO } from "@/features/admin/infrastructure/admin.response.dto"
import type { BoardResponseDTO } from "@/features/boards/infrastructure/board.response.dto"
import type { ApiResponse } from "@/shared/models"

const loadAllUsers = async (): Promise<ApiResponse<UserEntryResponseDTO[]>> => {
    const res = await api.get<ApiResponse<UserEntryResponseDTO[]>>("/admin/users")
    return res.data
}

const loadUserBoards = async (id: number): Promise<ApiResponse<BoardResponseDTO[]>> => {
    const res = await api.get<ApiResponse<BoardResponseDTO[]>>(`/admin/users/${id}/boards`)
    return res.data
}

const banUser = async (id: number): Promise<ApiResponse<UserEntryResponseDTO>> => {
    const res = await api.patch<ApiResponse<UserEntryResponseDTO>>(`/admin/users/${id}/ban`)
    return res.data
}

const unbanUser = async (id: number): Promise<ApiResponse<UserEntryResponseDTO>> => {
    const res = await api.patch<ApiResponse<UserEntryResponseDTO>>(`/admin/users/${id}/unban`)
    return res.data
}

export const adminApi = {
    loadAllUsers,
    loadUserBoards,
    banUser,
    unbanUser,
}
