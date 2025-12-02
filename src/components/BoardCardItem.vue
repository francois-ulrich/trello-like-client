<script setup lang="ts">
import RoundedCard from "@/components/util/RoundedCard.vue"
import type { Card } from "@/types/card"

const props = defineProps<{ card: Card; columnId: string }>()
</script>

<template>
    <RoundedCard class="bg-gray-300 p-4 cursor-pointer box-border">
        <p class="font-medium">{{ props.card.name }}</p>
    </RoundedCard>
</template>

<style scoped></style>
