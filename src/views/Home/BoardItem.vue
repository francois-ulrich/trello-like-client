<script setup lang="ts">
import RoundedCard from "@/components/RoundedCard.vue"
import type { Board } from "@/types/board"

const props = defineProps<{ board: Board }>()
</script>

<template>
    <RoundedCard
        class="boardItem flex flex-col-reverse p-0! overflow-hidden shadow-md shadow-gray-400 cursor-pointer transition-opacity opacity-100 hover:opacity-60"
    >
        <div class="boardItem__title-preview bg-gray-200 p-2">
            <h3 class="text-gray-800 font-semibold text-sm">{{ props.board.name }}</h3>
        </div>
        <div
            class="h-full boardItem__title-area bg-linear-to-b from-gray-300 to-gray-400 to-100%"
        ></div>
    </RoundedCard>
</template>

<style>
.boardItem {
    width: 200px;
    height: 100px;
}
</style>
