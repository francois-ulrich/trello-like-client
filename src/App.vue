<script setup lang="ts">
import BoardCard from "@/components/BoardItem.vue"
import { useBoardStore } from "@/stores/board"

const { items } = useBoardStore()
</script>

<template>
    <div>
        <BoardCard v-if="items[0]" :board="items[0]"></BoardCard>
    </div>
</template>

<style scoped></style>
