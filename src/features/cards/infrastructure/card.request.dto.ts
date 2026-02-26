export interface CardCreationRequestDTO {
    name: string
    description?: string
}

export interface CardUpdateRequestDTO {
    name?: string
    description?: string
}

export interface CardMoveRequestDTO {
    targetPosition: number
    targetColumnId: number
}
