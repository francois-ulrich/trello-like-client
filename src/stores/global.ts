import { useBoardStore } from "@/stores/board"
import { useCardStore } from "@/stores/card"
import { useColumnStore } from "@/stores/column"
import { defineStore } from "pinia"

export const useGlobalStore = defineStore("global", () => {
    const boardStore = useBoardStore()
    const columnStore = useColumnStore()
    const cardStore = useCardStore()

    const removeBoard = (boardId: string) => {
        const columnsToDelete = columnStore.items.filter((column) => column.boardId === boardId)
        columnsToDelete.forEach((column) => removeColumn(column.id))
        boardStore.remove(boardId)
    }

    const removeColumn = (columnId: string) => {
        cardStore.removeWhere((card) => card.columnId === columnId)
        columnStore.remove(columnId)
    }

    return { removeBoard, removeColumn }
})
