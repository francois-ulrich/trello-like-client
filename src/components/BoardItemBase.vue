<script setup lang="ts">
import RoundedCard from "@/components/RoundedCard.vue"
</script>

<template>
    <RoundedCard
        class="boardItem p-0! overflow-hidden shadow-md shadow-gray-400 transition-opacity opacity-100 hover:opacity-60"
    >
        <button class="w-full h-full cursor-pointer">
            <slot></slot>
        </button>
    </RoundedCard>
</template>

<style>
.boardItem {
    width: 200px;
    height: 100px;
}
</style>
