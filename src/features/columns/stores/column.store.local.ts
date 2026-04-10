import { useBoardStore } from "@/features/boards/stores/board.store"
import { useCardStore } from "@/features/cards/stores/card.store"
import type { Column, ColumnStore } from "@/features/columns/domain/column.model"
import type {
    ColumnMoveRequestDTO,
    CreateColumnRequestDTO,
    UpdateColumnRequestDTO,
} from "@/features/columns/infrastructure/column.request.dto"
import { generateIdForLocalItem } from "@/shared/utils/store.util"
import { defineStore } from "pinia"
import { ref, type Ref } from "vue"

export const useLocalColumnStore = defineStore("column", (): ColumnStore => {
    const items = ref<Column[]>([]) as Ref<Column[]>

    const boardStore = useBoardStore()
    const cardStore = useCardStore()

    function getById(id: number): Column | undefined {
        return items.value.find((i) => i.id === id)
    }

    function create(boardId: number, payload: CreateColumnRequestDTO): Promise<void> {
        const id = generateIdForLocalItem(items.value)
        const { name } = payload
        const newItem = { id, boardId, name } as Column
        items.value.push(newItem)
        return Promise.resolve()
    }

    function update(_: number, columnId: number, payload: UpdateColumnRequestDTO): Promise<void> {
        const updatedItem = getById(columnId)
        if (updatedItem === undefined) return Promise.resolve()
        const { name } = payload
        updatedItem.name = name
        const index = items.value.findIndex((i) => i.id === updatedItem.id)
        if (index !== -1) items.value[index] = updatedItem
        return Promise.resolve()
    }

    function move(columnId: number, payload: ColumnMoveRequestDTO): Promise<void> {
        const columnToMove = getById(columnId)
        if (columnToMove === undefined) throw new Error("Column to move wasn't found in store")

        const oldPosition = columnToMove.position

        const board = boardStore.getById(columnToMove.boardId)
        if (board === undefined) throw new Error("Linked board wasn't found in store")

        const { targetPosition } = payload

        columnToMove.position = targetPosition

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

        return Promise.resolve()
    }

    function remove(_: number, columnId: number): Promise<void> {
        items.value.forEach((column) => {
            cardStore.items.filter((card) => card.columnId !== column.id)
        })

        items.value = items.value.filter((item) => item.id !== columnId)

        return Promise.resolve()
    }

    return { items, getById, create, update, move, remove }
})
