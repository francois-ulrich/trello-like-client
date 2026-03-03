import { useCardStore } from "@/features/cards/stores/card.store"
import type { Column } from "@/features/columns/domain/column.model"
import { columnApi } from "@/features/columns/infrastructure/column.api"
import type {
    ColumnMoveRequestDTO,
    CreateColumnRequestDTO,
    UpdateColumnRequestDTO,
} from "@/features/columns/infrastructure/column.request.dto"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useColumnStore = defineStore("column", () => {
    const items = ref<Column[]>([])

    const cardStore = useCardStore()

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

        const movedColumn = items.value.find((column) => column.id === columnId)
        if (movedColumn === undefined) throw new Error("Column to move wasn't found")

        try {
            await columnApi.move(movedColumn.boardId, movedColumn.id, payload)
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
