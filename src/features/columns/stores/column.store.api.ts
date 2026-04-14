import { useApiBoardStore } from "@/features/boards/stores/board.store.api"
import { useApiCardStore } from "@/features/cards/stores/card.store.api"
import type { Column } from "@/features/columns/domain/column.model"
import { columnApi } from "@/features/columns/infrastructure/column.api"
import type {
    ColumnMoveRequestDTO,
    CreateColumnRequestDTO,
    UpdateColumnRequestDTO,
} from "@/features/columns/infrastructure/column.request.dto"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useApiColumnStore = defineStore("column", () => {
    const items = ref<Column[]>([])

    const boardStore = useApiBoardStore()
    const cardStore = useApiCardStore()

    function getById(id: number) {
        return items.value.find((i) => i.id === id)
    }

    async function create(boardId: number, payload: CreateColumnRequestDTO) {
        try {
            const res = await columnApi.create(boardId, payload)
            const { id, name, board_id, position } = res.data
            items.value = [...items.value, { id, name, position, boardId: board_id }]
        } catch (e: unknown) {
            console.error(e)
        }
    }

    async function update(boardId: number, columnId: number, payload: UpdateColumnRequestDTO) {
        try {
            const res = await columnApi.update(boardId, columnId, payload)
            const { id, name, board_id, position } = res.data
            items.value = [
                ...items.value.filter((item) => item.id != id),
                { id, name, position, boardId: board_id },
            ]
        } catch (e: unknown) {
            console.error(e)
        }
    }

    async function move(columnId: number, payload: ColumnMoveRequestDTO) {
        const previousItems = [...items.value]

        const columnToMove = getById(columnId)
        if (columnToMove === undefined) throw new Error("Column to move wasn't found in store")

        const oldPosition = columnToMove.position

        const board = boardStore.getById(columnToMove.boardId)
        if (board === undefined) throw new Error("Linked board wasn't found in store")

        try {
            const res = await columnApi.move(columnToMove.boardId, columnToMove.id, payload)

            columnToMove.position = res.data.movedColumn.position

            const newPosition = columnToMove.position

            if (newPosition > oldPosition) {
                items.value.forEach((column) => {
                    if (
                        column.id !== columnToMove.id &&
                        column.boardId === board.id &&
                        column.position > oldPosition &&
                        column.position <= newPosition
                    ) {
                        column.position--
                    }
                })
            } else {
                items.value.forEach((column) => {
                    if (
                        column.id !== columnToMove.id &&
                        column.boardId === board.id &&
                        column.position >= newPosition &&
                        column.position < oldPosition
                    ) {
                        column.position++
                    }
                })
            }
        } catch (e: unknown) {
            items.value = previousItems
            console.error(e)
        }
    }

    async function remove(boardId: number, columnId: number) {
        try {
            await columnApi.remove(boardId, columnId)

            items.value.forEach((column) => {
                cardStore.items.filter((card) => card.columnId !== column.id)
            })

            items.value = items.value.filter((item) => item.id !== columnId)
        } catch (e: unknown) {
            console.error(e)
        }
    }

    return { items, getById, create, update, move, remove }
})
