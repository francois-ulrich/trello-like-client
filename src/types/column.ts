import type { Card } from "@/types/card"

export interface Column {
    id: string
    boardId: string
    name: string
    cards: Card[]
}
