import type { Card } from "@/types/card"

export interface Column {
    id: string
    name: string
    cards: Card[]
    draggableGroup: string
}
