import type { Card } from "@/features/cards/domain/card.model"
import { cardApi } from "@/features/cards/infrastructure/card.api"
import type {
    CardMoveRequestDTO,
    CardRequestDTO,
} from "@/features/cards/infrastructure/card.request.dto"
import { defineStore } from "pinia"
import { ref, type Ref } from "vue"

export const useCardStore = defineStore("card", () => {
    const items = ref<Card[]>([]) as Ref<Card[]>

    async function create(boardId: number, columnId: number, payload: CardRequestDTO) {
        try {
            const res = await cardApi.create(boardId, columnId, payload)
            const { id, column_id, name, position, description } = res.data
            items.value = [...items.value, { id, columnId: column_id, name, position, description }]
        } catch (e: unknown) {
            console.error(e)
        }
    }

    async function move(
        boardId: number,
        columnId: number,
        cardId: number,
        payload: CardMoveRequestDTO,
    ) {
        const previousItems = [...items.value]

        const movedCard = items.value.find((card) => card.id === cardId)

        if (movedCard === undefined) throw new Error("Card to move wasn't found")

        try {
            await cardApi.move(boardId, columnId, cardId, payload)
        } catch (e: unknown) {
            items.value = previousItems
            console.error(e)
        }
    }

    function getCardsInColumn(columnId: number): Card[] {
        return items.value
            .filter((card) => card.columnId === columnId)
            .sort((cardA, cardB) => cardA.position - cardB.position)
    }

    function reorderfAfterDragAndDrop(cardsInColumn: Card[]) {
        cardsInColumn.forEach((cardInColumn, index) => {
            const storeCard = items.value.find((card) => card.id === cardInColumn.id)
            if (storeCard) storeCard.position = index
        })
    }

    return { items, getCardsInColumn, create, move, reorderfAfterDragAndDrop }
})
