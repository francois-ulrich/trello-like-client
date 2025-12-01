<script setup lang="ts">
import BoardCard from "@/components/BoardItem.vue"
import type { Board } from "@/types/board"
import { ref } from "vue"
import { v4 as uuidv4 } from "uuid"

const boardId = uuidv4()

const board = ref<Board>({
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
})
</script>

<template>
    <div>
        <BoardCard :board="board"></BoardCard>
    </div>
</template>

<style scoped></style>
