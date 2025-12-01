<script setup lang="ts">
import BoardCardItem from "@/components/BoardCardItem.vue"
import RoundedCard from "@/components/util/RoundedCard.vue"
import type { Column } from "@/types/column"

const props = defineProps<{ column: Column }>()
</script>

<template>
    <RoundedCard class="bg-gray-200 w-80 flex flex-col gap-y-4">
        <p class="font-medium">{{ props.column.name }}</p>

        <ul class="flex flex-col gap-y-4">
            <li v-for="card in props.column.cards">
                <BoardCardItem :card="card" />
            </li>
        </ul>
    </RoundedCard>
</template>

<style scoped></style>
