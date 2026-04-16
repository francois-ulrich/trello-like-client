import type { BoardStore } from "@/features/boards/domain/board.model"
import type { CardStore } from "@/features/cards/domain/card.model"
import type { ColumnStore } from "@/features/columns/domain/column.model"

export type StoreMode = "guest" | "api"

export interface AppStores {
    mode: StoreMode
    boardStore: BoardStore
    columnStore: ColumnStore
    cardStore: CardStore
}
