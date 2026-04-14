<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"

import type { Board } from "@/features/boards/domain/board.model"
import { useBoardStore } from "@/features/boards/stores/useBoardStore"
import BoardItem from "@/features/boards/components/BoardItem.vue"

const route = useRoute()
const boardStore = useBoardStore()
const board = computed<Board | undefined>(() => boardStore.getById(Number(route.params.boardId)))
</script>

<template>
    <BoardItem v-if="board !== undefined" :board="board" />
</template>
