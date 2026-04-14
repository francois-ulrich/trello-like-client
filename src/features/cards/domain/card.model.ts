import type {
    CardCreationRequestDTO,
    CardMoveRequestDTO,
    CardUpdateRequestDTO,
} from "@/features/cards/infrastructure/card.request.dto"

export interface Card {
    id: number
    columnId: number
    name: string
    position: number
    description?: string
}

export interface CardStore {
    items: Card[]
    getCardsInColumn(columnId: number): Card[]
    create(boardId: number, columnId: number, payload: CardCreationRequestDTO): Promise<void>
    update(cardId: number, payload: CardUpdateRequestDTO): Promise<void>
    move(cardId: number, payload: CardMoveRequestDTO): Promise<void>
    remove(cardId: number): Promise<void>
}
