<script setup lang="ts">
import ModalDialog from "@/shared/components/ModalDialog.vue"
import RoundedCard from "@/shared/components/RoundedCard.vue"
import { SquarePen, TextAlignStart } from "lucide-vue-next"
import { computed, ref } from "vue"
import Renamable from "@/shared/components/Renamable.vue"
import { useCardStore } from "@/features/cards/stores/card.store"
import type { Card } from "@/features/cards/domain/card.model"
import type { Column } from "@/features/columns/domain/column.model"
import BaseButton from "@/shared/components/BaseButton.vue"

const props = defineProps<{ cardId: number; column: Column }>()

const boardDeleteModalRef = ref<InstanceType<typeof ModalDialog> | null>(null)
const cardStore = useCardStore()

const card = computed<Card | undefined>(() => cardStore.items.find((c) => c.id === props.cardId))

const handleModalOpen = () => {
    if (boardDeleteModalRef?.value === null) return
    boardDeleteModalRef?.value.open()
}

const handleNameUpdate = (value: string) => {
    cardStore.update(props.cardId, { name: value })
}

const handleDescriptionUpdate = (value: string) => {
    const cardItem = card.value

    if (cardItem === undefined) return

    const cardToUpdate = cardStore.items.find((c) => c.id === cardItem.id)

    if (cardToUpdate === undefined) return

    cardToUpdate.description = value
    cardStore.update(props.cardId, { description: value })
}

const cardDeleteModalRef = ref<InstanceType<typeof ModalDialog> | null>(null)

const handleCardDeleteModalOpen = async () => {
    cardDeleteModalRef.value?.open()
}

const handleCardDeletion = () => {
    cardStore.remove(props.cardId)
    cardDeleteModalRef.value?.close()
}
</script>

<template>
    <RoundedCard
        class="bg-gray-300 p-4 cursor-pointer box-border relative group"
        @click="handleModalOpen"
        v-if="card"
    >
        <p class="font-medium">{{ card.name }}</p>

        <TextAlignStart v-if="card?.description !== undefined" :size="14" class="m-1" />

        <SquarePen class="absolute top-2 right-2 opacity-0 group-hover:opacity-100" :size="16" />

        <ModalDialog :withBackdrop="true" positioning="screenCenter" ref="boardDeleteModalRef">
            <template #header>
                <p class="text-gray-700">{{ props.column.name }}</p>
            </template>

            <div class="space-y-8">
                <Renamable
                    ref="titleFieldRef"
                    textClass="text-xl font-medium"
                    :text="card.name"
                    @textUpdate="handleNameUpdate"
                ></Renamable>

                <div class="space-y-3">
                    <div class="space-y-2 flex flex-row items-start gap-1">
                        <TextAlignStart :size="16" />
                        <p class="font-semibold leading-none">Description&nbsp;:</p>
                    </div>

                    <Renamable
                        ref="titleFieldRef"
                        :text="card.description ?? ''"
                        inputType="textarea"
                        :closeOnFocusOut="true"
                        @textUpdate="handleDescriptionUpdate"
                    >
                        <template #if-value-empty>
                            <div class="outline-input">
                                <p>Add a more detailed description...</p>
                            </div>
                        </template>
                    </Renamable>
                </div>
            </div>

            <template #footer>
                <BaseButton color="danger" @click="handleCardDeleteModalOpen">
                    <p class="text-center">Delete card</p>
                </BaseButton>
            </template>
        </ModalDialog>

        <ModalDialog ref="cardDeleteModalRef" :withBackdrop="true">
            <template #header
                ><p class="text-center font-medium">Delete card "{{ card.name }}" ?</p>
            </template>

            <div class="flex flex-col gap-4">
                <p>Are you sure you want to delete this card&nbsp;? This action is irreversible.</p>

                <BaseButton color="danger" @click="handleCardDeletion">
                    <p class="text-center">Delete card</p>
                </BaseButton>
            </div>
        </ModalDialog>
    </RoundedCard>
</template>
