<script setup lang="ts">
import BoardCardItem from "@/components/BoardCardItem.vue"
import RoundedCard from "@/components/util/RoundedCard.vue"
import type { Card } from "@/types/card"
import type { Column } from "@/types/column"
import { computed, ref } from "vue"
import draggable from "vuedraggable"
import { Plus } from "lucide-vue-next"
import BoardColumnCardAddForm from "@/components/BoardColumnCardAddForm.vue"
import BaseButton from "@/components/util/BaseButton.vue"

const props = defineProps<{ column: Column; cards: Card[]; boardId: string }>()

const emit = defineEmits(["update:cards"])

const isInCardCreationMode = ref<boolean>(false)

const cards = computed({
    get: () => props.cards,
    set: (value) => emit("update:cards", value),
})

const onAddCardButtonClick = () => {
    isInCardCreationMode.value = true
}

const onCardCreationCancelButtonClick = () => {
    isInCardCreationMode.value = false
}
</script>

<template>
    <RoundedCard class="bg-gray-200 flex flex-col gap-y-4 board-column-item w-80">
        <p class="font-medium">{{ props.column.name }}</p>

        <draggable
            v-model="cards"
            item-key="id"
            :group="props.column.draggableGroup"
            class="max-w-80 flex flex-col gap-y-4"
        >
            <template #item="{ element }">
                <BoardCardItem :card="element" :columnId="props.column.id" />
            </template>
        </draggable>

        <BaseButton
            v-if="!isInCardCreationMode"
            :icon="Plus"
            @click="onAddCardButtonClick"
            color="lightgray"
            >Add card</BaseButton
        >

        <BoardColumnCardAddForm
            v-else
            @cancel="onCardCreationCancelButtonClick"
            :boardId="props.boardId"
            :columnId="props.column.id"
        />
    </RoundedCard>
</template>

<style scoped></style>
