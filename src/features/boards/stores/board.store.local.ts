import type { Board } from "@/features/boards/domain/board.model"
import type {
    CreateBoardRequestDTO,
    UpdateBoardRequestDTO,
} from "@/features/boards/infrastructure/board.request.dto"
import type { Column } from "@/features/columns/domain/column.model"
import { useLocalColumnStore } from "@/features/columns/stores/column.store.local"
import { generateIdForLocalItem } from "@/shared/utils/store.util"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useLocalBoardStore = defineStore("boardLocal", () => {
    const items = ref<Board[]>([])

    const columnStore = useLocalColumnStore()

    function getById(id: number): Board | undefined {
        return items.value.find((i) => i.id === id)
    }

    function getColumnsInBoard(boardId: number): Column[] {
        const board = getById(boardId)
        if (board === undefined) throw new Error("Linked board hasn't been found")

        return columnStore.items
            .filter((column) => column.boardId === boardId)
            .sort((columnA, columnB) => columnA.position - columnB.position)
    }

    function getByColumnId(columnId: number): Board | undefined {
        const column = columnStore.getById(columnId)
        if (!column) return undefined
        return items.value.find((board) => board.id === column.boardId)
    }

    function loadAll(): Promise<void> {
        return Promise.resolve()
    }

    async function loadById() {
        return Promise.resolve()
    }

    function ensureBoardIsLoaded(): Promise<void> {
        return Promise.resolve()
    }

    function create(payload: CreateBoardRequestDTO): Promise<void> {
        const id = generateIdForLocalItem(items.value)
        const { name } = payload
        const newItem = { id, name, can: { update: true, delete: true } } as Board
        items.value.push(newItem)
        return Promise.resolve()
    }

    function update(boardId: number, payload: UpdateBoardRequestDTO): Promise<void> {
        const updatedItem = getById(boardId)

        if (updatedItem === undefined) return Promise.resolve()

        const { name } = payload

        updatedItem.name = name

        const index = items.value.findIndex((i) => i.id === updatedItem.id)
        if (index !== -1) items.value[index] = updatedItem
        return Promise.resolve()
    }

    function remove(boardId: number): Promise<void> {
        items.value = items.value.filter((i) => i.id !== boardId)
        return Promise.resolve()
    }

    function canEdit(boardId: number): boolean {
        const board = getById(boardId)
        if (!board) return false
        return board.can.update
    }

    return {
        items,
        getById,
        getColumnsInBoard,
        getByColumnId,
        loadAll,
        loadById,
        ensureBoardIsLoaded,
        create,
        update,
        remove,
        canEdit,
    }
})
