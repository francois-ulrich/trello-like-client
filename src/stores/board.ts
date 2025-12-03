import { crudStore } from "@/stores/crudStore"
import type { Board } from "@/types/board"
import { defineStore } from "pinia"
import { v4 as uuidv4 } from "uuid"

const boardId = uuidv4()

export const useBoardStore = defineStore("board", () => {
    const crud = crudStore<Board>()

    crud.items.value = [
        {
            id: boardId,
            name: "Test board",
            columns: [
                {
                    id: uuidv4(),
                    name: "To do",
                    cards: [
                        {
                            name: "Task 1",
                            id: uuidv4(),
                        },
                        {
                            name: "Task 2",
                            id: uuidv4(),
                        },
                        {
                            name: "Task 3",
                            id: uuidv4(),
                        },
                    ],
                    draggableGroup: boardId,
                },
                { id: uuidv4(), name: "In progress", cards: [], draggableGroup: boardId },
                { id: uuidv4(), name: "Done", cards: [], draggableGroup: boardId },
            ],
        },
    ]

    const createCard = (cardName: string, boardId: string, columnId: string) => {
        const board = crud.items.value.find((board) => board.id === boardId)
        if (!board) return

        const column = board.columns.find((column) => column.id === columnId)
        if (!column) return

        const newCard = {
            id: uuidv4(),
            name: cardName,
        }

        column.cards.push(newCard)
    }

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

    return { ...crud, createCard }
})
