import type { AppStores } from "@/shared/types/stores"
import { useApiBoardStore } from "@/features/boards/stores/board.store.api"
import { useLocalBoardStore } from "@/features/boards/stores/board.store.local"
import { useApiCardStore } from "@/features/cards/stores/card.store.api"
import { useLocalCardStore } from "@/features/cards/stores/card.store.local"
import { useApiColumnStore } from "@/features/columns/stores/column.store.api"
import { useLocalColumnStore } from "@/features/columns/stores/column.store.local"

export function createStores(mode: "api" | "guest"): AppStores {
    if (mode === "api") {
        return {
            mode,
            boardStore: useApiBoardStore(),
            columnStore: useApiColumnStore(),
            cardStore: useApiCardStore(),
        }
    }

    return {
        mode,
        boardStore: useLocalBoardStore(),
        columnStore: useLocalColumnStore(),
        cardStore: useLocalCardStore(),
    }
}
