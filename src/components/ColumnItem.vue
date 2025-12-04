<script setup lang="ts">
import CardItem from "@/components/CardItem.vue"
import RoundedCard from "@/components/util/RoundedCard.vue"
import type { Card } from "@/types/card"
import type { Column } from "@/types/column"
import { computed } from "vue"
import draggable from "vuedraggable"
import ColumnContainer from "@/components/util/ColumnContainer.vue"
import CardCreation from "@/components/CardCreation.vue"
import { useCardStore } from "@/stores/card"

const props = defineProps<{ column: Column; cards: Card[]; boardId: string }>()

const emit = defineEmits(["update:cards"])

const cardStore = useCardStore()

const cards = computed({
    get: () => cardStore.items.filter((card) => card.columnId === props.column.id),
    set: (value) => {
        console.log(value)
    },
})
</script>

<template>
    <ColumnContainer>
        <RoundedCard class="bg-gray-200 flex flex-col gap-y-4 board-column-item w-full">
            <p class="font-medium">{{ props.column.name }}</p>

            <draggable
                v-model="cards"
                item-key="id"
                :group="props.boardId"
                class="max-w-80 flex flex-col gap-y-4"
            >
                <template #item="{ element }">
                    <CardItem :card="element" :column="props.column" />
                </template>
            </draggable>

            <CardCreation :columnId="props.column.id" />
        </RoundedCard>
    </ColumnContainer>
</template>

<style scoped></style>
