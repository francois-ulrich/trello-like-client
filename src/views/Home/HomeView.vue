<script setup lang="ts">
import { useBoardStore } from "@/stores/board"
import type { Board } from "@/types/board"
import BoardItem from "@/views/Home/BoardItem.vue"
import { ref } from "vue"

const boardStore = useBoardStore()

const boards = ref<Board[]>(boardStore.items)
</script>

<template>
    <h2 class="text-xl font-medium uppercase">Your boards</h2>

    <ul>
        <li v-for="board in boards">
            <BoardItem :board="board" />
        </li>
    </ul>
</template>
