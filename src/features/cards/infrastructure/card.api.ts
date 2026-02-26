import type {
    CardMoveRequestDTO,
    CardRequestDTO,
} from "@/features/cards/infrastructure/card.request.dto"
import type { CardResponseDTO } from "@/features/cards/infrastructure/card.response.dto"
import type { ApiResponse } from "@/shared/models"
import api from "@/api"

const create = async (
    boardId: number,
    columnId: number,
    payload: CardRequestDTO,
): Promise<ApiResponse<CardResponseDTO>> => {
    const res = await api.post<ApiResponse<CardResponseDTO>>(
        `/boards/${boardId}/columns/${columnId}/cards`,
        payload,
    )
    return res.data
}

const move = async (
    boardId: number,
    columnId: number,
    cardId: number,
    payload: CardMoveRequestDTO,
): Promise<ApiResponse<CardResponseDTO>> => {
    const res = await api.patch<ApiResponse<CardResponseDTO>>(
        `/boards/${boardId}/columns/${columnId}/cards/${cardId}/move`,
        payload,
    )
    return res.data
}

export const cardApi = {
    create,
    move,
}
