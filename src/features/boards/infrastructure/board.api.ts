import api from "@/api"
import type {
    BoardResponseDTO,
    CreateBoardResponseDTO,
    UpdateBoardResponseDTO,
} from "@/features/boards/infrastructure/board.response.dto"
import type { ApiResponse } from "@/shared/models"

const get = async (id: number): Promise<ApiResponse<BoardResponseDTO>> => {
    const res = await api.get<ApiResponse<BoardResponseDTO>>(`/boards/${id}`)
    return res.data
}

const getAll = async (): Promise<ApiResponse<BoardResponseDTO[]>> => {
    const res = await api.get<ApiResponse<BoardResponseDTO[]>>("/boards")
    return res.data
}

const create = async (payload: CreateBoardResponseDTO): Promise<ApiResponse<BoardResponseDTO>> => {
    const res = await api.post<ApiResponse<BoardResponseDTO>>(`/boards`, payload)
    return res.data
}

const update = async (
    id: number,
    payload: UpdateBoardResponseDTO,
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
