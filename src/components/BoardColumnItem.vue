<script setup lang="ts">
import BoardCardItem from "@/components/BoardCardItem.vue"
import RoundedCard from "@/components/util/RoundedCard.vue"
import type { Card } from "@/types/card"
import type { Column } from "@/types/column"
import { ref } from "vue"
import draggable from "vuedraggable"

const props = defineProps<{ column: Column }>()

const cards = ref<Card[]>(props.column.cards)
</script>

<template>
    <RoundedCard class="bg-gray-200 flex flex-col gap-y-4">
        <p class="font-medium">{{ props.column.name }}</p>

        <draggable
            v-model="cards"
            item-key="id"
            :group="props.column.draggableGroup"
            class="w-80 flex flex-col gap-y-4"
        >
            <template #item="{ element }">
                <BoardCardItem :card="element" />
            </template>
        </draggable>
    </RoundedCard>
</template>

<style scoped></style>
