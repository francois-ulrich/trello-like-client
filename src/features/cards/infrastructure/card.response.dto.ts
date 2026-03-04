export interface CardResponseDTO {
    id: number
    name: string
    description?: string
    position: number
    column_id: number
}

export interface CardMoveResponseDTO {
    movedCard: CardResponseDTO
}
