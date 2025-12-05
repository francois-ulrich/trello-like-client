<script setup lang="ts">
import { useBoardStore } from "@/stores/board"
import type { Board } from "@/types/board"
import BoardItem from "@/views/Board/BoardItem.vue"
import { onBeforeMount, ref } from "vue"

const boardStore = useBoardStore()
const board = ref<Board>()

onBeforeMount(() => {
    if (boardStore.items.length === 0) boardStore.create({ name: "Test board" })
    board.value = boardStore.items[0]
})
</script>

<template>
    <div>
        <BoardItem v-if="board" :board="board"></BoardItem>
    </div>
</template>

<style scoped></style>
