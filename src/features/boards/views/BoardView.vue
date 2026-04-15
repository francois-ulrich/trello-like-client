<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"

import type { Board } from "@/features/boards/domain/board.model"
import BoardItem from "@/features/boards/components/BoardItem.vue"
import { useStores } from "@/composables/useStores"

const route = useRoute()
const { boardStore } = useStores()
const board = computed<Board | undefined>(() => boardStore.getById(Number(route.params.id)))
</script>

<template>
    <BoardItem v-if="board" :board="board" />
</template>
