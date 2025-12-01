<script setup lang="ts">
import BoardCardItem from "@/components/BoardCardItem.vue"
import RoundedCard from "@/components/util/RoundedCard.vue"
import type { Card } from "@/types/card"
import type { Column } from "@/types/column"
import { computed } from "vue"
import draggable from "vuedraggable"
import { Plus } from "lucide-vue-next"
import ButtonWithIcon from "@/components/util/ButtonWithIcon.vue"

const props = defineProps<{ column: Column; cards: Card[] }>()

const emit = defineEmits(["update:cards"])

const cards = computed({
    get: () => props.cards,
    set: (value) => emit("update:cards", value),
})

const onAddCardButtonClick = () => {
    console.log("onAddCardButtonClick")
}
</script>

<template>
    <RoundedCard class="bg-gray-200 flex flex-col gap-y-4 board-column-item">
        <p class="font-medium">{{ props.column.name }}</p>

        <draggable
            v-model="cards"
            item-key="id"
            :group="props.column.draggableGroup"
            class="w-80 flex flex-col gap-y-4"
        >
            <template #item="{ element }">
                <BoardCardItem :card="element" />
            </template>
        </draggable>

        <ButtonWithIcon :icon="Plus" @click="onAddCardButtonClick">Add card</ButtonWithIcon>
    </RoundedCard>
</template>

<style scoped></style>
