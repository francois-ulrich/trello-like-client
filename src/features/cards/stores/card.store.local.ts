import type { Card, CardStore } from "@/features/cards/domain/card.model"
import type {
    CardCreationRequestDTO,
    CardMoveRequestDTO,
    CardUpdateRequestDTO,
} from "@/features/cards/infrastructure/card.request.dto"
import { useColumnStore } from "@/features/columns/stores/column.store"
import { generateIdForLocalItem } from "@/shared/utils/store.util"
import { defineStore } from "pinia"
import { ref, type Ref } from "vue"

export const useCardStore = defineStore("card", (): CardStore => {
    const items = ref<Card[]>([]) as Ref<Card[]>

    const columnStore = useColumnStore()

    function getById(id: number): Card | undefined {
        return items.value.find((card) => card.id === id)
    }

    function getCardsInColumn(columnId: number): Card[] {
        return items.value
            .filter((card) => card.columnId === columnId)
            .sort((cardA, cardB) => cardA.position - cardB.position)
    }

    async function create(boardId: number, columnId: number, payload: CardCreationRequestDTO) {
        const id = generateIdForLocalItem(items.value)
        const { name, description } = payload
        const position = getCardsInColumn(columnId).length - 1
        items.value = [...items.value, { id, columnId, name, description, position }]
    }

    async function update(cardId: number, payload: CardUpdateRequestDTO) {
        const updatedItem = getById(cardId)
        if (updatedItem === undefined) return Promise.resolve()
        const { name, description } = payload
        if (name !== undefined) updatedItem.name = name
        updatedItem.description = description
        const index = items.value.findIndex((i) => i.id === updatedItem.id)
        if (index !== -1) items.value[index] = updatedItem
        return Promise.resolve()
    }

    async function move(cardId: number, payload: CardMoveRequestDTO) {
        const cardToMove = getById(cardId)
        if (cardToMove === undefined) throw new Error("Card to move wasn't found in store")

        const oldPosition = cardToMove.position

        const column = columnStore.getById(cardToMove.columnId)
        if (column === undefined) throw new Error("Linked column wasn't found in store")

        const { targetPosition, targetColumnId } = payload

        cardToMove.position = targetPosition
        cardToMove.columnId = targetColumnId

        const newPosition = cardToMove.position

        if (cardToMove.columnId != column.id) {
            items.value.forEach((card) => {
                if (
                    card.id !== cardToMove.id &&
                    card.columnId === column.id &&
                    card.position > oldPosition
                ) {
                    card.position--
                }

                if (
                    card.id !== cardToMove.id &&
                    card.columnId === cardToMove.columnId &&
                    card.position >= newPosition
                ) {
                    card.position++
                }
            })
        } else {
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
        }

        return Promise.resolve()
    }

    async function remove(cardId: number) {
        const cardToDelete = getById(cardId)
        if (cardToDelete === undefined) throw new Error("Card to delete wasn't found")

        const column = columnStore.getById(cardToDelete.columnId)
        if (column === undefined) throw new Error("Linked column wasn't found")

        items.value = items.value.filter((card) => card.id !== cardId)
    }

    return { items, getCardsInColumn, create, update, move, remove }
})
