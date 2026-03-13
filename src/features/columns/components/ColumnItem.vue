<script setup lang="ts">
import CardItem from "@/features/cards/components/CardItem.vue"
import RoundedCard from "@/shared/components/RoundedCard.vue"
import type { Card } from "@/features/cards/domain/card.model"
import type { Column } from "@/features/columns/domain/column.model"
import { ref, watch } from "vue"
import draggable from "vuedraggable"
import CardCreation from "@/features/cards/components/CardCreation.vue"
import { useCardStore } from "@/features/cards/stores/card.store"
import type {
    DraggableChangeEvent,
    DraggableChangeEventPayloadAdded,
    DraggableChangeEventPayloadMoved,
} from "@/shared/types/draggable"
import BaseButton from "@/shared/components/BaseButton.vue"
import ActionsDropdown from "@/shared/components/ActionsDropdown.vue"
import HeaderWithTitleAndOptions from "@/shared/components/HeaderWithTitleAndOptions.vue"
import ModalDialog from "@/shared/components/ModalDialog.vue"
import { useColumnStore } from "@/features/columns/stores/column.store"
import Renamable from "@/shared/components/Renamable.vue"
import { useBoardStore } from "@/features/boards/stores/board.store"

const props = defineProps<{ column: Column }>()

const boardStore = useBoardStore()
const columnStore = useColumnStore()
const cardStore = useCardStore()

const renamableRef = ref<InstanceType<typeof Renamable> | null>(null)

const cards = ref<Card[]>(cardStore.getCardsInColumn(props.column.id))

watch(
    () => cardStore.getCardsInColumn(props.column.id),
    (newCards) => {
        cards.value = [...newCards]
    },
    { immediate: true },
)

const moveCardInsideColumn = async (move: DraggableChangeEventPayloadMoved<Card>) => {
    await cardStore.move(move.element.id, {
        targetPosition: move.newIndex,
        targetColumnId: props.column.id,
    })
}

const moveCardToOtherColumn = async (addMove: DraggableChangeEventPayloadAdded<Card>) => {
    await cardStore.move(addMove.element.id, {
        targetPosition: addMove.newIndex,
        targetColumnId: props.column.id,
    })
}

const handleCardsMove = (e: DraggableChangeEvent<Card>) => {
    if (e.moved) {
        moveCardInsideColumn(e.moved)
        return
    }

    if (e.added) {
        moveCardToOtherColumn(e.added)
        return
    }
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
    <div class="w-80 shrink-0">
        <RoundedCard class="bg-gray-200 flex flex-col gap-y-4 board-column-item w-full">
            <HeaderWithTitleAndOptions>
                <Renamable
                    :disabled="!boardStore.canEdit(column.boardId)"
                    ref="renamableRef"
                    textClass="font-medium"
                    :text="column.name"
                    @textUpdate="handleColumnNameUpdate"
                ></Renamable>

                <p>position : {{ column.position }}</p>

                <template #options v-if="boardStore.canEdit(column.boardId)">
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
                :disabled="!boardStore.canEdit(column.boardId)"
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

            <CardCreation :column="column" v-if="boardStore.canEdit(column.boardId)" />
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
    </div>
</template>
