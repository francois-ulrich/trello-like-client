import type {
    CreateBoardRequestDTO,
    UpdateBoardRequestDTO,
} from "@/features/boards/infrastructure/board.request.dto"
import { useCardStore } from "@/features/cards/stores/card.store"
import type { Column } from "@/features/columns/domain/column.model"
import { columnApi } from "@/features/columns/infrastructure/column.api"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useColumnStore = defineStore("column", () => {
    const items = ref<Column[]>([])
    const cardStore = useCardStore()

    async function create(boardId: number, payload: CreateBoardRequestDTO) {
        try {
            const res = await columnApi.create(boardId, payload)
            const { id, name, board_id } = res.data
            items.value = [...items.value, { id, name, boardId: board_id }]
        } catch (e: unknown) {
            console.error(e)
        }
    }

    async function update(boardId: number, columnId: number, payload: UpdateBoardRequestDTO) {
        try {
            const res = await columnApi.update(boardId, columnId, payload)
            const { id, name, board_id } = res.data
            items.value = [
                ...items.value.filter((item) => item.id != id),
                { id, name, boardId: board_id },
            ]
        } catch (e: unknown) {
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

    return { items, create, update, remove }
})
