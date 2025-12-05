<script setup lang="ts">
import { useBoardStore } from "@/stores/board"
import type { Board } from "@/types/board"
import BoardView from "@/views/Board/BoardView.vue"
import { onBeforeMount, ref } from "vue"
import { RouterView } from "vue-router"

const title = "Trello like"

const boardStore = useBoardStore()
const board = ref<Board>()

// onBeforeMount(() => {
//     if (boardStore.items.length === 0) boardStore.create({ name: "Test board" })
//     board.value = boardStore.items[0]
// })
</script>

<template>
    <div class="h-screen flex flex-col divide-y">
        <header class="p-3 flex flex-col gap-y-4 bg-gray-200 flex-none border-gray-400">
            <h1 class="hidden">{{ title }}</h1>
            <RouterLink
                :to="{ name: 'home' }"
                class="text-lg font-medium text-gray-900 bg-gray-200 hover:bg-gray-400 px-2 py-1 rounded-sm w-fit transition-colors"
                >{{ title }}</RouterLink
            >
        </header>
        <main class="p-4 flex flex-col gap-y-4 overflow-x-auto flex-auto bg-gray-200">
            <RouterView />
        </main>
    </div>

    <main></main>
</template>

<style scoped></style>
