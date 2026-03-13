import type { Board } from "@/features/boards/domain/board.model"
import { boardApi } from "@/features/boards/infrastructure/board.api"
import { useColumnStore } from "@/features/columns/stores/column.store"
import { useCardStore } from "@/features/cards/stores/card.store"
import { defineStore } from "pinia"
import { ref } from "vue"
import type {
    CreateBoardRequestDTO,
    UpdateBoardRequestDTO,
} from "@/features/boards/infrastructure/board.request.dto"
import { mapApiBoards } from "@/features/boards/utils/board.util.index"

export const useBoardStore = defineStore("board", () => {
    const columnStore = useColumnStore()
    const cardStore = useCardStore()

    const items = ref<Board[]>([])

    async function loadAll() {
        const res = await boardApi.getAll()

        const { boards, columns, cards } = mapApiBoards(res.data)

        items.value = boards
        columnStore.items = columns
        cardStore.items = cards
    }

    async function loadById(id: number) {
        const res = await boardApi.get(id)

        const { boards, columns, cards } = mapApiBoards([res.data])

        items.value = [...items.value, ...boards]
        columnStore.items = [...columnStore.items, ...columns]
        cardStore.items = [...cardStore.items, ...cards]
    }

    async function ensureBoardIsLoaded(id: number) {
        if (!items.value.find((board) => board.id === id)) loadById(id)
    }

    function getById(id: number): Board | undefined {
        return items.value.find((i) => i.id === id)
    }

    function getColumnsInBoard(boardId: number) {
        const board = getById(boardId)
        if (board === undefined) throw new Error("Linked board hasn't been found")

        return columnStore.items
            .filter((column) => column.boardId === boardId)
            .sort((columnA, columnB) => columnA.position - columnB.position)
    }

    function getByColumnId(columnId: number) {
        const column = columnStore.getById(columnId)
        if (!column) return undefined
        return items.value.find((b) => b.id === column.boardId)
    }

    async function create(payload: CreateBoardRequestDTO) {
        try {
            const res = await boardApi.create(payload)

            const { id, name, can } = res.data

            items.value = [...items.value, { id, name, can }]
        } catch (e: unknown) {
            console.error(e)
        }
    }

    async function update(boardId: number, payload: UpdateBoardRequestDTO) {
        try {
            const res = await boardApi.update(boardId, payload)

            const { id, name, can } = res.data

            items.value = [...items.value.filter((item) => item.id != id), { id, name, can }]
        } catch (e: unknown) {
            console.error(e)
        }
    }

    async function remove(boardId: number) {
        try {
            await boardApi.remove(boardId)
            items.value = items.value.filter((item) => item.id !== boardId)

            columnStore.items.forEach((column) => {
                cardStore.items.filter((card) => card.columnId !== column.id)
            })

            columnStore.items = columnStore.items.filter((item) => item.boardId !== boardId)

            console.log(items.value)
        } catch (e: unknown) {
            console.error(e)
        }
    }

    function canEdit(boardId: number) {
        const board = getById(boardId)
        if (!board) return false
        return board.can.update
    }

    return {
        items,
        getById,
        loadById,
        ensureBoardIsLoaded,
        loadAll,
        getByColumnId,
        getColumnsInBoard,
        create,
        update,
        remove,
        canEdit,
    }
})
