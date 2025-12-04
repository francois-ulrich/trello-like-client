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

const cardsPositionCompare = (a: Card, b: Card) => {
    if (a.position < b.position) return -1
    else if (a.position > b.position) return 1
    return 0
}

const cards = ref<Card[]>(
    cardStore.items.filter((card) => card.columnId === props.column.id).sort(cardsPositionCompare),
)

const handleCardsMove = (e: DraggableChangeEvent<Card>) => {
    if (e.moved) {
        cards.value.forEach((card, index) => {
            const updatedCard = { ...card, position: index }
            cardStore.update(updatedCard)
        })
    }

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

            <CardCreation :column="column" @createCard="handleCreateCard" />
        </RoundedCard>
    </ColumnContainer>
</template>

<style scoped></style>
