<script setup lang="ts">
import RoundedCard from "@/components/RoundedCard.vue"
</script>

<template>
    <RoundedCard
        class="boardItem p-0! shadow-md shadow-gray-400 transition-opacity opacity-100 hover:opacity-60"
    >
        <slot></slot>
    </RoundedCard>
</template>

<style>
.boardItem {
    width: 200px;
    height: 100px;
}
</style>
