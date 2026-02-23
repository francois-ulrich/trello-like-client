import type { CardResponseDTO } from "@/features/cards/domain/card.dto"

export interface ColumnResponseDTO {
    id: number
    name: string
    position: number
    board_id: number
    cards: CardResponseDTO[]
}
