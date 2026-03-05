import type { CardResponseDTO } from "@/features/cards/infrastructure/card.response.dto"

export interface ColumnResponseDTO {
    id: number
    name: string
    position: number
    board_id: number
    cards: CardResponseDTO[]
}

export interface ColumnMoveResponseDTO {
    movedColumn: ColumnResponseDTO
}
