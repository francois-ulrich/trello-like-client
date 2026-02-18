import api from "@/api"
import type { Board } from "@/features/boards/domain/board.model"
import type { CreateBoardDTO, UpdateBoardDTO } from "@/features/boards/infrastructure/board.dto"
import type { ApiResponse, Repository } from "@/shared/models"

const get = async (id: number): Promise<ApiResponse<Board>> => {
    const res = await api.get<ApiResponse<Board>>(`/boards/${id}`)
    return res.data
}

const getAll = async (): Promise<ApiResponse<Board[]>> => {
    const res = await api.get<ApiResponse<Board[]>>("/boards")
    return res.data
}

const create = async (id: number, payload: CreateBoardDTO): Promise<ApiResponse<Board>> => {
    const res = await api.post<ApiResponse<Board>>(`/boards/${id}`, payload)
    return res.data
}

const update = async (id: number, payload: UpdateBoardDTO): Promise<ApiResponse<Board>> => {
    const res = await api.patch<ApiResponse<Board>>(`/boards/${id}`, payload)
    return res.data
}

const remove = async (id: number): Promise<ApiResponse<Board>> => {
    const res = await api.delete<ApiResponse<Board>>(`/boards/${id}`)
    return res.data
}

export const boardApi: Repository<Board, CreateBoardDTO, UpdateBoardDTO> = {
    get,
    getAll,
    create,
    update,
    remove,
}
