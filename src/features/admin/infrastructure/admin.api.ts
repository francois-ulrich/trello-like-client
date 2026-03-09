import api from "@/api"
import type { UserEntryResponseDTO } from "@/features/admin/infrastructure/admin.response.dto"
import type { ApiResponse } from "@/shared/models"

const getAllUsers = async (): Promise<ApiResponse<UserEntryResponseDTO[]>> => {
    const res = await api.get<ApiResponse<UserEntryResponseDTO[]>>("/admin/users")
    return res.data
}

export const adminApi = {
    getAllUsers,
}
