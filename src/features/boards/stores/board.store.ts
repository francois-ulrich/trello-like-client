import type { Board } from "@/features/boards/domain/board.model"
import { boardApi } from "@/features/boards/infrastructure/board.api"
import type {
    CreateBoardResponseDTO,
    UpdateBoardResponseDTO,
} from "@/features/boards/infrastructure/board.response.dto"
import { useColumnStore } from "@/features/columns/stores/column"
import { useCardStore } from "@/features/cards/stores/card"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useBoardStore = defineStore("board", () => {
    const columnStore = useColumnStore()
    const cardStore = useCardStore()

    const items = ref<Board[]>([])

    async function getAll() {
        const res = await boardApi.getAll()

        items.value = res.data.map((board) => ({
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

    function get(id: number) {
        return items.value.find((i) => i.id === id)
    }

    async function create(payload: CreateBoardResponseDTO) {
        try {
            const res = await boardApi.create(payload)

            const { id, name } = res.data

            items.value = [...items.value, { id, name }]
        } catch (e: unknown) {
            console.error(e)
        }
    }

    async function update(boardId: number, payload: UpdateBoardResponseDTO) {
        try {
            const res = await boardApi.update(boardId, payload)

            const { id, name } = res.data

            items.value = [...items.value, { id, name }]
        } catch (e: unknown) {
            console.error(e)
        }
    }

    return { items, get, getAll, create, update }
})
