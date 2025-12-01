import type { Card } from "@/types/card"

export interface Column {
    name: string
    cards: Card[]
    draggableGroup: string
}
