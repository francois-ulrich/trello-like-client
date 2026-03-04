import type {
    CardMoveRequestDTO,
    CardCreationRequestDTO,
    CardUpdateRequestDTO,
} from "@/features/cards/infrastructure/card.request.dto"
import type {
    CardMoveResponseDTO,
    CardResponseDTO,
} from "@/features/cards/infrastructure/card.response.dto"
import type { ApiResponse } from "@/shared/models"
import api from "@/api"

const create = async (
    boardId: number,
    columnId: number,
    payload: CardCreationRequestDTO,
): Promise<ApiResponse<CardResponseDTO>> => {
    const res = await api.post<ApiResponse<CardResponseDTO>>(
        `/boards/${boardId}/columns/${columnId}/cards`,
        payload,
    )
    return res.data
}

const update = async (
    boardId: number,
    columnId: number,
    cardId: number,
    payload: CardUpdateRequestDTO,
): Promise<ApiResponse<CardResponseDTO>> => {
    const res = await api.patch<ApiResponse<CardResponseDTO>>(
        `/boards/${boardId}/columns/${columnId}/cards/${cardId}`,
        payload,
    )
    return res.data
}

const move = async (
    boardId: number,
    columnId: number,
    cardId: number,
    payload: CardMoveRequestDTO,
): Promise<ApiResponse<CardMoveResponseDTO>> => {
    const res = await api.patch<ApiResponse<CardMoveResponseDTO>>(
        `/boards/${boardId}/columns/${columnId}/cards/${cardId}/move`,
        payload,
    )
    return res.data
}

const remove = async (
    boardId: number,
    columnId: number,
    cardId: number,
): Promise<ApiResponse<CardResponseDTO>> => {
    const res = await api.delete<ApiResponse<CardResponseDTO>>(
        `/boards/${boardId}/columns/${columnId}/cards/${cardId}`,
    )
    return res.data
}

export const cardApi = {
    create,
    update,
    move,
    remove,
}
