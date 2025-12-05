<script setup lang="ts">
import CardItem from "@/views/Board/CardItem.vue"
import RoundedCard from "@/components/RoundedCard.vue"
import type { Card } from "@/types/card"
import type { Column } from "@/types/column"
import { ref } from "vue"
import draggable from "vuedraggable"
import ColumnContainer from "@/components/ColumnContainer.vue"
import CardCreation from "@/views/Board/CardCreation.vue"
import { useCardStore } from "@/stores/card"
import type { DraggableChangeEvent } from "@/types/draggable"

const props = defineProps<{ column: Column }>()

const cardStore = useCardStore()

const cardsPositionCompare = (a: Card, b: Card) => {
    if (a.position < b.position) return -1
    else if (a.position > b.position) return 1
    return 0
}

const cards = ref<Card[]>(
    cardStore.items.filter((card) => card.columnId === props.column.id).sort(cardsPositionCompare),
)

const updateCardsInStore = () => {
    cards.value.forEach((card) => cardStore.update(card))
}

const updateCardsPositions = () => {
    cards.value = cards.value.map((card, index) => ({ ...card, position: index }))
    cards.value = cards.value.sort(cardsPositionCompare)
}

const handleCardsMove = (e: DraggableChangeEvent<Card>) => {
    if (e.moved) {
        updateCardsPositions()
        updateCardsInStore()
    }

    if (e.added) {
        updateCardsPositions()

        const index = cards.value.findIndex((_, index) => index === e.added.newIndex)

        if (index !== -1 && cards.value[index]) {
            cards.value[index] = {
                ...cards.value[index],
                columnId: props.column.id,
            }
        }

        updateCardsInStore()
    }

    if (e.removed) {
        updateCardsPositions()
        updateCardsInStore()
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

            <CardCreation :column="column" @createCard="handleCreateCard" />
        </RoundedCard>
    </ColumnContainer>
</template>

<style scoped></style>
