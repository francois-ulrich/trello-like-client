import { useBoardStore } from "@/features/boards/stores/board.store"
import type { Card } from "@/features/cards/domain/card.model"
import { cardApi } from "@/features/cards/infrastructure/card.api"
import type {
    CardMoveRequestDTO,
    CardCreationRequestDTO,
    CardUpdateRequestDTO,
} from "@/features/cards/infrastructure/card.request.dto"
import { useColumnStore } from "@/features/columns/stores/column.store"
import { defineStore } from "pinia"
import { ref, type Ref } from "vue"

export const useCardStore = defineStore("card", () => {
    const items = ref<Card[]>([]) as Ref<Card[]>

    const boardStore = useBoardStore()
    const columnStore = useColumnStore()

    function getById(id: number): Card | undefined {
        return items.value.find((card) => card.id === id)
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

    async function create(boardId: number, columnId: number, payload: CardCreationRequestDTO) {
        try {
            const res = await cardApi.create(boardId, columnId, payload)
            const { id, column_id, name, position, description } = res.data
            items.value = [...items.value, { id, columnId: column_id, name, position, description }]
        } catch (e: unknown) {
            console.error(e)
        }
    }

    async function update(cardId: number, payload: CardUpdateRequestDTO) {
        const cardItem = items.value.find((card) => card.id === cardId)

        if (cardItem === undefined) throw new Error("Card to move hasn't been found")

        const cardItemIndex = items.value.findIndex((i) => i.id === cardItem.id)

        const rollbackValue = { ...cardItem }

        const linkedBoard = boardStore.getByColumnId(cardItem.columnId)

        if (linkedBoard === undefined) throw new Error("Linked board hasn't been found")

        try {
            await cardApi.update(linkedBoard.id, cardItem.columnId, cardItem.id, payload)
            items.value[cardItemIndex] = { ...cardItem, ...payload }
        } catch (e: unknown) {
            console.error(e)
            items.value[cardItemIndex] = rollbackValue
        }
    }

    async function move(cardId: number, payload: CardMoveRequestDTO) {
        const previousItems = [...items.value]

        const cardToMove = getById(cardId)
        if (cardToMove === undefined) throw new Error("Card to move wasn't found in store")

        const oldPosition = cardToMove.position

        const column = columnStore.getById(cardToMove.columnId)
        if (column === undefined) throw new Error("Linked column wasn't found in store")

        try {
            const res = await cardApi.move(column.boardId, column.id, cardId, payload)

            cardToMove.position = res.data.movedCard.position

            const newPosition = cardToMove.position

            if (newPosition > oldPosition) {
                items.value.forEach((card) => {
                    if (
                        card.id !== cardToMove.id &&
                        card.columnId === column.id &&
                        card.position > oldPosition &&
                        card.position <= newPosition
                    ) {
                        card.position--
                    }
                })
            } else {
                items.value.forEach((card) => {
                    if (
                        card.id !== cardToMove.id &&
                        card.columnId === column.id &&
                        card.position >= newPosition &&
                        card.position < oldPosition
                    ) {
                        card.position++
                    }
                })
            }

            console.log(res)
        } catch (e: unknown) {
            items.value = previousItems
            console.error(e)
        }
    }

    async function remove(cardId: number) {
        const previousItems = [...items.value]

        const cardToDelete = getById(cardId)
        if (cardToDelete === undefined) throw new Error("Card to delete wasn't found")

        const column = columnStore.getById(cardToDelete.columnId)
        if (column === undefined) throw new Error("Linked column wasn't found")

        try {
            await cardApi.remove(column.boardId, column.id, cardId)
            items.value = items.value.filter((card) => card.id !== cardId)
        } catch (e: unknown) {
            items.value = previousItems
            console.error(e)
        }
    }

    return { items, getCardsInColumn, create, update, move, remove, reorderfAfterDragAndDrop }
})
