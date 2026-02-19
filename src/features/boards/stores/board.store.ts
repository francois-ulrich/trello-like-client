import type { Board } from "@/features/boards/domain/board.model"
import { boardApi } from "@/features/boards/infrastructure/board.api"
import type { CreateBoardDTO, UpdateBoardDTO } from "@/features/boards/infrastructure/board.dto"
import { useColumnStore } from "@/features/columns/stores/column"
import { useCardStore } from "@/features/cards/stores/card"
import { crudStore } from "@/shared/stores/crudStore"
import { defineStore } from "pinia"

export const useBoardStore = defineStore("board", () => {
    const store = crudStore<Board, CreateBoardDTO, UpdateBoardDTO>(boardApi)
    const columnStore = useColumnStore()
    const cardStore = useCardStore()

    async function getAll() {
        const res = await boardApi.getAll()

        store.items.value = res.data.map((board) => ({
            id: board.id,
            name: board.name,
        }))

        columnStore.items = res.data.flatMap((board) =>
            board.columns.map((columnDto) => {
                const { id, name, position } = columnDto

                return {
                    id,
                    name,
                    position,
                    boardId: columnDto.board_id,
                }
            }),
        )

        cardStore.items = res.data.flatMap((board) =>
            board.columns.flatMap((columnDto) =>
                columnDto.cards.map((cardDto) => {
                    const { id, name, description, position } = cardDto

                    return {
                        id,
                        name,
                        description,
                        position,
                        columnId: cardDto.column_id,
                    }
                }),
            ),
        )
    }

    return { ...store, getAll }
})
