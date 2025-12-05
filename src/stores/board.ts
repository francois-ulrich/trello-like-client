import { crudStore } from "@/stores/crudStore"
import type { Board } from "@/types/board"
import { defineStore } from "pinia"

export const useBoardStore = defineStore("board", () => {
    const crud = crudStore<Board>()

    return { ...crud }
})
