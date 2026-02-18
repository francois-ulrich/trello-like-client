import { useBoardStore } from "@/features/boards/stores/board.store"
import { useCardStore } from "@/features/cards/stores/card"
import { useColumnStore } from "@/features/columns/stores/column"
import type { Card } from "@/features/cards/domain/card.model"
import { defineStore } from "pinia"

export const useGlobalStore = defineStore("global", () => {
    const boardStore = useBoardStore()
    const columnStore = useColumnStore()
    const cardStore = useCardStore()

    const removeBoard = (boardId: number) => {
        const columnsToDelete = columnStore.items.filter((column) => column.boardId === boardId)
        columnsToDelete.forEach((column) => removeColumn(column.id))
        boardStore.remove(boardId)
    }

    const removeColumn = (columnId: number) => {
        cardStore.removeWhere((card: Card) => card.columnId === columnId)
        columnStore.remove(columnId)
    }

    return { removeBoard, removeColumn }
})
