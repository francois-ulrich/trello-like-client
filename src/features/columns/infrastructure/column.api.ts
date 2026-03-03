import type {
    ColumnMoveRequestDTO,
    CreateColumnRequestDTO,
} from "@/features/columns/infrastructure/column.request.dto"
import type { ColumnResponseDTO } from "@/features/columns/infrastructure/column.response.dto"
import type { ApiResponse } from "@/shared/models"
import api from "@/api"
import type { UpdateBoardRequestDTO } from "@/features/boards/infrastructure/board.request.dto"

const create = async (
    boardId: number,
    payload: CreateColumnRequestDTO,
): Promise<ApiResponse<ColumnResponseDTO>> => {
    const res = await api.post<ApiResponse<ColumnResponseDTO>>(
        `/boards/${boardId}/columns`,
        payload,
    )
    return res.data
}

const update = async (
    boardId: number,
    columnId: number,
    payload: UpdateBoardRequestDTO,
): Promise<ApiResponse<ColumnResponseDTO>> => {
    const res = await api.patch<ApiResponse<ColumnResponseDTO>>(
        `/boards/${boardId}/columns/${columnId}`,
        payload,
    )
    return res.data
}

const move = async (
    boardId: number,
    columnId: number,
    payload: ColumnMoveRequestDTO,
): Promise<ApiResponse<ColumnResponseDTO>> => {
    const res = await api.patch<ApiResponse<ColumnResponseDTO>>(
        `/boards/${boardId}/columns/${columnId}/move`,
        payload,
    )
    return res.data
}

const remove = async (
    boardId: number,
    columnId: number,
): Promise<ApiResponse<ColumnResponseDTO>> => {
    const res = await api.delete<ApiResponse<ColumnResponseDTO>>(
        `/boards/${boardId}/columns/${columnId}`,
    )
    return res.data
}

export const columnApi = {
    create,
    update,
    move,
    remove,
}
