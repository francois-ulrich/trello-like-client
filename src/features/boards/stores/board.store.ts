import type { Board } from "@/features/boards/domain/board.model"
import { boardApi } from "@/features/boards/infrastructure/board.api"
import type { CreateBoardDTO, UpdateBoardDTO } from "@/features/boards/infrastructure/board.dto"
// import { useCardStore } from "@/features/cards/stores/card"
// import { useColumnStore } from "@/features/columns/stores/column"
import { crudStore } from "@/shared/stores/crudStore"
import { defineStore } from "pinia"

export const useBoardStore = defineStore("board", () => {
    const store = crudStore<Board, CreateBoardDTO, UpdateBoardDTO>(boardApi)
    // const columnStore = useColumnStore()
    // const cardStore = useCardStore()

    async function getAll() {
        const res = await boardApi.getAll()

        store.items.value = res.data.map((board) => ({
            id: board.id,
            name: board.name,
        }))

        // columnStore.items.value =

        // cardStore.items.value =
    }

    return { ...store, getAll }
})
