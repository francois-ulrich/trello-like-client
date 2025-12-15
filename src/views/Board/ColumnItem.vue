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
import BaseButton from "@/components/BaseButton.vue"
import ActionsDropdown from "@/components/ActionsDropdown.vue"
import HeaderWithTitleAndOptions from "@/components/HeaderWithTitleAndOptions.vue"
import ModalDialog from "@/components/ModalDialog.vue"
import { useGlobalStore } from "@/stores/global"
import { useColumnStore } from "@/stores/column"
import Renamable from "@/components/Renamable.vue"

const props = defineProps<{ column: Column }>()

const globalStore = useGlobalStore()
const columnStore = useColumnStore()
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

const columnDeleteModalRef = ref<InstanceType<typeof ModalDialog> | null>(null)

const handleBoardDeletion = () => {
    globalStore.removeColumn(props.column.id)
    columnDeleteModalRef.value?.close()
}

const handleBoardDeleteModalOpen = async () => {
    columnDeleteModalRef.value?.open()
}

const handleBoardNameUpdate = (value: string) => {
    if (props.column === undefined) return
    let columnToUpdate = columnStore.items.find(
        (currentColumn) => currentColumn.id === props.column.id,
    )
    if (columnToUpdate === undefined) return
    columnToUpdate.name = value
    columnStore.update(columnToUpdate)
}
</script>

<template>
    <ColumnContainer>
        <RoundedCard class="bg-gray-200 flex flex-col gap-y-4 board-column-item w-full">
            <HeaderWithTitleAndOptions>
                <!-- <p class="font-medium">{{ column.name }}</p> -->

                <Renamable
                    textClass="font-medium"
                    :text="column.name"
                    @textUpdate="handleBoardNameUpdate"
                ></Renamable>

                <template #options>
                    <ActionsDropdown :buttonIconSize="24">
                        <template #header>
                            <p class="font-medium text-center">Column actions</p>
                        </template>

                        <BaseButton
                            color="white"
                            shape="rectangle"
                            class="w-full"
                            @click="handleBoardDeleteModalOpen"
                            >Delete</BaseButton
                        >
                    </ActionsDropdown>
                </template>
            </HeaderWithTitleAndOptions>

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

        <ModalDialog ref="columnDeleteModalRef" :withBackdrop="true">
            <template #header><p class="text-center font-medium">Delete board ?</p> </template>

            <div class="flex flex-col gap-4">
                <p>
                    Are you sure you want to delete this column&nbsp;? This action is irreversible.
                </p>

                <BaseButton color="danger" @click="handleBoardDeletion">
                    <p class="text-center">Delete board</p>
                </BaseButton>
            </div>
        </ModalDialog>
    </ColumnContainer>
</template>

<style scoped></style>
