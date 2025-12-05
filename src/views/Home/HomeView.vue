<script setup lang="ts">
import BoardItemBase from "@/components/BoardItemBase.vue"
import { useBoardStore } from "@/stores/board"
import type { Board } from "@/types/board"
import BoardItem from "@/views/Home/BoardItem.vue"
import { ref } from "vue"

const boardStore = useBoardStore()

const boards = ref<Board[]>(boardStore.items)
</script>

<template>
    <h2 class="text-xl font-medium uppercase">Your boards</h2>

    <ul class="flex flex-row gap-4">
        <li v-for="board in boards">
            <BoardItem :board="board" />
        </li>
        <li>
            <BoardItemBase
                class="bg-gray-200 flex justify-center items-center text-gray-600 font-semibold text-sm"
            >
                <p>Create new board</p>
            </BoardItemBase>
        </li>
    </ul>
</template>
