<script setup lang="ts">
import BoardCard from "@/components/BoardItem.vue"
import type { Board } from "@/types/board"
import { ref } from "vue"

const board = ref<Board>({
    name: "Test board",
    columns: [
        {
            name: "To do",
            cards: [
                {
                    name: "Task 1",
                },
                {
                    name: "Task 2",
                },
                {
                    name: "Task 3",
                },
            ],
        },
        { name: "In progress", cards: [] },
        { name: "Done", cards: [] },
    ],
})
</script>

<template>
    <div>
        <BoardCard :board="board"></BoardCard>
    </div>
</template>

<style scoped></style>
