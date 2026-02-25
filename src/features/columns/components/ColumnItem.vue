<script setup lang="ts">
import CardItem from "@/views/Board/CardItem.vue"
import RoundedCard from "@/shared/components/RoundedCard.vue"
import type { Card } from "@/features/cards/domain/card.model"
import type { Column } from "@/features/columns/domain/column.model"
import { ref, watch } from "vue"
import draggable from "vuedraggable"
import ColumnContainer from "@/shared/components/ColumnContainer.vue"
import CardCreation from "@/views/Board/CardCreation.vue"
import { useCardStore } from "@/features/cards/stores/card.store"
import type { DraggableChangeEvent } from "@/types/draggable"
import BaseButton from "@/shared/components/BaseButton.vue"
import ActionsDropdown from "@/shared/components/ActionsDropdown.vue"
import HeaderWithTitleAndOptions from "@/shared/components/HeaderWithTitleAndOptions.vue"
import ModalDialog from "@/shared/components/ModalDialog.vue"
import { useColumnStore } from "@/features/columns/stores/column.store"
import Renamable from "@/shared/components/Renamable.vue"

const props = defineProps<{ column: Column }>()

const columnStore = useColumnStore()
const cardStore = useCardStore()

const renamableRef = ref<InstanceType<typeof Renamable> | null>(null)

// const cardsPositionCompare = (a: Card, b: Card) => {
//     if (a.position < b.position) return -1
//     else if (a.position > b.position) return 1
//     return 0
// }

// let previousCardsValue = []

const cards = ref<Card[]>(cardStore.getCardsInColumn(props.column.id))

watch(
    () => cardStore.getCardsInColumn(props.column.id),
    (newCards) => {
        cards.value = [...newCards]
    },
    { immediate: true },
)

const updateCardPositionWithinColumn = async (move: { element: Card; newIndex: number }) => {
    await cardStore.move(move.element.id, {
        targetPosition: move.newIndex,
        targetColumnId: move.element.columnId,
    })
}

const updateCardPositionBetweenColumns = async (move: {
    element: Card
    oldIndex?: number
    newIndex: number
}) => {
    try {
        await cardStore.move(move.element.id, {
            targetPosition: move.newIndex,
            targetColumnId: move.element.columnId,
        })
    } catch (e: unknown) {
        // cards.value = cardStore.getCardsInColumn(props.column.id)
    }
}

const handleCardsMove = (e: DraggableChangeEvent<Card>) => {
    console.log("handleCardsMove")

    if (e.moved) {
        updateCardPositionWithinColumn(e.moved)
        return
    }

    if (e.added) {
        updateCardPositionBetweenColumns(e.added)
        // updateCardPositionWithinColumn()
        // const index = cards.value.findIndex((_, index) => index === e.added.newIndex)
        // if (index !== -1 && cards.value[index]) {
        //     cards.value[index] = {
        //         ...cards.value[index],
        //         columnId: props.column.id,
        //     }
        // }
        // updateCardsInStore()

        console.log("added")
        return
    }

    // if (e.removed) {
    //     updateCardPositionWithinColumn()
    //     // updateCardsInStore()
    //     return
    // }
}

const columnDeleteModalRef = ref<InstanceType<typeof ModalDialog> | null>(null)

const handleColumnDeletion = () => {
    columnStore.remove(props.column.boardId, props.column.id)
    columnDeleteModalRef.value?.close()
}

const handleColumnDeleteModalOpen = async () => {
    columnDeleteModalRef.value?.open()
}

const handleColumnNameUpdate = (value: string) => {
    if (props.column === undefined) return

    try {
        columnStore.update(props.column.boardId, props.column.id, { name: value })
    } catch (e: unknown) {
        console.error(e)
    }
}

const handleColumnRename = () => {
    renamableRef.value?.open()
    columnDeleteModalRef.value?.close()
}
</script>

<template>
    <ColumnContainer>
        <RoundedCard class="bg-gray-200 flex flex-col gap-y-4 board-column-item w-full">
            <HeaderWithTitleAndOptions>
                <Renamable
                    ref="renamableRef"
                    textClass="font-medium"
                    :text="column.name"
                    @textUpdate="handleColumnNameUpdate"
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
                            @click="handleColumnDeleteModalOpen"
                            >Delete</BaseButton
                        >

                        <BaseButton
                            color="white"
                            shape="rectangle"
                            class="w-full"
                            @click="handleColumnRename"
                            >Rename</BaseButton
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
                <template #item="{ element }: { element: Card }">
                    <CardItem :card-id="element.id" :column="column" />
                </template>
            </draggable>

            <CardCreation :column="column" />
        </RoundedCard>

        <ModalDialog ref="columnDeleteModalRef" :withBackdrop="true">
            <template #header
                ><p class="text-center font-medium">Delete column "{{ column.name }}" ?</p>
            </template>

            <div class="flex flex-col gap-4">
                <p>
                    Are you sure you want to delete this column&nbsp;? This action is irreversible.
                </p>

                <BaseButton color="danger" @click="handleColumnDeletion">
                    <p class="text-center">Delete column</p>
                </BaseButton>
            </div>
        </ModalDialog>
    </ColumnContainer>
</template>
