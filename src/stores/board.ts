import { crudStore } from "@/stores/crudStore"
import type { Board } from "@/types/board"
import { defineStore } from "pinia"

export const useBoardStore = defineStore("board", () => {
    const crud = crudStore<Board>()

    // const createCard = (cardName: string, boardId: string, columnId: string) => {
    //     const board = crud.items.value.find((board) => board.id === boardId)
    //     if (!board) return

    //     const column = board.columns.find((column) => column.id === columnId)
    //     if (!column) return

    //     const newCard = {
    //         id: uuidv4(),
    //         name: cardName,
    //     }

    //     column.cards.push(newCard)
    // }

    // const editCard = (card: Card, boardId: string, columnId: string) => {
    //     const board = crud.items.value.find((board) => board.id === boardId)
    //     if (!board) return

    //     const column = board.columns.find((column) => column.id === columnId)
    //     if (!column) return

    //     const newCard = {
    //         id: uuidv4(),
    //         name: cardName,
    //     }

    //     column.cards.push(newCard)
    // }

    return { ...crud }
})
