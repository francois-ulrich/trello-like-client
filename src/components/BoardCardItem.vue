<script setup lang="ts">
import RoundedCard from "@/components/util/RoundedCard.vue"
import type { Card } from "@/types/card"
import { SquarePen } from "lucide-vue-next"

const props = defineProps<{ card: Card; columnId: string }>()
</script>

<template>
    <RoundedCard class="bg-gray-300 p-4 cursor-pointer box-border relative group">
        <p class="font-medium">{{ props.card.name }}</p>
        <SquarePen class="absolute top-2 right-2 opacity-0 group-hover:opacity-100" :size="16" />
    </RoundedCard>
</template>

<style scoped></style>
