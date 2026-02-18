import type { Board, CreateBoardDTO, UpdateBoardDTO } from "@/features/boards/domain/board.model"
import { boardApi } from "@/features/boards/services/board.api"
import { crudStore } from "@/stores/crudStore"
import { defineStore } from "pinia"

export const useBoardStore = defineStore("board", () => {
    const crud = crudStore<Board, CreateBoardDTO, UpdateBoardDTO>(boardApi)

    return { ...crud }
})
