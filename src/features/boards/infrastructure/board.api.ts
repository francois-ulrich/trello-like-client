import api from "@/api"
import type {
    CreateBoardRequestDTO,
    UpdateBoardRequestDTO,
} from "@/features/boards/infrastructure/board.request.dto"
import type { BoardResponseDTO } from "@/features/boards/infrastructure/board.response.dto"
import type { ApiResponse } from "@/shared/models"

const getAll = async (): Promise<ApiResponse<BoardResponseDTO[]>> => {
    const res = await api.get<ApiResponse<BoardResponseDTO[]>>("/boards")
    return res.data
}

const get = async (id: number): Promise<ApiResponse<BoardResponseDTO>> => {
    const res = await api.get<ApiResponse<BoardResponseDTO>>(`/boards/${id}`)
    return res.data
}

const create = async (payload: CreateBoardRequestDTO): Promise<ApiResponse<BoardResponseDTO>> => {
    const res = await api.post<ApiResponse<BoardResponseDTO>>(`/boards`, payload)
    return res.data
}

const update = async (
    id: number,
    payload: UpdateBoardRequestDTO,
): Promise<ApiResponse<BoardResponseDTO>> => {
    const res = await api.patch<ApiResponse<BoardResponseDTO>>(`/boards/${id}`, payload)
    return res.data
}

const remove = async (id: number): Promise<ApiResponse<BoardResponseDTO>> => {
    const res = await api.delete<ApiResponse<BoardResponseDTO>>(`/boards/${id}`)
    return res.data
}

export const boardApi = {
    get,
    getAll,
    create,
    update,
    remove,
}
