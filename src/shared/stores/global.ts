import { useBoardStore } from "@/features/boards/stores/useBoardStore"
import { useCardStore } from "@/features/cards/stores/useCardStore"
import { useColumnStore } from "@/features/columns/stores/column"
import type { Card } from "@/features/cards/domain/card.model"
import { defineStore } from "pinia"

export const useGlobalStore = defineStore("global", () => {
    const boardStore = useBoardStore()
    const columnStore = useColumnStore()
    const cardStore = useCardStore()

    const removeColumn = (columnId: number) => {
        cardStore.removeWhere((card: Card) => card.columnId === columnId)
        columnStore.remove(columnId)
    }

    return { removeBoard, removeColumn }
})
