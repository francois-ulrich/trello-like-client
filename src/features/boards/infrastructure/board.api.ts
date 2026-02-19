import api from "@/api"
import type {
    BoardResponseDTO,
    CreateBoardDTO,
    UpdateBoardDTO,
} from "@/features/boards/infrastructure/board.dto"
import type { ApiResponse, Repository } from "@/shared/models"

const get = async (id: number): Promise<ApiResponse<BoardResponseDTO>> => {
    const res = await api.get<ApiResponse<BoardResponseDTO>>(`/boards/${id}`)
    return res.data
}

const getAll = async (): Promise<ApiResponse<BoardResponseDTO[]>> => {
    const res = await api.get<ApiResponse<BoardResponseDTO[]>>("/boards")
    return res.data
}

const create = async (
    id: number,
    payload: CreateBoardDTO,
): Promise<ApiResponse<BoardResponseDTO>> => {
    const res = await api.post<ApiResponse<BoardResponseDTO>>(`/boards/${id}`, payload)
    return res.data
}

const update = async (
    id: number,
    payload: UpdateBoardDTO,
): Promise<ApiResponse<BoardResponseDTO>> => {
    const res = await api.patch<ApiResponse<BoardResponseDTO>>(`/boards/${id}`, payload)
    return res.data
}

const remove = async (id: number): Promise<ApiResponse<BoardResponseDTO>> => {
    const res = await api.delete<ApiResponse<BoardResponseDTO>>(`/boards/${id}`)
    return res.data
}

export const boardApi: Repository<BoardResponseDTO, CreateBoardDTO, UpdateBoardDTO> = {
    get,
    getAll,
    create,
    update,
    remove,
}
