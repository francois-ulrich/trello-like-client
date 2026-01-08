<script setup lang="ts">
import ModalDialog from "@/components/ModalDialog.vue"
import RoundedCard from "@/components/RoundedCard.vue"
import { GripHorizontal, SquarePen, TextAlignStart } from "lucide-vue-next"
import { computed, ref } from "vue"
import Renamable from "@/components/Renamable.vue"
import { useCardStore } from "@/stores/card"
import type { Card } from "@/types/card"
import type { Column } from "@/types/column"

const props = defineProps<{ cardId: string; column: Column }>()

const boardDeleteModalRef = ref<InstanceType<typeof ModalDialog> | null>(null)
const cardStore = useCardStore()

const card = computed<Card | undefined>(() => cardStore.items.find((c) => c.id === props.cardId))

const handleModalOpen = () => {
    if (boardDeleteModalRef?.value === null) return
    boardDeleteModalRef?.value.open()
}

const handleTitleUpdate = (value: string) => {
    const cardItem = card.value

    if (cardItem === undefined) return

    const cardToUpdate = cardStore.items.find((c) => c.id === cardItem.id)

    if (cardToUpdate === undefined) return

    cardToUpdate.name = value
    cardStore.update(cardToUpdate)
}

const handleDescriptionUpdate = (value: string) => {
    const cardItem = card.value

    if (cardItem === undefined) return

    const cardToUpdate = cardStore.items.find((c) => c.id === cardItem.id)

    if (cardToUpdate === undefined) return

    cardToUpdate.description = value
    cardStore.update(cardToUpdate)
}
</script>

<template>
    <RoundedCard
        class="bg-gray-300 p-4 cursor-pointer box-border relative group"
        @click="handleModalOpen"
        v-if="card"
    >
        <div class="w-full flex flex-row gap-2">
            <div
                class="handle w-10 h-10 border-gray-600 bg-gray-400 mb-2 rounded-sm flex justify-center items-center cursor-move"
            >
                <GripHorizontal class="text-gray-500" :size="16" />
            </div>
        </div>

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
                    @textUpdate="handleTitleUpdate"
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
        </ModalDialog>
    </RoundedCard>
</template>
