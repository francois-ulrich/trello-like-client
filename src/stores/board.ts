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
                { name: "In progress", cards: [], draggableGroup: boardId },
                { name: "Done", cards: [], draggableGroup: boardId },
            ],
        },
    ]

    return { ...crud }
})
