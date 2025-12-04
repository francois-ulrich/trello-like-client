<script setup lang="ts">
import CardItem from "@/components/CardItem.vue"
import RoundedCard from "@/components/util/RoundedCard.vue"
import type { Card } from "@/types/card"
import type { Column } from "@/types/column"
import { ref } from "vue"
import draggable from "vuedraggable"
import ColumnContainer from "@/components/util/ColumnContainer.vue"
import CardCreation from "@/components/CardCreation.vue"
import { useCardStore } from "@/stores/card"
import type { DraggableChangeEvent } from "@/types/draggable"

const props = defineProps<{ column: Column }>()

const cardStore = useCardStore()

// const column = ref<Column>(props.column)
const cards = ref<Card[]>(cardStore.items.filter((card) => card.columnId === props.column.id))

const handleCardsMove = (e: DraggableChangeEvent<Card>) => {
    if (e.added) {
        const updatedCard = { ...e.added.element, columnId: props.column.id }
        cardStore.update(updatedCard)
    }
}

const handleCreateCard = (card: Card) => {
    cards.value.push(card)
}
</script>

<template>
    <ColumnContainer>
        <RoundedCard class="bg-gray-200 flex flex-col gap-y-4 board-column-item w-full">
            <p class="font-medium">{{ column.name }}</p>

            <draggable
                v-model="cards"
                item-key="id"
                :group="column.boardId"
                class="max-w-80 flex flex-col gap-y-4"
                @change="handleCardsMove"
            >
                <template #item="{ element }">
                    <CardItem :card="element" :column="column" />
                </template>
            </draggable>

            <CardCreation :columnId="column.id" @createCard="handleCreateCard" />
        </RoundedCard>
    </ColumnContainer>
</template>

<style scoped></style>
