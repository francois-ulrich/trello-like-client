import type { Board } from "@/features/boards/domain/board.model"
import { localCrudStore } from "@/shared/stores/localCrudStore"
import { defineStore } from "pinia"

export const useBoardStore = defineStore("board", () => {
    const crud = localCrudStore<Board>()

    return { ...crud }
})
